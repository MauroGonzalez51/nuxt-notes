<script setup lang="ts">
import type { Note } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
	note: Note;
}

const { note } = defineProps<Props>();

const { data: session } = useAuth();

const formattedDate = new Date(note.createdAt).toLocaleDateString("en-Es", {
	year: "numeric",
	month: "long",
	day: "numeric",
});
</script>

<template>
	<Card class="max-w-md dark:bg-gray-800 relative">
		<CardHeader>
			<CardTitle>
				{{ note.title }}
			</CardTitle>
			<div
				v-if="session?.user.name"
				class="text-sm text-muted-foreground"
			>
				made by {{ session?.user.name }}
			</div>
		</CardHeader>
		<CardContent class="h-24 line-clamp-4">
			<p>
				{{ note.content }}
			</p>
		</CardContent>
		<CardFooter class="flex items-center justify-between mt-2">
			<div class="text-sm text-muted-foreground">
				Created on {{ formattedDate }}
			</div>

			<Button variant="outline" size="sm" class="">
				<Icon name="mdi:file-edit-outline" class="mr-2 h-4 w-4" />
				Edit
			</Button>
		</CardFooter>

		<div class="absolute top-2 right-4">
			<AlertDialog>
				<AlertDialogTrigger>
					<Icon
						name="mdi:delete-outline"
						class="h-6 w-6 hover:text-red-500 transition-colors duration-200"
					/>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle
							>Are you absolutely sure?</AlertDialogTitle
						>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently
							delete the note from our servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							@click="() => handleDeleteNote({ noteId: note.id })"
							>Continue</AlertDialogAction
						>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	</Card>
</template>
