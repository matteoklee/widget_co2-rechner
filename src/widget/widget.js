import { createApp } from "vue";
import CalculationStepper from "@/components/CalculationStepper.vue";
import "@/assets/index.css";
import {createPinia} from "pinia";

export default function createWidget(selector) {
    const container = document.querySelector(selector);

    if (!container) {
        console.error(`Element mit dem Selector "${selector}" nicht gefunden.`);
        return;
    }

    const app = createApp(CalculationStepper);
    app.use(createPinia());
    app.mount(container);
}
