<template>
  <div class="question-card">

    <p class="mb-2">
      <span>{{ questionData.question_text }}</span>
    </p>

    <div v-if="questionData.answer_text" class="alert alert-light border-info">
      <strong class="text-success">Answer:</strong> {{ questionData.answer_text }}
    </div>
    <div v-else class="alert alert-secondary">
      <em>Waiting for reply...</em>
    </div>
    
    <div v-if="canAnswer" class="mt-3">
      <AnswerQuestionForm
        :questionId="questionData.question_id"
        @answered="handleAnswered"
      />
    </div>

  </div>
</template>

<script>
import AnswerQuestionForm from '../components/AnswerQuestionForm.vue'

export default {
  components: { AnswerQuestionForm },
  props: {
    questionData: { type: Object, required: true },
    canAnswer: { type: Boolean, default: false }
  },
  methods: {
    handleAnswered() {
      this.$emit('answered')
    }
  }
}
</script>

<style scoped>
.question-card {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #fff;
}
</style>
