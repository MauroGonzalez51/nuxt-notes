<script setup lang="ts">
import { useToast } from "~/components/ui/toast";

definePageMeta({
	auth: false,
});

const { toast } = useToast();
</script>

<template>
	<div>
		<span class="text-3xl font-inter">HomePage</span>
		<Icon name="uil:github" />
		<!-- <Button
			@click="
				() => {
					console.log('Toast clicked')
					toast({
						title: 'Scheduled: Catch up',
						description: 'Friday, February 10, 2023 at 5:57 PM',
					});
				}
			"
		>
			Add to calendar
		</Button> -->
	</div>
</template>
