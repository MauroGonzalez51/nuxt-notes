<script setup lang="ts">
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const { editor, note } = useEdit();

interface ButtonAction {
	icon?: string;
	action: () => unknown;
	disabled?: () => boolean;
	active?: () => boolean;
	tooltip: string;
}

interface SelectAction {
	label?: string;
	icon?: string;
	value: string;
}

const basicButtons: ButtonAction[] = [
	{
		icon: "ic:baseline-format-bold",
		action: () => editor.value?.chain().focus().toggleBold().run(),
		disabled: () => !editor.value?.can().chain().focus().toggleBold().run(),
		active: () => editor.value?.isActive("bold") || false,
		tooltip: "Bold",
	},
	{
		icon: "ic:baseline-format-italic",
		action: () => editor.value?.chain().focus().toggleItalic().run(),
		disabled: () =>
			!editor.value?.can().chain().focus().toggleItalic().run(),
		active: () => editor.value?.isActive("italic") || false,
		tooltip: "Italic",
	},
	{
		icon: "ic:baseline-format-underlined",
		action: () => editor.value?.chain().focus().toggleUnderline().run(),
		disabled: () =>
			!editor.value?.can().chain().focus().toggleUnderline().run(),
		active: () => editor.value?.isActive("underline") || false,
		tooltip: "Underline",
	},
	{
		icon: "ic:baseline-format-strikethrough",
		action: () => editor.value?.chain().focus().toggleStrike().run(),
		disabled: () =>
			!editor.value?.can().chain().focus().toggleStrike().run(),
		active: () => editor.value?.isActive("strike") || false,
		tooltip: "Strike",
	},
];

const fontFamily: SelectAction[] = [
	{
		label: "Inter",
		value: "Inter",
	},
	{
		label: "Comic Sans",
		value: "Comic Sans MS, Comic Sans",
	},
	{
		label: "Serif",
		value: "serif",
	},
	{
		label: "Monospace",
		value: "monospace",
	},
	{
		label: "Cursive",
		value: "cursive",
	},
];

const items: ButtonAction[] = [
	{
		action: () => editor.value?.chain().focus().toggleBulletList().run(),
		tooltip: "Toggle Bullet List",
		icon: "material-symbols:format-list-bulleted-rounded",
	},
	{
		action: () => editor.value?.chain().focus().toggleOrderedList().run(),
		tooltip: "Toggle Ordered List",
		icon: "flowbite:ordered-list-outline",
	},
	{
		action: () => editor.value?.chain().focus().setHorizontalRule().run(),
		icon: "material-symbols:horizontal-rule-rounded",
		tooltip: "Set Horizontal Rule",
	},
	{
		action: () => editor.value?.chain().focus().toggleCodeBlock().run(),
		icon: "material-symbols:code-blocks-outline",
		tooltip: "Toggle Code Block",
	},
	{
		action: () =>
			editor.value?.chain().focus().toggleHeading({ level: 1 }).run(),
		active: () => !editor.value?.isActive("heading", { level: 1 }) || false,
		icon: "hugeicons:heading-01",
		tooltip: "Set Heading level to 1",
	},
	{
		action: () =>
			editor.value?.chain().focus().toggleHeading({ level: 2 }).run(),
		active: () => !editor.value?.isActive("heading", { level: 2 }) || false,
		icon: "hugeicons:heading-02",
		tooltip: "Set Heading level to 2",
	},
	{
		action: () =>
			editor.value?.chain().focus().toggleHeading({ level: 3 }).run(),
		active: () => !editor.value?.isActive("heading", { level: 3 }) || false,
		icon: "hugeicons:heading-03",
		tooltip: "Set Heading level to 3",
	},
	{
		action: () => editor.value?.chain().focus().toggleBlockquote().run(),
		icon: "mingcute:blockquote-line",
		tooltip: "Toggle Blockquote",
	},
];

function addImage(event: Event) {
	if (!(event instanceof SubmitEvent)) return;
	if (!(event.target instanceof HTMLFormElement)) return;

	const { elements } = event.target;
	const inputElement = elements.namedItem("url");

	if (!(inputElement instanceof HTMLInputElement)) return;

	const URL = inputElement.value;

	if (!URL) return;

	editor.value?.chain().focus().setImage({ src: URL }).run();
}
</script>

<template>
	<div class="flex flex-col gap-4">
		<div
			v-if="editor"
			class="border border-primary/10 p-4 rounded-md shadow flex gap-4 flex-wrap"
		>
			<TooltipProvider v-for="button in basicButtons">
				<Tooltip>
					<TooltipTrigger>
						<Button
							@click="button.action"
							:class="{ 'is-active': button.active }"
							:disabled="!button.disabled"
							variant="outline"
							size="sm"
						>
							<Icon
								v-if="button.icon"
								:name="button.icon"
								class="text-xl"
							/>
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>{{ button.tooltip }}</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<Select
				:onUpdate:modelValue="
					(payload) =>
						editor?.chain().focus().setFontFamily(payload).run()
				"
				:defaultValue="fontFamily[0].value"
			>
				<SelectTrigger class="w-48 max-w-md flex-grow">
					<SelectValue placeholder="Font" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem v-for="item in fontFamily" :value="item.value">
						{{ item.label }}
					</SelectItem>
				</SelectContent>
			</Select>

			<TooltipProvider v-for="item in items">
				<Tooltip>
					<TooltipTrigger>
						<Button
							@click="item.action"
							:class="{ 'is-active': item?.active }"
							variant="outline"
							size="sm"
						>
							<Icon
								v-if="item.icon"
								:name="item.icon"
								class="text-xl"
							/>
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>{{ item.tooltip }}</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<Dialog>
				<DialogTrigger>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Button variant="outline" size="sm">
									<Icon
										name="material-symbols:add-photo-alternate-outline"
										class="text-xl"
									/>
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Add an Image</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add an Image</DialogTitle>
						<DialogDescription>
							The image will be displayed in the note. Paste the
							URL below.
						</DialogDescription>
					</DialogHeader>

					<form class="grid flex-1 gap-3" @submit.prevent="addImage">
						<Label for="url" class="sr-only"> URL </Label>
						<Input
							name="url"
							placeholder="https://randomimage.com"
						/>
						<DialogClose as-child>
							<Button type="submit"> Add </Button>
						</DialogClose>
					</form>
				</DialogContent>
			</Dialog>

			<EditAutoSave />
		</div>

		<Input
			v-if="note"
			:defaultValue="note.title"
			class="max-w-md shadow"
			placeholder="Note title ..."
			@update:modelValue="(payload: string | number) => {
				if (!note) return;
				note.title = payload?.toString();
			}"
		/>

		<TipTapEditorContent :editor="editor" />
	</div>
</template>

<style lang="css">
.tiptap h1 {
	@apply font-bold text-3xl;
}

.tiptap h2 {
	@apply font-semibold text-2xl;
}

.tiptap h3 {
	@apply text-xl;
}

.tiptap blockquote {
	@apply px-12 my-4 text-justify
}
</style>
