import React, { useState, useEffect } from "react";
import { db } from "../models/db";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { Subject } from "../models/Subject";
import {
	SessionData,
	HomeworkAddData,
	HomeworkInputs,
	AddHomework,
} from "../models/AddHomework";

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

interface iOption {
	color: string;
}

const SubjectOption = styled.option<iOption>`
	background: color-mix(in srgb, ${(props) => props.color} 50%, black);
	color: color-mix(in srgb, ${(props) => props.color} 10%, white);
`;

export default function EditHomework() {
	const [subjectData, setSubjectData] = useState<Subject[]>([]);
	const [sessions, setSessions] = useState<SessionData[]>([]);
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());

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
		fetchSubject().then((data) => setSubjectData(data));
	}, []);

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

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<HomeworkInputs>();
	const onSubmit: SubmitHandler<HomeworkInputs> = (data) => {
		console.log(data);
		console.log(sessions);
		AddHomework({ homeworkData: data, sessionData: sessions });
		// Update database
		// Go back to start
	};

	const handleAddSession = (sessionTime: Date) => {
		const newItem: SessionData = { time: sessionTime };
		setSessions([...sessions, newItem]);
	};

	const handleRemoveSession = (sessionId: number) => {
		const updatedItems = sessions.filter((_, index) => index !== sessionId);
		setSessions(updatedItems);
	};

	return (
		/* "handleSubmit" will validate your inputs before invoking "onSubmit" */
		<>
			<h1>Lägg till ny läxa</h1>
			<StyledForm onSubmit={handleSubmit(onSubmit)}>
				{/* register your input into the hook by invoking the "register" function */}
				<label>
					<span>Läxans namn</span>
					<input placeholder="test" {...register("homework")} />
				</label>

				{/* include validation with required or other standard HTML validation rules */}
				<label>
					<span>Ämne</span>
					<select id="subject" {...register("subject")}>
						{subjectData?.map((subject) => {
							return (
								<SubjectOption
									color={subject.color}
									value={subject.id}>
									{subject.title}
								</SubjectOption>
							);
						})}
					</select>
				</label>

				<div>
					<label>
						<span>Nytt tillfälle:</span>
						<input
							type="date"
							value={selectedDate.toISOString().split("T")[0]}
							onChange={handleDateChange}
						/>
					</label>
					<button onClick={() => handleAddSession(selectedDate)}>
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
										onClick={() =>
											handleRemoveSession(key)
										}>
										-
									</button>
								</li>
							);
						})}
					</ul>
				) : (
					<></>
				)}

				<input type="submit" value="Lägg till" />
			</StyledForm>
		</>
	);
}
