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

const paginationItems = computed(() => {
	const items = [];
	const maxVisiblePages = 3;

	for (let i = 1; i <= totalPages.value; i++) {
		if (
			i === 1 ||
			i === totalPages.value ||
			(i >= currentPage.value - Math.floor(maxVisiblePages / 2) &&
				i <= currentPage.value + Math.floor(maxVisiblePages / 2))
		) {
			items.push({ type: "page", value: i });
		} else if (
			items[items.length - 1]?.type !== "ellipsis" &&
			items[items.length - 1]?.value !== i - 1
		) {
			items.push({ type: "ellipsis", value: "..." });
		}
	}

	return items;
});

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
			:total="totalPages"
			:itemsPerPage="itemsPerPage"
			:onUpdate:page="(value) => handlePageChange(value)"
		>
			<PaginationList class="flex items-center">
				<PaginationFirst :disabled="currentPage === 1" />
				<PaginationPrev :disabled="currentPage === 1" />

				<template v-for="(item, index) in paginationItems" :key="index">
					<PaginationListItem
						v-if="item.type === 'page'"
						:value="Number(item.value)"
						as-child
					>
						<Button
							class="w-10 h-10 p-0"
							:variant="
								item.value === currentPage
									? 'default'
									: 'outline'
							"
						>
							{{ item.value }}
						</Button>
					</PaginationListItem>
					<PaginationEllipsis
						v-else-if="item.type === 'ellipsis'"
						:index="index"
					/>
				</template>

				<PaginationNext :disabled="currentPage === totalPages" />
				<PaginationLast :disabled="currentPage === totalPages" />
			</PaginationList>
		</Pagination>
	</div>
</template>
