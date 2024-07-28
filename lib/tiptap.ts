import TipTapUnderline from "@tiptap/extension-underline";
import TipTapFontFamily from "@tiptap/extension-font-family";
import TipTapTextStyle from "@tiptap/extension-text-style";

const extensions = [
	/**
	 * ! Included Extensions
	 *
	 * * Blockquote
	 * * BulletList
	 * * Document
	 * * HardBreak
	 * * Heading
	 * * HorizontalRule
	 * * ListItem
	 * * OrderedList
	 * * Paragraph
	 * * Text
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
	 * * FontFamily
	 * * TextStyle
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
	}),
	TipTapUnderline,
	TipTapFontFamily,
	TipTapTextStyle,
];

export { extensions };