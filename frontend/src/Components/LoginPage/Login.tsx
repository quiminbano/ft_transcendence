import { useState } from "react";
import "./Login.css";

import { PhoneAuthentication } from "./PhoneAuthentication";
import { SignUp } from "./SignUp";
import { InfoToSign } from "./Info";
import { SignIn } from "./SignIn";

interface loginFormProps {
	setIsLoading: (valie: boolean) => void;
	isLoading: boolean;
	setLoginState: (value: LoginState) => void;
}
export interface InfoToSignProps {
	isLogin: boolean;
	setIsLogin: (value: boolean) => void;
}
export enum LoginState {
	Unidentified,
	Identified,
	SignedUp
}
export enum AuthenticationMethod {
	NULL,
	Phone,
	Google
}
export const Login = () : JSX.Element | undefined => {
	const [authenticationMethod, setAuthenticationMethod] = useState(AuthenticationMethod.NULL);
	const [isLogin, setIsLogin] = useState(true);

	if (authenticationMethod === AuthenticationMethod.NULL) {
		return (
			<div className="container-fluid signIn-signUp-pages d-flex align-items-center justify-content-center">
				<div className="row">
					<div className="col-10 sign-box">
						<div className="row full-height align-items-center">
							<div className={`info-bg ${isLogin ? "border-right" : "border-left"} phone-hide`}></div>
							<div className={`col-12 col-md-8 order-${isLogin ? "0 is-login" : "1 is-signup"}`} style={{ zIndex: 2 }}>
								<div className="row">
									<div className="col-12">
										{isLogin && <SignIn isLogin={isLogin} setIsLogin={setIsLogin} />}
										{!isLogin && <SignUp isLogin={isLogin} setIsLogin={setIsLogin} />}
									</div>
								</div>
							</div>
							<div className={`phone-hide col-md-4 full-height ${isLogin ? "1 is-login" : "0 is-signup"}`} style={{ zIndex: 2 }}>
								<div className="row full-height align-items-center">
									<div className="col-12">
										<InfoToSign isLogin={isLogin} setIsLogin={setIsLogin} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	else if (authenticationMethod === AuthenticationMethod.Phone) {
		return <PhoneAuthentication />;
	}

};
