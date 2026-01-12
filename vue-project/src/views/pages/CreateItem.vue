<template>
  <div class="container py-4">
    <div class="card shadow-sm mx-auto" style="max-width: 600px;">
      <div class="card-body">
        <h2 class="text-center text-primary mb-4">Create New Item</h2>

        <form @submit.prevent="handleSubmit" novalidate>

          <div class="mb-3">
            <label class="form-label">Item Name</label>
            <input
              type="text"
              v-model="name"
              class="form-control"
              :class="{ 'is-invalid': submitted && !name }"
              placeholder="Enter item title"
            />
            <div class="invalid-feedback">
              Name is required
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea
              v-model="description"
              class="form-control"
              rows="4"
              :class="{ 'is-invalid': submitted && !description }"
              placeholder="Enter a description"
            ></textarea>
            <div class="invalid-feedback">
              Description is required
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Starting Bid</label>
            <input
              type="number"
              v-model.number="starting_bid"
              class="form-control"
              :class="{ 'is-invalid': submitted && (starting_bid === null || starting_bid <= 0) }"
              placeholder="Enter starting bid"
            />
            <div class="invalid-feedback">
              Must be a positive number
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">End Date</label>
            <input
              type="date"
              v-model="end_date"
              class="form-control"
              :class="{ 'is-invalid': submitted && !validEndDate }"
            />
            <div class="invalid-feedback">
              End date must be in the future
            </div>
          </div>

          <button class="btn btn-primary w-100" type="submit">
            Create Item
          </button>

          <div v-if="error" class="alert alert-danger mt-3 text-center">
            {{ error }}
          </div>

        </form>
      </div>
    </div>
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
      const end = new Date(this.end_date).getTime();
      return end > Date.now();
    }
  },
  methods: {
    async handleSubmit() {
      this.submitted = true;
      this.error = "";

      if (!this.name || !this.description || !this.starting_bid || !this.validEndDate) return;

      const itemData = {
        name: this.name,
        description: this.description,
        starting_bid: this.starting_bid,
        end_date: new Date(this.end_date).getTime()
      };

      try {
        const newItem = await coreService.createItem(itemData);
        this.$router.push(`/item/${newItem.item_id}`);
      } catch (err) {
        this.error = err.message || err || "Failed to create item";
      }
    }
  }
};
</script>
