import { useNavigate } from "react-router-dom";
import "./Homepage.css";

export const Homepage = () => {
	const navigate = useNavigate();
	const goToRegistrationPage = () => {
		navigate("/registration");
	};
	return (
		<div>
			<h1>Ft-transcendence</h1>
			<p>André - Carlos - Hans - João - Lucas</p>
			<button onClick={() => goToRegistrationPage()}>Register</button>
		</div>
	);
};
