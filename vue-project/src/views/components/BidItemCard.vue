<template>
  <div class="card shadow-sm mb-2">
    <div class="card-body d-flex justify-content-between align-items-center">
      <div>
        <strong class="text-primary">{{ user }}</strong>
        <p class="mb-0 text-secondary">bid ${{ amount }}</p>
      </div>
      <small class="text-muted">{{ date }}</small>
    </div>
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
