import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../models/db";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { Subject } from "../models/Subject";
import { Homework } from "../models/Homework";
import {
	SessionData,
	HomeworkUpdateData,
	HomeworkInputs,
	UpdateHomework,
} from "../models/UpdateHomework";

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

	// Nothing happens until pushing a Save-button?
	// Need a way to track changes on sessions
	// Show old sessions?

	// Just do a comparison on old sessions and such?
	// Remove all sessions, then add sessions back?
	// Filter for removal (old sessions not in current sessions)
	// Filter for adding (current sessions not in old sessions)
	// Only do this for sessions not marked as done

	// Editing doesn't allow for removing done sessions?

	// One main issue at the moment is bringing back sessions that you might have accidentally marked as done.
	// Do an Archive view where you can unclick Done. That should solve that part.

	// Odd one out is sessions marked as done...

	// Should there be an intermediate view for a single homework?
	// And then an edit-button for the editing view

	// Also need a delete-button for removing the entire homework and sessions

	// Should sessions stay? Only Done ones, for statistics?
	// Issue then becomes how to sort and view them, since they then lack a link to Homework

	// TODO:
	// So only do a Homework View, which allows editing sessions directly.
	// Then an Edit mode for that view to edit homework info.

	const [homeworkData, setHomeworkData] = useState<Homework>();
	const [subjectData, setSubjectData] = useState<Subject[]>([]);
	const [sessions, setSessions] = useState<SessionData[]>([]);
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());

	const navigate = useNavigate();

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

	useEffect(() => {
		fetchHomework().then((data) => {
			setHomeworkData(data);
			if (
				homeworkData?.title == "" &&
				homeworkData.deadline == "" &&
				homeworkData.subjectId == 0
			) {
				// No matching homework found, go back to start
				navigate("/");
			}
		});
		fetchSubject().then((data) => setSubjectData(data));
	}, []);

	const fetchHomework = async (): Promise<Homework> => {
		try {
			const homework = await db.homeworkList.get(homeworkId);
			if (homework) {
				return homework;
			} else {
				return { title: "", deadline: "", subjectId: 0 };
			}
		} catch (error) {
			console.error("Error fetching data:", error);
			return { title: "", deadline: "", subjectId: 0 };
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

	const handleAddSession = (sessionTime: Date) => {
		const newItem: SessionData = { time: sessionTime };
		// Also add to database
		setSessions([...sessions, newItem]);
	};

	const handleRemoveSession = (sessionId: number) => {
		const updatedItems = sessions.filter((_, index) => index !== sessionId);
		// Also remove from database
		setSessions(updatedItems);
	};

	return (
		<>
			{/* Div med info om homework */}
			<h1>Lägg till ny uppgift</h1>
			{homeworkData?.title}
			{subjectData
				.filter((subject) => {
					return subject.id == homeworkData?.subjectId;
				})
				.map((subject) => {
					return (
						<SubjectSpan color={subject.color}>
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
					{sessions.map((session, key) => {
						return (
							<li key={key}>
								{session.time.toISOString().split("T")[0]}
								<button
									onClick={() => handleRemoveSession(key)}>
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
