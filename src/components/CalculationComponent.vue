<template>
  <div>
    <p>CalculationComponent</p>
  </div>

  <div class="w-full h-full">
    <Card class="max-w-screen-md mx-auto">
      <CardHeader>
        <div class="mt-2 mb-4">
          <Progress v-model="progress" class="w-full mx-auto" />
        </div>

        <CardTitle class="hidden">Create project</CardTitle>
        <CardDescription class="hidden">Deploy your new project in one-click.</CardDescription>

        <div class="flex justify-between">
          <Label for="calculation-type" class="text-base font-medium">Berechnungsmodus</Label>
          <div className="flex items-center space-x-2">
            <Label for="calculation-type" class="text-sm">Einfach</Label>
            <Switch
                id="calculation-type"
                v-model:checked="advancedCalculation"
            />
            <Label for="calculation-type" class="text-sm">Detailliert</Label>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form @submit.prevent>
          <div class="grid items-center w-full gap-4">
            <div class="flex flex-col space-y-1.5">
              <Label for="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label for="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="nuxt">
                    Nuxt
                  </SelectItem>
                  <SelectItem value="next">
                    Next.js
                  </SelectItem>
                  <SelectItem value="sveltekit">
                    SvelteKit
                  </SelectItem>
                  <SelectItem value="astro">
                    Astro
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter class="flex justify-between px-6 pb-6">
        <Button variant="outline">
          Cancel
        </Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
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

export default {
  name: "CalculationComponent",
  components: {
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
      progress: 25,
      advancedCalculation: true
    }
  }
}
</script>

<style scoped>

</style>
