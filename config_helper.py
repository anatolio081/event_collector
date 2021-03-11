# -*- coding: utf-8 -*-
import os
import yaml


def load_data_from_yaml_file(filename):
    file = os.path.join(os.path.dirname(os.path.abspath(__file__)), filename)
    with open(file) as f:
        file_data = yaml.load(f, yaml.BaseLoader)
    return file_data


def load_settings(file_name):
    config_data = load_data_from_yaml_file(file_name)
    return config_data


def get_abspath_to_prj_rootdir():
    """ Вернуть абсолютный путь до папки корня проекта
    """
    path_to_this_file = os.path.abspath(os.path.dirname(__file__))
    return path_to_this_file
