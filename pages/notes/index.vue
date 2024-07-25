<script setup lang="ts">
import {
	Pagination,
	PaginationList,
	PaginationListItem,
	PaginationNext,
	PaginationPrev,
} from "@/components/ui/pagination";

definePageMeta({
	middleware: ["auth"],
});

const { notes } = useNotes();

const itemsPerPage = 8;
const currentPage = ref<number>(1);

const totalPages = computed(() =>
	Math.ceil((notes.value?.length || 1) / itemsPerPage),
);

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
const endIndex = computed(() => startIndex.value + itemsPerPage);

const slicedNotes = computed(() =>
	notes.value?.slice(startIndex.value, endIndex.value),
);

const handlePageChange = (page: number) => {
	if (page > 0 && page <= totalPages.value) {
		currentPage.value = page;
	}
};
</script>

<template>
	<div class="flex justify-between">
		<h1 class="font-semibold text-lg">
			All notes | Total Count: {{ notes?.length }} | currentPage:
			{{ currentPage }} / Total Pages: {{ totalPages }}
		</h1>
		<Button @click="handleCreateNote"> New Note </Button>
	</div>
	<div v-if="notes" class="mt-4 w-full grid grid-cols-4 gap-6">
		<HomeNoteCard v-for="note in slicedNotes" :key="note.id" :note="note" />
	</div>
	<div>
		<Pagination
			v-slot="{ page }"
			:total="totalPages"
			:itemsPerPage="itemsPerPage"
			:onUpdate:page="(value) => handlePageChange(value)"
		>
			<PaginationList v-slot="{ items }" class="flex items-center">
				<PaginationFirst :disabled="currentPage === 1" />
				<PaginationPrev :disabled="currentPage === 1" />

				<template v-for="(item, index) in items">
					<PaginationListItem
						v-if="item.type === 'page'"
						:key="index"
						:value="item.value"
						as-child
					>
						<Button
							class="w-10 h-10 p-0"
							:variant="
								item.value === page ? 'default' : 'outline'
							"
						>
							{{ item.value }}
						</Button>
					</PaginationListItem>
					<PaginationEllipsis
						v-else
						:key="item.type"
						:index="index"
					/>
				</template>

				<PaginationNext :disabled="currentPage === totalPages" />
				<PaginationLast :disabled="currentPage === totalPages" />
			</PaginationList>
		</Pagination>
	</div>
</template>
