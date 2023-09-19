import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

import "./assets/main.css";

import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import DialogService from "primevue/dialogservice";

import { useUserStore } from "./store/user";
import { useGoodsStore } from "./store/goods";
import VueAxios from "vue-axios";

export const app = createApp(App);

const pinia = createPinia();

pinia.use(({ store }) => {
  store.$http = axios;
  store.router = markRaw(router);
});
app.use(pinia);

const user = useUserStore();
const goods = useGoodsStore();

axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.withCredentials = true;

app.use(VueAxios, axios);

app.use(store);
app.use(router);

app.use(PrimeVue);
app.use(ToastService);
app.use(DialogService);

user.get();
goods.getGoods();

app.mount("#app");
