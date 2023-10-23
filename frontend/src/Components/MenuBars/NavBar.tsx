import "./NavBar.css";

export const NavBar = () : JSX.Element => {
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-12 nav-bar-top">
					<div className="row">
						<div className="offset-8 col-4 d-flex">
							<p className="nav-bar-description">Andre</p>
							<p className="nav-bar-description">Level: 0</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
