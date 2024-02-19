import * as React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../models/db";
import { HomeworkListView } from "./HomeworkListView";

export function HomeworkLists() {
	const lists = useLiveQuery(() => db.homeworkList.toArray());

	if (!lists) return null;

	return (
		<div>
			{lists.map((list) => (
				<HomeworkListView key={list.id} homeworkList={list} />
			))}
		</div>
	);
}
