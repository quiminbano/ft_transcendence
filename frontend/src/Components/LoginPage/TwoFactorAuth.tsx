import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col, Image } from "react-bootstrap";
import { Loading } from "../Loading";
import "./TwoFactorAuth.css";
import { LoginState } from "./Login";
import { LoginButton } from "./LoginButton";

interface TwoFactorAuthProps {
	setIsLoading: (value: boolean)=> void;
	setLoginState: (value: LoginState) => void;
}

export const TwoFactorAuth = (props : TwoFactorAuthProps) : JSX.Element | null => {
	const profilePicture = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
	const userName = "Andre Miranda";

	const ConfirmWithPhone = () => {
		console.log("Should confirm now with the phone");
		props.setIsLoading(true);
	};

	const ConfirmWithGoogle = () => {
		console.log("Should confirm now with google authenticator");
		props.setIsLoading(true);
	};

	const CancelProcessOfRegistration = () => {
		props.setLoginState(LoginState.Unidentified);
	};

	const buttonsInfo = [
		{
			func: ConfirmWithPhone,
			offset: 3,
			order: 0,
			span: 6,
			variant: "info",
			message: "Confirm with phone"
		},
		{
			func: ConfirmWithGoogle,
			offset: 3,
			order: 0,
			span: 6,
			variant: "warning",
			message: "Confirm with google"
		},
		{
			func: CancelProcessOfRegistration,
			offset: 4,
			order: 0,
			span: 4,
			variant: "danger",
			message: "Cancel",
			id: "two-factor-cancel-btn"
		}
	];

	return (
		<>
			<Row>
				<Col>
					<Image src={profilePicture} alt="profile picture" id="two-factores-auth-profile-pic"></Image>
				</Col>
			</Row>
			<Row>
				{
					buttonsInfo.map((btn, i) =>
						<LoginButton
							func={btn.func}
							offset={btn.offset}
							order={btn.order}
							span={btn.span}
							variant={btn.variant}
							message={btn.message}
							id={btn.id ? btn.id : ""}
							key={i}
						/>
					)
				}
			</Row>
		</>
	);
};
