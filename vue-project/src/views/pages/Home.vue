<template>
  <div>
    <h1>Homepage</h1>

    <p v-if="loading">Loading items...</p>
    <p v-if="error">{{ error }}</p>

    <ItemsList v-if="!loading && !error" :items="items" />
  </div>
</template>

<script>
import ItemsList from '../components/ItemsList.vue';
import { coreService } from '@/services/core.service'

export default {
  components: {
    ItemsList
  },
  data() {
    return {
      items: [],
      error: "",
      loading: true
    }
  },
  mounted() {
    coreService.searchItems()
      .then(items => {
        this.items = items
        this.loading = false
        console.log(items)
      })
      .catch(err => {
        this.error = err.message || "Failed to load items"
        this.loading = false
      })
  }
}
</script>
