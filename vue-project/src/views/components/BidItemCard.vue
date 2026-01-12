<template>
  <div class="bid-item-card">
    <p>
      <strong>{{ user }}</strong> bid ${{ amount }} on {{ date }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    user: { type: String, required: true },      // full name
    amount: { type: Number, required: true },    // bid amount
    date: { type: String, required: true }       // formatted timestamp
  }
}
</script>

<style scoped>
.bid-item-card {
  border-bottom: 1px solid #ddd;
  padding: 5px 0;
}
</style>
