import * as React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import styled from "styled-components";
import { db } from "../models/db";
import { Homework } from "../models/Homework";
import { Subject } from "../models/Subject";

const SubjectBadge = styled.span`
	font-size: 0.75em;
	background: green;
	border-radius: 20px;
	padding: 10px 20px;
	margin: 0;
	color: lightgreen;
`;

interface Props {
	homework: Homework;
}

export function SubjectView({ homework }: Props) {
	const subject = useLiveQuery(() =>
		db.SubjectList.get(homework.subject)
	) as Subject;

	return <SubjectBadge>{subject.title}</SubjectBadge>;
}
