import "./SideBar.css";
import { useState } from "react";

interface SideBarProps {
	setExpanded: (value: boolean) => void;
	expanded: boolean;
}

export const SideBar = () : JSX.Element => {
	const [expanded, setExpanded] = useState(true);
	
	return (
		<div className={`${expanded ? "side-nav-container" : "side-nav-container side-nav-container-NX"}`}>
			<NavHeading setExpanded={setExpanded} expanded={expanded}/>
			<SideBarMenu setExpanded={setExpanded} expanded={expanded} />
			<SideBarFooter setExpanded={setExpanded} expanded={expanded} />
		</div>
	);
};

const NavHeading = ({ setExpanded, expanded } : SideBarProps) : JSX.Element => {
	return (
		<div className="row">
			<div className="col-12 d-flex align-items-center justify-content-center nav-heading ">
				{expanded && <div className="row">
					<div className="col-3 d-flex align-items-center justify-content-center">
						<img id="logo-icon" alt="logo" src="https://cdn-icons-png.flaticon.com/128/5977/5977575.png"/>
					</div>
					<div className="col-6 d-flex align-items-center justify-content-center">
						<h2 id="nav-title">Ft-transcendence</h2>
					</div>
				</div>}
			</div>
			<button
				className={`hamburger ${expanded ? "hamburger-in" : "hamburger-out"}`}
				onClick={() => setExpanded(!expanded)}
			>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>
	);
};

const SideBarMenu = ({ setExpanded, expanded } : SideBarProps) : JSX.Element => {
	const menuItems = [
		{
			text: "Dashboard",
			icon: "https://img.icons8.com/?size=50&id=vFqlDrzMYOT0&format=png"
		},
		{
			text: "Dashboard",
			icon: "https://cdn-icons-png.flaticon.com/128/1828/1828765.png"
		},
		{
			text: "Dashboard",
			icon: "https://cdn-icons-png.flaticon.com/128/1828/1828765.png"
		},
		{
			text: "Dashboard",
			icon: "https://cdn-icons-png.flaticon.com/128/1828/1828765.png"
		},
	];
	return (
		<div className="row">
			<div className="col-12 nav-menu">
				{
					menuItems.map((item, i) => (
						<div className="row" key={i}>
							<div className={`col-12 ${expanded ? "menu-item" : "menu-item menu-item-NX"} `}>
								<div className="row side-nav-btn">
									<div className={`d-flex align-items-center justify-content-center ${expanded ? "col-4" : "col-12"}`}>
										<img className="nav-item-logo" src={item.icon} alt={item.text}/>
									</div>
									<div className="col-md-8">
										{expanded && <p className="w-auto nav-item-name">{item.text}</p>}
									</div>
								</div>
							</div>
						</div>
					))
				}
			</div>
		</div>
	);
};

const SideBarFooter = ({ setExpanded, expanded } : SideBarProps) : JSX.Element => {
	return (
		<div className="nav-footer">
			<div className="row">
				<div className="col-12">
					<div className="row">
						{expanded && <div className="col-4 d-flex align-items-center justify-content-center">
							<img alt="logo" src="https://img.icons8.com/?size=24&id=Fx70T4fgtNmt&format=gif" />
						</div>}
						{expanded && <div className="col-5 d-flex align-items-center justify-content-center">
							<div className="nav-footer-info">
								<p className="nav-footer-user-name">André Miranda</p>
								<p className="nav-footer-user-position">Administrator</p>
							</div>
						</div>}
						<div className={`d-flex align-items-center justify-content-center ${expanded ? "col-3" : "col-8 offset-2"}`}>
							<img className="logout-icon" src="https://img.icons8.com/?size=50&id=2445&format=png"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};