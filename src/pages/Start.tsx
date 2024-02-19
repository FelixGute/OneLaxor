import React from "react";
import Homework from "./../components/Homework";
import { Link } from "react-router-dom";

export interface StartProps {}

const Start: React.FunctionComponent<StartProps> = () => {
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

	return (
		<>
			{homeworks.map((homework, key) => {
				return (
					<Link to={"/edit/" + key}>
						<Homework work={homework} />
					</Link>
				);
			})}
		</>
	);
};

export default Start;
