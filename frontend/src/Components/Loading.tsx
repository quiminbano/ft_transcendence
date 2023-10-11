import "./Loading.css";
import { Spinner } from "react-bootstrap";

interface loadingProps {
	type: Type;
	variant: Variant;
	message: string;
}

type Variant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light"
| "dark";
type Type = "border" | "grow";

export const Loading = (props: loadingProps) : JSX.Element | null => {
	return (
		<div id="loading">
			<Spinner
				animation={props.type}
				role="status"
				variant={props.variant}
				className="loading-spinner"
			>
				<span className="visually-hidden">{props.message}</span>
			</Spinner>
		</div>
	);
};
