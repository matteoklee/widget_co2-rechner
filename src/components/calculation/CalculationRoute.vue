<template>
  <div>
    <form ref="form" @submit.prevent="validateInput" class="space-y-6">
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
    </form>
  </div>
</template>

<script>
import Label from "../ui/label/Label.vue";
import Input from "../ui/input/Input.vue";
import Switch from "../ui/switch/Switch.vue";

export default {
  name: "CalculationRoute",
  components: {Switch, Input, Label},
  props: {
    advancedCalculation: Boolean,
    calculationData: Object,
  },
  emits: ["update-data", "update-validity"],
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
        this.checkValidity()
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
    validateInput() {
      const form = this.$refs.form;
      if (form.checkValidity()) {
        this.$emit("update-validity", true);
      } else {
        this.$emit("update-validity", false);
      }
    },
    checkValidity() {
      const form = this.$refs.form;
      this.$emit("update-validity", form.checkValidity());
    }
  },
  mounted() {
    this.checkValidity();
  },
}
</script>

<style scoped>

</style>
