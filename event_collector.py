import datetime
import os
import json

from models.session import Session
from models import db
from models.event import Event
from flask_socketio import send


class EventCollector:
    session: Session

    def __init__(self, app):
        self.session = None
        self.app = app

    def get_files(self):
        """
        :return:возвращает словарь файлов
        """
        d = {}
        files = os.listdir("event_collector")
        files.sort()
        for i in range(0, len(files)):
            d[i] = files[i]
        return d

    def create_log_file(self, session_name: str):
        """
        Создаем сессию
        """
        with self.app.app_context():
            # db.init_app(self.app)  # иногда работает без неё иногда с ней
            session = Session(name=session_name)
            db.session.add(session)
            db.session.commit()
            self.session = session

            send({
                "type": "current_session",
                "data": session.serialize
            }, room="current_session", namespace="/")

            return self.session.id

    def have_session(self):
        return self.session is not None

    def get_session_id(self):
        return self.session.id

    def append_data(self, data):
        """
        Добавляет в файл data строку
        data - json 
        """
        events_ids = []

        with self.app.app_context():

            if not self.have_session():
                self.create_log_file("manual")
            # db.init_app(self.app) # иногда работает без неё иногда с ней
            # итерируем эвенты по одному
            for event in data['events']:
                # и добавляем их в бд
                ev = Event(
                    time=datetime.datetime.fromtimestamp(
                        event.get("timestamp", 0) / 1000
                    ),
                    event_id=event.get("event_id", ""),
                    mac_address=event.get("mac_address", ""),
                    session_id=self.session.id,
                    json=json.dumps(event)
                )
                db.session.add(ev)
                db.session.commit()
                events_ids.append(ev.id)

        return events_ids

    def flush_data(self):
        """
        ОСТОРОЖНА!
        Удаляет все файлы с логами.
        """
        file_list = (os.listdir("event_collector/"))
        for f in file_list:
            os.remove("event_collector/" + f)

    def get_json_from_file(self, name):
        """
        :param name:
        :return: возвращает словарь с вложением распершеных json
        """
        d = {}
        f = open('event_collector/' + name, 'r')
        data = f.read()
        data = data.split("\n")
        for i in range(0, len(data) - 1):
            d[i] = json.loads(data[i])
        f.close()
        return d
