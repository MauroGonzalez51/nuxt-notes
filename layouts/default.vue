<template>
	<div class="min-h-screen w-screen">
		<div class="h-24">
			<LayoutNavbar />
		</div>
		<main class="h-[calc(100dvh-6rem)]">
			<slot />
		</main>
	</div>
</template>
