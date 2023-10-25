import { MenuBars } from "../MenuBars/MenuBars";
import { PickAGame } from "./PickAGame";

export const Challenges = () : JSX.Element => {
	return (
		<MenuBars>
			<div className="row">
				<div className="col-md-4">
					Available Players
				</div>
				<div className="col-md-8">
					<div className="row">
						<div className="col-12">
							<PickAGame />
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							General Rules
						</div>
					</div>
				</div>
			</div>
		</MenuBars>
	);
};
