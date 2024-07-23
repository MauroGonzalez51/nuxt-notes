<script setup lang="ts">
import { Button } from "@/components/ui/button";

definePageMeta({
	auth: false,
});

const { notes, createNote } = useNotes();
</script>

<template>
	<div>
		<div v-if="notes" class="w-screen flex gap-4 flex-wrap">
			<template v-for="note in notes">
				<HomeNoteCard :note="note" />
			</template>
		</div>
	</div>
	<Button @click="createNote()">Create Note</Button>
</template>
