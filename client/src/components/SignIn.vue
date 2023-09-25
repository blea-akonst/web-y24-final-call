<template>
  <div class="flex flex-column gap-2 px-5">
    <div class="flex flex-column gap-2">
      <label for="username">Username</label>
      <InputText id="username" v-model="username" aria-describedby="username-help"/>
      <small id="username-help">Enter your username.</small>
    </div>
    <div class="flex flex-column gap-2">
      <label for="password">Password</label>
      <InputText id="password" type="password" v-model="password" aria-describedby="password-help"/>
      <small id="password-help">Enter your password.</small>
    </div>
    <Button label="Sign In" @click="signIn"/>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import {mapStores} from 'pinia';

import {useUserStore} from '@/store/user'

import router from '@/router';

export default {
  components: {InputText, Button},
  inject: ['dialogRef'],
  computed: {
    ...mapStores(useUserStore)
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    addSignInSuccessToast() {
      this.$toast.add({severity: 'success', summary: 'Sign in was successful', life: 2000})
    },
    addSignInErrorToast() {
      this.$toast.add({severity: 'error', summary: 'Sign in error. Please try again', life: 2000})
    },
    async signIn() {
      await this.userStore.login(this.username, this.password)
          .then(async (response) => {
            if (response.status === 200) {
              await this.userStore.get();
              await router.push("/");

              this.dialogRef.close();
              this.addSignInSuccessToast();
            } else {
              this.addSignInErrorToast();
            }
          })
          .catch(() => this.addSignInErrorToast())
    },
  }
}
</script>
