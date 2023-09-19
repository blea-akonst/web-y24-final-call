<template>
    <div class="flex flex-column gap-3">
        <DataTable :value="userStore.cart.goodsList">
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="category" header="Category"></Column>
            <Column field="price" header="Price ($)"></Column>
        </DataTable>
        <div class="flex flex-row align-items-start">Order total: ${{ orderTotal }}</div>
        <div class="flex flex-row align-items-center justify-content-end gap-2">
            <Button label="Clear" size="small" @click="userStore.clearCart" />
            <Button label="Make Order" size="small" @click="makeOrder" :disabled="userStore.cart.goodsList.length === 0" />
        </div>
    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

import NewOrder from '@/components/NewOrder.vue';

import { mapStores } from 'pinia';
import { useUserStore } from '@/store/user'

export default {
    components: { DataTable, Column, Button },
    computed: {
        orderTotal() {
            return this.userStore?.cart?.goodsList
                ? this.userStore.cart.goodsList.reduce((acc, item) => acc + item.price, 0)
                : 0
        },
        ...mapStores(useUserStore)
    },
    methods: {
        makeOrder() {
            this.$dialog.open(NewOrder, {
                props: {
                    header: 'Order',
                    style: {
                        width: '50vw',
                    },
                    breakpoints: {
                        '960px': '75vw',
                        '640px': '90vw'
                    },
                    modal: true
                },
                data: { orderItems: this.userStore.cart.goodsList }
            })
        }
    }
}
</script>
