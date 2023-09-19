import { defineStore } from "pinia";
import { isEqual } from "lodash";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("userState") || null),
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
    async login(username, password) {
      try {
        const response = await this.$http.post("/auth/login", {
          username,
          password,
        });
      } catch (error) {
        console.error("Error during login:", error);
      }
    },
    async get() {
      return this.$http
        .get("/auth/profile")
        .then((resp) => {
          if (!this.user || !isEqual(this.user, resp.data)) {
            this.user = resp.data;
            localStorage.setItem("userState", JSON.stringify(resp.data));
          }
          return resp.data;
        })
        .catch(() => {
          this.user = null;
          localStorage.setItem("userState", null);
        });
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
