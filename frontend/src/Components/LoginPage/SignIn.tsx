import "./SignIn.css";
import { InfoToSignProps } from "./Login";

export const SignIn = (props: InfoToSignProps) : JSX.Element => {

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
					<SignInInputs isLogin={props.isLogin} setIsLogin={props.setIsLogin}/>
					<SignInButton />
					<ForgotPasssword />
				</div>
				<SwitcherPanel isLogin={props.isLogin} setIsLogin={props.setIsLogin} />
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

const SignInInputs = (props: InfoToSignProps) : JSX.Element => {
	const changeToSignInForm = () => {
		props.setIsLogin(false);
	};
	return (
		<div className="row mt-5">
			<div className="col-12">
				<p>or use your email account</p>
				<div className="input-group mb-3">
					<input type="text" className="form-control" placeholder="Username" />
				</div>
				<div className="input-group mb-3">
					<input type="password" className="form-control" placeholder="Password" />
				</div>
			</div>
		</div>
	);
};

const SignInButton = () : JSX.Element => {
	return (
		<div className="row">
			<div className="col-12">
				<button className="btn btn-success w-100">SIGN IN</button>
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
