import "./PhoneAuthentication.css";
import { useState } from "react";
import { LoginButton } from "./LoginButton";
import { useNavigate } from "react-router-dom";
import { TwoFactEnum } from "./Login";
import { Loading } from "../Loading";

interface CodeAreaProps {
	code: number[];
	updateAtIndex: (index: number, value: string) => void;
}

interface SqaureProps {
	index: number;
	updateAtIndex: (index: number, value: string) => void;
}

interface PhoneAuthProps {
	setAuthType: (value: TwoFactEnum) => void;
}

export const PhoneAuthentication = (props: PhoneAuthProps) : JSX.Element | null => {
	const [code, setCode] = useState([NaN, NaN, NaN, NaN, NaN, NaN]);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const focusNextInput = () => {
		const active = document.activeElement;
		if (active?.nextElementSibling)
			(active.nextElementSibling as HTMLElement).focus();
	};

	const updateValueAtIndex = (index: number, value: string) => {
		const nbr = parseInt(value);
		const items = [...code];
		let itemToUpdate = items[index];
		itemToUpdate = nbr;
		items[index] = itemToUpdate;
		setCode(items);
		if (value.length > 0)
			focusNextInput();
		else {
			const prevInput = document.getElementById(`phone-code-input-${index - 1}`);
			console.log(prevInput);
			prevInput?.focus();
		}
	};

	const confirmActivation = () : void => {
		setIsLoading(true);
		console.log("Sending code");
		console.log(code);
	};
	const cancelActivation = () : void => {
		props.setAuthType(TwoFactEnum.NULL);
	};

	return (
		<div className="container-fluid signIn-signUp-pages d-flex align-items-center justify-content-center">
			<div className="row">
				<div className="col-12 offset-1 col-md-8 offset-md-2 two-fact-box">
					<TitleArea />
					<CodeArea code={code} updateAtIndex={updateValueAtIndex}/>
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

const CodeArea = (props: CodeAreaProps) : JSX.Element | null => {
	return (
		<div className="row code-area">
			<div className="col-8 offset-2">
				<div className="row d-flex align-items-center justify-content-center">
					<div className="col-12 d-flex align-items-center justify-content-center">
						{(() => {
							const arr = [];
							for (let i = 0; i < 6; i++)
								arr.push(<PhoneCodeSquare key={i}
									index={i} updateAtIndex={props.updateAtIndex} />);
							return arr;
						})()}
					</div>
				</div>
			</div>
		</div>
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
		<input
			className="phone-input"
			value={value}
			onChange={(e)=>handleChange(e)}
			id={`phone-code-input-${props.index}`}
		/>
	);
};
