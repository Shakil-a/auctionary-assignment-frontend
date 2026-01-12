<template>
  <div class="mb-4">
    <h5 class="text-primary mb-2">Ask a Question</h5>

    <form @submit.prevent="handleSubmit" novalidate>

      <div class="mb-3">
        <textarea
          v-model="question"
          class="form-control"
          rows="3"
          placeholder="Type your question here..."
          :class="{ 'is-invalid': submitted && !question }"
        ></textarea>
        <div class="invalid-feedback">
          Question is required.
        </div>
      </div>

      <button type="submit" class="btn btn-secondary">
        Ask
      </button>

    </form>
  </div>
</template>


<script>
import { questionService } from '@/services/questions.service'

export default {
  props: ["itemId"],
  data() {
    return {
      question: "",
      submitted: false
    }
  },
  methods: {
    handleSubmit() {
      this.submitted = true

      if (!this.question) return

      questionService.askQuestion(this.itemId, { question_text: this.question })
        .then(() => {
          this.$emit('questionAsked')
          this.question = ""
          this.submitted = false
        })
        .catch(err => alert("Failed to ask question: " + err))
    }
  }
}
</script>

<style scoped>
.card-body {
  padding: 1rem;
}
</style>
