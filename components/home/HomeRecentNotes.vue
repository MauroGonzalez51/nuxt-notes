<script setup lang="ts">
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";

const { latestNotes } = useNotes();
</script>

<template>
	<div class="w-full">
		<div class="font-semibold text-lg">
			<h1>Recent notes</h1>
			<div>
				<Button variant="link" class="px-0">
					<NuxtLink :to="{ path: '/notes', query: { page: 1 } }">
						All notes
					</NuxtLink>
				</Button>
			</div>
		</div>
		<Carousel class="w-full relative outline-none">
			<CarouselContent class="">
				<CarouselItem
					v-for="note in latestNotes"
					:key="note.id"
					class="max-w-md"
				>
					<HomeNoteCard :note="note" class="select-none" />
				</CarouselItem>
			</CarouselContent>
			<HomeRecentNotesControls />
		</Carousel>
	</div>
</template>
