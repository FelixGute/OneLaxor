import * as React from "react";
import styled from "styled-components";

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
const Subject = styled.span`
	font-size: 0.75em;
	background: green;
	border-radius: 20px;
	padding: 10px 20px;
	margin: 0;
	color: lightgreen;
`;

export interface IHomeworkProps {
	work: { title: string; deadline: string; subject: string; type: string };
}

const Homework = ({ work }: IHomeworkProps) => {
	return (
		<Card>
			<Heading>
				{work.title}
				<Subject>{work.subject}</Subject>
			</Heading>

			<Deadline>{work.deadline}</Deadline>
			<Type>{work.type}</Type>
		</Card>
	);
};

export default Homework;
