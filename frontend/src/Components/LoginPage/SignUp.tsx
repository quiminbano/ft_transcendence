import { useState } from "react";
import { InfoToSignProps } from "./Login";
import { ButtonFor42Register } from "./SignIn";

interface SignUpFormProps {
	setUsername: (value: string) => void;
	setEmail: (value: string) => void;
	setPassword: (value: string) => void;
}

interface SignUpDataProps {
	username: string,
	email: string,
	password: string
	setLoading: (value: boolean) => void;
}

export const SignUp = (props: InfoToSignProps) : JSX.Element => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className="container-fluid">
			<SignUpTitle />
			<div className="row my-4">
				<div className="col-12 col-md-10 offset-md-1">
					<p>Register with</p>
					<ButtonFor42Register />
				</div>
			</div>
			<div className="col-12 col-md-10 offset-md-1 d-flex align-items-center justify-content-center">
				<div className="row">
					<div className="col-12 col-md-10 offset-md-1">
						<p>or</p>
						<SignUpForm setUsername={setUsername} setEmail={setEmail} setPassword={setPassword}/>
						<SignUpButton username={username} email={email}
							password={password} setLoading={props.setIsLoading}/>
						<div className="row">
							<AlreadyRegistered isLogin={props.isLogin} setIsLogin={props.setIsLogin}
								isLoading={props.isLoading} setIsLoading={props.setIsLoading}/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const SignUpTitle = () : JSX.Element => {
	return (
		<div className="row">
			<div className="col-12 mb-3">
				<h2>Create account</h2>
			</div>
		</div>
	);
};

const SignUpForm = (props: SignUpFormProps) : JSX.Element => {
	const changeUsername = (e :React.FormEvent<HTMLInputElement>) : void => {
		const value = e.currentTarget.value;
		props.setUsername(value);
	};
	const changePassword = (e :React.FormEvent<HTMLInputElement>) : void => {
		const value = e.currentTarget.value;
		props.setPassword(value);
	};
	const changeEmail = (e :React.FormEvent<HTMLInputElement>) : void => {
		const value = e.currentTarget.value;
		props.setEmail(value);
	};
	return (
		<>
			<div className="row">
				<div className="col-12 col-md-10 offset-md-1 my-1">
					<input
						className="form-control"
						placeholder="Username"
						type="text"
						onChange={e => changeUsername(e)}
					/>
				</div>
				<div className="col-12 col-md-10 offset-md-1 my-1">
					<input
						className="form-control"
						placeholder="Email"
						type="email"
						onChange={e => changeEmail(e)}
					/>
				</div>
				<div className="col-12 col-md-10 offset-md-1 my-1">
					<input
						className="form-control"
						placeholder="Password"
						type="password"
						onChange={e => changePassword(e)}
					/>
				</div>
			</div>
		</>
	);
};

const SignUpButton = (props: SignUpDataProps) : JSX.Element | null => {
	const isDataValid = () : boolean => {
		if (props.username.length === 0) {
			return false;
		}
		
		if (props.email.length < 5) {
			return false;
		}
		if (props.email.split("").filter(x => x === "@").length !== 1) {
			return false;
		}
		if (props.email.indexOf(".") === -1) {
			return false;
		}
		if (props.password.length < 6) {
			return false;
		}
		return true;
	};
	const signUp = () : void => {
		if (!isDataValid()) return;
		const data = {
			username: props.username,
			email: props.email,
			password: props.password
		};
		console.log(data);
		props.setLoading(true);
	};
	return (
		<div className="row">
			<div className="col-12 col-md-10 offset-md-1">
				<button
					onClick={() => signUp()}
					className="mt-4 btn btn-success w-100">SIGN UP</button>
			</div>
		</div>
	);
};

const AlreadyRegistered = (props: InfoToSignProps) : JSX.Element | null => {
	const changeToSignInForm = () => {
		props.setIsLogin(true);
	};
	return (
		<div className="only-phone col-12">
			<button
				onClick={()=>changeToSignInForm()}
				className="mt-4 btn btn-secondary w-80">Already registered? Login here</button>
		</div>
	);
};
