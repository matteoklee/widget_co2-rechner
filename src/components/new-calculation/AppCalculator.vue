<script>
import {Leaf, MapPin, ArrowRight, Navigation, Info, ArrowLeft, Settings, ChartNoAxesColumn, Fuel, Car} from "lucide-vue-next";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card/index.js";
import {Progress} from "@/components/ui/progress/index.js";
import {Input} from "@/components/ui/input/index.js";
import {Button} from "@/components/ui/button/index.js";
import AppCalculationRoute from "@/components/new-calculation/AppCalculationRoute.vue";
import AppCalculationTransport from "@/components/new-calculation/AppCalculationTransport.vue";
import AppCalculationTransportFuel from "@/components/new-calculation/AppCalculationTransportFuel.vue";
import AppCalculationResult from "@/components/new-calculation/AppCalculationResult.vue";
import {markRaw} from "vue";
import AppCalculationTransportSize from "@/components/new-calculation/AppCalculationTransportSize.vue";

export default {
  name: "AppCalculator",
  components: {
    Button,
    Input, Progress, CardFooter, CardContent, CardDescription, CardTitle, CardHeader, Card, Leaf, MapPin, ArrowRight, Navigation, Info, ArrowLeft, Settings, ChartNoAxesColumn, Fuel, Car },
  data() {
    return {
      //progress: 25,
      currentStep: 0,
      steps: [
        {
          title: "Route",
          description: "Start- und Zielort eingeben",
          icon: MapPin
        },
        {
          title: "Transportmittel",
          description: "Verkehrsmittel auswählen",
          icon: Navigation
        },
        {
          title: "Kraftstoff",
          description: "Transportdetails angeben",
          icon: Fuel
        },
        {
          title: "Fahrzeuggröße",
          description: "Transportdetails angeben",
          icon: Car
        },
        {
          title: "Ergebnis",
          description: "CO₂-Bilanz einsehen",
          icon: ChartNoAxesColumn
        }
      ],
      stepContent: [
        {
          component: markRaw(AppCalculationRoute)
        },
        {
          component: markRaw(AppCalculationTransport)
        },
        {
          component: markRaw(AppCalculationTransportFuel)
        },
        {
          component: markRaw(AppCalculationTransportSize)
        },
        {
          component: markRaw(AppCalculationResult)
        }
      ]
    }
  },
  computed: {
    progressPercentage() {
      return ((this.currentStep + 1) / this.steps.length) * 100;
    },
  },
  methods: {
    nextStep() {
      if (this.currentStep < this.steps.length - 1) this.currentStep++;
    },
    prevStep() {
      if (this.currentStep > 0) this.currentStep--;
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="w-full">
      <Card class="w-full shadow-lg border">

        <!-- Header -->
        <CardHeader class="bg-gradient-to-r from-green-50 to-emerald-50 border-green-100 border-b">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="bg-green-100 p-2 rounded-full mr-3">
                <Leaf class="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle class="text-2xl">CO2-Rechner für Ihre Anreise</CardTitle>
                <CardDescription class="text-green-600/70">
                  Berechnen Sie den CO2-Ausstoß Ihrer Reise und entdecken Sie umweltfreundlichere Alternativen
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>

        <div class="px-6 pt-6 pb-4 border-b from-green-50 to-emerald-50 border-green-100">
          <div class="flex justify-between mb-2">
            <div v-for="(step, index) in steps" :key="step.title"
                 class="flex flex-col items-center w-full"
                 :class="{
                    'text-green-600': index === currentStep,
                    'text-green-400': index < currentStep,
                    'text-muted-foreground' : index > currentStep
                 }">
              <div class="flex items-center justify-center w-10 h-10 rounded-full border-2 mb-2 transition-all duration-300"
                   :class="{
                      'border-green-600 bg-green-50 shadow-md shadow-green-100': index === currentStep,
                      'border-green-400 bg-green-50': index < currentStep,
                      'border-muted-foreground/30 bg-background': index > currentStep
                   }">
                <component :is="step.icon" class="h-5 w-5"></component>
              </div>
              <span class="text-xs font-medium text-center">
                {{ step.title }}
              </span>
              <span class="text-[10px] text-center text-muted-foreground mt-1 hidden md:block">
                {{ step.description }}
              </span>
            </div>
          </div>

          <div class="mb-2 mt-4"> <!-- transition-all duration-300 -->
            <Progress v-model="progressPercentage" class="w-full h-1.5 bg-muted-foreground/10 text-green-50"></Progress>
          </div>
        </div>

        <!-- Steps -->
        <CardContent class="pt-8 pb-4">
          <component :is="stepContent[currentStep].component" />
        </CardContent>

        <!-- Footer -->
        <CardFooter class="flex justify-between border-t p-6 bg-gradient-to-r from-green-50 to-transparent">
          <Button v-if="currentStep > 0" @click="prevStep" variant="outline" class="inline-flex items-center border-green-200 hover:bg-green-50 hover:text-green-700">
            <ArrowLeft class="h-4 w-4 mr-2" />
            <span>Zurück</span>
          </Button>
          <div v-else></div>

          <Button v-if="currentStep < 4" @click="nextStep" class="inline-flex items-center bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600">
            <ArrowRight class="h-4 w-4 mr-2" />
            <span v-if="currentStep === 3">Berechnen</span>
            <span v-else>Weiter</span>
          </Button>
          <Button v-else @click="this.currentStep = 0" variant="outline" class="inline-flex items-center border-green-200 hover:bg-green-50 hover:text-green-700">
            <span>Neue Berechnung</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>

<style scoped>

</style>