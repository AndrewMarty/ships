import "./App.scss";
import Board from "./components/Board/Board";
import BoardClass from "./models/Board";
import React, { useEffect, useState } from "react";
import Ship from "./models/Ship";
import io, { Socket } from "socket.io-client";
interface IMark {
	x: number;
	y: number;
}
const App = () => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [name, setName] = useState("Andrew");
	const [opponent, setOpponent] = useState<string | null>(null);
	const [mainBoard, setMainBoard] = useState(new BoardClass());
	const [secondBoard, setSecondBoard] = useState(new BoardClass());
	const [ships, setShips] = useState<Ship[]>([]);
	const [isShipsReady, setShipsReady] = useState(false);
	const [oponentMarks, setOponentMarks] = useState<IMark[]>([]);
	const [move, setMove] = useState(false);
	const [messages, setMessages] = useState<string[]>([]);
	const [value, setValue] = useState<string>("");
	function setShip(x: number, y: number) {
		if (ships.length < 20 && !isShipsReady) {
			setShips(prev => [...prev, new Ship(x, y)]);
			return true;
		} else {
			setShipsReady(true);
			return false;
		}
	}
	function shoot(x: number, y: number) {
		move && socket?.emit("shoot", { x, y });
		setMove(false);
		return move;
	}
	function sendMessage() {
		socket?.emit("newMessage", value);
		setMessages(prev => [...prev, value]);
		setValue("");
	}
	const formHandler = (e: any) => {
		e.preventDefault();
		sendMessage();
	};
	const inputHandler = (e: any) => {
		setValue(e.target.value);
	};
	function initSocket() {
		const socket = io("http://localhost:5000");
		setSocket(socket);
		socket?.on("getShoot", ({ x, y }: IMark) => {
			const element = ships.find(ship => {
				return ship.x === x && ship.y === y;
			});
			if (element !== undefined) {
				alert("was!");
			}
			setOponentMarks(prev => [...prev, { x, y }]);
		});
		socket?.on("getMessage", message => {
			setMessages(prev => [...prev, message]);
		});
		socket?.emit("userJoin", { name, room: window.location.pathname });
	}
	useEffect(() => {
		initSocket();
	}, []);
	return (
		<div className="App">
			<div className="App__wrapper">
				<h1 className="App__title">Game Battle of ships</h1>
				<div className="App__boards">
					<div>
						Your board:{name}
						<Board
							typeOf={"set"}
							board={mainBoard}
							onClick={setShip}
							oponentMarks={oponentMarks}
						/>
						<button className="App__button_ready">I am ready</button>
					</div>
					<div>
						Enemy board:{opponent}
						<Board typeOf={"damage"} board={secondBoard} onClick={shoot} />
					</div>
				</div>
				<div>Chat:</div>
				<form onSubmit={formHandler}>
					<input onChange={inputHandler} type="text" value={value} />
					<button>Send</button>
				</form>
				<ul>
					{messages.map(message => {
						return <li>{message}</li>;
					})}
				</ul>
			</div>
		</div>
	);
};

export default App;
