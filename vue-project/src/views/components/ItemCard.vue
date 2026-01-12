<template>
  <div class="item-card">
    <h3>
      <router-link :to="`/item/${itemId}`">
        {{ name }}
      </router-link>
    </h3>

    <p>{{ description }}</p>
    <p>Ends on: {{ endDate }}</p>

    <p class="seller">
      Seller:
      <router-link :to="`/profile/${sellerId}`">
        {{ sellerName }}
      </router-link>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    itemId: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    endDate: { type: String, required: true },
    sellerId: { type: Number, required: true },
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

.seller a {
  color: #2c7be5;
  text-decoration: none;
}
</style>
