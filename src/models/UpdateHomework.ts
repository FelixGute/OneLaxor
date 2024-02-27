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

export interface HomeworkUpdateData {
	homeworkData: HomeworkInputs;
	sessionData: SessionData[];
}

export async function AddSession(session: Session): Promise<number> {
	return db.sessionList.add(session);
	// Possible to have multiple sessions with the same date?
}

export async function DeleteSession(sessionId: number): Promise<void> {
	return db.sessionList.delete(sessionId);
}
export async function MarkSessionAsDone(sessionId: number): Promise<number> {
	return db.sessionList.update(sessionId, { done: 1 });
}
export async function MarkSessionAsTodo(sessionId: number): Promise<number> {
	return db.sessionList.update(sessionId, { done: 0 });
}

export async function UpdateHomework(homeworkData: HomeworkUpdateData) {
	const homeworkId = await db.homeworkList.add({
		title: homeworkData.homeworkData.homework,
		deadline: "",
		subjectId: Number(homeworkData.homeworkData.subject),
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

		sessions.push(newSession);
	});

	await db.sessionList.bulkAdd(sessions);
}
