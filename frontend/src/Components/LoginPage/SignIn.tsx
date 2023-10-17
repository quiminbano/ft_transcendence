import "./SignIn.css";
import { useState } from "react";
import { InfoToSignProps } from "./Login";

interface SignInProps {
	setUsername: (value: string) => void;
	setPassword: (value: string) => void;
}
interface SignInDataProps {
	signIn: () => void;
}
export const SignIn = (props: InfoToSignProps) : JSX.Element => {

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const signIn = () => {
		const data = {
			username,
			password
		};
		console.log(data);
		if (username.length > 0 && password.length > 0)
			props.setIsLoading(true);
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-12">
					<h2>Sign in to Ft-Transcendence</h2>
				</div>
			</div>
			<div className="row mt-5">
				<ButtonFor42Register />
				<div className="col-12 col-md-8 offset-md-2">
					<SignInInputs setUsername={setUsername} setPassword={setPassword}/>
					<SignInButton signIn={signIn}/>
					<ForgotPasssword />
				</div>
				<SwitcherPanel isLogin={props.isLogin} setIsLogin={props.setIsLogin}
					isLoading={props.isLoading} setIsLoading={props.setIsLoading}/>
			</div>
		</div>
	);
};

export const ButtonFor42Register = () : JSX.Element => {
	return (
		<div className="col-12">
			<div className="row">
				<div className="col-12 col-md-8 offset-md-2">
					<button className="btn btn-outline-secondary w-100">
						<img alt="42 school logo" id="logo-42-school" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/800px-42_Logo.svg.png"></img>
					</button>
				</div>
			</div>
		</div>
	);
};

const SignInInputs = (props: SignInProps) : JSX.Element => {
	const changeUsername = (e :React.FormEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value;
		console.log(value);
		props.setUsername(value);
	};
	const changePassword = (e :React.FormEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value;
		console.log(value);
		props.setPassword(value);
	};
	return (
		<div className="row mt-5">
			<div className="col-12">
				<p>or use your email account</p>
				<div className="input-group mb-3">
					<input type="text" className="form-control" placeholder="Username" onChange={e => changeUsername(e)}/>
				</div>
				<div className="input-group mb-3">
					<input type="password" className="form-control" placeholder="Password" onChange={e => changePassword(e)}/>
				</div>
			</div>
		</div>
	);
};

const SignInButton = (props: SignInDataProps) : JSX.Element => {
	return (
		<div className="row">
			<div className="col-12">
				<button className="btn btn-success w-100" onClick={() => props.signIn()}>SIGN IN</button>
			</div>
		</div>
	);
};

const ForgotPasssword = () : JSX.Element => {
	return (
		<div className="row mt-3">
			<div className="col-12">
				<button className="btn btn-link">Forgot your password?</button>
			</div>
		</div>
	);
};

const SwitcherPanel = (props: InfoToSignProps) : JSX.Element => {
	return (
		<div className="row only-phone mt-4">
			<div className="col-8 offset-2">
				<button
					onClick={()=>props.setIsLogin(false)}
					className="btn btn-secondary w-100">Not registered? Sign up here
				</button>
			</div>
		</div>
	);
};
