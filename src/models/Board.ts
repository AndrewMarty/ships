import Cell from "./Cell";
export default class Board {
	rows: number;
	columns: number;
	cells: Cell[];
	constructor(rows = 10, columns = 10) {
		this.rows = rows;
		this.columns = columns;
		this.cells = [];
		for (let x = 0; x < rows; x++) {
			for (let y = 0; y < columns; y++) {
				this.cells.push(new Cell(x, y));
			}
		}
	}
	getCells() {
		return this.cells;
	}
}
