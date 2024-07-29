export type { Note } from "@prisma/client";

export interface ButtonAction {
	icon?: string;
	action: () => unknown;
	disabled?: () => boolean;
	tooltip: string;
}

export interface SelectAction {
	label?: string;
	icon?: string;
	value: string;
}
