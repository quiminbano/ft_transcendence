import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Homepage } from './Components/Homepage';

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
