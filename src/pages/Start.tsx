import React from "react";
import { Link, useParams } from "react-router-dom";
import { ResetDatabaseButton } from "../components/ResetDatabaseButton";
import { SessionListView } from "../components/SessionListView";
import styled from "styled-components";

const AddButton = styled(Link)`
	background: var(--primary-500);
	color: white;
	text-decoration: none;
	height: 48px;
	border-radius: 20px;
	font-size: 2rem;
	text-align: center;
`;

export interface StartProps {}

const Start: React.FunctionComponent<StartProps> = () => {
	return (
		<>
			<header className="App-header"></header>
			<main>
				<SessionListView />
				<AddButton to="/add">+ Lägg till uppgift</AddButton>
			</main>
		</>
	);
};

export default Start;
