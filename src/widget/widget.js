import { createApp } from "vue";
import CalculationStepper from "@/components/CalculationStepper.vue";

export default function createWidget(selector, props = {}) {
    const container = document.querySelector(selector);

    if (!container) {
        console.error(`Element mit dem Selector "${selector}" nicht gefunden.`);
        return;
    }

    const app = createApp(CalculationStepper, props);
    app.mount(container);
}
