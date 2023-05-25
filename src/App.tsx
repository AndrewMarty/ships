import "./App.scss";
import Board from "./components/Board/Board";
import BoardClass from "./models/Board";
import React, { useEffect, useState } from "react";
import Ship from "./models/Ship";
import { io } from "socket.io-client";
// const socket = io.connect("http://localhost:5000");

const App = () => {
	const [mainBoard, setMainBoard] = useState(new BoardClass());
	const [secondBoard, setSecondBoard] = useState(new BoardClass());
	const [ships, setShips] = useState([]);
	const [isShipsReady, setShipsReady] = useState(false);
	const [messages, setMessages] = useState([]);
	const [value, setValue] = useState("");

	function createShip(x: number, y: number) {
		if (ships.length < 5 && !isShipsReady) {
		} else {
			setShipsReady(true);
		}
	}

	function shoot(x: number, y: number) {
		isShipsReady && console.log("was shoot on: " + x + " " + y);
	}
	// useEffect(() => {
	// 	console.log("ws");
	// 	socket.emit("userJoin", { name: "Andrew", room: window.location.pathname });
	// 	socket.on("getMessage", data => {
	// 		setMessages(prev => [...prev, data.message]);
	// 	});
	// }, []);
	return (
		<div className="App">
			<h1>Game Battle of ships</h1>
			<div className="App__boards">
				<div>
					Your board:
					<Board isMain board={mainBoard} onClick={createShip} />
				</div>
				<div>
					Enemy board:
					<Board board={secondBoard} onClick={shoot} />
				</div>
			</div>
		</div>
	);
};

export default App;
