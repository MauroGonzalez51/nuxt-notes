import { useToast } from "@/components/ui/toast";

export default function () {
	const { saveNote } = useEdit();
	const { toast } = useToast();

	saveNote()
		.then(() => {
			toast({
				title: "Note were saved succesfully",
			});
		})
		.catch(() => {
			toast({
				title: "An error ocurred while saving the note",
				description: "Please try again after some time",
			});
		});
}
