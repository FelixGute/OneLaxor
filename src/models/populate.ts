import { db } from "./db";

export async function populate() {
	const homeworkId = await db.homeworkList.bulkAdd([
		{
			title: "Novell-läsning",
			deadline: "",
			subjectId: 1,
		},
		{
			title: "Avancerade glosor",
			deadline: "",
			subjectId: 2,
		},
		{
			title: "Derivatans funktion",
			deadline: "",
			subjectId: 3,
		},
	]);
	await db.sessionList.bulkAdd([
		{
			homeworkId: 1,
			time: "2024-02-14",
			done: 0,
		},
		{
			homeworkId: 1,
			time: "2024-02-15",
			done: 0,
		},
		{
			homeworkId: 2,
			time: "2024-02-15",
			done: 0,
		},
		{
			homeworkId: 3,
			time: "2024-02-16",
			done: 1,
		},
	]);
	await db.subjectList.bulkAdd([
		{
			title: "Svenska",
			color: "red",
		},
		{
			title: "Engelska",
			color: "green",
		},
		{
			title: "Matematik",
			color: "blue",
		},
	]);
}
