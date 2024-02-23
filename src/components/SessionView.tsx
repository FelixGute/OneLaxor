import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../models/db";
import { Session } from "../models/Session";
import { Homework } from "../models/Homework";
import { Subject } from "../models/Subject";
import { SubjectView } from "./SubjectView";

const Card = styled.div`
	padding: 20px;
	display: flex;
	justify-content: space-between;
	gap: 20px;
`;
const Check = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	gap: 10px;
`;
const Info = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;
const Heading = styled.h2`
	font-size: 1.5em;
	color: var(--primary-500);
	margin: 0;
`;
const Type = styled.p`
	margin: 0;
`;
const Checkmark = styled.input``;
const Deadline = styled.p`
	margin: 0;
`;

interface Props {
	session: Session;
}

// // Define a default homework object
// const defaultHomework: Homework = {
// 	id: 1,
// 	title: "",
// 	deadline: "",
// 	subjectId: 0,
// };

export function SessionView({ session }: Props) {
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

	return (
		<Card>
			<Check>
				<Checkmark
					type="checkbox"
					checked={!!session.done}
					onChange={(ev) =>
						db.sessionList.update(session, {
							done: ev.target.checked,
						})
					}
				/>
				<SubjectView
					subject={
						homeworkData?.subject || {
							title: "Saknas",
							color: "red",
						}
					}
				/>
			</Check>
			<Info>
				<Heading>{homeworkData?.homework?.title}</Heading>
				<Deadline>{session.time.toISOString().split("T")[0]}</Deadline>
				<Type></Type>
			</Info>
			{/* <div className="todo-session-trash">
				<button
					onClick={() => db.sessionList.delete(session.id as number)}
					title="Delete item">
					Ta bort
				</button>
			</div> */}
		</Card>
	);
}
