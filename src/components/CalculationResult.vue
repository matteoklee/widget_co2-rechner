<template>
  <div class="space-y-6 text-center">
    <h2 class="text-3xl font-bold mb-8">Ihre CO2-Bilanz</h2>
    <div class="grid gap-8 md:grid-cols-2">
      <Card class="bg-gradient-to-br from-red-100 to-orange-100 hover:scale-105 duration-300">
        <CardContent class="p-6">
          <div class="flex items-center justify-center mb-4">
            <Leaf class="h-12 w-12 text-red-600 mr-4" />
            <h3 class="text-2xl font-semibold">CO2-Emission</h3>
          </div>
          <p class="text-5xl font-bold text-red-700 mb-4">
            <NumberTicker class="text-red-700" :decimal-places="2" :duration="2000" :value="result.emission" />
            <span class="text-2xl ml-2">kg</span>
          </p>
          <p class="text-lg">
            Ihre Reise von {{ data.startLocation }} nach {{ data.endLocation }} verursacht diese Menge an CO2-Emissionen.
          </p>
        </CardContent>
      </Card>
      <Card class="bg-gradient-to-br from-green-100 to-emerald-100 hover:scale-105 duration-300">
        <CardContent class="p-6">
          <div class="flex items-center justify-center mb-4">
            <Trees class="h-12 w-12 text-green-600 mr-4" />
            <h3 class="text-2xl font-semibold">Baum-Äquivalent</h3>
          </div>
          <p class="text-3xl font-bold text-green-700 mb-4">
            <NumberTicker class="text-green-700" :decimal-places="0" :duration="1000" :value="result.yearsToBind['years'] " />
            <span class="text-2xl ml-2">Jahr(e), </span>
            <NumberTicker class="text-green-700" :decimal-places="0" :duration="1000" :delay="500" :value="result.yearsToBind['months'] " />
            <span class="text-2xl ml-2">Monat(e), </span>
            <NumberTicker class="text-green-700" :decimal-places="0" :duration="1000" :delay="1000" :value="result.yearsToBind['days'] " />
            <span class="text-2xl ml-2">Tag(e)</span>
          </p>
          <p class="text-lg">
            So lange braucht eine typische Buche, um diese Menge CO2 zu binden.
          </p>
        </CardContent>
      </Card>
    </div>

    <div class="mt-8">
      <h3 class="text-2xl font-semibold mb-4">Vergleich mit anderen Transportmitteln</h3>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card
            v-for="(item, index) in dummy"
            :key="index"
            class="bg-gray-100 hover:scale-105 duration-300"
        >
          <CardContent class="p-4">
            <div class="flex items-center justify-center mb-2">
              <component
                  :is="icons[item.transportMediumDTO.transportMediumName] || 'Leaf'"
                  class="h-8 w-8 text-gray-600"
              />
            </div>
            <h4 class="text-lg font-semibold mb-2">
              {{ item.transportMediumDTO.transportMediumName }} ({{ item.transportMediumDTO.transportMediumFuel }})
            </h4>
            <p class="text-lg font-bold text-gray-900">
              {{ item.emission.toFixed(2) }} kg CO2
            </p>
            <p class="text-sm text-gray-700">
              Bindungszeit: {{ formatYearsToBind(item.yearsToBind) }}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>

    <div>
      <div className="mt-8 text-xs text-gray-500 flex items-center justify-center">
        Entwickelt von Kleemann und Siemens Software GbR
      </div>
      <Button @click="resetCalculation" class="mt-4">Neue Berechnung</Button>
    </div>

  </div>
</template>

<script>
import Card from "@/components/ui/card/Card.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import Button from "@/components/ui/button/Button.vue";

import {Leaf, Trees, Car, Train, Bus, Bike} from "lucide-vue-next";
import NumberTicker from "@/components/ui/number-ticker/NumberTicker.vue";
export default {
  name: "CalculationResult",
  components: {NumberTicker, Button, CardContent, Card, Leaf, Trees, Car, Train, Bus, Bike},
  props: {
    advancedCalculation: Boolean,
    calculationData: Object,
    calculationResult: Object,
    dummySimpleResult: Object,

  },
  emits: ["reset-data", "next"],
  data() {
    return {
      data: { ...this.calculationData },
      result: { ...this.calculationResult },
      dummy: { ...this.dummySimpleResult },
    }
  },
  methods: {
    resetCalculation() {
      this.$emit("reset-data", true);
    },
    formatDistance(distance) {
      return `${(distance / 1000).toFixed(1)} km`;
    },
    formatYearsToBind(yearsToBind) {
      const { years, months, days } = yearsToBind;
      const parts = [];
      if (years > 0) parts.push(`${years} Jahr${years > 1 ? "e" : ""}`);
      if (months > 0) parts.push(`${months} Monat${months > 1 ? "e" : ""}`);
      if (days > 0) parts.push(`${days} Tag${days > 1 ? "e" : ""}`);
      return parts.length ? parts.join(", ") : "Keine Zeit erforderlich";
    },
  },
  computed: {
    icons() {
      return {
        Pkw: "Car",
        Busreise: "Bus",
        Zug: "Train",
        Fahrrad: "Bike",
        Flugzeug: "Plane",
      };
    }
  }
}
</script>

<style scoped>

</style>
