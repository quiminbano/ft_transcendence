import { useEffect, useState } from "react";
import { AuthProps, ConfirmCode } from "../../Props/Registration/LoginProps";
import loginAPITest from "../../DataTest/apiTest";
import { useNavigate } from "react-router-dom";
import { OtpInputComponent } from "../InputCode";
import { Loading } from "../Loading";

interface QRCodeString {
	code: string
}

export const GoogleAuthenticaion = (props: AuthProps) : JSX.Element => {
	const [code, setCode] = useState("");
	const [isCodeCorrect, setIsCodeCorrect] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [qrCode, setQrCode] = useState("");
	const navigate = useNavigate();
	useEffect(() => {
		//FETCH QR CODE!!!!
		const qrCodeImage = loginAPITest.getQrCode();
		setQrCode(qrCodeImage);
	}, []);
	useEffect(() => {
		if (isCodeCorrect) {
			props.setIsAuth(true);
			navigate("/");
		}
	}, [isCodeCorrect]);
	if (qrCode.length === 0)
		return <Loading variant="primary" type="border" message="" />;
	return (
		<div className="container-fluid signIn-signUp-pages d-flex align-items-center justify-content-center">
			<div className="row d-flex align-items-center justify-content-center">
				<div className="col-12 col-md-10 offset-md-1 sign-box">
					<TitleArea />
					<QrCode code={qrCode}/>
					<div className="col-12">
						<p>Type the code created by the authentication app</p>
					</div>
					<div className="row">
						<div className="col-12">
							<div className="d-flex align-items-center justify-content-center">
								<OtpInputComponent value={code} onChange={setCode} valueLength={6}/>
							</div>
						</div>
					</div>
					<ConfirmationButton code={code} setIsCodeCorrect={setIsCodeCorrect} setIsLoading={setIsLoading}/>
				</div>
			</div>
			{isLoading && <Loading variant="primary" type="border" message="" />}
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
				<a href={moreInfo} target="blank">(Get more information on using two factor authentication)</a>
			</div>
		</div>
	);
};

const QrCode = (props: QRCodeString) : JSX.Element => {
	//CHANGE THIS TO PROPER RECEIVE QR CODE FROM BACKEND!!!!!!
	return (
		<div className="row mt-3">
			<div className="col-12">
				<img alt="qr code" id="qr-code" src={props.code}/>
			</div>
		</div>
	);
};

const ConfirmationButton = (props: ConfirmCode) : JSX.Element => {
	const [message, setMessage] = useState("");
	const showErrorMessage = () => {
		setMessage("Invalid Code");
		setTimeout(() => {
			setMessage("");
		}, 1500);
	};
	const checkCode = () => {
		//CHECK PROPERLY FROM BACKEND!!!!!
		props.setIsLoading(true);
		const result = loginAPITest.isCodeCorrect(props.code);
		result ? props.setIsCodeCorrect(result) : showErrorMessage();
	};
	return (
		<div className="row mt-2">
			<div className="col-12">
				<p className="form-error-text">{message}</p>
				<button
					className="btn btn-outline-success"
					onClick={() => checkCode()}
				>Continue</button>
			</div>
		</div>
	);
};
