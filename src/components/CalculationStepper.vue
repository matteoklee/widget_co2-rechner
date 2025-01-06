<template>
  <div>
    <p>CalculationComponent</p>
  </div>

  <div class="w-full bg-white">
    <Card class="max-w-4xl lg:mx-auto m-6">
      <CardHeader>
        <div class="mt-2 mb-4">
          <Progress v-model="progress" class="w-full mx-auto" />
        </div>

      </CardHeader>
      <CardContent>
        <form @submit.prevent>
          <component :is="currentStep"
                     v-model:advancedCalculation="advancedCalculation"
                     :calculation-data="calculationData"
                     @update-data="updateData"
                     @next="nextStep"
                     @prev="prevStep" />
        </form>
      </CardContent>
      <CardFooter class="w-full flex justify-between px-6 pb-6">
        <Button v-if="step > 1" type="button" @click="prevStep" variant="outline">
          <ArrowLeft class="mr-2 h-4 w-4" /> Zurück
        </Button>
        <Button v-if="(step < maxStep) && !(step === maxStep-1)" type="button" @click="nextStep" :class="(step === 1) ? 'w-full' : 'ml-auto'">
          Weiter <ArrowRight class="ml-2 h-4 w-4" />
        </Button>
        <Button v-if="step === maxStep-1" type="button" @click="nextStep" :class="(step === 1) ? 'w-full' : 'ml-auto'">
          Berechnen <ArrowRight class="ml-2 h-4 w-4" />
        </Button>
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
import {ArrowLeft, ArrowRight} from "lucide-vue-next";
import CalculationRoute from "@/components/CalculationRoute.vue";
import CalculationTransportMedium from "@/components/CalculationTransportMedium.vue";
import CalculationFuel from "@/components/CalculationFuel.vue";

export default {
  name: "CalculationStepper",
  components: {
    ArrowLeft,
    ArrowRight,
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
      }
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
          return null;
      }
    }
  },
  methods: {
    nextStep() {
      if (this.step < this.maxStep) {
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
    }
  }
}
</script>

<style scoped>

</style>
