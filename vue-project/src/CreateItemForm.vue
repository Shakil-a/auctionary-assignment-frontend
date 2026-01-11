<template>
  <div>
    <h1>Create Item</h1>
    <form @submit.prevent="handleSubmit">
      <label>Name:</label>
      <input type="text" v-model="name" />
      <div v-show="submitted && !name">Name is required</div>

      <label>Description:</label>
      <textarea v-model="description"></textarea>
      <div v-show="submitted && !description">Description is required</div>

      <label>Starting Bid:</label>
      <input type="number" v-model.number="starting_bid" />
      <div v-show="submitted && (starting_bid === null || starting_bid < 0)">
        Must be a positive number
      </div>

      <label>End Date:</label>
      <input type="date" v-model="end_date" />
      <div v-show="submitted && !validEndDate">End date must be in the future</div>

      <br /><br />
      <button>Create</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      description: "",
      starting_bid: null,
      end_date: "",
      submitted: false,
    };
  },
  computed: {
    validEndDate() {
      if (!this.end_date) return false;
      const end = new Date(this.end_date);
      return end > new Date();
    },
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      if (!this.name || !this.description || this.starting_bid === null || !this.validEndDate)
        return;
      alert("Item form valid!");
    },
  },
};
</script>
