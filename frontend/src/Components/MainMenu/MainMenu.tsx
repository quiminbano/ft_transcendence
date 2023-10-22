import { useNavigate } from "react-router-dom";
import useUser from "../../Hooks/useUser";
import "./MainMenu.css";

interface InputProps {
	name: string;
	to: string;
}

export const MainMenu = () : JSX.Element => {
	return (
		<div className="container-fluid" id="main-menu-main-container">
			<TitleArea />
			<MenuInput />
		</div>
	);
};

const TitleArea = () : JSX.Element => {
	const userExample = useUser().user.username;
	return (
		<div className="row title-area">
			<div className="col-12">
				<h1>WELCOME TO ARCADE <br/>{userExample.toUpperCase()}</h1>
			</div>
		</div>
	);
};

const MenuInput = () : JSX.Element => {
	return (
		<div className="row menu-input-area">
			<InputButton name="PLAY" to="/playground" />
			<InputButton name="SETTINGS" to="/settings"/>
			<InputButton name="EXIT" to="/"/>
		</div>

	);
};

const InputButton = (props: InputProps) : JSX.Element => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(props.to);
	};
	return (
		<div className="col-12">
			<button
				className="menu-button"
				onClick={() => handleClick()}
			>{props.name}</button>
		</div>
	);
};