import io from "socket.io-client";
const PORT = process.env.PORT || 4000
const URL = process.env.NODE_ENV !== "production" ? 
    `http://localhost:${PORT}` 
        : 
    `https://spycard-socketserver.herokuapp.com:${PORT}`

export const socket = io(URL);