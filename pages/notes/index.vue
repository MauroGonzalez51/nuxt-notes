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
	<div class="flex justify-between items-center">
		<h1 class="font-semibold text-lg">All notes</h1>
		<Button @click="handleCreateNote"> New Note </Button>
	</div>

	<div
		v-if="notes"
		class="mt-4 flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 "
	>
		<HomeNoteCard v-for="note in slicedNotes" :note="note" />
	</div>

	<Pagination class="mt-4">
		<PaginationList class="flex items-center">
			<PaginationFirst
				:disabled="currentPage === 1"
				@click="handlePageChange(1)"
			/>
			<PaginationPrev
				:disabled="currentPage === 1"
				@click="handlePageChange(currentPage - 1)"
			/>

			<template v-for="(item, index) in paginationItems" :key="index">
				<PaginationListItem
					v-if="item.type === 'page'"
					:value="Number(item.value)"
					as-child
				>
					<Button
						class="w-10 h-10 p-0"
						:variant="
							item.value === currentPage ? 'default' : 'outline'
						"
						@click="handlePageChange(Number(item.value))"
					>
						{{ item.value }}
					</Button>
				</PaginationListItem>
				<PaginationEllipsis
					v-else-if="item.type === 'ellipsis'"
					:index="index"
				/>
			</template>

			<PaginationNext
				:disabled="currentPage === totalPages"
				@click="handlePageChange(currentPage + 1)"
			/>
			<PaginationLast
				:disabled="currentPage === totalPages"
				@click="handlePageChange(totalPages)"
			/>
		</PaginationList>
	</Pagination>
</template>
