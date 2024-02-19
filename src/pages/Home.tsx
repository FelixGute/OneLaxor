import React from "react";
import { ResetDatabaseButton } from "../components/ResetDatabaseButton";
import { SessionListView } from "../components/SessionListView";

export interface TodoProps {}

const Todo: React.FunctionComponent<TodoProps> = () => {
	return (
		<div>
			<SessionListView />
			<ResetDatabaseButton />
		</div>
	);
};

export default Todo;
