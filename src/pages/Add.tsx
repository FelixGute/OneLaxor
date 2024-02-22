import React from "react";
import Homework from "../components/Homework";
import EditHomework from "../components/EditHomework";
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
				<EditHomework />
				{/* <Homework work={homeworks[id]} /> */}
			</main>
		</>
	);
};

export default Add;
