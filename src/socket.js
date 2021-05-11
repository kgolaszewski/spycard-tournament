import io from "socket.io-client";
// const PORT = process.env.PORT || 4000
// const URL = process.env.PORT ? "https://spycard-socketserver.herokuapp.com/" : "http://localhost:4000"
const URL = "https://spycard-socketserver.herokuapp.com/"

export const socket = io(URL);

