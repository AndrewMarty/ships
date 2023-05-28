import React, { MouseEventHandler, useEffect, useState } from "react";
import "./Cell.scss";
import clsx from "clsx";
interface ICell {
	position: {
		x: number;
		y: number;
	};
	onClick: Function;
	typeOf: string;
	was?: boolean;
}
const Cell = ({ onClick, typeOf, position, was }: ICell) => {
	const [damage, setDamage] = useState(false);
	const [isShip, setShip] = useState(false);
	const clickHandler = (e: any) => {
		switch (typeOf) {
			case "set":
				!isShip && setShip(onClick(position.x, position.y));
				break;
			case "damage":
				!damage && setDamage(onClick(position.x, position.y));
				break;
		}
	};
	return (
		<div
			className={clsx("cell", {
				["cell_shoot"]: damage,
				["cell_ship"]: isShip,
				["cell_was"]: was,
			})}
			onClick={clickHandler}
		/>
	);
};

export default Cell;
