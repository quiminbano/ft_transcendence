import "./PhoneAuthentication.css";
import { Container, Row, Col } from "react-bootstrap";
import { AuthenticationMethod } from "./Login";
import { useState } from "react";
import { LoginButton } from "./LoginButton";
import { useNavigate } from "react-router-dom";

interface CodeAreaProps {
	code: number[];
	updateAtIndex: (index: number, value: string) => void;
}

interface SqaureProps {
	index: number;
	updateAtIndex: (index: number, value: string) => void;
}

export const PhoneAuthentication = () : JSX.Element | null => {
	const [code, setCode] = useState([NaN, NaN, NaN, NaN, NaN, NaN]);
	const navigate = useNavigate();

	const updateValueAtIndex  = (index: number, value: string) => {
		console.log(value);
		const nbr  = parseInt(value);
		const items = [...code];
		let itemToUpdate = items[index];
		itemToUpdate = nbr;
		items[index] = itemToUpdate;
		setCode(items);
	};

	const connfirmActivation = () : void => {
		console.log("Sending code");
	};
	const cancelActivation = () : void => {
		navigate("/");
	};

	return (
		<div className="signIn-signUp-pages">
			<div className="signIn-signUp-box">
				<div>
					<h2>Two authentication factor</h2>
					<p>For security reasons we sent you a message with a code.
						Please insert it in the following space to confirm your identity</p>
				</div>
				<div className="code-area">
					<CodeArea code={code} updateAtIndex={updateValueAtIndex}/>
				</div>
				<div>
					<LoginButton
						func={connfirmActivation}
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
	);
};

const CodeArea = (props: CodeAreaProps) : JSX.Element | null => {
	return (
		<>
			{(() => {
				const arr = [];
				for (let i = 0; i < 6; i++)
					arr.push(<PhoneCodeSquare key={i} index={i} updateAtIndex={props.updateAtIndex} />);
				return arr;
			})()}
		</>
	);
};

const PhoneCodeSquare = (props: SqaureProps) : JSX.Element | null => {
	const [value, setValue] = useState("");

	const handleChange = (e :React.FormEvent<HTMLInputElement>) : void => {

		const correctValue = e.currentTarget.value. length === 0 ? e.currentTarget.value : e.currentTarget.value[0];
		setValue(correctValue);
		props.updateAtIndex(props.index, correctValue);
	};
	return (
		<input className="phone-code-square" value={value} onChange={(e)=>handleChange(e)}/>
	);
};
