import * as React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../models/db";
import { SessionView } from "./SessionView";

interface Props {}

export function SessionListView({}: Props) {
	// Sessions för att hämta alla sessions som är i listan
	const sessions = useLiveQuery(() =>
		db.sessionList.where({ done: 0 }).sortBy("time")
	);

	if (!sessions) return null;

	return (
		<>
			{sessions.map((item) => (
				<SessionView key={item.id} session={item} />
			))}
		</>
	);
}
