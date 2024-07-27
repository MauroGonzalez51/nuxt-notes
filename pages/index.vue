<script setup lang="ts">
definePageMeta({
	auth: false,
});

const { latestNotes } = useNotes();
</script>

<template>
	<Head>
		<Title>Note Editor</Title>
	</Head>

	<div v-if="latestNotes" class="flex gap-4 flex-wrap">
		<HomeRecentNotes />
	</div>
</template>
