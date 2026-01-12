<template>
  <div>
    <h1>Homepage</h1>

    <!-- Search Section -->
    <input
      v-model="searchQuery"
      placeholder="Search items..."
      @input="fetchItems"
    />

    <select v-model="statusFilter" @change="fetchItems">
      <option value="">All status</option>
      <option value="OPEN">Open</option>
      <option value="BID">Bid</option>
      <option value="ARCHIVE">Archive</option>
    </select>

    <p v-if="loading">Loading items...</p>
    <p v-if="error">{{ error }}</p>

    <ItemsList v-if="!loading && !error" :items="items" />
  </div>
</template>

<script>
import ItemsList from '../components/ItemsList.vue'
import { coreService } from '@/services/core.service'

export default {
  components: { ItemsList },
  data() {
    return {
      items: [],
      searchQuery: "",
      statusFilter: "",
      loading: true,
      error: ""
    }
  },
  mounted() {
    this.fetchItems()
  },
  methods: {
    fetchItems() {
      this.loading = true
      this.error = ""

      coreService.searchItems({
        q: this.searchQuery,
        status: this.statusFilter
      })
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
