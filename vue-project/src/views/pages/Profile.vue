<template>
  <div class="container py-4">

    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-primary">
        {{ profile?.first_name }} {{ profile?.last_name }}
      </h2>
      <button class="btn btn-secondary" @click="logout">
        Logout
      </button>
    </div>

    <p v-if="loading" class="text-center text-secondary">Loading profile...</p>
    <p v-if="error" class="alert alert-danger text-center">{{ error }}</p>

    <div v-if="profile" class="">

      <h3 class="text-primary mt-3">Selling</h3>
      <div v-if="profile.selling.length > 0" class="row row-cols-1 row-cols-md-2 g-4">
        <div v-for="item in profile.selling" :key="item.item_id" class="col">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">
                <router-link :to="`/item/${item.item_id}`" class="text-decoration-none">
                  {{ item.name }}
                </router-link>
              </h5>
              <p class="card-text text-secondary">
                {{ item.description }}
              </p>
            </div>
            <div class="card-footer bg-light text-muted">
              Ends: {{ formatDate(item.end_date) }}
            </div>
          </div>
        </div>
      </div>
      <p v-else class="text-secondary">No items currently being sold.</p>

      <h3 class="text-primary mt-4">Bidding On</h3>
      <div v-if="profile.bidding_on.length > 0" class="row row-cols-1 row-cols-md-2 g-4">
        <div v-for="item in profile.bidding_on" :key="item.item_id" class="col">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">
                <router-link :to="`/item/${item.item_id}`" class="text-decoration-none">
                  {{ item.name }}
                </router-link>
              </h5>
              <p class="card-text text-secondary">
                {{ item.description }}
              </p>
            </div>
            <div class="card-footer bg-light text-muted">
              Ends: {{ formatDate(item.end_date) }}
            </div>
          </div>
        </div>
      </div>
      <p v-else class="text-secondary">Not bidding on any items right now.</p>

      <h3 class="text-primary mt-4">Auctions Ended</h3>
      <div v-if="profile.auctions_ended.length > 0" class="row row-cols-1 row-cols-md-2 g-4">
        <div v-for="item in profile.auctions_ended" :key="item.item_id" class="col">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">
                <router-link :to="`/item/${item.item_id}`" class="text-decoration-none">
                  {{ item.name }}
                </router-link>
              </h5>
              <p class="card-text text-secondary">
                {{ item.description }}
              </p>
            </div>
            <div class="card-footer bg-light text-muted">
              Ended on: {{ formatDate(item.end_date) }}
            </div>
          </div>
        </div>
      </div>
      <p v-else class="text-secondary">No auction history yet.</p>
    </div>

  </div>
</template>

<script>
import { userService } from '@/services/user.service'

export default {
  data() {
    return {
      profile: null,
      loading: true,
      error: ""
    }
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
        .catch(err => this.error = err.message || err || "")
        .finally(() => this.loading = false)
    },
    formatDate(timestamp) {
      return new Date(timestamp).toLocaleDateString()
    },
    logout() {
      userService.logout()
        .then(() => this.$router.push("/"))
        .catch(err => console.error(err))
    }
  }
}
</script>
