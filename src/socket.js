import io from "socket.io-client";
const PORT = process.env.PORT || 4000
// const PORT = 4000

export const socket = io(`http://localhost:${PORT}`);