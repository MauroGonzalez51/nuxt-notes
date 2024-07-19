<script setup lang="ts">
import { Toggle } from "@/components/ui/toggle";
import { useToast } from "@/components/ui/toast";

const colorMode = useColorMode();
const { toast } = useToast();

const onUpdate = (_value: boolean) => {
	if (colorMode.value === "light") colorMode.preference = "dark";
	if (colorMode.value === "dark") colorMode.preference = "light";

	toast({
		title: `Changed to ${colorMode.preference}`,
		description: "Press again to revert the changes",
	});
};
</script>

<template>
	<Toggle variant="outline" class="bg-gray-300/50 hover:bg-gray-300/80" :onUpdate:pressed="onUpdate">
		<Icon
			name="mdi:white-balance-sunny"
			v-if="colorMode.preference === 'light'"
		/>
		<Icon name="mdi:weather-night" v-if="colorMode.preference === 'dark'" />
	</Toggle>
</template>
