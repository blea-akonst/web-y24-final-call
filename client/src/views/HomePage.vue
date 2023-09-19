<template>
    <div class="home-page">
        <DataView :value="goodsStore.goods">
            <template #list="slotProps">
                <div class="col-12">
                    <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                        <div
                            class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div class="text-2xl font-bold text-900">{{ slotProps.data.name }}</div>
                                <div class="flex align-items-center gap-3">
                                    <span class="flex align-items-center gap-2">
                                        <i class="pi pi-tag"></i>
                                        <span class="font-semibold">{{ slotProps.data.category }}</span>
                                    </span>
                                </div>
                            </div>
                            <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                <span class="text-2xl font-semibold">${{ slotProps.data.price }}</span>
                                <Button icon="pi pi-shopping-cart" rounded :disabled="!userStore.authenticated"
                                    @click="addGoodToCart(slotProps.data)"></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </DataView>
    </div>
</template>

<script>
import DataView from 'primevue/dataview';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';

import { mapStores } from 'pinia';
import { useUserStore } from '@/store/user';
import { useGoodsStore } from '@/store/goods'

export default {
    components: { DataView, Tag, Button, InputNumber },
    computed: {
        ...mapStores(useUserStore, useGoodsStore)
    },
    methods: {
        addGoodToCart(good) {
            if (this.userStore.cart.goodsList.findIndex(gd => gd.id === good.id) !== -1) {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: `${good.name} is already in your cart`, life: 3000 })
                return;
            }
            this.userStore.addGoodToCart(good)
            this.$toast.add({ severity: 'success', summary: 'Success', detail: `${good.name} successfully added to your cart`, life: 3000 })
        }
    }
}
</script>

<style scoped></style>