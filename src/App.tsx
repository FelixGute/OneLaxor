import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import Edit from "./pages/Edit";
import Home from "./pages/Home";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Start />} />
				<Route path="/edit/:id" element={<Edit />} />
				<Route path="/Home" element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
