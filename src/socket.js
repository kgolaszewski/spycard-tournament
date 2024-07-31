import io from "socket.io-client";

const URL = process.env.NODE_ENV === "development" ? "http://localhost:4000" : "https://spycard-socketserver-5defacb83c63.herokuapp.com/"
const conn_options = {'sync disconnect on unload': true}

export const socket = io(URL, conn_options);

