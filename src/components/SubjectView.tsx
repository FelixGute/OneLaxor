import React, { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import styled from "styled-components";
import { db } from "../models/db";
import { Session } from "../models/Session";
import { Homework } from "../models/Homework";
import { Subject } from "../models/Subject";

interface iSpan {
	color: string;
}

const SubjectSpan = styled.span<iSpan>`
	font-size: 0.75em;
	background: color-mix(in srgb, ${(props) => props.color} 50%, black);
	border-radius: 20px;
	padding: 10px 20px;
	margin: 0;
	color: color-mix(in srgb, ${(props) => props.color} 10%, white);
`;

interface Props {
	subject: Subject;
}

export function SubjectView({ subject }: Props) {
	return <SubjectSpan color={subject.color}>{subject.title}</SubjectSpan>;
}
