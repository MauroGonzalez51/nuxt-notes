import { H3Event } from "h3";
import { prisma } from "~/lib/prisma";
import { Note } from "~/lib/definitions";

export default defineEventHandler(async (event: H3Event): Promise<Note> => {
	const { noteId } = getQuery(event);

	if (!noteId)
		throw createError({
			statusCode: 400,
			statusMessage: "QueryParam ?noteId is missing",
		});

	const note = await prisma.note.findUnique({
		where: { id: noteId?.toString() },
	});

	if (!note)
		throw createError({
			statusCode: 400,
			statusMessage: "Note with the given ?nodeId does't exists",
		});

	const data: Partial<Omit<Note, "id">> = await readBody(event);

	return await prisma.note.update({
		where: { id: note.id },
		data,
	});
});
