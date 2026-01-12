<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <textarea v-model="answer" placeholder="Type your answer..."></textarea>
      <div v-show="submitted && !answer">Answer is required</div>
      <br />
      <button>Answer</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import { questionService } from '@/services/questions.service'

export default {
  props: ['questionId'],
  data() {
    return { answer: '', submitted: false, error: '' }
  },
  methods: {
    async handleSubmit() {
      this.submitted = true
      if (!this.answer) return
      try {
        await questionService.answerQuestion(this.questionId, { answer_text: this.answer })
        this.$emit('answered')  // notify parent to refresh
      } catch (err) {
        this.error = err.message || err || 'Failed to submit answer'
      }
    }
  }
}
</script>

<style scoped>
.error { color: red; }
</style>
