import { createApp } from "vue";
import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from "vue-router";
import "./style.css";
import Home from "./pages/Home/index.vue";
import About from "./pages/About/index.vue";
import Guide from "./pages/Guide/index.vue";
import Session from "./pages/Session/index.vue";
import Success from "./pages/Success/index.vue";

import AuthLayout from "./components/layout/auth/index.vue";
import HomeLayout from "./components/layout/home/index.vue";

import "vuetify/styles";
import App from "./App.vue";
import { createVuetify } from "vuetify";
import { createPinia } from "pinia";
import * as directives from "vuetify/directives";
import * as components from "vuetify/components";
import "./index.css";
import "@wikimedia/codex/dist/codex.style.css";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { layout: HomeLayout },
  },
  {
    path: "/about",
    name: "about",
    component: About,
    meta: { layout: AuthLayout },
  },
  {
    path: "/guide",
    name: "guide",
    component: Guide,
  },
  {
    path: "/session",
    name: "session",
    component: Session,
  },
  {
    path: "/success",
    name: "success",
    component: Success,
  },
  // { path: "/about", name: "about", component: About },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const vuetify = createVuetify({
  components,
  directives,
});

const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.use(pinia);
app.mount("#app");
