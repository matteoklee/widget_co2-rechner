<template>
  <div class="space-y-6">
    <div>
      <Label class="mb-2 block">Kraftstoff</Label>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Button
            v-for="fuel in availableFuels"
            :key="fuel"
            :variant="data.fuelType === fuel ? 'default' : 'outline'"
            class="h-20 flex flex-col items-center justify-center"
            @click="selectFuelType(fuel)"
        >
          <component
              :is="icons[fuel]"
              class="h-6 w-6 mb-2"
          />
          {{ capitalize(fuel) }}
        </Button>
      </div>
    </div>
    <div v-if="data.transportMode === 'car'">
      <Label class="mb-2 block">Fahrzeuggröße</Label>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Button
            v-for="size in vehicleSizes"
            :key="size"
            :variant="data.vehicleSize === size ? 'default' : 'outline'"
            class="h-20 flex flex-col items-center justify-center"
            @click="selectVehicleSize(size)"
        >
          <Car
              :class="sizeIconClass(size)"
          />
          {{ sizeTranslations[size] }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Label from "@/components/ui/label/Label.vue";
import Button from "@/components/ui/button/Button.vue";
import {Fuel, Droplet, Zap, Car} from "lucide-vue-next";

export default {
  name: "CalculationFuel",
  components: {Button, Label, Fuel, Droplet, Zap, Car},
  props: {
    advancedCalculation: Boolean,
    calculationData: Object,
  },
  emits: ["update-data", "next"],
  data() {
    return {
      data: { ...this.calculationData },
    };
  },
  watch: {
    data: {
      handler(newValue) {
        this.$emit("update-data", newValue);
      },
      deep: true,
    },
  },
  computed: {
    availableFuels() {
      switch (this.data.transportMode) {
        case "car":
          return ["petrol", "diesel", "electric"];
        case "bus":
          return ["diesel"];
        case "train":
          return ["electric"];
        case "plane":
          return ["kerosene"];
        default:
          return [];
      }
    },
    vehicleSizes() {
      return ["small", "medium", "large"];
    },
    icons() {
      return {
        petrol: "Fuel",
        diesel: "Fuel",
        electric: "Zap",
        kerosene: "Droplet",
      };
    },
    sizeTranslations() {
      return {
        small: "Klein",
        medium: "Mittel",
        large: "Groß",
      };
    },
  },
  methods: {
    selectFuelType(fuel) {
      this.data.fuelType = fuel;
    },
    selectVehicleSize(size) {
      this.data.vehicleSize = size;
    },
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    sizeIconClass(size) {
      return {
        "h-6 w-6 mb-2": true,
        "scale-75": size === "small",
        "scale-125": size === "large",
      };
    },
  }
}
</script>

<style scoped>

</style>
