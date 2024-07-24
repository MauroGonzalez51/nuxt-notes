<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";

definePageMeta({
	auth: false,
});

const { latestNotes, createNote } = useNotes();
</script>

<template>
	<div>
		<div v-if="latestNotes" class="w-screen flex gap-4 flex-wrap">
			<Carousel class="w-full">
				<CarouselContent class="">
					<CarouselItem
						v-for="note in latestNotes"
						:key="note.id"
						class="max-w-md"
					>
						<HomeNoteCard :note="note" class="select-none" />
					</CarouselItem>
				</CarouselContent>
			</Carousel>
		</div>
	</div>
	<Button @click="createNote()">Create Note</Button>
</template>
