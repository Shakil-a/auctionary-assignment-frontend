<template>
  <div class="container py-4">

    <h1 class="text-primary text-center mb-4">Explore Auctions</h1>

    <div class="row g-2 align-items-center mb-3">

      <div class="col-12 col-md-8">
        <input
          type="text"
          class="form-control"
          v-model="searchQuery"
          @input="fetchItems"
          placeholder="Search items..."
        />
      </div>

      <div v-if="isLoggedIn" class="col-12 col-md-4">
        <select
          class="form-select"
          v-model="statusFilter"
          @change="fetchItems"
        >
          <option value="">All status</option>
          <option value="OPEN">Open</option>
          <option value="BID">Bid</option>
          <option value="ARCHIVE">Archive</option>
        </select>
      </div>

    </div>

    <p v-if="loading" class="text-center text-secondary">Loading items...</p>
    <p v-if="error" class="alert alert-danger text-center">{{ error }}</p>

    <div
      v-if="!loading && !error && items.length > 0"
      class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
    >
      <div class="col" v-for="item in items" :key="item.item_id">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title text-primary">
              <router-link :to="`/item/${item.item_id}`" class="text-decoration-none">
                {{ item.name }}
              </router-link>
            </h5>
            <p class="card-text text-secondary">{{ item.description }}</p>
          </div>
          <div class="card-footer bg-light">
            <small class="text-muted">
              Ends on: {{ formatDate(item.end_date) }}
            </small>
            <br />
            Seller:
            <router-link :to="`/profile/${item.creator_id}`" class="link-secondary">
              {{ item.first_name }} {{ item.last_name }}
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <p v-if="!loading && !error && items.length === 0" class="text-center text-secondary">
      No items found.
    </p>
  </div>
</template>

<script>
import { coreService } from '@/services/core.service'
import { authState } from '@/services/user.service'

export default {
  data() {
    return {
      items: [],
      searchQuery: "",
      statusFilter: "",
      loading: false,
      error: ""
    }
  },
  computed: {
    isLoggedIn() {
      return !!authState.sessionToken
    }
  },
  mounted() {
    this.fetchItems()
  },
  methods: {
    fetchItems() {
      this.loading = true
      this.error = ""

      const params = { q: this.searchQuery }
      if (this.isLoggedIn && this.statusFilter) {
        params.status = this.statusFilter
      }

      coreService.searchItems(params)
        .then(items => {
          this.items = items
          this.loading = false
        })
        .catch(err => {
          this.error = err.message || "Failed to load items"
          this.loading = false
        })
    },
    formatDate(timestamp) {
      return new Date(timestamp).toLocaleDateString()
    }
  }
}
</script>
