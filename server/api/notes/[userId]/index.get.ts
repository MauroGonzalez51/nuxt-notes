import { H3Event } from "h3";
import { prisma } from "~/lib/prisma";
import { Note } from "~/lib/definitions";

export default defineEventHandler(
	async (event: H3Event): Promise<Note[] | Note> => {
		const { userId } = getRouterParams(event);

		if (!userId)
			throw createError({
				statusCode: 400,
				statusMessage: "RouteParam :userId is missing",
			});

		const user = await prisma.user.findUnique({
			where: { id: userId },
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
