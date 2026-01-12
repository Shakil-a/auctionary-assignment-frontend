<template>
  <div>
    <button @click="logout">Logout</button>
    <p v-if="loading">Loading profile...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <div v-if="profile">
      <h2>{{ profile.first_name }} {{ profile.last_name }}</h2>

      <h3>Selling</h3>
      <ItemsList :items="profile.selling" />

      <h3>Bidding On</h3>
      <ItemsList :items="profile.bidding_on" />

      <h3>Auctions Ended</h3>
      <ItemsList :items="profile.auctions_ended" />
    </div>
  </div>
</template>

<script>
import { userService } from '@/services/user.service';
import ItemsList from '../components/ItemsList.vue';

export default {
  data() {
    return {
      profile: null,
      loading: true,
      error: ""
    }
  },
   components: {
    ItemsList
  },
  computed: {
    profileUserId() {
      if (this.$route.params.id) {
        return Number(this.$route.params.id)
      }
      return Number(localStorage.getItem('user_id'))
    }
  },
  mounted() {
    this.loadProfile()
  },
  methods: {
    loadProfile() {
      this.loading = true
      userService.getProfile(this.profileUserId)
        .then(data => this.profile = data)
        .catch(err => this.error = err)
        .finally(() => this.loading = false)
    },
     logout() {
      userService.logout()
        .then(() => {
          this.$router.push("/")
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>
