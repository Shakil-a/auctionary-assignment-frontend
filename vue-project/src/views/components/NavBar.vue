<template>
  <nav class="nav">
    <router-link to="/">Home</router-link>

    <span v-if="!isLoggedIn">
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </span>

    <span v-else>
      <router-link to="/create-item">Create Item</router-link>
      <button @click="logout">Logout</button>
    </span>
  </nav>
</template>

<script>
import { userService, authState } from '@/services/user.service'

export default {
  computed: {
    isLoggedIn() {
      return !!authState.sessionToken
    }
  },
  methods: {
    logout() {
      userService.logout()
        .then(() => {
          this.$router.push("/login")
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

