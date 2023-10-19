import "./LoginButton.css";

interface LoginButtonProps {
	func: ()=>void;
	variant: string;
	message: string;
	id?: string
}

export const LoginButton = (props: LoginButtonProps) => {
	return (
		<button
			className={`login-buttons btn btn-${props.variant}`}
			onClick={()=>props.func()}
			id = {props.id ? props.id : ""}
		>{props.message}</button>
	);
};
