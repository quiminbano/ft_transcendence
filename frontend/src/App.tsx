import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "./Components/homepage/Homepage";
import { Login } from "./Components/LoginPage/Login";
import { MainMenu } from "./Components/MainMenu/MainMenu";

function App() {
	const [user, setUser] = useState();
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	if (!isAuthenticated) {
		return (
			<div className="App">
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route path="/login" element={<Login />} />
					</Routes>
				</BrowserRouter>
			</div>
		);
	}

	if (user && isAuthenticated) {
		return (
			<div className="App">
				<BrowserRouter>
					<Routes>
						<Route path="/mainmenu" element={<MainMenu />} />
					</Routes>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
