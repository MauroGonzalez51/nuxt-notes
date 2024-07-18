<script setup lang="ts">
interface navbarlink {
	label: string;
	to: string;
	icon: string;
}

const items: navbarlink[] = [
	{
		label: "home",
		to: "/",
		icon: "mdi:home",
	},
];
</script>

<template>
	<header class="h-24 bg-secondary flex items-center">
		<nav class="mx-20 grid grid-cols-2 w-full justify-between items-center">
			<div class="inline-flex items-center gap-2">
				<Icon name="mdi:note" class="text-4xl text-gray-800" />
				<div class="capitalize text-3xl font-bold text-gray-800">
					Notes
				</div>
			</div>

			<div class="flex items-center justify-end gap-4">
				<div
					v-for="item in items"
					:key="item.label"
					class="flex flex-col items-center"
				>
					<Icon :name="item.icon" class="text-3xl md:hidden" />
					<NuxtLink
						:to="item.to"
						class="capitalize hidden md:block text-xl hover:underline cursor-pointer font-bold"
					>
						{{ item.label }}
					</NuxtLink>
				</div>
				<NavbarUserMenu />
			</div>
		</nav>
	</header>
</template>
