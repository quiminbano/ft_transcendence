import "./Loading.css";

interface loadingProps {
	type: Type;
	variant: Variant;
	message: string;
}

type Variant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light"
| "dark";
type Type = "border" | "grow";

export const Loading = (props: loadingProps) : JSX.Element | null => {
	const width = document.body.clientWidth;
	const heigth = document.body.clientHeight;
	return (
		<div id="loading">
			<div
				role="status"
				className={`loading-spinner spinner-${props.type} text-${props.variant}`}
			>
				<span className="visually-hidden">{props.message}</span>
			</div>
		</div>
	);
};
