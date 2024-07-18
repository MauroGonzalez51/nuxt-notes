<script setup lang="ts">
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const colorSchema = useColorMode();

const onUpdate = (value: string) => (colorSchema.preference = value);

console.log(colorSchema.value);
</script>

<template>
	<Select :onUpdate:modelValue="onUpdate">
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
