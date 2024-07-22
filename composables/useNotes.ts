import type { Note } from "@/lib/definitions";

export default function () {
	const { data } = useAuth();

	const userId = ref(data.value?.user.id);

	const { data: notes } = useFetch<Note[]>(`/api/notes/${userId.value}`, {
		key: "notes",
		watch: [userId],
	});

	async function createNote(): Promise<Note> {
		const response = $fetch<Note>(`/api/notes/${userId.value}`, {
			method: "POST",
		});

		await refreshNuxtData("notes");

		return response;
	}

	async function deleteNote({ noteId }: { noteId: string }): Promise<Note> {
		const response = await $fetch<Note>(`/api/notes`, {
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
