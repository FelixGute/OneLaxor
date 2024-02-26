import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import View from "./pages/View";
import Add from "./pages/Add";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Start />} />
				<Route path="/homework/:id" element={<View />} />
				<Route path="/add" element={<Add />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
