import type { Note } from "@/lib/definitions";

const DEFAULT_AUTOSAVE_SECONDS: number = 10;

export default function () {
	const route = useRoute();

	/**
	 * + Using 'as string' here since the middleware will redirect any incomming requests to '/edit'
	 * + that doesn't have the QueryParam ?noteId
	 */
	const noteId = computed(() => route.query.noteId as string);

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

	const autoSave = useState<boolean>("autoSave", () => false);


	/**
	 * ! Endpoint: PUT /api/notes
	 * @brief Using the endpoint to save the current state of the note
	 * @returns {Note | undefined}
	 */
	async function saveNote(): Promise<Note | undefined> {
		if (!note.value) return;

		const body: Partial<Omit<Note, "id">> = {
			title: note.value.title,
			content: note.value.content,
		};

		const response = await $fetch<Note>("/api/notes", {
			method: "PUT",
			body: toRaw(body),
			query: {
				noteId: noteId.value,
			},
		});

		return response;
	}

	/**
	 * ! Event: onMounted
	 * Setting the initial content of the editor
	 * if the gathered note has some inside of it
	 */
	onMounted(() => {
		if (!note.value?.content) return;

		// TODO
		// editor.value?.commands.setContent(note.value?.content);
	});

	/**
	 * ! Event: onMounted
	 * Creating an event listener for the 'autoSave' flag
	 * Every time it changes gotta check if it's true, then the
	 * interval should be running, but whenever it changes
	 * it should run a cleanup function to stop that interval
	 */
	onMounted(() => {
		watch(
			autoSave,
			(newValue, _oldValue, onCleanup) => {
				if (newValue) {
					const intervalId = setInterval(
						saveNote,
						DEFAULT_AUTOSAVE_SECONDS * 1000,
					);
					onCleanup(() => clearInterval(intervalId));
				}
			},
			{ immediate: true },
		);
	});

	return {
		note,
		error,
		refresh,
		autoSave,
		saveNote,
	};
}
