<template>
    <div class="flex flex-column align-items-center justify-content-center gap-2" v-if="orderContent">
        <DataTable :value="orderContent" class="sm" style="width: 80%">
            <Column field="good.id" header="ID"></Column>
            <Column field="good.name" header="Name"></Column>
            <Column field="good.category" header="Category"></Column>
            <Column field="good.price" header="Price ($)"></Column>
        </DataTable>
    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
    inject: ['dialogRef'],
    components: { DataTable, Column },
    data() {
        return {
            orderContent: []
        }
    },
    mounted() {
        this.orderContent = this.dialogRef.data.order.orderUnits;
    },
    beforeUnmount() {
        Object.assign(this.$data, this.$options.data())
    }
}
</script>
