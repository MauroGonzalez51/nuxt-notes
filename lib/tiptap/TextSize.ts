import { Mark, mergeAttributes } from "@tiptap/core";

export interface TextSizeOptions {
	HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		textSize: {
			setTextSize: (size: string) => ReturnType;
			unsetTextSize: () => ReturnType;
		};
	}
}

export const TextSize = Mark.create<TextSizeOptions>({
	name: "textSize",

	addOptions() {
		return {
			HTMLAttributes: {},
		};
	},

	addAttributes() {
		return {
			size: {
				default: null,
				parseHTML: (element) => element.style.fontSize,
				renderHTML: (attributes) => {
					if (!attributes.size) return {};

					return {
						style: `font-size: ${attributes.size}px`,
					};
				},
			},
		};
	},

	parseHTML() {
		return [
			{
				tag: "span[style*=font-size]",
				getAttrs: (element) => {
					const fontSize = (element as HTMLElement).style.fontSize;
					return fontSize ? { size: fontSize } : false;
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
			setTextSize:
				(size: string) =>
				({ commands }) => {
					return commands.setMark(this.name, { size });
				},
			unsetTextSize:
				() =>
				({ commands }) => {
					return commands.unsetMark(this.name);
				},
		};
	},
});

export default TextSize;
