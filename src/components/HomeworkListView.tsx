import * as React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Homework } from "../models/Homework";
import { db } from "../models/db";
import { SessionView } from "./SessionView";

interface Props {
	homeworkList: Homework;
}

export function HomeworkListView({ homeworkList }: Props) {
	// Sessions för att hämta alla sessions som är i listan
	const sessions = useLiveQuery(
		() => db.sessionList.where({ homeworkId: homeworkList.id }).toArray(),
		[homeworkList.id]
	);

	if (!sessions) return null;

	return (
		<div className="box">
			<div className="grid-row">
				<h2>{homeworkList.title}</h2>
				<div className="todo-list-trash">
					<button
						onClick={() => db.deleteList(homeworkList.id as number)}
						title="Delete list">
						Delete
					</button>
				</div>
			</div>
			<div>
				{sessions.map((item) => (
					<SessionView key={item.id} session={item} />
				))}
			</div>
		</div>
	);
}
