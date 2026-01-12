<template>
  <div>
    <h1>Homepage</h1>

    <!-- Search Input (Everyone) -->
    <input
      v-model="searchQuery"
      placeholder="Search items..."
      @input="fetchItems"
    />

    <!-- Status Filter (Only when logged in) -->
    <div v-if="isLoggedIn">
      <select v-model="statusFilter" @change="fetchItems">
        <option value="">All status</option>
        <option value="OPEN">Open</option>
        <option value="BID">Bid</option>
        <option value="ARCHIVE">Archive</option>
      </select>
    </div>

    <p v-if="loading">Loading items...</p>
    <p v-if="error">{{ error }}</p>

    <!-- Items List -->
    <ItemsList v-if="!loading && !error && items.length > 0" :items="items" />

    <!-- No results message -->
    <p v-if="!loading && !error && items.length === 0">
      No items found.
    </p>
  </div>
</template>

<script>
import ItemsList from '../components/ItemsList.vue'
import { coreService } from '@/services/core.service'
import { authState } from '@/services/user.service'

export default {
  components: { ItemsList },
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
    // Determine logged‑in state
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

      // Build params — only add status if user is logged in
      const params = {
        q: this.searchQuery
      }

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
    }
  }
}
</script>
