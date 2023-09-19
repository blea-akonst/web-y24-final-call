<template>
    <div class="flex flex-column gap-3">
        <div class="flex flex-column gap-2">
            <label for="address">Address</label>
            <InputText id="address" v-model="address" aria-describedby="address-help" />
            <small id="address-help">Enter your address for delivery.</small>
        </div>
        <DataTable class="sm" :value="orderItems">
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="category" header="Category"></Column>
            <Column field="price" header="Price ($)"></Column>
        </DataTable>
        <div>Order total: ${{ orderTotal }}</div>
        <div class="flex flex-row align-items-end justify-content-end">
            <Button size="small" label="Make Order" :disabled="address.length < 3" @click="submitOrder" />
        </div>
    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { mapStores } from 'pinia';
import { useOrdersStore } from '@/store/orders';

export default {
    inject: ['dialogRef'],
    components: { DataTable, InputText, Button, Column },
    data() {
        return {
            orderItems: [],
            address: ""
        }
    },
    computed: {
        orderTotal() {
            return this.orderItems ? this.orderItems.reduce((acc, item) => acc + item.price, 0) : 0
        },
        orderItemIds() {
            return this.orderItems ? this.orderItems.map(item => item.id) : []
        },
        ...mapStores(useOrdersStore)
    },
    methods: {
        async submitOrder() {
            await this.ordersStore.makeNewOrder(this.address, this.orderItemIds)
                .then(() => this.$toast.add({ severity: 'success', summary: 'Order', detail: 'Your order was created successfully.', life: 2000 }))
                .catch(() => this.$toast.add({ severity: 'error', summary: 'Order', detail: 'There was an error with the order placement..', life: 2000 }))
                .finally(() => this.dialogRef.close())
        }
    },
    mounted() {
        this.orderItems = this.dialogRef.data.orderItems;
    },
    beforeUnmount() {
        Object.assign(this.$data, this.$options.data())
    }
}
</script>
