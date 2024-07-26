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

	const autoSave = useState<boolean>("autoSave", () => true);

	function saveNote(): void {}

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
