import { useState } from "react";
import { Button, Container, Row, Form, Col } from "react-bootstrap";
import "./registrationPage.css";
import { Loading } from "../Loading";
import { useNavigate } from "react-router-dom";

interface profileDataProps {
	setUsername: (value: string) => void;
	isLoading: boolean;
	setIsLoading: (value: boolean) => void;
	setSignupState: (value: SignupState) => void;
}

interface signUpErrorProps {
	message: string;
	showError: boolean;
}

interface UserFoundRegistration {
	setIsLoading: (value: boolean)=> void;
	setSignupState: (value: SignupState) => void;
}

enum SignupState {
	Unidentified,
	Identified,
	SignedUp
}

export const RegistrationPage = () => {
	const [username, setUsername] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [signupState, setSignupState] = useState<SignupState>(SignupState.Unidentified);

	const userWasFound = () => {
		setTimeout(()=>{ //REMOVE THIS TIME OUT!!! IS JUST FOR TESTING!!!!!!!!
			setSignupState(SignupState.Identified);
			setIsLoading(false);
		},2000);
	};

	return (

		<div className="signIn-signUp-pages">
			{isLoading && <Loading type="border" variant="info" message=""/>}
			<Container className="login-container">
				<Row className="signIn-signUp-box">
					<TitleArea />
					{signupState === SignupState.Unidentified && <ProfileDataFrom42 setUsername={setUsername}
						setIsLoading={setIsLoading}
						isLoading={isLoading}
						setSignupState={setSignupState}
					/>}
					{signupState === SignupState.Identified &&
						<UserFoundRegistration setIsLoading={setIsLoading} setSignupState={setSignupState}/>}
				</Row>
			</Container>
		</div>
	);
};

const TitleArea = () => {
	return (
		<div className="signup-title-area">
			<h2>Create your profile</h2>
			<p>Let us know who you are</p>
		</div>
	);
};

const ProfileDataFrom42 = (props: profileDataProps) => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [showError, setShowError] = useState(false);
	const [message, setMessage] = useState("invalid login");

	const handleConfirmation = () => {
		console.log(username);
		setUsername("");
		if (username.length < 1) {
			setMessage("Empty username is not valid!");
			setShowError(true);
			return;
		}
		if (username.length > 1 && showError)
			setShowError(false);
		props.setIsLoading(true);
		props.setSignupState(SignupState.Identified); //REMOVE THIS!!!!!!!!!!
		//TODO: handle proper registration here!!!
	};
	const handleCancelSignUp = () => {
		navigate("/");
	};

	return (
		<Form id="login-form">
			<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
				<Form.Label id="login-form-label">What is your 42 username?</Form.Label>
				<Form.Control
					type="text"
					placeholder="your 42 username"
					onChange={(e: React.FormEvent<HTMLInputElement>)=>
						setUsername(e.target.value)}
					value={username}
				/>
				<ErrorMessage showError={showError} message={message} />
				<Button
					className="login-buttons"
					variant="success"
					onClick={()=>handleConfirmation()}
				>Confirm</Button>
				<Button
					className="login-buttons"
					variant="danger"
					onClick={()=>handleCancelSignUp()}
				>Cancel</Button>
			</Form.Group>
		</Form>
	);
};

const ErrorMessage = (props: signUpErrorProps) : JSX.Element | null => {

	if (props.showError) {
		return (
			<p id="login-error">{props.message}</p>
		);
	}
};

const UserFoundRegistration = (props: UserFoundRegistrationProps) : JSX.Element | null => {
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
		props.setSignupState(SignupState.Unidentified);
	};

	return (
		<div>
			<img alt="profile picture" src={profilePicture} id="signup-profile-picture"/>
			<h4>{userName}</h4>
			<Row className="signup-confirmation-buttons-row">
				<Col xxl={{ offset: 0, order: 0, span: 12 }}>
					<Button
						className="signUp-confirmation-button"
						variant="info"
						onClick={()=>ConfirmWithPhone()}
					>Confirm with phone</Button>
				</Col>
				<Col xxl={{ offset: 0, order: 0, span: 12 }}>
					<Button
						className="signUp-confirmation-button"
						variant="warning"
						onClick={()=>ConfirmWithGoogle()}
					>Confirm with Google</Button>
				</Col>
				<Col xxl={{ offset: 2, order: 0, span: 8 }}>
					<Button
						className="signUp-confirmation-button"
						id="signUp-cancel-button"
						variant="danger"
						onClick={()=>CancelProcessOfRegistration()}
					>Cancel</Button>
				</Col>
			</Row>
		</div>
	);
};

const ConfirmationOfRegistration = () : JSX.Element | null => {
	return (
		<Container>
			<Row>
				
			</Row>
		</Container>
	);
};
