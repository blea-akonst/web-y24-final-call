<template>
  <div class="layout flex flex-column align-items-center justify-content-center">
    <div class="flex flex-column align-items-center justify-content-center pb-3">
      <div class="menubar">
        <Menubar :model="menubarItems">
          <template #start>
            <div class="navlogo">
            </div>
            <img class="mr-2" src="@/assets/navlogo.svg" height="40" alt="Shop Logo"/>
          </template>
          <template #item="{ label, item, props, root }">
            <router-link v-if="item.route" v-slot="routerProps" :to="item.route" custom>
              <a :href="routerProps.href" v-bind="props.action">
                <span v-bind="props.icon"/>
                <span v-bind="props.label">{{ label }}</span>
              </a>
            </router-link>
            <a v-else :href="item.url" :target="item.target" v-bind="props.action">
              <span v-bind="props.icon"/>
              <span v-bind="props.label">{{ label }}</span>
              <span v-if="!item.command" :class="[root ? 'pi pi-fw pi-angle-down' : 'pi pi-fw pi-angle-right']"
                    v-bind="props.submenuicon"/>
            </a>
          </template>
          <template #end>
            <div v-if="userStore.user != null" class="mr-2">
              <span>You're logged in as {{ userStore.user.nickname }}</span>
            </div>
          </template>
        </Menubar>
      </div>
    </div>
    <div class="body">
      <RouterView/>
    </div>
  </div>
</template>

<script>
import {RouterView} from 'vue-router';

import Menubar from 'primevue/menubar';
import Button from 'primevue/button';

import SignInComponent from '@/components/SignIn.vue';

import {mapStores} from 'pinia';

import {useUserStore} from '@/store/user';

export default {
  components: {RouterView, Menubar, Button},
  computed: {
    ...mapStores(useUserStore)
  },
  data() {
    return {
      menubarItems: [
        {
          label: 'Home',
          icon: 'pi pi-fw pi-home',
          route: '/'
        },
        {
          label: 'Profile',
          icon: 'pi pi-fw pi-user',
          route: '/profile',
          visible: () => this.userStore.authenticated
        },
        {
          label: 'Cart',
          icon: 'pi pi-fw pi-shopping-cart',
          route: '/cart',
          visible: () => this.userStore.authenticated
        },
        {
          label: 'Sign In',
          icon: 'pi pi-fw pi-sign-in',
          visible: () => !this.userStore.authenticated,
          command: () => this.signIn()
        },
        {
          label: 'Sign Out',
          icon: 'pi pi-fw pi-sign-out',
          visible: () => this.userStore.authenticated,
          command: () => this.signOut()
        }
      ]
    }
  },
  methods: {
    signIn() {
      this.userStore.login();
      // this.$dialog.open(SignInComponent, {
      //   props: {
      //     header: 'Sign In',
      //     style: {
      //       width: '50vw',
      //     },
      //     breakpoints: {
      //       '960px': '75vw',
      //       '640px': '90vw'
      //     },
      //     modal: true
      //   },
      //   data: {orderItems: this.userStore.cart.goodsList}
      // })
    },
    signOut() {
      this.userStore.logout();
    }
  }
}
</script>

<style scoped>
.body,
.menubar {
  width: 80vw;
}

.brand {
  text-decoration: none;
}
</style>