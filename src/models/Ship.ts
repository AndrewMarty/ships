import Cell from "./Cell";
export default class Ship {
	cells: Cell[];
	maxCells: number;
	constructor(x: number, y: number, maxCells = 1) {
		this.cells = [new Cell(x, y)];
		this.maxCells = maxCells;
	}
	addCell(x: number, y: number) {
		if (this.cells.length < this.maxCells) {
			this.cells.push(new Cell(x, y));
		}
	}
}
