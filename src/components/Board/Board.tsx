import React from "react";
import "./Board.scss";
import Cell from "../Cell/Cell";
import BoardClass from "../../models/Board";
interface IBoard {
	board: BoardClass;
	onClick: Function;
	isMain?: boolean;
}
const Board = ({ board, onClick, isMain }: IBoard) => {
	return (
		<div className="board">
			{board.getCells().map(cell => (
				<Cell
					typeOf={"dsf"}
					onClick={() => {
						onClick(cell.x, cell.y);
					}}
				/>
			))}
		</div>
	);
};

export default Board;
