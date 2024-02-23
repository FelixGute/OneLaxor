import { db } from "./db";
import { Session } from "./Session";

// Add types for homework-adding and sessionlist
// import those types into AddHomework-component

export interface SessionData {
	time: Date;
}

export interface HomeworkInputs {
	homework: string;
	subject: number;
}

export interface HomeworkAddData {
	homeworkData: HomeworkInputs;
	sessionData: SessionData[];
}

export async function AddHomework(homeworkData: HomeworkAddData) {
	const homeworkId = await db.homeworkList.add({
		title: homeworkData.homeworkData.homework,
		deadline: "",
		subjectId: homeworkData.homeworkData.subject,
	});
	// Need to set all sessions to done: 0
	// Do I need to create a new array or can I recreated session as a common model for both adding and the db?

	const sessions: Session[] = [];

	homeworkData.sessionData.forEach((session) => {
		const newSession: Session = {
			homeworkId: homeworkId,
			time: session.time,
			done: 0,
		};
	});

	await db.sessionList.bulkAdd(sessions);
}
