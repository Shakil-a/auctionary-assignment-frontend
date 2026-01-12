<template>
  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
    <div
      class="col"
      v-for="item in items"
      :key="item.item_id"
    >
      <ItemCard
        :itemId="item.item_id"
        :name="item.name"
        :description="item.description"
        :endDate="formatDate(item.end_date)"
        :sellerId="item.creator_id"
        :sellerName="`${item.first_name} ${item.last_name}`"
      />
    </div>
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
