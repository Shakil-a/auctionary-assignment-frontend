<template>
  <div>
    <ItemCard
      v-for="item in items"
      :key="item.id"
      :title="item.title"
      :description="item.description"
      :startingBid="item.startingBid"
      :endDate="item.endDate"
      :currentBid="item.currentBid"
    />
  </div>
</template>

<script>
import ItemCard from './ItemCard.vue';

export default {
  components: { ItemCard },
  props: {
    items: { type: Array, default: () => [] }
  }
}
</script>
