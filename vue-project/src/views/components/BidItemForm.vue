<template>
  <div>
    <h3>Place Bid</h3>
    <form @submit.prevent="handleSubmit">
      <label>Bid Amount:</label>
      <input type="number" v-model.number="amount" />
      <div v-show="submitted && (amount === null || amount <= 0)">
        Enter a valid bid
      </div>
      <br />
      <button>Bid</button>
    </form>
  </div>
</template>

<script>
import { coreService } from '@/services/core.service'

export default {
  props: ["currentBid", "itemId"],
  data() {
    return { amount: null, submitted: false }
  },
  methods: {
    handleSubmit() {
      this.submitted = true
      if (!this.amount || this.amount <= 0) return
      if (this.currentBid && this.amount <= this.currentBid) {
        alert("Bid must be higher than current bid")
        return
      }

      // Place bid via API
      coreService.placeBid(this.itemId, { amount: this.amount })
        .then(() => {
          this.$emit('bidPlaced') // notify parent to reload bids
          this.amount = null
          this.submitted = false
        })
        .catch(err => alert("Failed to place bid: " + err))
    }
  }
}
</script>
