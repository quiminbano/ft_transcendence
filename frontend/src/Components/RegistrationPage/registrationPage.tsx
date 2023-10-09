import { useState } from "react";

interface profileDataProps {
	setUsername: (value: string) => void;
}

export const RegistrationPage = () => {
	const [username, setUsername] = useState("");
	
	return (
		<div>
			<TitleArea />
			<ProfileDataFrom42 setUsername={setUsername} />
		</div>
	);
};

const TitleArea = () => {
	return (
		<div>
			<h2>Create your profile</h2>
			<p>Let us know how you are</p>
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
		</div>
	);
};