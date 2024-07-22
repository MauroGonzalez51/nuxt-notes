<script setup lang="ts">
definePageMeta({
	auth: false,
});

const { notes, createNote, deleteNote } = useNotes();
</script>

<template>
	<div>
		<span class="text-3xl font-inter">HomePage</span>
		<Icon name="uil:github" />
		<template v-if="notes">
			<div v-for="note in notes">
				<button
					@click="async () => await deleteNote({ noteId: note.id })"
				>
					{{ note.id }}
				</button>
			</div>
		</template>
	</div>
	<button @click="createNote()">Create Note</button>
</template>
