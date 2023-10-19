import "./TwoFactorAuth.css";
import { LoginButton } from "./LoginButton";

interface TwoFactorAuthProps {
	setIsLoading: (value: boolean)=> void;
	setIsAuthReq: (value: boolean) => void;
}

export const TwoFactorAuth = (props : TwoFactorAuthProps) : JSX.Element | null => {
	const profilePicture = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
	const userName = "Andre Miranda";

	const ConfirmWithPhone = () => {
		console.log("Should confirm now with the phone");
		//props.setAuthMethod(AuthenticationMethod.Phone);
	};

	const ConfirmWithGoogle = () => {
		console.log("Should confirm now with google authenticator");
		//props.setAuthMethod(AuthenticationMethod.Google);
	};

	const CancelProcessOfRegistration = () => {
		props.setIsAuthReq(false);
	};

	const buttonsInfo = [
		{
			func: ConfirmWithPhone,
			variant: "info",
			message: "Confirm with phone"
		},
		{
			func: ConfirmWithGoogle,
			variant: "warning",
			message: "Confirm with google"
		},
		{
			func: CancelProcessOfRegistration,
			variant: "danger",
			message: "Cancel",
			id: "two-factor-cancel-btn"
		}
	];

	return (
		<div className="container-fluid two-factores-div signIn-signUp-pages">
			<div className="row">
				<div className="col-8 offset-2 col-md-6 offset-md-3 two-fact-box">
					<img src={profilePicture} alt="profile picture" id="two-factores-auth-profile-pic"></img>
					<p id="two-factor-username">{userName}</p>
					{
						buttonsInfo.map((btn, i) =>
							<LoginButton
								func={btn.func}
								variant={btn.variant}
								message={btn.message}
								id={btn.id ? btn.id : ""}
								key={i}
							/>
						)
					}
				</div>
			</div>
		</div>
	);
};
