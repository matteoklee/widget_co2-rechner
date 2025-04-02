<template>
  <div>
    <form ref="form" @submit.prevent="validateInput" class="space-y-6">
      <div>
        <Label class="mb-2 block">Kraftstoff</Label>
        <RadioGroup v-model="data.fuelType" class="grid grid-cols-1 sm:grid-cols-3 gap-4" aria-required="true">
          <label
              v-for="fuel in availableFuels"
              :key="fuel"
              :for="`radio-${fuel}`"
              class="flex flex-col items-center justify-center h-20 p-4 border rounded-lg cursor-pointer transition-all"
              :class="{
              'bg-primary text-white': data.fuelType === fuel,
              'border-gray-300': data.fuelType !== fuel,
            }"
          >
            <RadioGroupItem
                :id="`radio-${fuel}`"
                :value="fuel"
                class="hidden"
                required
            />
            <component
                :is="icons[fuel]"
                class="h-6 w-6 mb-2"
            />
            <span class="text-sm font-medium">{{ capitalize(fuel) }}</span>
          </label>
        </RadioGroup>
      </div>

      <div v-if="data.transportMode === 'car'">
        <Label class="mb-2 block">Fahrzeuggröße</Label>
        <RadioGroup v-model="data.vehicleSize" class="grid grid-cols-1 sm:grid-cols-3 gap-4" aria-required="true">
          <label
              v-for="size in vehicleSizes"
              :key="size"
              :for="`radio-${size}`"
              class="flex flex-col items-center justify-center h-20 p-4 border rounded-lg cursor-pointer transition-all"
              :class="{
              'bg-primary text-white': data.vehicleSize === size,
              'border-gray-300': data.vehicleSize !== size,
            }"
          >
            <RadioGroupItem
                :id="`radio-${size}`"
                :value="size"
                class="hidden"
                required
            />
            <Car
                :class="sizeIconClass(size)"
            />
            <span class="text-sm font-medium">{{ sizeTranslations[size] }}</span>
          </label>
        </RadioGroup>
      </div>
    </form>
  </div>
</template>

<script>
import Label from "../ui/label/Label.vue";
import Button from "../ui/button/Button.vue";
import {Fuel, Droplet, Zap, Car} from "lucide-vue-next";
import RadioGroup from "../ui/radio-group/RadioGroup.vue";
import RadioGroupItem from "../ui/radio-group/RadioGroupItem.vue";

export default {
  name: "CalculationFuel",
  components: {RadioGroupItem, RadioGroup, Button, Label, Fuel, Droplet, Zap, Car},
  props: {
    advancedCalculation: Boolean,
    calculationData: Object,
  },
  emits: ["update-data", "update-validity"],
  data() {
    return {
      data: { ...this.calculationData },
    };
  },
  watch: {
    data: {
      handler(newValue) {
        this.$emit("update-data", newValue);
        this.validateInput();
      },
      deep: true,
    },
  },
  computed: {
    availableFuels() {
      switch (this.data.transportMode) {
        case "car":
          return ["petrol", "diesel", "electric", "lpg", "phev_diesel", "phev_otto"];
        case "bus_public":
          return ["diesel", "cng"];
        case "train":
          return ["diesel", "electric"];
        default:
          return [];
      }
    },
    vehicleSizes() {
      switch(this.data.fuelType) {
        case "electric":
          return ["small", "medium"];
        case "lpg":
          return ["medium"];
        default:
          return ["small", "medium", "large"];
      }
    },
    icons() {
      return {
        petrol: "Fuel",
        diesel: "Fuel",
        electric: "Zap",
        phev_diesel: "Zap",
        phev_otto: "Zap",
        lpg: "Droplet",
        cng: "Droplet",
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
    validateInput() {
      const form = this.$refs.form;
      const isValid = form.checkValidity();
      this.$emit("update-validity", isValid);
    },
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
