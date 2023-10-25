import useUser from "../../Hooks/useUser";
import "./Profile.css";

export const Profile = () : JSX.Element => {
	const { coalition } = useUser().user;
	return (
		<div className="row">
			<div className="col-12 order-1 order-md-0 col-md-4 m-auto">
				<div className="row">
					<div className="col-12 d-flex flex-column justify-content-center align-items-center">
						<img
							alt="coalition logo"
							src="https://img.icons8.com/?size=160&id=2lvtNFoNbR7b&format=png"
							className="coalition-logo m-auto"
						/>
						<p className="m-auto">{coalition || "coalition name"}</p>
					</div>
				</div>
			</div>
			<div className="col-12 col-md-8 order-0 order-md-1 d-flex align-items-center justify-content-center">
				<img
					alt="profile picture"
					src="https://img.icons8.com/?size=160&id=SHo9iDefm73R&format=png"
					className="dashboard-profile-pic"
				/>
			</div>
		</div>
	);
};
