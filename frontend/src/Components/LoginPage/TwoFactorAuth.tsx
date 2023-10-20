import "./TwoFactorAuth.css";
import { LoginButton } from "./LoginButton";
import useUser from "../../Hooks/useUser";
import { TwoFactEnum } from "./Login";
import { TwoFactorAuthProps } from "../../Props/Registration/LoginProps";

export const TwoFactorAuth = (props : TwoFactorAuthProps) : JSX.Element | null => {
	const profilePicture = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
	const userName = useUser().user.username;

	const ConfirmWithPhone = () => {
		console.log("Should confirm now with the phone");
		props.setTwoFactType(TwoFactEnum.Phone);
	};

	const ConfirmWithGoogle = () => {
		console.log("Should confirm now with google authenticator");
		props.setTwoFactType(TwoFactEnum.Google);
	};

	const CancelProcessOfRegistration = () => {
		props.setIsAuthReq(false);
	};

	const buttonsInfo = [
		{
			func: ConfirmWithPhone,
			variant: "outline-info",
			message: "Confirm with phone"
		},
		{
			func: ConfirmWithGoogle,
			variant: "outline-warning",
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
					<div className="row">
						<div className="col-12 col-md-8 offset-md-2">
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
			</div>
		</div>
	);
};
