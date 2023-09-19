<template>
  <div id="app">
    <Toast />
    <DynamicDialog />
    <Layout />
  </div>
</template>

<script>
import Toast from "primevue/toast";
import DynamicDialog from "primevue/dynamicdialog";

import Layout from "./layout/Layout.vue"

export default {
  components: { Toast, DynamicDialog, Layout }
}
</script>