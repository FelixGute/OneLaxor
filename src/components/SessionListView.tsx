import * as React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../models/db";
import { SessionView } from "./SessionView";

interface Props {}

/*

// Definiera det önskade datumet (till exempel två dagar tidigare än igår)


// Hämta poster där date är efter det önskade datumet och done är 0
const result = await db.myTable
  .where("date")
  .above(specificDate)
  .and((item) => item.done === 0)
  .sortBy("date");

*/

export function SessionListView({}: Props) {
	const specificDate = new Date();
	specificDate.setDate(specificDate.getDate() - 2);

	// Sessions för att hämta alla sessions som är i listan
	const sessions = useLiveQuery(
		() =>
			db.sessionList
				.where("time")
				.above(specificDate)
				.and((item) => item.done === 0)
				.sortBy("time")
		// db.sessionList.where({ done: 0 }).sortBy("time")
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
