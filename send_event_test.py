import requests
import time
import random
from multiprocessing import Process

from config_helper import load_settings

config = load_settings("api_config.yaml")
api_host = config["HOST"]
api_port = config["PORT"]

url = f"http://{api_host}:{api_port}/event_collector"
dev_types = ["STB", "IPAD", "linux", "MAC"]
event_ids = ["watching_cats", "watching_porn", "watching_metal_concert"]
mac_adresses = ["aa:bb:aa:f0:d4:34", "bb:4c:4d:f0:d4:34",
                "cc:4c:4d:f0:d4:34", "dd:4c:4d:f0:d4:34"]


def send_data():
    for i in range(0, 15):
        json_data_small = {'events':
            [
                {
                    "device_type": random.choice(dev_types),
                    "event_counter": i,
                    "event_id": random.choice(event_ids),
                    "event_version": 1,
                    "mac_address": random.choice(mac_adresses),
                    "timestamp": int(time.time() * 1000),
                    "group_of_metrics": {
                        "metric_one": random.randint(1, 100),
                        "metric_two": random.randint(1, 100),
                        "metric_three": random.randint(1, 100),
                    }
                }
            ]
        }
        json_data_big = {'events':
            [
                {
                    "device_type": random.choice(dev_types),
                    "event_counter": i,
                    "event_id": random.choice(event_ids),
                    "event_version": 1,
                    "mac_address": random.choice(mac_adresses),
                    "timestamp": int(time.time() * 1000),
                    "group_of_metrics": {
                        "metric_one": random.randint(1, 100),
                        "metric_two": random.randint(1, 100),
                        "metric_three": random.randint(1, 100),
                    },
                    "group_of_metricsA": {
                        "metric_one": random.randint(1, 100),
                        "metric_two": random.randint(1, 100),
                        "metric_three": random.randint(1, 100),
                    },
                    "group_of_metricsB": {
                        "metric_one": random.randint(1, 100),
                        "metric_two": random.randint(1, 100),
                        "metric_three": random.randint(1, 100),
                    },
                    "group_of_metricsC": {
                        "metric_one": random.randint(1, 100),
                        "metric_two": random.randint(1, 100),
                        "metric_three": random.randint(1, 100),
                    },
                    "group_of_metricsD": {
                        "metric_one": random.randint(1, 100),
                        "metric_two": random.randint(1, 100),
                        "metric_three": random.randint(1, 100),
                    },
                    "group_of_metricsE": {
                        "metric_one": random.randint(1, 100),
                        "metric_two": random.randint(1, 100),
                        "metric_three": random.randint(1, 100),
                    },
                    "group_of_metricsF": {
                        "metric_one": random.randint(1, 100),
                        "metric_two": random.randint(1, 100),
                        "metric_three": random.randint(1, 100),
                    }
                }
            ]
        }
        response = requests.post(url,
                                 json=random.choice([json_data_small, json_data_big]))
        print("Status code: ", response.status_code)
        time.sleep(3)


if __name__ == '__main__':
    p1 = Process(target=send_data)
    p1.start()
    p2 = Process(target=send_data)
    p2.start()
    p1.join()
    p2.join()
