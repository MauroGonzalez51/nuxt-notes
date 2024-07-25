import type { Note } from "@/lib/definitions";

export default function (_noteId: string) {
	const noteId = computed(() => _noteId);

	const {
		data: note,
		error,
		refresh,
	} = useFetch<Note>("/api/notes", {
		key: "note",
		query: {
			noteId,
		},
		watch: [noteId],
	});

	return {
		note,
		error,
		refresh,
	};
}
