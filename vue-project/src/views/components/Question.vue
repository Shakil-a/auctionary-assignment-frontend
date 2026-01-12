<template>
  <div class="question-card">
    <p><strong>{{ questionData.user_name }}</strong> asked: {{ questionData.question_text }}</p>
    <p v-if="questionData.answer_text"><strong>Answer:</strong> {{ questionData.answer_text }}</p>

    <AnswerQuestionForm
      v-if="canAnswer"
      :questionId="questionData.question_id"
      @answered="handleAnswered"
    />
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
