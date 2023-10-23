import { MenuBars } from "../MenuBars/MenuBars";
import { GameSlider } from "./GameSlider";
import "./PlayGround.css";

export const PlayGround = () : JSX.Element => {
	return (
		<MenuBars>
			<GameSlider />
		</MenuBars>
	);
};
