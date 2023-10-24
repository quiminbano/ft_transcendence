import { MenuBars } from "../MenuBars/MenuBars";
import { GameSlider } from "./GameSlider";
import "./PlayGround.css";

export const PlayGround = () : JSX.Element => {
	return (
		<MenuBars>
			<div className="row">
				<div className="col-12 playground-page">
					<GameSlider />
				</div>
			</div>
		</MenuBars>
	);
};
