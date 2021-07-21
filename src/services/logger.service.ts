import axios from "axios";
export default class LoggerService{
    static async log(level: string, message: string) {
        const res = await axios.post('https://localhost:6001/api/log', {
            params: {level, message},
        })
    }
}

export enum LogLevel {
    INFO = "info",
    ERROR = "error",
    DEBUG = "debug",
    WARN = "warning"
}

module.exports = LoggerService;
