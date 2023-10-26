import { NavBar } from "./NavBar";
import { SideBar } from "./SideBar";

interface MenuBarsProp {
	children: JSX.Element | JSX.Element[];
}

export const MenuBars = ({ children } : MenuBarsProp) : JSX.Element => {
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-12 g-0">
					<NavBar />
					<SideBar />
					<div className="children-area">
						{children}
					</div>
				</div>
			</div>
			{/* <div className="row">
				<div className="col-2 col-sm-1">
					<SideBar />
				</div>
				<div className="col-10 col-sm-11">
					<div className="row">
						<div className="col-12">
							<div className="row">
								<div className="col-12 children-area">
									{children}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div> */}
		</div>
	);
};
