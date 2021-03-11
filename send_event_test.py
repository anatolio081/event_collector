import requests
import time
import random

url = "http://192.168.88.126:8081/event_collector"
dev_types = ["STB", "IPAD", "linux", "MAC"]
event_ids = ["watching_cats", "watching_porn", "watching_metal_concert"]
mac_adresses=["aa:bb:aa:f0:d4:34","bb:4c:4d:f0:d4:34","cc:4c:4d:f0:d4:34","dd:4c:4d:f0:d4:34"]
for i in range(0, 100):
    json_data = {'events':
        [
            {
                "device_type": random.choice(dev_types),
                "event_counter": i,
                "event_id": random.choice(event_ids),
                "event_version": 1,
                "mac_address": random.choice(mac_adresses),
                "timestamp": time.time(),
                "group_of_metrics": {
                    "metric_one": random.randint(1, 100),
                    "metric_two": random.randint(1, 100),
                    "metric_three": random.randint(1, 100),
                }
            }
        ]
    }
    response = requests.post(url, json=json_data)
    print("Status code: ", response.status_code)
    time.sleep(1)
