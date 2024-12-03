import { createApp } from "vue";
import "./style.css";
import "../node_modules/primeflex/primeflex.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import ConfirmationService from "primevue/confirmationservice";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia)
app.use(ConfirmationService);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.mount("#app");
