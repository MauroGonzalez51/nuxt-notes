<template>
	<div class="min-h-screen w-screen">
		<template class="h-24">
			<LayoutNavbar />
		</template>
		<main class="h-[calc(100dvh-6rem)]">
			<slot />
		</main>
	</div>
</template>
