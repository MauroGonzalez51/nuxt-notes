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

import { Input } from "@/components/ui/input";

const { data: session } = useAuth();
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

		<div class="border border-primary/10 p-4 rounded-md shadow flex gap-4">
			<EditAutoSave />
		</div>
		<Input
			:defaultValue="note.title"
			class="max-w-md shadow"
			placeholder="Note title ..."
			@update:modelValue="(payload: string | number) => {
				if (!note) return;
				note.title = payload?.toString();
			}"
		/>
		<ClientOnly>
			<EditEditor />
		</ClientOnly>
	</div>
</template>
