// See https://svelte.dev/docs/kit/types#app.d.ts

import type { JwtPayload } from "jsonwebtoken";
interface User {
	id: number,
	firstName: string
	lastName: string
	isAdmin: boolean
}
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user:User | null;
			token: string;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
