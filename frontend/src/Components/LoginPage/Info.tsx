import { InfoToSignProps } from "./Login";

export const InfoToSign = (props: InfoToSignProps) :JSX.Element => {
	if (props.isLogin)
		return <StillHasNoAccount isLogin={props.isLogin} setIsLogin={props.setIsLogin}/>;
	else
		return <AlreadyAsAccount isLogin={props.isLogin} setIsLogin={props.setIsLogin}/>;
};

const StillHasNoAccount = (props: InfoToSignProps) : JSX.Element => {
	const changeToSignInForm = () => {
		props.setIsLogin(false);
	};
	return (
		<div className="row">
			<div className="p-3 col-12 d-flex flex-column align-items-center justify-content-center">
				<h2>New here?</h2>
				<p>Sign up, test your skills and challenge your friends</p>
				<button
					onClick={()=>changeToSignInForm()}
					className="btn btn-primary w-100 my-5">SIGN UP</button>
			</div>
		</div>
	);
};

const AlreadyAsAccount = (props: InfoToSignProps) : JSX.Element => {

	const changeToSignInForm = () => {
		props.setIsLogin(true);
	};
	return (
		<div className="row">
			<div className="p-3 col-12 d-flex flex-column align-items-center justify-content-center">
				<h2>Already have an account?</h2>
				<p>Do not waste time and login right now to play with your friends</p>
				<button
					onClick={()=>changeToSignInForm()}
					className="btn btn-primary w-100 my-5">SIGN IN</button>
			</div>
		</div>
	);
};
