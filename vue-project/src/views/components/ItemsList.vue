<template>
  <div>
    <ItemCard
      v-for="item in items"
      :key="item.item_id"
      :itemId="item.item_id"
      :name="item.name"
      :description="item.description"
      :endDate="formatDate(item.end_date)"
      :sellerId="item.creator_id"
      :sellerName="`${item.first_name} ${item.last_name}`"
    />
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
