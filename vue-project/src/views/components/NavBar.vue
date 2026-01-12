<template>
  <nav class="nav">
    <router-link to="/">Home</router-link>

    <span v-if="!isLoggedIn">
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </span>

    <span v-else>
      <router-link to="/create-item">Create Item</router-link>
      <router-link to="/profile">Profile</router-link>
    </span>
  </nav>
</template>

<script>
import { authState } from '@/services/user.service'

export default {
  computed: {
    isLoggedIn() {
      return !!authState.sessionToken
    }
  }
}
</script>

