import { MenuBars } from "../MenuBars/MenuBars";
import { GameSlider } from "./GameSlider";

export const PlayGround = () : JSX.Element => {
	return (
		<MenuBars>
			<GameSlider />
		</MenuBars>
	);
};
