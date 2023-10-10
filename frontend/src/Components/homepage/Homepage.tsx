import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import { Button, Container, Col, Row } from "react-bootstrap";

export const Homepage = () => {
	const navigate = useNavigate();
	const goToRegistrationPage = () => {
		navigate("/login");
	};
	return (
		<Container id="homepage-container" fluid>
			<Row id="homepage-info-area">
				<Row id="homepage-info-title">
					<Col >
						<h1 id="homepage-title">Ft-transcendence</h1>
						<p id="homepage-subtitle">Your 42 pong game</p>
					</Col>
				</Row>
				<Row>
					<Col>
						<Button onClick={() => goToRegistrationPage()} variant="outline-success" id="homepage-button">Play now</Button>
					</Col>
				</Row>
			</Row>
		</Container>
	);
};
