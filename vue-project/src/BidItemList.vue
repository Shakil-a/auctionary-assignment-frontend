<template>
  <div>
    <BidItemCard
      v-for="bid in bids"
      :key="bid.id"
      :user="bid.user"
      :amount="bid.amount"
      :date="bid.date"
    />
    <p v-if="bids.length === 0">No bids yet.</p>
  </div>
</template>

<script>
import BidItemCard from './BidItemCard.vue';

export default {
  components: { BidItemCard },
  props: {
    bids: { type: Array, default: () => [] }
  }
}
</script>
