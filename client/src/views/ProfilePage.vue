<template>
    <div v-if="userStore.user" class="profile-page grid">
        <div class="col-12 md:col-6">
            <Card>
                <template #title>
                    Your Profile Info
                </template>
                <template #content>
                    <div class="flex flex-column gap-2 align-items-center justify-content-center my-6">
                        <div class="flex flex-row align-items-center justify-content-between w-full">
                            <b>Full Name</b>
                            <span>{{ userStore.user.fullName }}</span>
                        </div>
                        <div class="flex flex-row align-items-center justify-content-between w-full">
                            <b>Birth Date</b>
                            <span>{{ userStore.user.birthDate }}</span>
                        </div>
                    </div>
                </template>
            </Card>
        </div>
        <div class="col-12 md:col-6">
            <Card>
                <template #title>
                    Your Orders
                </template>
                <template #content>
                    <div class="flex flex-column align-items-center justify-content-center gap-2">
                        <DataTable :value="ordersStore.orders" class="sm" style="width: 95%">
                            <Column field="address" header="Address"></Column>
                            <Column header="Total ($)">
                                <template #body="{ data }">
                                    {{ countOrderPrice(data) }}
                                </template>
                            </Column>
                            <Column field="content" header="Content">
                                <template #body="{ data }">
                                    <Button icon="pi pi-inbox" label="Show" size="small" @click="showOrderContent(data)" />
                                </template>
                            </Column>
                        </DataTable>
                    </div>
                </template>
            </Card>
        </div>
    </div>
</template>

<script>
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Button from 'primevue/button';

import OrderContent from '@/components/OrderContent.vue';

import { mapStores } from 'pinia';
import { useUserStore } from '@/store/user';
import { useOrdersStore } from '@/store/orders';

export default {
    components: { Card, DataTable, Column, Tag, Button },
    computed: {
        ...mapStores(useUserStore, useOrdersStore)
    },
    data() {
        return {
            orders: []
        }
    },
    methods: {
        getSeverity(status) {
            switch (status) {
                case 'NEW':
                    return 'info'
                case 'DELIVERED':
                    return 'success'
                case 'CANCELLED':
                    return 'danger'
                case 'IN PROCESS':
                    return 'warning'
            }

            return ''
        },
        showOrderContent(order) {
            this.$dialog.open(OrderContent, {
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
                data: { order }
            })
        },
        countOrderPrice(order) {
            return order.orderUnits.reduce((acc, unit) => acc + unit.good.price, 0)
        }
    },
    async mounted() {
        await this.ordersStore.getOrders();
    }
}
</script>

<style>
.profile-page>div>* {
    min-height: 35vh;
}
</style>