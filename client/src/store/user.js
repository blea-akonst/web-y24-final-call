import { defineStore } from "pinia";

import {app, auth0} from "@/main";
import {closeOrderSocket, initializeOrderSocket} from "@/orderSocket";

import { useToast } from "primevue/usetoast";

function transformOrderInfo (orderInfoJson) {
  return 'User ID: ' + orderInfoJson.userId + '\n'
      + 'Order ID: ' + orderInfoJson.orderId + '\n'
      + 'Address: ' + orderInfoJson.address;
}

export const useUserStore = defineStore("user", {
  state: () => ({
    user: auth0.user || null,
    cart: JSON.parse(
      localStorage.getItem("cartState") ||
        JSON.stringify({
          goodsList: [],
        })
    ),
  }),
  getters: {
    authenticated: (state) => {
      return !!state.user;
    },
  },
  actions: {
    async login() {
      await auth0.loginWithPopup();
      await this.manageSocket();
    },
    async logout() {
      await auth0.logout({ logoutParams: { returnTo: window.location.origin } });
      await this.manageSocket();
      await this.clearCart();
    },
    async clearCart() {
      this.cart.goodsList = [];
      localStorage.setItem("cartState", JSON.stringify(this.cart));
    },
    async addGoodToCart(good) {
      this.cart.goodsList.push(good);
      localStorage.setItem("cartState", JSON.stringify(this.cart));
    },

    async manageSocket() {
      if (this.authenticated) {
        initializeOrderSocket(await auth0.getAccessTokenSilently(), orderInfoJson => {
          app.config.globalProperties.$toast.add({ severity: 'info', summary: 'Order WebSocket', detail: transformOrderInfo(orderInfoJson) })
        });
      } else {
        closeOrderSocket();
      }
    },
  },
});
