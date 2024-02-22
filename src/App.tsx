import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import Edit from "./pages/Edit";
import Add from "./pages/Add";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Start />} />
				<Route path="/edit/:id" element={<Edit />} />
				<Route path="/add" element={<Add />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
