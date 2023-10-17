import { InfoToSignProps } from "./Login";
import { ButtonFor42Register } from "./SignIn";

export const SignUp = (props: InfoToSignProps) : JSX.Element => {

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
						<SignUpForm isLogin={props.isLogin} setIsLogin={props.setIsLogin}
							isLoading={props.isLoading} setIsLoading={props.setIsLoading}/>
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

const SignUpForm = (props: InfoToSignProps) : JSX.Element => {
	return (
		<>
			<div className="row">
				<div className="col-12 col-md-10 offset-md-1 my-1">
					<input
						className=" form-control form-control"
						placeholder="Username"
						type="text"
					/>
				</div>
				<div className="col-12 col-md-10 offset-md-1 my-1">
					<input
						className="form-control form-control"
						placeholder="Email"
						type="email"
					/>
				</div>
				<div className="col-12 col-md-10 offset-md-1 my-1">
					<input
						className="form-control form-control"
						placeholder="Password"
						type="password"
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-12 col-md-10 offset-md-1">
					<button className="mt-4 btn btn-success w-100">SIGN UP</button>
				</div>
			</div>
			<div className="row">
				<AlreadyRegistered isLogin={props.isLogin} setIsLogin={props.setIsLogin}
					isLoading={props.isLoading} setIsLoading={props.setIsLoading}/>
			</div>
		</>
	);
};

const AlreadyRegistered = (props: InfoToSignProps) : JSX.Element => {
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
