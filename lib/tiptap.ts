import TipTapUnderline from "@tiptap/extension-underline";
import TipTapFontFamily from "@tiptap/extension-font-family";
import TipTapTextStyle from "@tiptap/extension-text-style";

const extensions = [
	/**
	 * ! Included Extensions
	 *
	 * * Blockquote ✔️
	 * * BulletList ✔️
	 * * CodeBlock ✔️
	 * * Document [ CORE ]: Root
	 * * HardBreak
	 * * Heading
	 * * HorizontalRule ✔️
	 * * ListItem [ Required ]: BulletList OrderedList
	 * * OrderedList ✔️
	 * * Paragraph [ CORE ]: Root
	 * * Text [ CORE ]: Root
	 *
	 * * Bold ✔️
	 * * Code
	 * * Italic ✔️
	 * * Strike ✔️
	 *
	 * * Dropcursor
	 * * Gapcursor
	 * * History
	 *
	 * * Underline ✔️
	 * * FontFamily ✔️
	 * * TextStyle [ Required ]: FontFamily
	 *
	 */
	TipTapStarterKit.configure({
		bulletList: {
			keepMarks: true,
			keepAttributes: true,
			HTMLAttributes: {
				class: "list-disc pl-6",
			},
		},
		orderedList: {
			HTMLAttributes: {
				class: "list-decimal pl-6",
			},
		},
		horizontalRule: {
			HTMLAttributes: {
				class: "border bg-primary rounded",
			},
		},
		codeBlock: {
			HTMLAttributes: {
				class: "bg-gray-500/10  p-4 rounded-lg shadow",
			},
		},
		blockquote: {
			HTMLAttributes: {
				class: "px-12 my-4 text-justify",
			},
		},
		heading: {
			levels: [1, 2, 3],
		},
	}),
	TipTapUnderline,
	TipTapFontFamily,
	TipTapTextStyle,
];

export { extensions };
