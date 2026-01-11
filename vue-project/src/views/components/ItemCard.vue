<template>
  <div class="item-card">
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <p>Starting bid: ${{ startingBid }}</p>
    <p>End date: {{ endDate }}</p>
    <p v-if="currentBid">Current bid: ${{ currentBid }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    startingBid: { type: Number, required: true },
    endDate: { type: String, required: true },
    currentBid: { type: Number, default: null }
  }
}
</script>

<style scoped>
.auction-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>
