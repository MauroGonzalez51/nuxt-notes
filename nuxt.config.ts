// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	modules: [
		"@nuxtjs/tailwindcss",
		"@nuxt/fonts",
		"@nuxt/icon",
		"shadcn-nuxt",
		"@sidebase/nuxt-auth",
		"@nuxt/image",
		"@nuxtjs/color-mode",
	],
	runtimeConfig: {
		AUTH_SECRET: process.env.AUTH_SECRET,
		GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
		GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
	},
	colorMode: {
		classSuffix: "",
	},
	shadcn: {
		prefix: "",
		componentDir: "./components/ui",
	},
	auth: {
		isEnabled: true,
		globalAppMiddleware: true,
	},
});
