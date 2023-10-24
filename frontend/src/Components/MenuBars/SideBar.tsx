import useUser from "../../Hooks/useUser";
import "./SideBar.css";
import { useState } from "react";

interface SideBarProps {
	setExpanded: (value: boolean) => void;
	expanded: boolean;
}

interface MenuItemProps {
	expanded: boolean;
	url: string;
	name: string;
}

export const SideBar = () : JSX.Element => {
	const [expanded, setExpanded] = useState(false);

	return (
		<div className={`${expanded ? "side-nav-container" : "side-nav-container side-nav-container-NX"}`}>
			<NavHeading setExpanded={setExpanded} expanded={expanded}/>
			<SideBarMenu setExpanded={setExpanded} expanded={expanded} />
			<SideBarFooter setExpanded={setExpanded} expanded={expanded} />
		</div>
	);
};

const NavHeading = ({ setExpanded, expanded } : SideBarProps) : JSX.Element => {
	const { name, coalition } = useUser().user;
	return (
		<div className="row">
			<div className="col-12 nav-heading">
				{expanded && <div className="row mb-3">
					<div className="col-4 offset-4 d-flex align-items-center justify-content-center">
						<img id="profile-pic" alt="profile picture" src="https://img.icons8.com/?size=96&id=kDoeg22e5jUY&format=png"/>
					</div>
				</div>}
				{expanded && <div className="row">
					<div className="col-6 offset-3 d-flex align-items-center justify-content-center">
						<div className="nav-footer-info">
							<p className="nav-footer-user-name">{name || ""}</p>
							<p className="nav-footer-user-position">{coalition || ""}</p>
						</div>
					</div>
				</div>}
			</div>
			<NavHamburger setExpanded={setExpanded} expanded={expanded} />
		</div>
	);
};

const NavHamburger = ({ expanded, setExpanded } : SideBarProps) : JSX.Element => {
	return (
		<button
			className={`hamburger ${expanded ? "hamburger-in" : "hamburger-out"}`}
			onClick={() => setExpanded(!expanded)}
		>
			<span></span>
			<span></span>
			<span></span>
		</button>
	);
};

const SideBarMenu = ({ setExpanded, expanded } : SideBarProps) : JSX.Element => {
	const menuItems = [
		{
			text: "Playground",
			icon: "https://img.icons8.com/?size=160&id=RCQdxueNvljL&format=png"
		},
		{
			text: "Dashboard",
			icon: "https://img.icons8.com/?size=160&id=puOfmvUEqEzU&format=png"
		},
		{
			text: "Challenges",
			icon: "https://img.icons8.com/?size=160&id=OYkH0eceKGLV&format=png"
		},
		{
			text: "Chat",
			icon: "https://img.icons8.com/?size=160&id=hCvhdugyicF1&format=png"
		},
	];
	return (
		<div className="row">
			<div className="col-12 nav-menu">
				{menuItems.map((item, i) =>
					<MenuItem key={i} expanded={expanded} name={item.text} url={item.icon}/>)}
			</div>
		</div>
	);
};

const MenuItem = ({ url, expanded, name }: MenuItemProps) : JSX.Element => {
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-10 offset-1 nav-menu-item">
					<div className="row">
						<div className={`${expanded ? "col-4" : "col-12"}`}>
							<img alt={name} src={url} className="nav-item-logo"/>
						</div>
						{expanded && <div className="col-8 nav-item-name">
							{name}
						</div>}
					</div>
				</div>
			</div>
		</div>
	);
};

const SideBarFooter = ({ setExpanded, expanded } : SideBarProps) : JSX.Element => {
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="nav-footer col-12">
					<img className="logout-icon" src="https://img.icons8.com/?size=160&id=875YZQzHsTV6&format=png"/>
				</div>
			</div>
		</div>
	);
};
