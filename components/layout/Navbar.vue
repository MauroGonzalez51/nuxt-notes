<script setup lang="ts">
interface navbarlink {
	label: string;
	to: string;
	icon: string;
}

const items: navbarlink[] = [
	{
		label: "Home",
		to: "/",
		icon: "mdi:home",
	},
];
</script>

<template>
	<header class="h-full bg-slate-50 dark:bg-gray-900 flex items-center">
		<nav class="mx-20 grid grid-cols-2 w-full justify-between items-center">
			<div class="inline-flex items-center justify-start gap-4 h-full">
				<NuxtLink class="inline-flex items-center gap-1 font-bold">
					<Icon name="mdi:note" class="text-2xl" />
					<span class="text-lg">Notes</span>
				</NuxtLink>
				<div class="inline-flex items-center h-full text-gray-500/80 dark:text-gray-300 ">
					<NuxtLink v-for="item in items" :to="item.to">
						{{ item.label }}
					</NuxtLink>
				</div>
			</div>

			<div class="inline-flex items-end justify-end gap-4">
				<NavbarUserMenu />
				<NavbarColorSchema />
			</div>
		</nav>
	</header>
</template>
