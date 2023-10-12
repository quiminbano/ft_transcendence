import "./LoginButton.css";
import { Col, Button } from "react-bootstrap";

interface LoginButtonProps {
	func: ()=>void;
	variant: string;
	message: string;
	id?: string
}

export const LoginButton = (props: LoginButtonProps) => {
	return (
		<Button
			className="login-buttons"
			variant={props.variant}
			onClick={()=>props.func()}
			id = {props.id ? props.id : ""}
		>{props.message}</Button>
	);
};
