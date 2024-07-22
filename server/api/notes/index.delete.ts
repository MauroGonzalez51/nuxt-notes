import { H3Event } from "h3";
import { prisma } from "@/lib/prisma";
import { Note } from "@/lib/definitions";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event: H3Event): Promise<Note> => {
	const session = await getServerSession(event);

	if (!session)
		throw createError({
			statusCode: 401,
			statusMessage: "Unauthorized!",
		});

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
