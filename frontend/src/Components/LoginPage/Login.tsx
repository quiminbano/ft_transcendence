import { useState } from "react";
import "./Login.css";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../Loading";

interface loginFormProps  {
	setUsername: (value: string) => void;
	username: string;
	setIsLoading: (valie: boolean) => void;
	isLoading: boolean;
}
interface loginErrorProps {
	message: string;
	showError: boolean;
}

export const Login = () : JSX.Element | null => {
	const [username, setUsername] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	return (
		<>
			<div className="signIn-signUp-pages">
				<Container className="login-container">
					<div className="signIn-signUp-box">
						<h2 id="login-title">Login to your account</h2>
						<LoginForm setUsername={setUsername} username={username}
							isLoading={isLoading} setIsLoading={setIsLoading}
						/>
						<NoAccountArea />
					</div>
				</Container>
			</div>
			{isLoading && <Loading type="border" variant="info" message=""/>}
		</>
	);
};

const LoginForm = (props: loginFormProps) : JSX.Element | null => {
	const [errorMessage, setErrorMessage] = useState("Something happened! Please try again");
	const [showError, setShowError] = useState(false);
	const navigate = useNavigate();

	const handleSignIn = () => {
		if (props.username.length < 1) {
			setErrorMessage("Empty username not accepted");
			setShowError(true);
			return;
		}
		console.log(props.username);
		props.setUsername("");
		if (showError && props.username.length > 0)
			setShowError(false);
		props.setIsLoading(true);
		// TODO: handle Login request here. Use errorMessage state to inform user of what happened
	};
	const handleCancelLogin = () => {
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
						props.setUsername(e.target.value)}
					value={props.username}
				/>
				<ErrorMessage message={errorMessage} showError={showError}/>
				<Button
					className="login-buttons"
					onClick={()=>handleSignIn()}
				>Sign in</Button>
				<Button
					className="login-buttons"
					variant="danger"
					onClick={()=>handleCancelLogin()}
				>Cancel</Button>
			</Form.Group>
		</Form>
	);
};

const NoAccountArea = () : JSX.Element => {
	return (
		<Row>
			<Col>
				<Link to="/signup">Don&rsquo;t have an account?</Link>
			</Col>
			<Col>
				<a href="#">Forgot your password?</a>
			</Col>
		</Row>
	);
};

const ErrorMessage = (props: loginErrorProps) : JSX.Element | null => {

	if (props.showError) {
		return (
			<p id="login-error">{props.message}</p>
		);
	}
};
