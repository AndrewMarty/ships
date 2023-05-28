import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:3000",
	},
});

io.on("connection", socket => {
	socket.on("shoot", data => {
		socket.broadcast.emit("getShoot", data);
	});
	socket.on("newMessage", message => {
		socket.broadcast.emit("getMessage", message);
	});
	socket.on("userJoin", data => {
		console.log(`User: ${data.name} was connected to room: ${data.room}`);
		socket.emit("getOpponent", "Antoska");
	});
	socket.on("message", data => {
		socket.emit("getMessage", data);
	});
});

httpServer.listen(5000, () => {
	console.log("started");
});
