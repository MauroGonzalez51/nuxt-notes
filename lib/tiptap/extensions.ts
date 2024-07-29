import TipTapUnderline from "@tiptap/extension-underline";
import TipTapFontFamily from "@tiptap/extension-font-family";
import TipTapTextStyle from "@tiptap/extension-text-style";
import TipTapImage from "@tiptap/extension-image";
import TipTapTextSize from "@/lib/tiptap/TextSize";
import TipTapTextColor from "@/lib/tiptap/TextColor";

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
		heading: {
			levels: [1, 2, 3],
		},
	}),
	TipTapUnderline,
	TipTapFontFamily,
	TipTapTextStyle,
	TipTapImage.configure({
		HTMLAttributes: {
			class: "w-full block rounded-md my-6",
		},
	}),
	TipTapTextSize,
	TipTapTextColor,
];

export { extensions };
