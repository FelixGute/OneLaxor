import React from "react";
import Homework from "../components/Homework";
import HomeworkView from "../components/HomeworkView";
import { Link, useParams } from "react-router-dom";

export interface ViewProps {}

const View: React.FunctionComponent<ViewProps> = () => {
	const params = useParams();

	const id = params.id as unknown as number;

	return (
		<>
			<header className="App-header"></header>
			<main>
				<Link to="/">Tillbaka</Link>
				<HomeworkView homeworkId={id} />
			</main>
		</>
	);
};

export default View;
