<template>
  <div class="space-y-4">
    <Label>Transportmittel</Label>
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <Button
          v-for="mode in transportModes"
          :key="mode"
          :variant="data.transportMode === mode ? 'default' : 'outline'"
          class="h-24 flex flex-col items-center justify-center"
          @click="selectTransportMode(mode)"
      >
        <component
            :is="icons[mode]"
            class="h-8 w-8 mb-2"
        />
        {{ capitalize(mode) }}
      </Button>
    </div>
  </div>
</template>

<script>
import Label from "@/components/ui/label/Label.vue";
import Button from "@/components/ui/button/Button.vue";
import {Car, Bus, Plane, Train} from "lucide-vue-next";

export default {
  name: "CalculationTransportMedium",
  components: {Button, Label, Car, Bus, Plane, Train},
  props: {
    advancedCalculation: Boolean,
    calculationData: Object,
  },
  emits: ["update-data", "next"],
  data() {
    return {
      data: { ...this.calculationData },
      transportModes: ["car", "bus", "train", "plane"],
      icons: {
        car: "Car",
        bus: "Bus",
        train: "Train",
        plane: "Plane",
      },
    }
  },
  methods: {
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    selectTransportMode(mode) {
      this.data.transportMode = mode;
    }
  },
  watch: {
    data: {
      handler(newValue) {
        this.$emit("update-data", newValue);
      },
      deep: true,
    },
  },
}
</script>

<style scoped>

</style>
