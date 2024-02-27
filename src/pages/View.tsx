import React from "react";
import Homework from "../components/Homework";
import HomeworkView from "../components/HomeworkView";
import { Link, useParams } from "react-router-dom";

export interface ViewProps {}

type HomeworkParams = {
	id: string;
};

const View: React.FunctionComponent<ViewProps> = () => {
	const { id } = useParams<HomeworkParams>();

	const actualID: number = Number(id);

	return (
		<>
			<header className="App-header"></header>
			<main>
				<Link to="/">Tillbaka</Link>
				<HomeworkView homeworkId={actualID} />
			</main>
		</>
	);
};

export default View;
