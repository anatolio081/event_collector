import { axiosInstance } from "./axios";
import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";

type EventsResposne = {
    id: number
    event_id: string;
    json: string;
    mac_address: string;
    time: any;
}

type EventsItter = {
    id: number
    event_id: string;
    json: string;
    mac_address: string;
    timestamp: any;
}

type EventsQuery = {
    session: number;
}

export class EventModel {
    id: number | string;
    event_id: string;
    json: string;
    mac_address: string;
    time: DateTime;

    constructor(id: number | string, event_id: string, json: string, mac_address: string, time: number) {
        this.id = id;
        this.event_id = event_id;
        this.json = json;
        this.mac_address = mac_address;
        this.time = DateTime.fromMillis(time);
    }

    static fromIter(itter: Array<any>) {
        return itter.map((item: EventsItter) => {
            const { id = uuidv4(), event_id, mac_address, timestamp } = item;
            const json = JSON.stringify(item);
            return new EventModel(id, event_id, json, mac_address, timestamp);
        })
    }

    static async getList(query: EventsQuery): Promise<Array<EventModel>> {
        let data = await axiosInstance.get("/events", {
            params: {
                session: query.session
            }
        })
        return data.data.map((item: EventsResposne) => {
            const { id, event_id, json, mac_address, time } = item;
            return new EventModel(id, event_id, json, mac_address, time);
        })
    }
}