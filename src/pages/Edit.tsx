import React from "react";
import Homework from "../components/Homework";
import EditHomework from "../components/EditHomework";
import { Link, useParams } from "react-router-dom";

export interface EditProps {}

const Edit: React.FunctionComponent<EditProps> = () => {
	const params = useParams();

	const id = params.id as unknown as number;

	return (
		<>
			<header className="App-header"></header>
			<main>
				<Link to="/">Tillbaka</Link>
				<EditHomework />
				{/* <Homework work={homeworks[id]} /> */}
			</main>
		</>
	);
};

export default Edit;