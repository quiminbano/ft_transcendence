import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "./Components/homepage/Homepage";
import { RegistrationPage } from "./Components/RegistrationPage/registrationPage";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/registration" element={<RegistrationPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
