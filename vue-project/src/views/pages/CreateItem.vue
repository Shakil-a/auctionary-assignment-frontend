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
      <div v-show="submitted && (starting_bid === null || starting_bid <= 0)">
        Must be a positive number
      </div>

      <label>End Date:</label>
      <input type="date" v-model="end_date" />
      <div v-show="submitted && !validEndDate">End date must be in the future</div>

      <br /><br />
      <button>Create</button>
      <div v-if="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import { coreService } from '@/services/core.service'

export default {
  data() {
    return {
      name: "",
      description: "",
      starting_bid: null,
      end_date: "",
      submitted: false,
      error: ""
    };
  },
  computed: {
    validEndDate() {
      if (!this.end_date) return false;
      const end = new Date(this.end_date);
      return end.getTime() > Date.now();
    }
  },
  methods: {
    async handleSubmit() {
      this.submitted = true;
      this.error = "";

      if (!this.name || !this.description || !this.starting_bid || !this.validEndDate) return;

      const endTimestamp = new Date(this.end_date).getTime(); // Convert to Unix timestamp in ms

      const itemData = {
        name: this.name,
        description: this.description,
        starting_bid: this.starting_bid,
        end_date: endTimestamp
      };

      try {
        const newItem = await coreService.createItem(itemData);
        // Redirect to the new item's details page
        this.$router.push(`/item/${newItem.item_id}`);
      } catch (err) {
        this.error = err.message || err || "Failed to create item";
      }
    }
  }
};
</script>
