import axios from "axios";

const api = axios.create({
    baseURL: ProcessingInstruction.env.API_BASE_URL + "api/",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;