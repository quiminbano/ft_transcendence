import { InfoToSignProps } from "./Login";

export const SignIn = (props: InfoToSignProps) : JSX.Element => {
	const changeToSignInForm = () => {
		props.setIsLogin(false);
	};
	return (
		<div className="row d-flex align-items-center justify-content-center mt-5 mb-5">
			<div className="col-10 offset-1 form-area d-flex flex-column align-items-center justify-content-center">
				<div className="row login-form-title">
					<h2 className="col-12 ">Sign in to Ft-Transcendence</h2>
				</div>
				<div className="row">
					<form className="col-10 offset-1">
						<div className="row mt-4">
							<input
								className="col-10 my-0.2 my-md-1 form-control"
								placeholder="Username"
								type="text"
							/>
							<input
								className="col-10 my-1 form-control"
								placeholder="Password"
								type="password"
							/>
						</div>
						<div className="row mt-0.5 mt-md-3">
							<div className="col-12 col-md-8 offset-md-2">
								<a href="#">Forgot your password?</a>
								<button className="mt-4 btn btn-success w-100">SIGN IN</button>
							</div>
						</div>
						<div className="col-10 offset-1 mt-3">
							<div className="col-8 offset-2">
								<p className="mb-0">or</p>
								<button className="btn btn-info w-100">Sign with 42</button>
							</div>
						</div>
						<div className="small-screen-change-register row mt-4 mb-1">
							<div className="col-12">
								<button onClick={()=>changeToSignInForm()} className="btn btn-secondary">No account? Register here</button>
							</div>
						</div>
					</form>
				</div>
			</div>

		</div>
	);
};
