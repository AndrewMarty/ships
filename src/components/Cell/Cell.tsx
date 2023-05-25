import React, { useState } from "react";
import "./Cell.scss";
import clsx from "clsx";
interface ICell {
	onClick: Function;
	typeOf: string;
}
const Cell = ({ onClick, typeOf }: ICell) => {
	const [damage, setDamage] = useState(false);
	const [isShip, setShip] = useState(false);
	return (
		<div
			className={clsx("cell", {
				["cell_shoot"]: damage,
				["cell_ship"]: isShip,
			})}
			onClick={() => {
				if (typeOf) {
					console.log("");
					setShip(true);
				} else {
					setDamage(true);
				}
				onClick();
			}}
		></div>
	);
};

export default Cell;
