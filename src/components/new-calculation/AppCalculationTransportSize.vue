<script>
import {Zap, Fuel, Cable, Check, Ruler, CarFront, Car, Truck, Info} from "lucide-vue-next";
import {Label} from "@/components/ui/label/index.js";

export default {
  name: "AppCalculationTransportSize",
  components: {Label, Zap, Fuel, Cable, Check, Ruler, CarFront, Car, Truck, Info },
  data() {
    return {
      transportFuel: null,
      transportSize: null,
      //TODO: fetching fuelOptions and sizeTypes according to transport medium
      fuelOptions: [
        { id: "petrol", name: "Benzin", icon: Fuel, description: "Konventioneller Kraftstoff" },
        { id: "diesel", name: "Diesel", icon: Zap, description: "Effizienter als Benzin" },
        { id: "hybrid", name: "Hybrid", icon: Cable, description: "Kombiniert Verbrenner und Elektro" },
        { id: "electric", name: "Elektro", icon: Zap, description: "Emissionsarm im Betrieb" },
      ],
      sizeOptions: [
        { id: "small", name: "Kleinwagen", icon: CarFront, description: "Geringer Verbrauch" },
        { id: "medium", name: "Mittelklasse", icon: Car, description: "Ausgewogener Verbrauch" },
        { id: "large", name: "SUV", icon: Truck, description: "Höherer Verbrauch" },
      ]
    }
  },
  methods: {
    isSizeSelected(option) {
      return this.transportSize === option.id;
    },
    selectTransportSize(option) {
      this.transportSize = option.id;
    }
  }
}
</script>

<template>
  <div class="space-y-8">
    <div class="text-center mb-6">
      <h3 class="text-xl font-medium mb-2">
        Details zu Ihrer Fahrzeuggröße
      </h3>
      <p class="text-muted-foreground">
        Wählen Sie die Fahrzeuggröße Ihres ausgewählten Transportmittels.
      </p>
    </div>

    <div class="max-w-2xl mx-auto">

      <div class="space-y-6">
        <div class="inline-flex items-center">
          <Ruler class="w-5 h-5 mr-2 text-green-600" />
          <Label class="">Fahrzeuggröße</Label>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div v-for="(option, index) in sizeOptions" :key="option.id"
               @click="selectTransportSize(option)"
               class="flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200"
               :class="isSizeSelected(option) ? 'border-green-500 bg-green-100' : 'border-muted hover:border-green-200'">
            <div class="p-2 rounded-full" :class="isSizeSelected(option) ? 'bg-green-100' : 'bg-muted/50'">
              <component :is="option.icon" class="w-5 h-5" :class="isSizeSelected(option) ? 'text-green-600' : 'text-muted-foreground'" />
            </div>
            <div class="ml-3">
              <p class="font-medium">{{ option.name }}</p>
              <p class="text-xs text-muted-foreground">{{ option.description }}</p>
            </div>
            <div v-if="isSizeSelected(option)" class="ml-auto">
              <Check class="h-4 w-4 text-green-600" />
            </div>
          </div>
        </div>

        <div class="text-sm text-muted-foreground mt-2 bg-muted/30 p-3 rounded-lg">
          <div class="inline-flex items-center">
            <Info class="h-4 w-4 mr-2" />
            <span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>