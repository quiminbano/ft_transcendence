import useUser from "../../Hooks/useUser";
import "./NavBar.css";

export const NavBar = () : JSX.Element => {
	const { name } = useUser().user;
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-12 nav-bar-top">
					<div className="row">
						<div className="offset-8 col-4">
							<div className="row">
								<div className="col-4">
									<p className="nav-bar-description">{name || "Unknown"}</p>
								</div>
								<div className="col-8">
									<ExperienceBar />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const ExperienceBar = () : JSX.Element => {
	const { level } = useUser().user;
	return (
		<div className="row">
			<div className="col-1 m-auto">
				<p className="nav-bar-description">{level || 0}</p>
			</div>
			<div className="col-8 m-auto">
				<ProgressBar />
			</div>
		</div>
	);
};

const ProgressBar = () : JSX.Element => {
	const { xp, level } = useUser().user;
	const progress = xp / (5000 * level) * 100;
	console.log(progress);
	return (
		<div className="progress">
			<div
				className="progress-bar progress-bar-striped bg-info"
				role="progressbar"
				style={{ width: progress + "%" }}
				aria-valuenow="25"
				aria-valuemin="0"
				aria-valuemax="100">
			</div>
		</div>
	);
};
