import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../models/db";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { Subject } from "../models/Subject";
import { Homework } from "../models/Homework";
import { Session } from "../models/Session";
import { AddSession, DeleteSession } from "../models/UpdateHomework";

// Need to change from SessionData to Session, so it can contain sessionID

/*

Todo:
Adding a session means adding hidden inputs with a time
Not much else is needed for session

Use an array inside of a state to hold sessions
Render out each session and include a hidden input

*/

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

interface iSpan {
	color: string;
}

const SubjectSpan = styled.span<iSpan>`
	background: color-mix(in srgb, ${(props) => props.color} 50%, black);
	color: color-mix(in srgb, ${(props) => props.color} 10%, white);
`;

interface Props {
	homeworkId: number;
}

export default function HomeworkView({ homeworkId }: Props) {
	// TODO:
	// Get info from db
	// Populate fields
	// UpdateHomework

	// Also need a delete-button for removing the entire homework and sessions

	// Should sessions stay? Only Done ones, for statistics?
	// Issue then becomes how to sort and view them, since they then lack a link to Homework

	// TODO:
	// So only do a Homework View, which allows editing sessions directly.
	// Then an Edit mode for that view to edit homework info.

	const [homeworkData, setHomeworkData] = useState<Homework>();
	const [subjectData, setSubjectData] = useState<Subject[]>([]);
	const [sessions, setSessions] = useState<Session[]>([]);
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const navigate = useNavigate();

	useEffect(() => {
		fetchHomework().then((data) => {
			setHomeworkData(data);
			console.log(data);
			if (
				homeworkData?.title === "" &&
				homeworkData.deadline === "" &&
				homeworkData.subjectId === 0
			) {
				// No matching homework found, go back to start
				// navigate("/");
			}
		});
		fetchSubject().then((data) => setSubjectData(data));
		fetchSession().then((data) => setSessions(data));
	}, [homeworkId, sessions]);

	const fetchHomework = async (): Promise<Homework> => {
		try {
			console.log("homeworkID:" + homeworkId);
			const homework = await db.homeworkList.get(homeworkId);
			console.log("homework: " + homework);
			if (homework) {
				return homework;
			} else {
				console.log("No homework found");
				return { title: "", deadline: "", subjectId: 0 };
			}
		} catch (error) {
			console.error("Error fetching data:", error);
			return { title: "", deadline: "", subjectId: 0 };
		}
	};

	const fetchSession = async (): Promise<Session[]> => {
		try {
			const session = await db.sessionList
				.where({ homeworkId: homeworkId })
				.toArray();
			if (session) {
				return session;
			} else {
				return [];
			}
		} catch (error) {
			console.error("Error fetching data:", error);
			return [];
		}
	};
	const fetchSubject = async (): Promise<Subject[]> => {
		try {
			const subject = await db.subjectList.toArray();
			if (subject) {
				return subject;
			} else {
				return [];
			}
		} catch (error) {
			console.error("Error fetching data:", error);
			return [];
		}
	};

	// Handle changes when the user selects a new date
	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newDate = new Date(e.target.value);
		if (!isNaN(newDate.getTime())) {
			setSelectedDate(newDate);
		} else {
			const newDate = new Date();
			setSelectedDate(newDate);
		}
	};
	const handleAddSession = (sessionTime: Date) => {
		const newSession: Session = {
			homeworkId: homeworkId,
			time: sessionTime,
			done: 0,
		};
		AddSession(newSession).then((sessionId) => {
			newSession.id = sessionId;
			setSessions([...sessions, newSession]);
		});
	};

	const handleRemoveSession = (sessionId: number) => {
		DeleteSession(sessionId).then(() => {
			const updatedItems = sessions.filter(
				(_, index) => index !== sessionId
			);
			setSessions(updatedItems);
		});
	};

	return (
		<>
			{/* Div med info om homework */}
			<h2>{homeworkData?.title}</h2>
			{subjectData
				.filter((subject) => {
					return subject.id === homeworkData?.subjectId;
				})
				.map((subject, key) => {
					return (
						<SubjectSpan key={key} color={subject.color}>
							{subject.title}
						</SubjectSpan>
					);
				})}

			<div>
				<label>
					<span>Nytt tillfälle:</span>
					<input
						type="date"
						value={selectedDate.toISOString().split("T")[0]}
						onChange={handleDateChange}
					/>
				</label>
				<button
					onClick={(e) => {
						e.preventDefault();
						handleAddSession(selectedDate);
					}}>
					Lägg till tillfälle
				</button>
			</div>

			{sessions != null ? (
				<ul>
					{sessions.map((session) => {
						return (
							<li key={session.id}>
								{session.time.toISOString().split("T")[0]}
								<button
									onClick={(e) => {
										e.preventDefault();
										handleRemoveSession(
											session.id as number
										);
									}}>
									-
								</button>
							</li>
						);
					})}
				</ul>
			) : (
				<></>
			)}
		</>
	);
}
