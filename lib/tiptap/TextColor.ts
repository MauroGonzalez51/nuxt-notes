import { Mark, mergeAttributes } from "@tiptap/core";

export interface TextColorOptions {
	HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		textColor: {
			setTextColor: (color: string) => ReturnType;
		};
	}
}

export const TextColor = Mark.create<TextColorOptions>({
	name: "textColor",

	addOptions() {
		return {
			HTMLAttributes: {},
		};
	},

	addAttributes() {
		return {
			color: {
				default: null,
				parseHTML: (element) => element.style.color,
				renderHTML: (attributes) => {
					if (!attributes.color) return {};

					return {
						style: `color: ${attributes.color}`,
					};
				},
			},
		};
	},

	parseHTML() {
		return [
			{
				tag: "span[style*=color]",
				getAttrs: (element) => {
					const color = (element as HTMLElement).style.color;
					return color ? { color } : false;
				},
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return [
			"span",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
			0,
		];
	},

	addCommands() {
		return {
			setTextColor:
				(color: string) =>
				({ commands }) => {
					return commands.setMark(this.name, { color });
				},
		};
	},
});

export default TextColor;
