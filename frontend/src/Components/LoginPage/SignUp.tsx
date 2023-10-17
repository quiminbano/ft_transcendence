import { InfoToSignProps } from "./Login";

export const SignUp = (props: InfoToSignProps) : JSX.Element => {
	const changeToSignInForm = () => {
		props.setIsLogin(true);
	};
	return (
		<div className="row d-flex align-items-center justify-content-center">
			<div className="col-12 mb-3">
				<h2>Create account</h2>
			</div>
			<div className="col-10 offset-1 d-flex align-items-center justify-content-center">
				<div className="row">
					<div className="col-10 offset-1">
						<form>
							<div className="row">
								<div className="col-10 offset-1 my-1">
									<input
										className=" form-control form-control"
										placeholder="Username"
										type="text"
									/>
								</div>
								<div className="col-10 offset-1 my-1">
									<input
										className="form-control form-control"
										placeholder="Email"
										type="email"
									/>
								</div>
								<div className="col-10 offset-1 my-1">
									<input
										className="form-control form-control"
										placeholder="Password"
										type="password"
									/>
								</div>
							</div>
							<div className="row">
								<div className="col-10 offset-1">
									<button className="mt-4 btn btn-success w-100">SIGN UP</button>
								</div>
							</div>
							<div className="small-screen-change-register row">
								<button onClick={()=>changeToSignInForm()} className="mt-4 btn btn-secondary w-80">Already registered? Login here</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
