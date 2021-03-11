import os
import json
from flask import Flask, request, render_template, send_from_directory, json
from event_collector import EventCollector
from config_helper import load_settings

config = load_settings("api_config.yaml")
api_host = config["HOST"]
api_port = config["PORT"]

collector = EventCollector()
collector.create_log_file()
app = Flask(__name__)


#
@app.route("/", methods=['GET'])
def hello():
    """
    Главная страница
    """
    return render_template("index.html")


@app.route("/new_log", methods=['GET'])
def new_log():
    """
    создать новый файл для логов
    :return:
    """
    collector.create_log_file()
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
    br_tag = " <br />"
    output = "<head><link rel=\"stylesheet\" href=\"../static/css/style6.css\"></head><body>"
    output += "<a href=\"/\">Главная</a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"
    output += "<a href=\"/event_flush\">Стереть все логи</a>" + br_tag + br_tag
    files = os.listdir("event_collector")
    br_tag = " <br />"

    files.sort()
    for i in files:
        output += '<a href="http://' + api_host + ':' + api_port + '/event?filename=' + i + '">' + i + '</a>' + "\n" + br_tag + br_tag
    return output


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


@app.route("/event", methods=['GET'])
def event():
    """
    показать в юае все события в сессии файла-логов
    :return:
    """
    filename = request.args.get('filename')
    br_tag = " <br />"
    output = ""
    f = open('event_collector/' + filename, "r")
    for i in f.readlines():
        output += i + "@@@@"
    return render_template("show.html",
                           output=output,
                           file_name=filename)


@app.route("/eventwa", methods=['POST'])
def eventwa():
    """
    показать в юае все события в сессии файла-логов
    :return:
    """
    output = str()
    inp_text = request.form['myinput'].split("\n")
    for i in inp_text:
        output += i + "@@@@"
    return render_template("showWa.html",
                           output=output)


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
    print()
    content = request.json
    collector.append_data(str(json.dumps(content, ensure_ascii=False)))
    return "ok"


if __name__ == "__main__":
    app.run(host=api_host, port=api_port, debug=False)
