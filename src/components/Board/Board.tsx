import React from "react";
import "./Board.scss";
import Cell from "../Cell/Cell";
import BoardClass from "../../models/Board";
import CellClass from "../../models/Cell";
interface IBoard {
	board: BoardClass;
	onClick: Function;
	typeOf: string;
	oponentMarks?: IMark[];
}
interface IMark {
	x: number;
	y: number;
}
const Board = ({ board, onClick, typeOf, oponentMarks }: IBoard) => {
	function findCell(cell: CellClass): boolean {
		const element = oponentMarks?.find(mark => {
			return mark.x === cell.x && mark.y === cell.y;
		});
		return element !== undefined;
	}
	return (
		<div className="board">
			{board.getCells().map((cell, index) => (
				<Cell
					key={index}
					position={{ x: cell.x, y: cell.y }}
					typeOf={typeOf}
					onClick={onClick}
					was={findCell(cell)}
				/>
			))}
		</div>
	);
};

export default Board;
