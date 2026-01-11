<template>
  <div class="single-item">
    <p v-if="loading">Loading item details...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <div v-if="!loading && item">
      <h2>{{ item.name }}</h2>
      <p>{{ item.description }}</p>
      <p>Starting bid: ${{ item.starting_bid }}</p>
      <p>Start date: {{ formatDate(item.start_date) }}</p>
      <p>End date: {{ formatDate(item.end_date) }}</p>

      <p v-if="item.current_bid">
        Current bid: ${{ item.current_bid ?? 'N/A' }}
        <span v-if="item.current_bid_holder">
            by {{ item.current_bid_holder?.first_name }} {{ item.current_bid_holder?.last_name }}
        </span>
</p>

      <p>Seller: {{ item.first_name }} {{ item.last_name }}</p>
    </div>
  </div>
</template>

<script>
import { coreService } from '@/services/core.service'

export default {
  data() {
    return {
      item: null,
      loading: true,
      error: ""
    }
  },
  mounted() {
    this.loading = true
    const id = Number(this.$route.params.id)
    coreService.getItem(id)
      .then(item => {
        this.item = item
        this.loading = false
      })
      .catch(err => {
        this.error = err.message || "Failed to load item"
        this.loading = false
      })
  },
  methods: {
    formatDate(timestamp) {
      return new Date(timestamp).toLocaleString()
    }
  }
}
</script>

<style scoped>
.single-item {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 6px;
  margin: 10px 0;
}
.error {
  color: red;
}
</style>
