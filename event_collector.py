import datetime
import os
import json

from flask_sqlalchemy import SQLAlchemy
from models.session import Session
from models import db
from models.event import Event

class EventCollector:
    db: SQLAlchemy
    session: Session


    def __init__(self, app):
        date = None
        date_of_last_file = None
        self.session = None
        self.app = app
        
       


    def get_files(self):
        """
        :return:возвращает словарь файлов
        """
        print("asas")
        print(Session.query.all())

        d={}
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
            db.init_app(self.app)
            self.session = Session(name=session_name)
            db.session.add(self.session)
            db.session.commit()

    def append_data(self, data):
        """
        Добавляет в файл data строку
        data - json 
        """
        with self.app.app_context():
            db.init_app(self.app)
            # итерируем эвенты по одному
            for event in data['events']:
                # и добавляем их в бд
                ev = Event(
                    time=datetime.datetime.fromtimestamp(
                        event.get("timestamp", 0) / 1000
                    ),
                    event_id=event.get("event_id", ""),
                    mac_address=event.get("mac_address", ""),
                    session=self.session,
                    json=json.dumps(event)
                )
                db.session.add(ev)
                db.session.commit()

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
