import io from "socket.io-client";
const PORT = process.env.PORT || 4000
const URL = process.env.PORT ? "https://spycard-socketserver.herokuapp.com/" : `http://localhost:${PORT}` 

export const socket = io(URL);

