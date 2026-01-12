<template>
  <div>
    <ul v-if="bids.length > 0" class="list-group mb-3">
      <li 
        v-for="bid in bids" 
        :key="bid.item_id + '-' + bid.user_id + '-' + bid.timestamp"
        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
      >
        <div>
          <strong class="text-primary">{{ bid.first_name }} {{ bid.last_name }}</strong>
          <span class="text-secondary">bid ${{ bid.amount }}</span>
        </div>
        <small class="text-muted">{{ formatDate(bid.timestamp) }}</small>
      </li>
    </ul>

    <p v-if="bids.length === 0" class="text-secondary text-center">
      No bids yet.
    </p>
  </div>
</template>

<script>
export default {
  props: {
    bids: { type: Array, default: () => [] }
  },
  methods: {
    formatDate(timestamp) {
      return new Date(timestamp).toLocaleString()
    }
  }
}
</script>
