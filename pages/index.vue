<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import {
	TooltipProvider,
	TooltipTrigger,
	Tooltip,
	TooltipContent,
} from "@/components/ui/tooltip";

definePageMeta({
	auth: false,
});

const { data: session } = useAuth();

const { notes, deleteNote, createNote } = useNotes();
</script>

<template>
	<div>
		<div v-if="notes" class="w-screen flex gap-4 flex-wrap">
			<Card
				v-for="note in notes"
				class="max-w-md dark:bg-gray-800 relative"
			>
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
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Labore eius itaque, eligendi porro quaerat iure. Cumque
						culpa nobis ipsam mollitia tenetur dolores. Non
						reiciendis laborum, delectus nihil iure maiores officia!
					</p>
				</CardContent>
				<CardFooter class="flex items-center justify-between mt-2">
					<div class="text-sm text-muted-foreground">
						Created on
						{{
							new Date(note.createdAt).toLocaleDateString(
								"en-En",
								{
									year: "numeric",
									month: "long",
									day: "numeric",
								},
							)
						}}
					</div>

					<Button variant="outline" size="sm" class="">
						<Icon
							name="mdi:file-edit-outline"
							class="mr-2 h-4 w-4"
						/>
						Edit
					</Button>
				</CardFooter>

				<div class="absolute top-2 right-4">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Icon
									name="mdi:delete-outline"
									class="h-6 w-6 hover:text-red-500 transition-colors duration-200"
									@click="deleteNote({ noteId: note.id })"
								/>
							</TooltipTrigger>
							<TooltipContent>Delete this note</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</Card>
		</div>
	</div>
	<Button @click="createNote()">Create Note</Button>
</template>
