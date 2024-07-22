import { NuxtAuthHandler } from "#auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const { AUTH_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } =
	useRuntimeConfig();

export default NuxtAuthHandler({
	secret: AUTH_SECRET,
	adapter: PrismaAdapter(prisma),
	providers: [
		// @ts-expect-error
		GithubProvider.default({
			clientId: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET,
		}),
	],
	callbacks: {
		session: ({ session, user }) => {
			session.user.id = user.id;
			return session;
		},
	},
});
