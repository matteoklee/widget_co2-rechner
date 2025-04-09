<script>
import {Bike, Car, Train, Bus, Footprints, Check, Info} from "lucide-vue-next";

export default {
  name: "AppCalculationTransport",
  components: {Info, Bike, Car, Train, Bus, Footprints, Check },
  data() {
    return {
      transportMode: '',
      transportOptions: [
        { id: "car", name: "Auto", icon: Car, description: "Flexibel und individuell" },
        { id: "train", name: "Zug", icon: Train, description: "Schnell und komfortabel" },
        { id: "bus", name: "Bus", icon: Bus, description: "Günstig und umweltfreundlich" },
        { id: "bike", name: "Fahrrad", icon: Bike, description: "Günstig und umweltfreundlich" },
        /*{ id: "foot", name: "Fuß", icon: Footprints, description: "Günstig und umweltfreundlich" },*/
        /*{ id: "plane", name: "Flugzeug", icon: Plane, description: "Schnell für lange Strecken" },*/
      ]
    }
  },
  methods: {
    isSelected(option) {
      return this.transportMode === option.id;
    },
    selectTransportMode(option) {
      this.transportMode = option.id;
    }
  }
}
</script>

<template>
  <div class="space-y-8">
    <div class="text-center mb-6">
      <h3 class="text-xl font-medium mb-2">Wie möchten Sie reisen?</h3>
      <p class="text-muted-foreground">Wählen Sie Ihr bevorzugtes Transportmittel für die Reise.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
      <div v-for="(option, index) in transportOptions" :key="option.id"
           @click="selectTransportMode(option)"
           class="relative rounded-xl border-2 p-6 cursor-pointer transition-all duration-200 hover:border-green-300 hover:shadow-md"
           :class="isSelected(option) ?'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg shadow-green-100' :  'border-muted'">

        <div v-if="isSelected(option)" class="absolute top-3 right-3">
          <div class="bg-green-500 text-white rounded-full p-1">
            <Check class="h-3 w-3" />
          </div>
        </div>

        <div class="flex flex-col items-center text-center space-y-4">
          <div class="p-4 rounded-full" :class="isSelected(option) ? 'bg-green-100' : 'bg-muted/50'">
            <component :is="option.icon" class="h-8 w-8" :class="isSelected(option) ? 'text-green-600' : 'text-muted-foreground'" />
          </div>
          <div>
            <h4 class="font-medium text-lg">{{ option.name }}</h4>
            <p class="text-sm text-muted-foreground mt-1">{{ option.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-2xl mx-auto">
      <div class="text-sm text-muted-foreground mt-2 bg-muted/30 p-3 rounded-lg">
        <div class="inline-flex items-center">
          <Info class="h-4 w-4 mr-2" />
          <span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>