<script setup lang="ts">
import { useCarousel } from "@/components/ui/carousel";

const { canScrollNext, canScrollPrev, scrollNext, scrollPrev } = useCarousel();
</script>

<template>
	<div class="flex justify-between mt-4">
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
