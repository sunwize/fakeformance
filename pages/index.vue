<script lang="ts" setup>
import html2canvas from "html2canvas-pro";
import confetti from "canvas-confetti";

const metrics = useTemplateRef<HTMLDivElement>("metrics");
const posthog = usePosthog();

const isLoading = ref(false);
const showWaterMark = ref(false);

const fireConfetti = (origin: { x: number; y: number }) => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin,
  });
};

const downloadImage = async (event: MouseEvent) => {
  posthog.capture("download_image");

  if (!metrics.value) return;

  showWaterMark.value = true;
  await nextTick();

  isLoading.value = true;
  const canvas = await html2canvas(metrics.value, {
    backgroundColor: null,
    scale: 2,
  });
  fireConfetti({
    x: event.pageX / window.innerWidth,
    y: event.pageY / window.innerHeight,
  });
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "fakeformance.png";
  link.click();
  link.remove();
  isLoading.value = false;
  showWaterMark.value = false;
};
</script>

<template>
  <div class="flex-1 text-center px-3 py-16 md:py-44">
    <div class="flex justify-center mb-16">
      <h2
        class="relative text-5xl md:text-6xl font-inter font-black leading-16 md:leading-tight tracking-tight"
      >
        You are the
        <span class="relative inline-block ml-2 mr-1">
          <span
            class="absolute -left-3.5 top-1 md:top-0.5 h-[4rem] md:h-[4.75rem] rounded-2xl -inset-x-2 -rotate-3 bg-green-200"
          />
          <span class="relative">judge</span>
        </span>
        now
      </h2>
    </div>

    <p class="font-semibold text-gray-500 mb-4">Just click and edit.</p>

    <div class="flex flex-col items-center justify-center">
      <div class="shadow-medium rounded-2xl">
        <article
          ref="metrics"
          class="relative bg-white rounded-2xl ring-1 ring-gray-200 px-16 py-12"
        >
          <Metrics />

          <div v-if="showWaterMark">
            <p
              class="absolute left-1/2 top-3 -translate-x-1/2 text-gray-400 text-[0.5rem]"
            >
              Made with fakeformance
            </p>
          </div>
        </article>
      </div>
      <div class="flex justify-end mt-6">
        <button
          color="neutral"
          size="xl"
          class="bg-gray-900 disabled:bg-gray-700 text-white rounded-xl cursor-pointer not-disabled:active:scale-95 transition-all disabled:cursor-not-allowed select-none px-6 py-3"
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
