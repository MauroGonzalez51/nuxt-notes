<script setup lang="ts">
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { useToast } from "@/components/ui/toast";
import { capitalize } from "vue";

const colorSchema = useColorMode();
const { toast } = useToast();

const onUpdate = (value: string) => {
	colorSchema.preference = value;
	toast({
		title: `Schema mode changed to ${capitalize(colorSchema.preference)}`,
	});
};
</script>

<template>
	<Select
		:onUpdate:modelValue="onUpdate"
		:defaultValue="colorSchema.preference"
	>
		<SelectTrigger class="max-w-36">
			<SelectValue placeholder="Color schema" />
		</SelectTrigger>
		<SelectContent>
			<SelectItem value="light">Light</SelectItem>
			<SelectItem value="dark">Dark</SelectItem>
			<SelectItem value="system">System</SelectItem>
		</SelectContent>
	</Select>
</template>
