<template>
  <div class="item-card">
    <h3>{{ name }}</h3>
    <p>{{ description }}</p>
    <p>Ends on: {{ endDate }}</p>
    <p class="seller">Seller: {{ sellerName }}</p>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    description: { type: String, required: true },
    endDate: { type: String, required: true },
    sellerName: { type: String, default: "" }
  }
}
</script>

<style scoped>
.item-card {
  border: 1px solid #ccc;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 6px;
}
</style>
