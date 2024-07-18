<script setup lang="ts">
interface UserLinks {
	label: string;
	icon: string;
	to: string;
}

const { getProviders, signIn, signOut, status, data } = useAuth();

const items: UserLinks[] = [
	{
		label: "Profile",
		icon: "mdi:account-box",
		to: "/dashboard",
	},
];

const providers = await getProviders();

const loggedIn = computed(() => status.value === "authenticated");

const src = data.value?.user?.image || "/default.png";
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger v-if="loggedIn">
			<NuxtImg :src="src" class="size-10 rounded-full border-2 border-primary " />
		</DropdownMenuTrigger>

		<DropdownMenuTrigger
			v-else
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
					<span class="whitespace-normal">
						{{ item.label }}
					</span>
				</NuxtLink>
			</DropdownMenuItem>

			<DropdownMenuSeparator />

			<DropdownMenuItem v-for="provider in providers" :key="provider?.id">
				<button
					class="w-full h-full"
					@click="signIn(provider?.id)"
					:class="'inline-flex items-center gap-2'"
				>
					<Icon
						:name="`mdi:${provider?.name.toLowerCase()}`"
						class="text-lg"
					/>
					<span class="whitespace-normal">
						Sign in with {{ provider?.name }}
					</span>
				</button>
			</DropdownMenuItem>
			<DropdownMenuItem v-if="loggedIn">
				<button
					class="inline-flex items-center gap-2"
					@click="signOut()"
				>
					<Icon name="mdi:exit-to-app" class="text-lg" />
					<span class="whitespace-normal">Sign out</span>
				</button>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
