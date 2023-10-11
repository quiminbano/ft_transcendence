import { useState } from "react";
import "./Login.css";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

interface loginFormProps  {
	setUsername: (value: string) => void;
	username: string
}

export const Login = () : JSX.Element | null => {
	const [username, setUsername] = useState("");
	return (
		<Container className="login-container">
			<div id="login-box">
				<h2 id="login-title">Login to your account</h2>
				<LoginForm setUsername={setUsername} username={username} />
				<NoAccountArea />
			</div>
		</Container>
	);
};

const LoginForm = (props: loginFormProps) => {
	const handleSignIn = () => {
		console.log(props.username);
		props.setUsername("");
	};
	return (
		<Form>
			<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
				<Form.Label id="login-form-label">What is your 42 username?</Form.Label>
				<Form.Control type="text" placeholder="your 42 username" onChange={(e)=>props.setUsername(e.target.value)} value={props.username}/>
				<Button
					id="login-button"
					onClick={()=>handleSignIn()}
				>Sign in</Button>
			</Form.Group>
		</Form>
	);
};

const NoAccountArea = () : JSX.Element => {
	return (
		<Row>
			<Col>
				<Link to="/registration">Don&rsquo;t have an account?</Link>
			</Col>
			<Col>
				<a href="#">Forgot your password?</a>
			</Col>
		</Row>
	);
};