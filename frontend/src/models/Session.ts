import { axiosInstance } from "./axios";
import { DateTime } from "luxon";

type EventsResposne = {
    id: number
    name: string;
    created_at: any;
}

type SessionQuery = {
}

export class SessionModel {
    id: number
    name: string;
    created_at: DateTime;

    constructor(id: number, name: string, created_at: number) {
        this.id = id;
        this.name = name;
        this.created_at = DateTime.fromMillis(created_at);
    }

    static async getList(query: SessionQuery): Promise<Array<SessionModel>> {
        let data = await axiosInstance.get("/sessions", {})
        return data.data.map((item: EventsResposne) => {
            const { id, name, created_at } = item;
            return new SessionModel(id, name, created_at);
        })
    }
}