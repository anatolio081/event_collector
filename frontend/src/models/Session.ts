import { axiosInstance } from "./axios";
import { DateTime } from "luxon";
import { AxiosResponse } from "axios";

type SessionResposne = {
    id: number
    name: string;
    created_at: any;
    events: number;
}

type SessionQuery = {
}

export class SessionModel {
    id: number
    name: string;
    created_at: DateTime;
    events: number;

    constructor(id: number, name: string, created_at: number, events: number) {
        this.id = id;
        this.name = name;
        this.events = events;
        this.created_at = DateTime.fromMillis(created_at);
    }

    static async getList(query: SessionQuery): Promise<Array<SessionModel>> {
        let data = await axiosInstance.get("/sessions", {})
        return data.data.map((item: SessionResposne) => {
            const { id, name, created_at, events } = item;
            return new SessionModel(id, name, created_at, events);
        })
    }

    static async createNew(name = "manual_front"): Promise<SessionResposne> {
        let data: AxiosResponse<SessionResposne> = await axiosInstance.post("/newsession", {
            session_name: name
        })
        return data.data;
    }

    static async delete(id: number) {
        let data = await axiosInstance.delete(`/sessions/${id}`);
    }
}