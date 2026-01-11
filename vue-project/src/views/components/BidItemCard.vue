<template>
  <div class="bid-item-card">
    <p><strong>{{ user }}</strong> bid ${{ amount }} on {{ date }}</p>
  </div>
</template>

<script>
export default {
  props: {
    user: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: String, required: true }
  }
}
</script>

<style scoped>
.bid-item-card {
  border-bottom: 1px solid #ddd;
  padding: 5px 0;
}
</style>
