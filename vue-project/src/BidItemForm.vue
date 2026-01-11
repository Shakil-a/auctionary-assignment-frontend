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
export default {
  props: ["currentBid"],
  data() {
    return { amount: null, submitted: false };
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      if (this.amount === null || this.amount <= 0) return;
      if (this.currentBid && this.amount <= this.currentBid) {
        alert("Bid must be higher than current bid");
        return;
      }
      alert("Bid valid!");
    },
  },
};
</script>
