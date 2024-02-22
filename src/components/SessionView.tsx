import React, { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import styled from "styled-components";
import { db } from "../models/db";
import { Session } from "../models/Session";
import { Homework } from "../models/Homework";
import { Subject } from "../models/Subject";

const Card = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`;
const Heading = styled.h2`
	font-size: 1.5em;
	color: #bf4f74;
	margin: 0;
`;
const Type = styled.p`
	margin: 0;
`;
const Deadline = styled.p`
	margin: 0;
`;
const SubjectSpan = styled.span`
	font-size: 0.75em;
	background: green;
	border-radius: 20px;
	padding: 10px 20px;
	margin: 0;
	color: lightgreen;
`;

interface Props {
	session: Session;
}

// // Define your types (adjust as needed)
// type Homework = {
// 	id: number;
// 	// Other properties...
// };

// type Subject = {
// 	id: number;
// 	// Other properties...
// };

// Define a default homework object
const defaultHomework: Homework = {
	id: 1,
	title: "",
	deadline: "",
	subjectId: 0,
};

// const createDefaultHomework = {
// 	const homework: defaultHomework = {}
// }

export function SessionView({ session }: Props) {
	console.log(session);

	const [homeworkData, setHomeworkData] = useState<{
		homework: Homework | null;
		subject: Subject | null;
	}>();

	useEffect(() => {
		fetchHomeworkAndSubject().then((data) => setHomeworkData(data));
	}, []);

	const fetchHomeworkAndSubject = async (): Promise<{
		homework: Homework | null;
		subject: Subject | null;
	}> => {
		try {
			const homework = await db.homeworkList.get(session.homeworkId);
			if (homework) {
				const subjectID = homework?.subjectId || 1;
				const subject = await db.subjectList.get(subjectID);
				if (subject) {
					return { homework, subject };
				} else {
					return { homework: null, subject: null };
				}
			} else {
				return { homework: null, subject: null };
			}
		} catch (error) {
			console.error("Error fetching data:", error);
			return { homework: null, subject: null };
		}
	};

	// const homeworkObject = useLiveQuery(() =>
	// 	db.transaction(
	// 		"r",
	// 		db.homeworkList,
	// 		db.sessionList,
	// 		db.subjectList,
	// 		async () => {
	// 			try {
	// 				const homework = await db.homeworkList
	// 					.get(session.homeworkId)
	// 					.then((homework) => {
	// 						const subjectID = homework?.subjectId || 1;
	// 						const subject = await db.subjectList.get(subjectID);
	// 					});
	// 				// const subjectID = homework?.subjectId || 1;
	// 				// const subject = await db.subjectList.get(subjectID);
	// 				// console.log(homework);
	// 				// console.log(subject);
	// 				// return [homework, subject];
	// 			} catch (e) {
	// 				console.log(e);
	// 			}
	// 		}
	// 	)
	// );

	// console.log("Homework Object:");
	// console.log(homeworkObject);

	// const homework = homeworkObject[0];
	// const subject = homeworkObject[1];

	return (
		<Card className={"row " + (session.done ? "done" : "")}>
			<SubjectSpan>{homeworkData?.subject?.title}</SubjectSpan>
			<Heading>{homeworkData?.homework?.title}</Heading>
			<Deadline>{session.time}</Deadline>
			<Type></Type>

			<div className="narrow">
				<input
					type="checkbox"
					checked={!!session.done}
					onChange={(ev) =>
						db.sessionList.update(session, {
							done: ev.target.checked,
						})
					}
				/>
			</div>
			<div className="todo-session-trash">
				<button
					onClick={() => db.sessionList.delete(session.id as number)}
					title="Delete item">
					Ta bort
				</button>
			</div>
		</Card>
	);
}
