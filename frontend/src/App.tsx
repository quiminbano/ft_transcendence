import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "./Components/homepage/Homepage";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Homepage />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
