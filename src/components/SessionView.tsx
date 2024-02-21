import * as React from "react";
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

export function SessionView({ session }: Props) {
	const homeworkObject = useLiveQuery(() =>
		db.transaction(
			"r",
			db.homeworkList,
			db.sessionList,
			db.subjectList,
			async () => {
				try {
					const homework = await db.homeworkList.get(
						session.homeworkId
					);
					const subjectID = homework?.subjectId || 0;
					const subject = await db.subjectList.get(subjectID);
					return [homework, subject];
				} catch (e) {
					console.log(e);
				}
			}
		)
	);

	console.log("Homework Object:");
	console.log(homeworkObject);

	const homework = homeworkObject[0];
	const subject = homeworkObject[1];

	return (
		<Card className={"row " + (session.done ? "done" : "")}>
			<SubjectSpan>{subject.title}</SubjectSpan>
			<Heading>{homework?.title}</Heading>
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
