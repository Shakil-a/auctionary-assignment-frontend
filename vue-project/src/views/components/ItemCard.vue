<template>
  <div class="card h-100 shadow-sm">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title text-primary">
        <router-link
          :to="`/item/${itemId}`"
          class="text-decoration-none"
        >
          {{ name }}
        </router-link>
      </h5>

      <p class="card-text text-secondary flex-grow-1">
        {{ description }}
      </p>

      <div class="mt-auto">
        <p class="mb-1"><strong>Ends on:</strong> {{ endDate }}</p>
        <p class="mb-0">
          <strong>Seller:</strong>
          <router-link :to="`/profile/${sellerId}`" class="link-secondary">
            {{ sellerName }}
          </router-link>
        </p>
      </div>
    </div>
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
.card-text {
  min-height: 3rem;
}
</style>
