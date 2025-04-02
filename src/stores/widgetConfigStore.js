import { defineStore } from "pinia";

export const useWidgetConfigStore = defineStore("widgetConfigStore", {
    state: () => ({
        theme: "light",
        primaryColor: "#007bff",
    }),
    actions: {
        setConfig(config) {
            this.theme = config.theme;
            this.primaryColor = config.primaryColor;
        },
    },
});