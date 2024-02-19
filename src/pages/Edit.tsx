import React from "react";
import Homework from "../components/Homework";
import { Link, useParams } from "react-router-dom";

export interface EditProps {}

const Edit: React.FunctionComponent<EditProps> = () => {
	const params = useParams();

	function createHomework(
		title: string,
		deadline: string,
		subject: string,
		type: string
	) {
		return {
			title: title,
			deadline: deadline,
			subject: subject,
			type: type,
		};
	}

	const homeworks = [];

	homeworks.push(
		createHomework(
			"Skolaktivitets Affischdesign",
			"2023-12-15",
			"Digitalt skapande 1",
			"Inlämning"
		)
	);
	homeworks.push(
		createHomework(
			"Teknikens Påverkan",
			"2023-12-10",
			"Svenska 1",
			"Inlämning"
		)
	);
	homeworks.push(
		createHomework("Derivatorer i Fokus", "2023-12-08", "Matematik", "Prov")
	);
	homeworks.push(
		createHomework(
			"Kvantfysikens mysterium",
			"2023-12-17",
			"Svenska 1",
			"Prov"
		)
	);

	const id = params.id as unknown as number;

	return (
		<>
			<header className="App-header"></header>
			<main>
				<Link to="/">Tillbaka</Link>
				<Homework work={homeworks[id]} />
				{/* {homeworks
					.filter((homework) => homework.id == params.id)
					.map((filteredHomework) => (
						<Homework work={filteredHomework} />
					))} */}
			</main>
		</>
	);
};

export default Edit;
