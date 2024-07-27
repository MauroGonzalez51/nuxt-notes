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
	
		<ClientOnly>
			<EditEditor />
		</ClientOnly>
	</div>
</template>
