import { useState } from "react";
import "./Login.css";
import { Container, Form, Button } from "react-bootstrap";

export const Login = () : JSX.Element | null => {
	const [username, setUsername] = useState<string>();
	const handleSignIn = () => {
		console.log(username);
	};
	return (
		<Container className="login-container">
			<div id="login-box">
				<h2>Login to your account</h2>
				<Form>
					<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
						<Form.Label>What is your 42 username?</Form.Label>
						<Form.Control type="text" placeholder="username" onChange={(e)=>setUsername(e.target.value)}/>
						<Button
							onClick={()=>handleSignIn()}
						>Sign in</Button>
					</Form.Group>
				</Form>
			</div>
		</Container>
	);
};