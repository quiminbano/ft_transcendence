import { useState } from "react";
import "./Login.css";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../Loading";
import { TwoFactorAuth } from "./TwoFactorAuth";
import { LoginButton } from "./LoginButton";

interface loginFormProps  {
	setIsLoading: (valie: boolean) => void;
	isLoading: boolean;
	setLoginState: (value: LoginState) => void;
}

export enum LoginState {
	Unidentified,
	Identified,
	SignedUp
}
export const Login = () : JSX.Element | null => {
	const [isLoading, setIsLoading] = useState(false);
	const [loginState, setLoginState] = useState<LoginState>(LoginState.Unidentified);

	return (
		<Container fluid className="signIn-signUp-pages">
			{isLoading && <Loading type="border" variant="info" message=""/>}
			<Row className="signIn-signUp-box">
				<Col xs={{ offset: 1, order: 0, span:10 }} >
					<Row>
						<Col xs={{ offset: 0, order: 0, span:12 }}>
							<h2 id="login-title">Login to your account</h2>
						</Col>
					</Row>
					<Row>
						{loginState === LoginState.Unidentified &&
							<LoginForm
								isLoading={isLoading}
								setIsLoading={setIsLoading}
								setLoginState={setLoginState}
							/>}
						{loginState === LoginState.Identified &&
							<TwoFactorAuth setIsLoading={setIsLoading} setLoginState={setLoginState} />}
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

const LoginForm = (props: loginFormProps) : JSX.Element | null => {
	const navigate = useNavigate();

	const userWasFound = () => {
		props.setIsLoading(true);
		setTimeout(()=>{ //REMOVE THIS TIME OUT!!! IS JUST FOR TESTING!!!!!!!!
			props.setLoginState(LoginState.Identified);
			props.setIsLoading(false);
		},2000);
	};
	const handleSignIn = () => {
		userWasFound();
		// TODO: handle Login request here.
		// Use errorMessage state to inform user of what happened
	};
	const handleCancelLogin = () => {
		navigate("/");
	};
	const buttonsInfo =[
		{
			func: handleSignIn,
			offset: 0,
			order: 0,
			span: 12,
			variant: "primary",
			message: "Sign in with 42"
		},
		{
			func: handleCancelLogin,
			offset: 0,
			order: 0,
			span: 12,
			variant: "danger",
			message: "Sign in with 42"
		},
	];
	return (
		<>
			{
				buttonsInfo.map((btn, i) =>
					<LoginButton
						func={btn.func}
						offset={btn.offset}
						order={btn.order}
						span={btn.span}
						variant={btn.variant}
						message={btn.message}
						key={i}
					/>
				)
			}
		</>
	);
};
