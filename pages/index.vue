<script setup lang="ts">
definePageMeta({
	auth: false,
});

const { latestNotes } = useNotes();
</script>

<template>
	<LayoutContent>
		<div v-if="latestNotes" class="flex gap-4 flex-wrap">
				<HomeRecentNotes />
			</div>
	</LayoutContent>
</template>
