import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:3000",
	},
});

io.on("connection", socket => {
	let room;
	socket.on("userJoin", data => {
		room = data.room;
		socket.join(data.room);
		console.log(`User: ${data.name} was connected to room: ${data.room}`);
	});
	socket.on("message", data => {
		socket.broadcast.to(room).emit("getMessage", data);
	});
});

httpServer.listen(5000, () => {
	console.log("started");
});
