import { AuthProps, CancelAuthProps, TwoFactEnum } from "../../Props/Registration/LoginProps";
import "./GoogleAuth.css";
import { LoginButton } from "./LoginButton";

export const GoogleAuthenticaion = (props: AuthProps) : JSX.Element => {
	return (
		<div className="container-fluid signIn-signUp-pages d-flex align-items-center justify-content-center">
			<div className="row d-flex align-items-center justify-content-center">
				<div className="col-12 col-md-10 offset-md-1 sign-box">
					<TitleArea />
					<QrCode />
					<InputArea />
					<ConfirmationButton />
				</div>
			</div>
		</div>
	);
};

const TitleArea = () : JSX.Element => {
	const moreInfo = "https://www.microsoft.com/en-ww/security/business/security-101/what-is-two-factor-authentication-2fa";
	return (
		<div className="row">
			<div className="col-12">
				<h2>Two authentication factor</h2>
				<p>Scan the QR code below with an 2 Factor Authentication,
					such as Google Authenticator, on your phone.</p>
				<a href={moreInfo} target="blank">(GetMore information on using two factor authentication)</a>
			</div>
		</div>
	);
};

const QrCode = () : JSX.Element => {
	//CHANGE THIS TO PROPER RECEIVE QR CODE FROM BACKEND!!!!!!
	return (
		<div className="row mt-3">
			<div className="col-12">
				<img alt="qr code" id="qr-code"/>
			</div>
		</div>
	);
};

const InputArea = () : JSX.Element => {
	return (
		<div className="row mt-4">
			<div className="col-12">
				<div className="row">
					<div className="col-12">
						<p>Type the code created by the authentication app</p>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-4 offset-md-4">
						<input
							className="form-control"
							placeholder="Validation code"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

const ConfirmationButton = () : JSX.Element => {
	return (
		<div className="row mt-2">
			<div className="col-12">
				<button className="btn btn-outline-success">Continue</button>
			</div>
		</div>
	);
};
