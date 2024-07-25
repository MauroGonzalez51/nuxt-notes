import { useToast } from "@/components/ui/toast";

export default function ({ event }: { event?: Event }) {
	const { createNote } = useNotes();
	const { toast } = useToast();

	createNote()
		.then(() => {
			toast({
				title: "Note were created succesfully",
			});
		})
		.catch(() => {
			toast({
				title: "An error ocurred while creating the note",
				description: "Please try again after some time",
			});
		});
}
