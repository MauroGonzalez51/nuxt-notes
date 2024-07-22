import type { Note } from "@/lib/definitions";

export default function () {
	const { data: notes } = useFetch<Note[]>("/api/notes", {
		key: "notes",
	});

	async function createNote(): Promise<Note> {
		const response = $fetch<Note>("/api/notes", {
			method: "POST",
		});

		await refreshNuxtData("notes");

		return response;
	}

	async function deleteNote({ noteId }: { noteId: string }): Promise<Note> {
		const response = await $fetch<Note>("/api/notes", {
			method: "DELETE",
			params: {
				noteId,
			},
		});

		await refreshNuxtData("notes");

		return response;
	}

	return {
		notes,
		createNote,
		deleteNote,
	};
}
