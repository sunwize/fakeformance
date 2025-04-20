<script lang="ts" setup>
import html2canvas from "html2canvas-pro";

const metrics = useTemplateRef<HTMLDivElement>("metrics");

const isLoading = ref(false);

const downloadImage = async () => {
  if (!metrics.value) return;

  isLoading.value = true;
  const canvas = await html2canvas(metrics.value, {
    backgroundColor: null,
    scale: 2,
  });
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "fakeformance.png";
  link.click();
  link.remove();
  isLoading.value = false;
};
</script>

<template>
  <div class="flex-1 text-center bg-stone-50 px-3 py-16 md:py-44">
    <div class="flex justify-center">
      <h2
        class="relative text-6xl font-inter font-black leading-tight tracking-tight mb-8"
      >
        Give yourself a
        <span class="relative ml-1">
          <span
            class="absolute -left-2 bottom-0 h-[4.5rem] rounded-2xl -inset-x-2 -rotate-3 bg-green-200"
          />
          <span class="relative">boost!</span>
        </span>
      </h2>
    </div>

    <p
      class="font-theme font-semibold text-lg tracking-tight text-gray-500 mb-16"
    >
      Edit, Download, Done.
    </p>

    <div class="flex flex-col items-center justify-center">
      <div class="shadow-medium rounded-2xl">
        <article
          ref="metrics"
          class="bg-white rounded-2xl ring-1 ring-gray-200 px-16 pt-12 pb-4"
        >
          <Metrics />

          <div class="mt-8">
            <p class="text-gray-400 text-[0.5rem]">Made with fakeformance</p>
          </div>
        </article>
      </div>
      <div class="flex justify-end mt-6">
        <button
          color="neutral"
          size="xl"
          class="bg-gray-900 disabled:bg-gray-700 text-white rounded-xl cursor-pointer not-disabled:active:scale-95 transition-all disabled:cursor-not-allowed px-6 py-3"
          :disabled="isLoading"
          @click="downloadImage"
        >
          <span class="text-xl font-medium">Download</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shadow-medium {
  box-shadow: 1px 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
