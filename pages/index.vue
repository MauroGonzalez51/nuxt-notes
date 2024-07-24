<script setup lang="ts">
import { Button } from "@/components/ui/button";

definePageMeta({
	auth: false,
});

const { latestNotes } = useNotes();
</script>

<template>
	<div>
		<div v-if="latestNotes" class="w-screen flex gap-4 flex-wrap">
			<HomeRecentNotes />
		</div>
	</div>
</template>
