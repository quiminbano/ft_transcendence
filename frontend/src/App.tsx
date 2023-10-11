import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "./Components/homepage/Homepage";
import { Login } from "./Components/LoginPage/Login";
import { RegistrationPage } from "./Components/RegistrationPage/registrationPage";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/registration" element={<RegistrationPage /> } />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
