import { MenuBars } from "../MenuBars/MenuBars";
import { Achievements } from "./Achievements";
import { Lastmatches } from "./LastMatches";
import { Profile } from "./Profile";
import { Ratio } from "./Ratio";

export const Dashboard = () : JSX.Element => {
	return (
		<MenuBars >
			<div className="row my-3">
				<div className="col-12 col-md-4 mt-4">
					<Profile />
				</div>
				<div className="col-12 col-md-8 mt-4">
					<Lastmatches />
				</div>
				<div className="col-12 col-md-4 mt-4">
					<Ratio />
				</div>
				<div className="col-12 col-md-8 mt-4">
					<Achievements />
				</div>
			</div>
		</MenuBars>
	);
};
