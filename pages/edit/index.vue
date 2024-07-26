<script setup lang="ts">
definePageMeta({
	middleware: [
		async function (to, _from) {
			if (!to.query.noteId) {
				return navigateTo({
					path: "/",
				});
			}
		},
		"auth",
	],
});

const { data: session } = useAuth();

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const { note } = useEdit();
</script>

<template>
	<LazyEditError />
	<div v-if="note" class="flex flex-col flex-grow gap-4">
		<Head>
			<Title v-if="session?.user.name"
				>{{ note.title }} - by {{ session?.user.name }}</Title
			>
			<Title v-else> Editing {{ note.title }} </Title>
		</Head>

		<div class="border border-primary/10 p-4 rounded-md shadow">
			<EditAutoSave />
		</div>
		<Input
			:defaultValue="note.title"
			class="max-w-md shadow"
			placeholder="Note title ..."
			@update:modelValue="
				(payload) => {
					if (!note?.title) return;
					note.title = payload.toString();
				}
			"
		/>
		<Textarea
			:defaultValue="note.content"
			placeholder="Write your content here ..."
			class="shadow"
		/>
	</div>
</template>
