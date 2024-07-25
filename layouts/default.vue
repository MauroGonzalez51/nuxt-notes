<template>
	<div class="min-h-screen w-screen">
		<div class="h-14 border-b border-gray-200 dark:border-slate-700">
			<LayoutNavbar />
		</div>
		<main class="h-[calc(100dvh-3.5rem)] bg-slate-50 dark:bg-gray-900">
			<LayoutContent>
				<slot />
			</LayoutContent>
		</main>
	</div>
</template>
