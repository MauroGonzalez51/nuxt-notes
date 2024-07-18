import { NuxtAuthHandler } from "#auth";
import GithubProvider from "next-auth/providers/github";

const { AUTH_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } =
	useRuntimeConfig();

export default NuxtAuthHandler({
	secret: AUTH_SECRET,
	providers: [
		// @ts-expect-error
		GithubProvider.default({
			clientId: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET,
		}),
	],
});
