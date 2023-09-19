import { defineStore } from "pinia";

export const useOrdersStore = defineStore("orders", {
  state: () => ({ orders: [] }),
  actions: {
    async getOrders() {
      return this.$http
        .get("/orders")
        .then((resp) => this.$patch({ orders: resp.data }));
    },
    async makeNewOrder(address, orderGoodIds) {
      return this.$http
        .post("/orders", {
          address: address,
          orderGoodIds: orderGoodIds,
        })
        .then((resp) => resp.data);
    },
  },
});
