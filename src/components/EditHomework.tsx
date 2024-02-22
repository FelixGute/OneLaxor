import React, { useState, useEffect } from "react";
import { db } from "../models/db";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { Subject } from "../models/Subject";

/*

Todo:
Adding a session means adding hidden inputs with a time
Not much else is needed for session

Use an array inside of a state to hold sessions
Render out each session and include a hidden input

*/

type Inputs = {
	homework: string;
	subjectRequired: string;
	subject: string;
};

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
	const [subjectData, setSubjectData] = useState<Subject[] | null>();

	useEffect(() => {
		fetchSubject().then((data) => setSubjectData(data));
	}, []);

	const fetchSubject = async (): Promise<Subject[] | null> => {
		try {
			const subject = await db.subjectList.toArray();
			if (subject) {
				return subject;
			} else {
				return null;
			}
		} catch (error) {
			console.error("Error fetching data:", error);
			return null;
		}
	};

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

	console.log(watch("homework")); // watch input value by passing the name of it

	return (
		/* "handleSubmit" will validate your inputs before invoking "onSubmit" */
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

			<input type="submit" value="Lägg till" />
		</StyledForm>
	);
}
