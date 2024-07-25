import { useToast } from "@/components/ui/toast";

export default function ({ event, noteId }: { event?: Event; noteId: string }) {
	const { deleteNote } = useNotes();
	const { toast } = useToast();

	deleteNote({ noteId })
		.then(() => {
			toast({
				title: "Note were deleted succesfully",
			});
		})
		.catch(() => {
			toast({
				title: "An error ocurred while deleting the note",
				description: "Please try again after some time",
			});
		});
}
