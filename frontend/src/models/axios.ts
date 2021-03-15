import axios from "axios";

let baseUrl = ""
if (import.meta.env.MODE == "development") {
    baseUrl = "http://localhost:5000";
}

export const axiosInstance = axios.create({
    baseURL: `${baseUrl}/api/`,
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
    }
});