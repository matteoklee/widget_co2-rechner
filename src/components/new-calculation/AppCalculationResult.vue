<script>
import {MapPin, ArrowRight, Navigation, Car} from "lucide-vue-next";

export default {
  name: "AppCalculationResult",
  components: { MapPin, ArrowRight, Navigation, Car },
  data() {
    return {

    }
  }
}
</script>

<template>
  <div class="space-y-8">
    <div class="text-center">
      <h3 class="text-2xl font-medium mb-2">Ihre CO2-Bilanz</h3>
      <div class="flex items-center justify-center gap-2 text-muted-foreground">
        <MapPin class="h-4 w-4" />
        <span>Berlin</span>
        <ArrowRight class="h-4 w-4" />
        <Navigation class="h-4 w-4" />
        <span>München</span>
        <span class="text-sm">425 km</span>
      </div>

      <div class="mt-4 inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
        <Car class="h-4 w-4 text-green-600" />
        <span class="text-sm font-medium">Hybridauto (SUV)</span>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <div class="border p-6 flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-white border-red-100 shadow-sm rounded-lg h-48">

      </div>
      <div class="border p-6 flex flex-col items-center justify-center bg-gradient-to-tr from-white to-emerald-50 border-green-100 shadow-sm rounded-lg h-48">

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>