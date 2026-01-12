<template>
  <div class="mb-4">
    <h5 class="text-primary mb-2">Answer this Question</h5>

    <form @submit.prevent="handleSubmit" novalidate>

      <div class="mb-3">
        <textarea
          v-model="answer"
          class="form-control"
          rows="3"
          placeholder="Type your answer..."
          :class="{ 'is-invalid': submitted && !answer }"
        ></textarea>
        <div class="invalid-feedback">
          Answer is required
        </div>
      </div>

      <button type="submit" class="btn btn-success">
        Submit Answer
      </button>

    </form>

    <p v-if="error" class="text-danger mt-2">{{ error }}</p>
  </div>
</template>


<script>
import { questionService } from '@/services/questions.service'

export default {
  props: ['questionId'],
  data() {
    return {
      answer: '',
      submitted: false,
      error: ''
    }
  },
  methods: {
    async handleSubmit() {
      this.submitted = true
      this.error = ''

      if (!this.answer) return

      try {
        await questionService.answerQuestion(this.questionId, { answer_text: this.answer })
        this.$emit('answered')
      } catch (err) {
        this.error = err.message || err || 'Failed to submit answer'
      }
    }
  }
}
</script>

<style scoped>
.card-body {
  padding: 0.75rem 1rem;
}
</style>
