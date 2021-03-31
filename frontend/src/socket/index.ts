import { io, Manager } from "socket.io-client";

export type SocketData = {
    type: string;
    data: any;
};

let baseUrl = ""
if (import.meta.env.MODE == "development") {
    baseUrl = "ws://localhost:5000";
}

const manager = new Manager(baseUrl, {
    reconnectionDelayMax: 10000,
    reconnection: true,
    query: {
        "my-key": "my-value"
    },
    transports: ['polling'],
    autoConnect: false,
});
/*
const socket = io("", {
    //reconnectionDelayMax: 10000,
    //extraHeaders: {
    //    "Access-Control-Allow-Origin": "*",
    //},
    //transports: ["polling", "websocket"],
});
*/
const socket = manager.socket("/");

export default socket