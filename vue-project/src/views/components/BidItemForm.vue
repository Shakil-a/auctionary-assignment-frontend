<template>
  <div class="mb-4">
    <h5 class="text-primary mb-2">Place a Bid</h5>

    <form @submit.prevent="handleSubmit" novalidate>

      <div class="mb-3">
        <label class="form-label">Bid Amount</label>
        <input
          type="number"
          v-model.number="amount"
          class="form-control"
          :class="{ 'is-invalid': submitted && (amount === null || amount <= 0) }"
          placeholder="Enter your bid"
        />
        <div class="invalid-feedback">
          Please enter a valid bid amount greater than zero.
        </div>
      </div>

      <button type="submit" class="btn btn-success">
        Submit Bid
      </button>

    </form>
  </div>
</template>


<script>
import { coreService } from '@/services/core.service'

export default {
  props: ["currentBid", "itemId"],
  data() {
    return {
      amount: null,
      submitted: false
    }
  },
  methods: {
    handleSubmit() {
      this.submitted = true

      if (!this.amount || this.amount <= 0) return
      if (this.currentBid && this.amount <= this.currentBid) {
        alert("Bid must be higher than the current bid")
        return
      }

      coreService.placeBid(this.itemId, { amount: this.amount })
        .then(() => {
          this.$emit('bidPlaced') 
          this.amount = null
          this.submitted = false
        })
        .catch(err => alert("Failed to place bid: " + err))
    }
  }
}
</script>
