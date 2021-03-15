import { axiosInstance } from "./axios";
import { DateTime } from "luxon";

type EventsResposne = {
    id: number
    event_id: string;
    json: string;
    mac_address: string;
    time: any;
}

type EventsQuery = {
    session: number;
}

export class EventModel {
    id: number
    event_id: string;
    json: string;
    mac_address: string;
    time: DateTime;

    constructor(id: number, event_id: string, json: string, mac_address: string, time: number) {
        this.id = id;
        this.event_id = event_id;
        this.json = json;
        this.mac_address = mac_address;
        this.time = DateTime.fromMillis(time);
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