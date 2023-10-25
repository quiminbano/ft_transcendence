import { MenuBars } from "../MenuBars/MenuBars";

export const Challenges = () : JSX.Element => {
	return (
		<MenuBars>
			<div className="row">
				<div className="col-4">
					Available Players
				</div>
				<div className="col-8">
					Options
				</div>
			</div>
		</MenuBars>
	);
};
