import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Homepage } from "./Components/homepage/Homepage";
import { Login } from "./Components/LoginPage/Login";
import { MainMenu } from "./Components/MainMenu/MainMenu";
import useUser from "./Hooks/useUser";
import { PlayGround } from "./Components/PlayGround/PlayGround";
import { Dashboard } from "./Components/Dashboard/Dashboard";

const App = () => {

	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const user = useUser().user;
	if (!isAuthenticated) {
		return (
			<div className="App">
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route path="/login" element={
							<Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
						} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route
							path="*"
							element={<Navigate to="/" replace />}
						/>
					</Routes>
				</BrowserRouter>
			</div>
		);
	}

	if (user && isAuthenticated) {
		console.log("Should show mainmenu now");
		return (
			<div className="App">
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<MainMenu />} />
						<Route path="/playground" element={<PlayGround />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route
							path="*"
							element={<Navigate to="/" replace />}
						/>
					</Routes>
				</BrowserRouter>
			</div>
		);
	}
};

export default App;
