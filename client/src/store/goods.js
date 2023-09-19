import { defineStore } from "pinia";

export const useGoodsStore = defineStore("goods", {
  state: () => ({ goods: [] }),
  actions: {
    async getGoods() {
      return this.$http
        .get("/goods")
        .then((resp) => this.$patch({ goods: resp.data }));
    },
  },
});
