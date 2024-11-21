import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Map from './Components/Map';
import Leaderboard from './Components/Leaderboard';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Map />} />
				<Route path="/leaderboard" element={<Leaderboard />} />
			</Routes>
		</>
	);
}

export default App;
