import "./LoginButton.css";
import { Col, Button } from "react-bootstrap";

interface LoginButtonProps {
	func: ()=>void;
	offset: number;
	order: number;
	span: number;
	variant: string;
	message: string;
	id?: string
}

export const LoginButton = (props: LoginButtonProps) => {
	return (
		<Col xs={{ offset: props.offset, order: props.order, span: props.span }}>
			<Button
				className="login-buttons"
				variant={props.variant}
				onClick={()=>props.func()}
				id = {props.id ? props.id : ""}
			>{props.message}</Button>
		</Col>
	);
};
