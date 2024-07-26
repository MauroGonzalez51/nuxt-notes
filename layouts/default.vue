<template>
	<div class="flex flex-col flex-grow">
		<div class="h-14 border-b border-gray-200 dark:border-slate-700">
			<LayoutNavbar />
		</div>

		<LayoutContent>
			<slot />
		</LayoutContent>
	</div>
</template>
