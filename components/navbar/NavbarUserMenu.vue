<script setup lang="ts">
interface UserLinks {
	label: string;
	icon: string;
	to: string;
}

const items: UserLinks[] = [
	{
		label: "Profile",
		icon: "mdi:account-box",
		to: "/dashboard",
	},
];
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger
			class="flex items-center text-2xl border-primary border rounded-md p-1"
		>
			<Icon name="mdi:user" />
		</DropdownMenuTrigger>
		<DropdownMenuContent>
			<DropdownMenuLabel>My Account</DropdownMenuLabel>
			<DropdownMenuSeparator class="bg-gray-500/20" />
			<DropdownMenuItem v-for="item in items">
				<NuxtLink
					:to="item.to"
					class="h-full w-full inline-flex items-center gap-2"
				>
					<Icon :name="item.icon" class="text-lg" />
					{{ item.label }}
				</NuxtLink>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
