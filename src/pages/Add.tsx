import React from "react";
import AddHomeworkView from "../components/AddHomeworkView";
import { Link, useParams } from "react-router-dom";

export interface AddProps {}

const Add: React.FunctionComponent<AddProps> = () => {
	const params = useParams();

	const id = params.id as unknown as number;

	return (
		<>
			<header className="App-header"></header>
			<main>
				<Link to="/">Tillbaka</Link>
				<AddHomeworkView />
				{/* <Homework work={homeworks[id]} /> */}
			</main>
		</>
	);
};

export default Add;
