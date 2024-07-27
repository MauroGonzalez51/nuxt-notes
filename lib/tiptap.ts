import Underline from "@tiptap/extension-underline";

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
	 *
	 */
	TipTapStarterKit.configure({}),
	Underline,
];

export { extensions };
