import { createSSRApp } from "vue";
import App from "./App.vue";
import 'uno.css'
import {setupStore} from "@/stores";
export function createApp() {
  const app = createSSRApp(App);
  setupStore(app);
  return {
    app,
  };
}
