import { defineStore } from "pinia";

import {auth0} from "@/main";

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
      auth0.loginWithPopup();
    },
    async logout() {
      auth0.logout({ logoutParams: { returnTo: window.location.origin } });
    },
    async clearCart() {
      this.cart.goodsList = [];
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    async addGoodToCart(good) {
      this.cart.goodsList.push(good);
      localStorage.setItem("cartState", JSON.stringify(this.cart));
    },
  },
});
