import { useState } from "react";
import { Button, Container, Row, Form } from "react-bootstrap";
import "./registrationPage.css";
import { useNavigate } from "react-router-dom";

interface profileDataProps {
	setUsername: (value: string) => void;
}

interface signUpErrorProps {
	message: string;
	showError: boolean;
}

export const RegistrationPage = () => {
	const [username, setUsername] = useState("");
	return (
		<div className="signIn-signUp-pages">
			<Container className="login-container">
				<Row className="signIn-signUp-box">
					<TitleArea />
					<ProfileDataFrom42 setUsername={setUsername} />
				</Row>
			</Container>
		</div>
	);
};

const TitleArea = () => {
	return (
		<div className="signup-title-area">
			<h2>Create your profile</h2>
			<p>Let us know who you are</p>
		</div>
	);
};

const ProfileDataFrom42 = (props: profileDataProps) => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [showError, setShowError] = useState(false);
	const [message, setMessage] = useState("invalid login");

	const handleConfirmation = () => {
		console.log(username);
		setUsername("");
		if (username.length < 1) {
			setMessage("Empty username is not valid!");
			setShowError(true);
		}
		if (username.length > 1 && showError)
			setShowError(false);

		//TODO: handle proper registration here!!!
	};
	const handleCancelSignUp = () => {
		navigate("/");
	};

	return (
		<Form id="login-form">
			<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
				<Form.Label id="login-form-label">What is your 42 username?</Form.Label>
				<Form.Control
					type="text"
					placeholder="your 42 username"
					onChange={(e: React.FormEvent<HTMLInputElement>)=>
						setUsername(e.target.value)}
					value={username}
				/>
				<ErrorMessage showError={showError} message={message} />
				<Button
					className="login-buttons"
					variant="success"
					onClick={()=>handleConfirmation()}
				>Confirm</Button>
				<Button
					className="login-buttons"
					variant="danger"
					onClick={()=>handleCancelSignUp()}
				>Cancel</Button>
			</Form.Group>
		</Form>
	);
};

const ErrorMessage = (props: signUpErrorProps) : JSX.Element | null => {

	if (props.showError) {
		return (
			<p id="login-error">{props.message}</p>
		);
	}
};
