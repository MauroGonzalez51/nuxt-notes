import { H3Event } from "h3";
import { prisma } from "~/lib/prisma";
import { Note } from "~/lib/definitions";
import { getServerSession } from "#auth";

export default defineEventHandler(
	async (event: H3Event): Promise<Note | Note[]> => {
		const session = await getServerSession(event);

		if (!session)
			throw createError({
				statusCode: 401,
				statusMessage: "Unauthorized!",
			});

		const user = await prisma.user.findUnique({
			where: { id: session.user.id },
		});

		if (!user)
			throw createError({
				statusCode: 400,
				statusMessage: "User with the given :userId doesn't exists",
			});

		const { noteId } = getQuery(event);
		if (!noteId) return await prisma.note.findMany();

		const note = await prisma.note.findUnique({
			where: { id: noteId.toString() },
		});

		if (!note)
			throw createError({
				statusCode: 400,
				statusMessage: "Note with the given ?noteId does't exists",
			});

		return note;
	},
);
