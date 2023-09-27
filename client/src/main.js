import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import { createAuth0 } from '@auth0/auth0-vue';
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
import VueCookies from "vue3-cookies";

export const app = createApp(App);

const pinia = createPinia();
export const auth0 = createAuth0({
    domain: process.env.VUE_APP_AUTH0_DOMAIN,
    clientId: process.env.VUE_APP_AUTH0_CLIENT_ID,
    authorizationParams: {
        audience: process.env.VUE_APP_AUTH0_AUDIENCE,
        redirect_uri: window.location.origin
    }
});

pinia.use(({ store }) => {
  store.$http = axios;
  store.router = markRaw(router);
});
app.use(pinia);

app.use(auth0);

const goods = useGoodsStore();

axios.defaults.baseURL = process.env.VUE_APP_AXIOS_BASE_URL;
axios.defaults.withCredentials = true;

app.use(VueAxios, axios);
app.use(VueCookies);

app.use(store);
app.use(router);

app.use(PrimeVue);
app.use(ToastService);
app.use(DialogService);

goods.getGoods();

app.mount("#app");
