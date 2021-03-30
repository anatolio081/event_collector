import { io, Manager } from "socket.io-client";

export type SocketData = {
    type: string;
    data: any;
};

const manager = new Manager("ws://192.168.88.126:5000", {
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