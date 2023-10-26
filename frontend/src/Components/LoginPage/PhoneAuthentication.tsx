import "./PhoneAuthentication.css";
import { useState } from "react";
import { LoginButton } from "./LoginButton";
import { TwoFactEnum } from "./Login";
import { Loading } from "../Loading";
import { AuthProps } from "../../Props/Registration/LoginProps";
import { OtpInputComponent } from "../InputCode";
import loginAPITest from "../../DataTest/apiTest";
import { useNavigate } from "react-router-dom";

export const PhoneAuthentication = (props: AuthProps) : JSX.Element | null => {
	const [isLoading, setIsLoading] = useState(false);
	const [otp, setOtp] = useState("");
	const onChange = (value: string) => setOtp(value);
	const [errorMessage, setErrorMessage] = useState("");

	const navigate = useNavigate();
	//This is JUST FOR TESTING PURPOSES!!!
	const confirmActivation = () : void => {
		setIsLoading(true);
		console.log("Sending code");
		setTimeout(() => {
			if (loginAPITest.isCodeCorrect(otp)) {
				props.setIsAuth(true);
				navigate("/");
			}
			else {
				setErrorMessage("Invalid code");
			}
			setIsLoading(false);
		}, 1000);
		//Handle code validtion here!! useSetErrorMEssage in case of error
		
	};
	const cancelActivation = () : void => {
		props.setAuthType(TwoFactEnum.NULL);
	};

	return (
		<div className="container-fluid signIn-signUp-pages d-flex align-items-center justify-content-center">
			<div className="row">
				<div className="col-10 offset-1 col-md-8 offset-md-2 two-fact-box">
					<TitleArea />
					<div className="row">
						<div className="col-12 d-flex align-items-center justify-content-center">
							<OtpInputComponent value={otp} valueLength={6} onChange={onChange}/>
						</div>
						<p className="form-error-text">{errorMessage}</p>
					</div>
					<div>
						<LoginButton
							func={confirmActivation}
							message="Confirm"
							variant="success"
						/>
						<LoginButton
							func={cancelActivation}
							message="Cancel"
							variant="danger"
						/>
					</div>
				</div>
			</div>
			{isLoading && <Loading type="border" variant="info" message=""/>}
		</div>
	);
};

const TitleArea = () : JSX.Element => {
	return (
		<div className="row">
			<div className="col-12">
				<h2>Two authentication factor</h2>
				<p>For security reasons we sent you a message with a code.
					Please insert it in the following space to confirm your identity</p>
			</div>
		</div>
	);
};
