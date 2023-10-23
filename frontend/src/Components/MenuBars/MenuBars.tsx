import { NavBar } from "./NavBar";
import { SideBar } from "./SideBar";

interface MenuBarsProp {
	children: JSX.Element | JSX.Element[];
}

export const MenuBars = ({ children } : MenuBarsProp) : JSX.Element => {
	return (
		<>
			<NavBar />
			<SideBar />
			{children}
		</>
	);
};
