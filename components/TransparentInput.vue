<script lang="ts" setup>
import { nextTick, onMounted, useTemplateRef, watch } from "vue";

type Props = {
  placeholder?: string;
};

const { placeholder } = defineProps<Props>();
const text = defineModel<string | number>({ required: true });

const input = useTemplateRef<HTMLParagraphElement>("input");

const onInput = (event: Event) => {
  const target = event.target as HTMLDivElement;
  text.value = target.innerText?.trim() || "";
};

const onPaste = (event: ClipboardEvent) => {
  event.preventDefault();

  const clipboard = event.clipboardData;
  if (!clipboard) return;

  const raw = clipboard.getData("text/plain");
  if (!raw) return;

  const text = raw.trimEnd();
  document.execCommand("insertText", false, text);
};

watch(text, async (value) => {
  await nextTick();
  if (!input.value) return;
  if (String(value).trim() === input.value.innerText.trim()) return;
  input.value.innerText = String(value);
});

onMounted(async () => {
  await nextTick();
  if (!input.value) return;
  input.value.innerText = String(text.value) || "‎"; // Invisible character to set the height
});
</script>

<template>
  <div class="relative">
    <p
      ref="input"
      contenteditable
      class="outline-none resize-none min-w-[2ch]"
      @input="onInput"
      @paste="onPaste"
    />
    <p
      v-if="!text && placeholder"
      class="absolute top-0 left-0 text-gray-500 pointer-events-none"
    >
      {{ placeholder }}
    </p>
  </div>
</template>
