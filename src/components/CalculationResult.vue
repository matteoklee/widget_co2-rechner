<template>
  <div class="space-y-6 text-center">
    <h2 class="text-3xl font-bold mb-8">Ihre CO2-Bilanz</h2>
    <div class="grid gap-8 md:grid-cols-2">
      <Card class="bg-gradient-to-br from-red-100 to-orange-100">
        <CardContent class="p-6">
          <div class="flex items-center justify-center mb-4">
            <Leaf class="h-12 w-12 text-red-600 mr-4" />
            <h3 class="text-2xl font-semibold">CO2-Emission</h3>
          </div>
          <p class="text-5xl font-bold text-red-700 mb-4">
            {{ animatedEmission.toFixed(2) }}
            <span class="text-2xl ml-2">kg</span>
          </p>
          <p class="text-lg">
            Ihre Reise von {{ startLocation }} nach {{ endLocation }} verursacht diese Menge an CO2-Emissionen.
          </p>
        </CardContent>
      </Card>
      <Card class="bg-gradient-to-br from-green-100 to-emerald-100">
        <CardContent class="p-6">
          <div class="flex items-center justify-center mb-4">
            <Tree class="h-12 w-12 text-green-600 mr-4" />
            <h3 class="text-2xl font-semibold">Baum-Äquivalent</h3>
          </div>
          <p class="text-5xl font-bold text-green-700 mb-4">
            {{ animatedYears.toFixed(1) }}
            <span class="text-2xl ml-2">Jahre</span>
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
            v-for="(value, mode) in comparisonData"
            :key="mode"
            :class="[
            'bg-gray-100',
            { 'ring-2 ring-primary': !isDetailedCalculation && mode === 'car' }
          ]"
        >
          <CardContent class="p-4">
            <div class="flex items-center justify-center mb-2">
              <component
                  :is="icons[mode]"
                  class="h-8 w-8 text-gray-600"
              />
            </div>
            <h4 class="text-lg font-semibold mb-2">{{ capitalize(mode) }}</h4>
            <ul v-if="isDetailedCalculation">
              <li
                  v-for="(factor, fuel) in value"
                  :key="fuel"
                  class="text-sm"
              >
                {{ fuel }}: {{ (factor * distance).toFixed(2) }} kg CO2
              </li>
            </ul>
            <p v-else class="text-lg font-bold">
              {{ value.toFixed(2) }} kg CO2
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
    <Button @click="resetCalculation" class="mt-8">Neue Berechnung</Button>
  </div>
</template>

<script>
export default {
  name: "CalculationResult"
}
</script>

<style scoped>

</style>
