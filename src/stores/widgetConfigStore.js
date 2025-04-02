import { defineStore } from "pinia";

function getCSSVariable(name, fallback) {
    const value = getComputedStyle(document.documentElement).getPropertyValue(name);
    return value?.trim() || fallback;
}

export const useWidgetConfigStore = defineStore("widgetConfigStore", {
    state: () => ({
        /*
        theme: "light",
        primaryColor: getCSSVariable("--primary", "#007bff"),
        accentColor: "#ffffff",
        testColor: "#869cfc",
        fontFamily: getCSSVariable("--font-family", "'Open Sans', sans-serif"),
        padding: "10px",
        margin: "15px",
        width: "100%",
        fontSize: "16px",

        border: false,
        borderColor: "#000000",
        rounded: false,
        */
        borderActive: true,

        background: "#FFFFFF", // --background
        foreground: "#06080F", // --foreground
        muted: "#F8FAFB", // --muted
        mutedForeground: "#73797F", // --muted-foreground
        popover: "#FFFFFF", // --popover
        popoverForeground: "#06080F", // --popover-foreground
        card: "#FFFFFF", // --card
        cardForeground: "#06080F", // --card-foreground
        border: "#E5E8EC", // --border
        input: "#E5E8EC", // --input
        primary: "#0C1A33", // --primary
        primaryForeground: "#F4FAFC", // --primary-foreground
        secondary: "#F8FAFB", // --secondary
        secondaryForeground: "#0C1A33", // --secondary-foreground
        accent: "#F8FAFB", // --accent
        accentForeground: "#0C1A33", // --accent-foreground
        destructive: "#E53935", // --destructive
        destructiveForeground: "#F4FAFC", // --destructive-foreground
        ring: "#06080F", // --ring
        radius: "0.5rem", // --radius
    }),
    actions: {
        setConfig(config) {
            if (config.background) this.background = config.background;
            if (config.foreground) this.foreground = config.foreground;
            if (config.muted) this.muted = config.muted;
            if (config.mutedForeground) this.mutedForeground = config.mutedForeground;
            if (config.popover) this.popover = config.popover;
            if (config.popoverForeground) this.popoverForeground = config.popoverForeground;
            if (config.card) this.card = config.card;
            if (config.cardForeground) this.cardForeground = config.cardForeground;
            if (config.border) this.border = config.border;
            if (config.input) this.input = config.input;
            if (config.primary) {
                this.primary = config.primary;
                document.documentElement.style.setProperty("--primary", "357 100% 50%");
                document.documentElement.style.setProperty("--primary-foreground", "195, 57%, 97%");

            }
            if (config.primaryForeground) this.primaryForeground = config.primaryForeground;
            if (config.secondary) this.secondary = config.secondary;
            if (config.secondaryForeground) this.secondaryForeground = config.secondaryForeground;
            if (config.accent) this.accent = config.accent;
            if (config.accentForeground) this.accentForeground = config.accentForeground;
            if (config.destructive) this.destructive = config.destructive;
            if (config.destructiveForeground) this.destructiveForeground = config.destructiveForeground;
            if (config.ring) this.ring = config.ring;
            if (config.radius) this.radius = config.radius;

            //
            if (config.fontFamily) this.fontFamily = config.fontFamily;
            if (config.borderActive) this.borderActive = config.borderActive;

        },
    },

});