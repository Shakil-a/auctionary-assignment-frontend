<template>
  <div>
    <router-link v-for="item in items" :key="item.item_id" :to="`/item/${item.item_id}`">
      <ItemCard
      :name="item.name"
      :description="item.description"
      :endDate="formatDate(item.end_date)"
      :sellerName="`${item.first_name} ${item.last_name}`"
      />
    </router-link>
  </div>
</template>

<script>
import ItemCard from './ItemCard.vue'

export default {
  components: { ItemCard },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    formatDate(timestamp) {
      return new Date(timestamp).toLocaleDateString()
    }
  }
}
</script>