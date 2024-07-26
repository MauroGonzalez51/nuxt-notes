<script setup lang="ts">
const { error, refresh } = useEdit();
</script>

<template>
	<div
		v-if="error"
		class="border px-6 py-4 rounded-md shadow-md flex flex-col md:flex-row md:justify-between gap-4 md:gap-0 max-w-5xl lg:mx-auto"
	>
		<div>
			<h1 class="font-bold">An error ocurred while gathering the note</h1>
			<span class="text-sm">
				{{ error.statusMessage }}
			</span>
		</div>
		<div class="flex gap-4">
			<Button @click="$router.back()"> Go Back </Button>
			<Button variant="outline" @click="refresh()"> Try Again </Button>
		</div>
	</div>
</template>
