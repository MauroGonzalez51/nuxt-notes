<script setup lang="ts">
import { Switch } from "@/components/ui/switch";

const { autoSave, saveNote } = useEdit();
</script>

<template>
	<div class="flex items-center space-x-2 text-sm">
		<Switch
			:defaultChecked="autoSave"
			@update:checked="(payload: boolean) => (autoSave = payload)"
			id="autoSave"
		/>
		<label for="autoSave">Auto Save</label>
	</div>

	<Button variant="outline" @click="saveNote()">Save Now</Button>
</template>
