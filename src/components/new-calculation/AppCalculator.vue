<script>
import {Leaf} from "lucide-vue-next";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card/index.js";

export default {
  name: "AppCalculator",
  components: {CardDescription, CardTitle, CardHeader, Card, Leaf },
}
</script>

<template>
  <div class="container">
    <div class="w-full">
      <Card class="w-full shadow-lg border">
        <!-- Header -->
        <!--
        <div class="p-8 bg-green-100 hidden">
          <div class="flex justify-between items-center">
            <div className="p-2 bg-green-100 rounded-full mr-3">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <div>

            </div>
          </div>
        </div>
        -->
        <CardHeader class="bg-gradient-to-r from-green-50 to-emerald-50 border-green-100 border-b">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="bg-green-100 p-2 rounded-full mr-3">
                <Leaf class="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle class="text-2xl">CO2-Rechner für Ihre Anreise</CardTitle>
                <CardDescription class="text-green-600/70">
                  Berechnen Sie die Umweltauswirkungen Ihrer Reise und entdecken Sie umweltfreundlichere Alternativen
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>

        <!-- Steps -->
        <div>

        </div>

        <!-- Footer -->
        <div>

        </div>
      </Card>
    </div>
  </div>
</template>

<style scoped>

</style>