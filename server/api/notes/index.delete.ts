import { H3Event } from "h3";
import { prisma } from "@/lib/prisma";
import { Note } from "@/lib/definitions";

export default defineEventHandler(async (event: H3Event): Promise<Note> => {
	const { noteId } = getQuery(event);

	if (!noteId)
		throw createError({
			statusCode: 400,
			statusMessage: "QueryParam ?noteId is missing",
		});

	return await prisma.note.delete({
		where: { id: noteId.toString() },
	});
});
