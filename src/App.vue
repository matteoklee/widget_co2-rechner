<script>
import {useWidgetConfigStore} from "@/stores/widgetConfigStore.js";
export default {
  setup() {
    const widgetConfigStore = useWidgetConfigStore();
    return {widgetConfigStore}
  },
  methods: {
    loadConfigFromUrl() {
      const params = new URLSearchParams(window.location.search);

      const config = {
        background: params.get("background") || "#FFFFFF",
        foreground: params.get("foreground") || "#06080F",
        muted: params.get("muted") || "#F8FAFB",
        mutedForeground: params.get("mutedForeground") || "#73797F",
        popover: params.get("popover") || "#FFFFFF",
        popoverForeground: params.get("popoverForeground") || "#06080F",
        card: params.get("card") || "#FFFFFF",
        cardForeground: params.get("cardForeground") || "#06080F",
        border: params.get("border") || "#E5E8EC",
        input: params.get("input") || "#E5E8EC",
        primary: params.get("primary") || "#0C1A33",
        primaryForeground: params.get("primaryForeground") || "#F4FAFC",
        secondary: params.get("secondary") || "#F8FAFB",
        secondaryForeground: params.get("secondaryForeground") || "#0C1A33",
        accent: params.get("accent") || "#F8FAFB",
        accentForeground: params.get("accentForeground") || "#0C1A33",
        destructive: params.get("destructive") || "#E53935",
        destructiveForeground: params.get("destructiveForeground") || "#F4FAFC",
        ring: params.get("ring") || "#06080F",
        radius: params.get("radius") || "0.5rem",

        //
        fontFamily: params.get("fontFamily") || "'Open Sans', sans-serif",
        borderActive: params.get("borderActive") || true,
      };
      console.log(config);

      this.widgetConfigStore.setConfig(config)
      console.log(this.widgetConfigStore.$state)
    }
  },
  mounted() {
    console.log(import.meta.env.VITE_API_BASE_URL);
    this.loadConfigFromUrl();
  }
}
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>

</style>
