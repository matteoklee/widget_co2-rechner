<script setup>
import { cn } from '@/lib/utils';
import { ProgressIndicator, ProgressRoot } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  modelValue: { type: [Number, null], required: false, default: 0 },
  max: { type: Number, required: false },
  getValueLabel: { type: Function, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <ProgressRoot
    v-bind="delegatedProps"
    :class="
      cn(
        'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
        props.class,
      )
    "
  >
    <ProgressIndicator
      class="h-full w-full flex-1 transition-all  bg-gradient-to-r from-green-400 to-green-600"
      :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`"
    /> <!-- bg-primary -->
  </ProgressRoot>
</template>
