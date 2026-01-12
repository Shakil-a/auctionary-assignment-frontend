<template>
  <div>
    <BidItemCard
      v-for="bid in bids"
      :key="bid.item_id + '-' + bid.user_id + '-' + bid.timestamp"
      :user="bid.first_name + ' ' + bid.last_name"
      :amount="bid.amount"
      :date="formatDate(bid.timestamp)"
    />
    <p v-if="bids.length === 0">No bids yet.</p>
  </div>
</template>

<script>
import BidItemCard from '../components/BidItemCard.vue';

export default {
  components: { BidItemCard },
  props: {
    bids: { type: Array, default: () => [] }
  },
  methods: {
    formatDate(timestamp) {
      return new Date(timestamp).toLocaleString();
    }
  }
}
</script>
