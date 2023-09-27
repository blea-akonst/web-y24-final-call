import { defineStore } from "pinia";
import {auth0} from "@/main";

export const useOrdersStore = defineStore("orders", {
  state: () => ({ orders: [] }),
  actions: {
    async getOrders() {
      return this.$http
        .get("/orders",{
          headers: {
            Authorization: 'Bearer ' + await auth0.getAccessTokenSilently()
          }
        })
        .then((resp) => this.$patch({ orders: resp.data }));
    },
    async makeNewOrder(address, orderGoodIds) {
      return this.$http
        .post("/orders", {
          address: address,
          orderGoodIds: orderGoodIds
        }, {
            headers: {
                Authorization: 'Bearer ' + await auth0.getAccessTokenSilently()
            }
        })
        .then((resp) => resp.data);
    },
  },
});
