import { DefaultUser } from "next-auth";

declare module "next-auth" {
	interface Session {
		user: User & DefaultUser;
	}

	interface User {
		id: string;
	}
}
