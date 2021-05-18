import io from "socket.io-client";
// const URL = "http://localhost:4000"
const URL = "https://spycard-socketserver.herokuapp.com/"
const conn_options = {'sync disconnect on unload': true}

export const socket = io(URL, conn_options);

