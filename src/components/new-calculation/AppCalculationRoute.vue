<script>
import {ArrowRight, Info, MapPin, Navigation} from "lucide-vue-next";
import {Input} from "@/components/ui/input/index.js";

export default {
  name: "AppCalculationRoute",
  components: {Info, MapPin, ArrowRight, Input, Navigation}
}
</script>

<template>
  <div class="space-y-8">
    <div class="text-center mb-6">
      <h3 class="text-xl font-medium mb-2">
        Woher kommen Sie und wohin möchten Sie fahren?
      </h3>
      <p class="text-muted-foreground">
        Geben Sie Ihren Start- und Zielort ein, um die CO2-Emissionen zu berechnen.
      </p>
    </div>

    <div class="max-w-2xl mx-auto">
      <div class="relative w-full items-center">
        <Input type="text" placeholder="Startort eingeben (z.B. Berlin)"
               class="pl-10 py-6 text-lg border-green-200 focus-visible:ring-green-500"
        />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                  <MapPin class="h-5 w-5 text-green-600" />
                </span>
      </div>

      <div class="flex justify-center my-4">
        <div class="bg-green-100 rounded-full p-2">
          <ArrowRight class="h-5 w-5 text-green-600" />
        </div>
      </div>

      <div class="relative w-full items-center">
        <Input type="text" placeholder="Zielort eingeben (z.B. München)"
               class="pl-10 py-6 text-lg border-green-200 focus-visible:ring-green-500"
        />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                  <Navigation class="h-5 w-5 text-green-600" />
                </span>
      </div>
    </div>

    <div class="text-center text-sm text-muted-foreground mt-8">
      <div class="inline-flex items-center">
        <Info class="h-4 w-4 inline mr-1" />
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
          et dolore magna aliquyam erat, sed diam voluptua.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>