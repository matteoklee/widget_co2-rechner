<template>
  <div>
    <form ref="form" @submit.prevent="validateInput" class="space-y-4">
      <Label>Transportmittel</Label>
      <RadioGroup v-model="data.transportMode" class="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <label
            v-for="mode in transportModes"
            :key="mode"
            :for="`radio-${mode}`"
            class="flex flex-col items-center justify-center h-24 p-4 border rounded-lg cursor-pointer transition-all"
            :class="{
            'bg-primary text-white': data.transportMode === mode,
          }"
        >
          <RadioGroupItem
              :id="`radio-${mode}`"
              :value="mode"
              class="hidden"
              required
          />
          <component
              :is="icons[mode]"
              class="h-8 w-8 mb-2"
          />
          <span class="text-sm font-medium">{{ capitalize(mode) }}</span>
        </label>
      </RadioGroup>
    </form>
  </div>
</template>

<script>
import Label from "@/components/ui/label/Label.vue";
import Button from "@/components/ui/button/Button.vue";
import {Car, Bus, Plane, Train, Bike, Footprints} from "lucide-vue-next";
import RadioGroup from "@/components/ui/radio-group/RadioGroup.vue";
import RadioGroupItem from "@/components/ui/radio-group/RadioGroupItem.vue";

export default {
  name: "CalculationTransportMedium",
  components: {RadioGroupItem, RadioGroup, Button, Label, Car, Bus, Bike, Train, Footprints},
  props: {
    advancedCalculation: Boolean,
    calculationData: Object,
  },
  emits: ["update-data", "update-validity"],
  data() {
    return {
      data: { ...this.calculationData },
      transportModes: ["car", "bus_public", "bus_tour", "bike", "foot", "train"],
      icons: {
        car: "Car",
        bus_public: "Bus",
        bus_tour: "Bus",
        train: "Train",
        bike: "Bike",
        foot: "Footprints",
      },
    }
  },
  methods: {
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    selectTransportMode(mode) {
      this.data.transportMode = mode;
    },
    validateInput() {
      const form = this.$refs.form;
      if (form.checkValidity()) {
        this.$emit("update-validity", true);
      } else {
        this.$emit("update-validity", false);
      }
    },
    checkValidity() {
      const form = this.$refs.form;
      this.$emit("update-validity", form.checkValidity());
    }
  },
  watch: {
    data: {
      handler(newValue) {
        this.$emit("update-data", newValue);
        this.checkValidity()
      },
      deep: true,
    },
  },
}
</script>

<style scoped>

</style>
