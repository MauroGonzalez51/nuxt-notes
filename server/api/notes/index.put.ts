import { H3Event } from "h3";
import { prisma } from "~/lib/prisma";
import { Note } from "~/lib/definitions";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event: H3Event): Promise<Note> => {
	// const session = await getServerSession(event);

	// if (!session)
	// 	throw createError({
	// 		statusCode: 401,
	// 		statusMessage: "Unauthorized!",
	// 	});

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

	if (!data)
		throw createError({
			statusCode: 400,
			statusMessage:
				"Body should be of type { Note }, cannot be null or undefined",
		});

	return await prisma.note.update({
		where: { id: note.id },
		data,
	});
});
