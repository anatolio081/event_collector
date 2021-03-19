from models.session import Session
from models.event import Event
import json

from flask import Flask, request, render_template, send_from_directory, json
from flask_cors import CORS

from event_collector import EventCollector
from config_helper import load_settings
from models import db
from flask_socketio import SocketIO, emit, join_room, leave_room, send, rooms


config = load_settings("api_config.yaml")
api_host = config["HOST"]
api_port = config["PORT"]

app = Flask(__name__)
cors = CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")
# конфиг базы
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['CORS_HEADERS'] = 'Content-Type'


# инициализируем базу
db.init_app(app)
with app.app_context():
    db.create_all()

# инициализаруем базу
collector = EventCollector(app)
collector.create_log_file("manual")


@socketio.on('join')
def on_join(room):
    join_room(room, sid=request.sid)


@socketio.on('leave')
def on_leave(room):
    leave_room(room, sid=request.sid)


@socketio.on('disconnect')
def on_disconect():
    print(rooms(request.sid))


@socketio.on('connect')
def connect():
    join_room("current_session", sid=request.sid)
    session = Session.query.get(collector.get_session_id())
    emit('message', {"type": "current_session",
                     'data': session.serialize})


@app.route("/new_log", methods=['GET'])
def new_log():
    """
    создать новый файл для логов
    :return:
    """
    collector.create_log_file("manul_front")
    return "created"


@app.route("/api/newsession", methods=['GET'])
def api_new_session():
    """
    создать новый файл для логов
    :return:
    """
    session = collector.create_log_file("manul_front")
    session = Session.query.get(session)
    send({
        "type": "current_session",
        "data": session.serialize
    }, json=True, room="current_session", namespace="/")
    return "created"


@app.route("/web_show_from_raw", methods=['GET'])
def wa_form():
    """
    отобразить форму для ввода данных с коллектора смартспая
    :return:
    """
    return render_template("waform.html")


@app.route("/web_event_files", methods=['GET'])
def render_events():
    """
    показать веб-страницу с файлами логов
    :return:
    """
    sessions = Session.query.all()  # можно сортонуть по времени

    return render_template("sessionList.html",
                           sessions=sessions)


@app.route("/api/sessions", methods=['GET'])
def api_sessions():
    """
    показать веб-страницу с файлами логов
    :return:
    """
    sessions = Session.query.order_by(
        Session.created_at.desc()).all()  # можно сортонуть по времени
    return json.jsonify([i.serialize for i in sessions])


@app.route("/api/current_session", methods=['GET'])
def api_current_sessions():
    """
    показать веб-страницу с файлами логов
    :return:
    """
    return json.jsonify(collector.session.serialize)


@app.route("/events_files_json", methods=['GET'])
def events_raw():
    """
    вернуть список файлов в json
    :return:
    """
    files = collector.get_files()
    response = app.response_class(
        response=json.dumps(files),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route("/api/events", methods=['GET'])
def api_events():
    """
    показать в юае все события в сессии файла-логов
    :return:
    """
    session = request.args.get('session')
    session = Session.query.get(session)

    return json.jsonify([i.serialize for i in session.events])


@app.route("/event_flush", methods=['GET'])
def rm_event():
    """
    стереть все файлы логов.
    :return:
    """
    collector.flush_data()
    return "all logs are deleted! go to <a href=\"/\">Main page</a>"


@app.route("/event_raw", methods=['GET'])
def event_raw():
    """
    отобразить все содержимое файла, где каждая строка - отдельное событие
    :return:
    """
    filename = request.args.get('file')
    return send_from_directory(directory="event_collector/", filename=filename)


@app.route("/all_events_single_json", methods=['GET'])
def event_raw_json():
    """
    получить все события в 1 пронумерованном json-е
    :return:
    """
    filename = request.args.get('file')
    d = collector.get_json_from_file(filename)
    response = app.response_class(
        response=json.dumps(d),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route("/event_collector", methods=['GET', 'POST'])
def event_collect():
    """
    Дописать новое событие в файл
    :return:
    """
    content = request.json
    ids = collector.append_data(content)
    events = Event.query.filter(Event.id.in_(ids)).all()
    session_id = collector.get_session_id()
    data = {"type": "new_events",
            'data': [i.serialize for i in events]}
    send(data, room=f"new_events_{session_id}", json=True, namespace="/",)
    return "ok"


@app.route('/assets/<path:path>')
def send_static(path):
    return send_from_directory('frontend/dist/assets/', path)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return send_from_directory("frontend/dist/", "index.html")


if __name__ == "__main__":
    socketio.run(app, host=api_host, port=api_port, debug=True)
