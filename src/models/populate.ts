import { db } from "./db";

export async function populate() {
	const homeworkId = await db.homeworkList.add({
		title: "Derivatans funktion",
		deadline: "",
		subject: 2,
	});
	await db.sessionList.bulkAdd([
		{
			homeworkId,
			time: "2024-02-14",
			done: 0,
		},
		{
			homeworkId,
			time: "2024-02-15",
			done: 0,
		},
		{
			homeworkId,
			time: "2024-02-16",
			done: 1,
		},
	]);
}
