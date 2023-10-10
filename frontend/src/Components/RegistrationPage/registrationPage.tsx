import { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";

interface profileDataProps {
	setUsername: (value: string) => void;
}

export const RegistrationPage = () => {
	const [username, setUsername] = useState("");
	return (
		<Container>
			<Row>
				<TitleArea />
				<ProfileDataFrom42 setUsername={setUsername} />
			</Row>
		</Container>
	);
};

const TitleArea = () => {
	return (
		<div>
			<h2>Create your profile</h2>
			<p>Let us know who you are</p>
		</div>
	);
};

const ProfileDataFrom42 = (props: profileDataProps) => {
	const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.setUsername(e.target.value);
	};
	return (
		<div>
			<p>What is your 42 username?</p>
			<input onChange={(e)=>handleValueChange(e)}/>
			<div>
				<Button variant="outline-success">Confirm</Button>
			</div>
		</div>
	);
};