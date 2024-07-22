import { H3Event } from "h3";
import { prisma } from "~/lib/prisma";
import { Note } from "~/lib/definitions";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event: H3Event): Promise<Note> => {
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

	const note = await prisma.note.create({
		data: {
			title: "This is the note title",
			content: "Write your content here ...",
			userId: user.id,
		},
	});

	if (!note)
		throw createError({
			statusCode: 500,
			statusMessage: "Error during creating the note",
		});

	return note;
});
