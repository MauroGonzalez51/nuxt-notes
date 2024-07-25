<script setup lang="ts">
definePageMeta({
	auth: false,
});

const { latestNotes } = useNotes();
</script>

<template>
	<div v-if="latestNotes" class="flex gap-4 flex-wrap">
		<HomeRecentNotes />
	</div>
</template>
