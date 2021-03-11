import datetime
import os
import json


class EventCollector:

    def __init__(self):
        date = None
        date_of_last_file = None

    def get_files(self):
        """
        :return:возвращает словарь файлов
        """
        d={}
        files = os.listdir("event_collector")
        files.sort()
        for i in range(0, len(files)):
            d[i] = files[i]
        return d

    def create_log_file(self):
        """
        Создает файл с текущей датой до секунды в директории event_collector.
        Если папки event_collector нет, то она будет создана.
        :return:
        """
        print(os.getcwd())
        if os.path.isdir("event_collector"):
            print("dir of collector is found")
        else:
            print("dir not found, creating event_collector dir")
            os.mkdir("event_collector")
        now = datetime.datetime.now()
        self.date = now.strftime("%Y:%m:%d %H:%M:%S")
        f = open('event_collector/' + self.date + ".txt", 'w')
        f.close()

    def append_data(self, data):
        """
        Добавляет в файл data строку
        """
        f = open('event_collector/' + self.date + ".txt", 'a', encoding="utf-8")
        f.write(data + '\n')
        f.close()

    def flush_data(self):
        """
        ОСТОРОЖНА!
        Удаляет все файлы с логами.
        """
        file_list = (os.listdir("event_collector/"))
        for f in file_list:
            os.remove("event_collector/" + f)

    def get_json_from_file(self,name):
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
