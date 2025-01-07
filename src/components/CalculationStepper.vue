<template>
  <div>
    <p>CalculationComponent</p>
  </div>

  <div class="w-full bg-white">
    <Card class="max-w-4xl lg:mx-auto m-6">
      <CardHeader>
        <div class="mt-2 mb-4">
          <Progress v-model="progress" class="w-full mx-auto"/>
        </div>
      </CardHeader>
      <CardContent>
        <component :is="currentStep" required
           v-model:advancedCalculation="advancedCalculation"
           :calculation-data="calculationData"
           :calculationResult="calculationResult"
           :dummySimpleResult="dummySimpleResult"
           @update-data="updateData"
           @update-validity="updateStepValidity(step -1, $event)"
           @reset-data="resetData"
           @next="nextStep"
           @prev="prevStep" />
      </CardContent>
      <CardFooter class="w-full flex flex-col px-6 pb-6">
        <div class="w-full">
          <Alert variant="" class="px-4 py-2.5 mb-3" v-if="!isCurrentStepValid() && !(step === maxStep)"> <!-- variant="destructive" -->
            <AlertCircle class="w-4 h-4" />
            <AlertTitle>Unvollständig</AlertTitle>
            <AlertDescription>
              Bitte überprüfe deine Eingabedaten vor dem nächsten Schritt.
            </AlertDescription>
          </Alert>
        </div>
        <div class="w-full flex justify-between">
          <Button v-if="step > 1" type="button" @click="prevStep" variant="outline">
            <ArrowLeft class="mr-2 h-4 w-4" /> Zurück
          </Button>
          <Button v-if="(step < maxStep) && !(step === maxStep-1)" :disabled="!isCurrentStepValid()" type="button" @click="nextStep" :class="(step === 1) ? 'w-full' : 'ml-auto'">
            Weiter <ArrowRight class="ml-2 h-4 w-4" />
          </Button>
          <Button v-if="step === maxStep-1" :disabled="!isCurrentStepValid()" type="button" @click="nextStep" :class="(step === 1) ? 'w-full' : 'ml-auto'">
            Berechnen <ArrowRight class="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  </div>
  <div class="mt-6">
    {{this.advancedCalculation}}<br>
    {{this.calculationData}}
  </div>
</template>

<script>
import Card from "@/components/ui/card/Card.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import CardDescription from "@/components/ui/card/CardDescription.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import Select from "@/components/ui/select/Select.vue";
import SelectTrigger from "@/components/ui/select/SelectTrigger.vue";
import SelectContent from "@/components/ui/select/SelectContent.vue";
import SelectItem from "@/components/ui/select/SelectItem.vue";
import CardFooter from "@/components/ui/card/CardFooter.vue";
import Button from "@/components/ui/button/Button.vue";
import Label from "@/components/ui/label/Label.vue";
import Input from "@/components/ui/input/Input.vue";
import Progress from "@/components/ui/progress/Progress.vue";
import Switch from "@/components/ui/switch/Switch.vue";
import {ArrowLeft, ArrowRight, AlertCircle} from "lucide-vue-next";
import CalculationRoute from "@/components/CalculationRoute.vue";
import CalculationTransportMedium from "@/components/CalculationTransportMedium.vue";
import CalculationFuel from "@/components/CalculationFuel.vue";
import CalculationResult from "@/components/CalculationResult.vue";
import Alert from "@/components/ui/alert/Alert.vue";
import AlertTitle from "@/components/ui/alert/AlertTitle.vue";
import AlertDescription from "@/components/ui/alert/AlertDescription.vue";

export default {
  name: "CalculationStepper",
  components: {
    AlertDescription,
    AlertTitle,
    Alert,
    ArrowLeft,
    ArrowRight,
    AlertCircle,
    Switch,
    Progress,
    Input,
    Label,
    Button,
    CardFooter,
    SelectItem,
    SelectContent, SelectTrigger, Select, CardContent, CardDescription, CardTitle, CardHeader, Card},
  data() {
    return {
      step: 1,
      maxStep: 4,
      advancedCalculation: true,
      stepsValidity: [false, false, false, false],

      calculationData: {
        startLocation: "",
        endLocation: "",
        transportMode: "",
        fuelType: "",
        vehicleSize: "",
        distance: 0,
        co2Emission: 0,
        treeYears: 0,
        simpleResults: {},
      },
      calculationResult: {
        emission: 44.23,
        distance: 323,
        yearsToBind: {
          years: 1,
          months: 3,
          days: 21
        },
        neededTrees: 0
      },
      dummySimpleResult: [
        {
          "transportMediumDTO": {
            "transportMediumName": "Pkw",
            "transportMediumSize": "mittel",
            "transportMediumFuel": "Otto",
            "transportMediumFuelConsumption": null
          },
          "emission": 45.87713609,
          "distance": 314507.0,
          "yearsToBind": {
            "years": 3,
            "months": 8,
            "days": 1
          },
          "neededTrees": 4
        },
        {
          "transportMediumDTO": {
            "transportMediumName": "Busreise",
            "transportMediumSize": "default",
            "transportMediumFuel": "Default",
            "transportMediumFuelConsumption": null
          },
          "emission": 10.579386466,
          "distance": 314507.0,
          "yearsToBind": {
            "years": 0,
            "months": 10,
            "days": 4
          },
          "neededTrees": 1
        },
        {
          "transportMediumDTO": {
            "transportMediumName": "Fahrrad",
            "transportMediumSize": "default",
            "transportMediumFuel": "Default",
            "transportMediumFuelConsumption": null
          },
          "emission": 0.0,
          "distance": 314507.0,
          "yearsToBind": {
            "years": 0,
            "months": 0,
            "days": 0
          },
          "neededTrees": 0
        },
        {
          "transportMediumDTO": {
            "transportMediumName": "Zug",
            "transportMediumSize": "default",
            "transportMediumFuel": "Diesel",
            "transportMediumFuelConsumption": null
          },
          "emission": 19.094917102,
          "distance": 529033.0,
          "yearsToBind": {
            "years": 1,
            "months": 6,
            "days": 9
          },
          "neededTrees": 2
        }
      ]
    }
  },
  computed: {
    progress() {
      return ((this.step / this.maxStep) * 100)
    },
    currentStep() {
      switch(this.step) {
        case 1:
          return CalculationRoute;
        case 2:
          return CalculationTransportMedium;
        case 3:
          return CalculationFuel;
        case 4:
          return CalculationResult;
      }
    }
  },
  methods: {
    updateStepValidity(index, valid) {
      this.stepsValidity[index] = valid;
    },
    isCurrentStepValid() {
      console.log("CURRENT STEPS VALIDITY: " + this.stepsValidity)
      return this.stepsValidity[this.step - 1];
    },
    nextStep() {
      if (this.isCurrentStepValid() && this.step < this.maxStep) {
        this.step++;
      }
    },
    prevStep() {
      if (this.step > 1) {
        this.step--;
      }
    },
    updateData(newData) {
      Object.assign(this.calculationData, newData);
    },
    resetData() {
      this.step = 1,
      Object.assign(this.calculationData, {});
    },
  }
}
</script>

<style scoped>

</style>
