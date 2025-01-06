<template>
  <div class="space-y-6">
    <div class="flex justify-between">
      <Label for="calculation-type" class="text-base font-medium">Berechnungsmodus</Label>
      <div className="flex items-center space-x-2">
        <Label for="calculation-type" class="text-sm">Einfach</Label>
        <Switch
            id="calculation-type"
            v-model:checked="localAdvancedCalculation"
        />
        <Label for="calculation-type" class="text-sm">Detailliert</Label>
      </div>
    </div>
    <div class="grid items-center w-full gap-8">
      <div class="flex flex-col space-y-1.5">
        <Label for="startLocation">Startort</Label>
        <Input id="startLocation" placeholder="Startort" v-model="data.startLocation" required />
      </div>
      <div class="flex flex-col space-y-1.5">
        <Label for="endLocation">Zielort</Label>
        <Input id="endLocation" placeholder="Zielort" v-model="data.endLocation" required />
      </div>
    </div>
  </div>
</template>

<script>
import Label from "@/components/ui/label/Label.vue";
import Input from "@/components/ui/input/Input.vue";
import Switch from "@/components/ui/switch/Switch.vue";

export default {
  name: "CalculationRoute",
  components: {Switch, Input, Label},
  props: {
    advancedCalculation: Boolean,
    calculationData: Object,
  },
  emits: ["update-data", "next"],
  data() {
    return {
      localAdvancedCalculation : this.advancedCalculation,
      data: { ...this.calculationData },
    };
  },
  watch: {
    data: {
      handler(newValue) {
        this.$emit("update-data", newValue);
      },
      deep: true,
    },
    /*
    localAdvancedCalculation(newValue) {
      this.$emit("update:advancedCalculation", newValue);
    }
     */
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
