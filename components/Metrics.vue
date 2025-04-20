<script setup lang="ts">
const size = 100;
const radius = 45;
const circumference = 2 * Math.PI * radius;

const metrics = ref([
  { label: "Performance", value: 90 },
  { label: "Accessibility", value: 76 },
  { label: "Best Practices", value: 100 },
  { label: "SEO", value: 82 },
]);

const getCircleColor = (value: number) => {
  if (value >= 90) {
    return "var(--color-green-400)";
  } else if (value >= 50) {
    return "var(--color-orange-400)";
  } else {
    return "var(--color-red-500)";
  }
};

const getBackgrounColor = (value: number) => {
  if (value >= 90) {
    return "var(--color-green-50)";
  } else if (value >= 50) {
    return "var(--color-orange-50)";
  } else {
    return "var(--color-red-50)";
  }
};

const getTextColor = (value: number) => {
  if (value >= 90) {
    return "var(--color-green-700)";
  } else if (value >= 50) {
    return "var(--color-orange-700)";
  } else {
    return "var(--color-red-700)";
  }
};
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-10">
    <div
      v-for="(m, index) in metrics"
      :key="index"
      class="flex flex-col items-center"
    >
      <div class="relative">
        <svg
          :width="size"
          :height="size"
          viewBox="0 0 100 100"
          class="-rotate-90"
        >
          <circle
            :fill="getBackgrounColor(m.value)"
            :stroke="getBackgrounColor(m.value)"
            stroke-width="7"
            cx="50"
            cy="50"
            r="45"
          />
          <circle
            stroke-width="7"
            :fill="getBackgrounColor(m.value)"
            cx="50"
            cy="50"
            r="45"
            stroke-linecap="round"
            :stroke="getCircleColor(m.value)"
            :style="{
              'stroke-dasharray': circumference,
              'stroke-dashoffset': Math.max(
                (1 - m.value / 100) * circumference,
                0
              ),
            }"
          />
        </svg>
        <div
          class="absolute top-0 left-0 w-full h-full flex items-center justify-center"
        >
          <TransparentInput
            v-model="m.value"
            class="font-mono text-4xl font-medium tracking-tight"
            :style="{
              color: getTextColor(m.value),
            }"
          />
        </div>
      </div>
      <TransparentInput
        v-model="m.label"
        class="font-medium text-lg tracking-tight mt-3"
      />
    </div>
  </div>
</template>
