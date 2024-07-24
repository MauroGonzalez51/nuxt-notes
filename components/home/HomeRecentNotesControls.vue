<script setup lang="ts">
import { useCarousel } from "@/components/ui/carousel";
import { useToast } from "@/components/ui/toast";

const { canScrollNext, canScrollPrev, scrollNext, scrollPrev } = useCarousel();
const { createNote } = useNotes();
const { toast } = useToast();

function handleCreateNote(_event: Event) {
	createNote()
		.then(() => {
			toast({
				title: "Note were created succesfully",
			});
		})
		.catch(() => {
			toast({
				title: "An error ocurred while creating the note",
				description: "Please try again after some time",
			});
		});
}
</script>

<template>
	<div class="flex justify-between w-full mt-4">
		<Button @click="handleCreateNote"> New Note </Button>

		<div>
			<Button
				variant="outline"
				:disabled="!canScrollPrev"
				@click="scrollPrev()"
			>
				<Icon name="mdi:chevron-left" />
			</Button>
			<Button
				variant="outline"
				:disabled="!canScrollNext"
				@click="scrollNext()"
			>
				<Icon name="mdi:chevron-right" />
			</Button>
		</div>
	</div>
</template>
