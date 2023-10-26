import { useNavigate } from "react-router-dom";
import "./Homepage.css";

export const Homepage = () => {
	const navigate = useNavigate();
	const goToRegistrationPage = () => {
		navigate("/login");
	};
	return (
		<div className="container-fluid" id="homepage-container">
			<div className="row" id="homepage-info-area">
				<div className="row" id="homepage-info-title">
					<div className="col" >
						<h1 id="homepage-title">Ft-transcendence</h1>
						<p id="homepage-subtitle">Your 42 pong game</p>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<button
							onClick={() => goToRegistrationPage()}
							id="homepage-button"
							className="btn btn-outline-success"
						>Play now</button>
					</div>
				</div>
			</div>
		</div>
	);
};
