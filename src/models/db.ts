import Dexie, { Table } from "dexie";
import { populate } from "./populate";
import { Homework } from "./Homework";
import { Session } from "./Session";

export class HomeworkDB extends Dexie {
	homeworkList!: Table<Homework, number>;
	sessionList!: Table<Session, number>;
	constructor() {
		super("HomeworkDB");
		this.version(1).stores({
			homeworkList: "++id, subject",
			sessionList: "++id, homeworkId, time, done",
		});
	}

	deleteList(todoListId: number) {
		return this.transaction(
			"rw",
			this.sessionList,
			this.homeworkList,
			() => {
				this.sessionList.where({ todoListId }).delete();
				this.homeworkList.delete(todoListId);
			}
		);
	}
}

export const db = new HomeworkDB();

db.on("populate", populate);

export function resetDatabase() {
	return db.transaction("rw", db.homeworkList, db.sessionList, async () => {
		await Promise.all(db.tables.map((table) => table.clear()));
		await populate();
	});
}
