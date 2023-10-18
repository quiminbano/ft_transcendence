import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "./Components/homepage/Homepage";
import { Login } from "./Components/LoginPage/Login";
import { MainMenu } from "./Components/MainMenu/MainMenu";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/mainmenu" element={<MainMenu />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
