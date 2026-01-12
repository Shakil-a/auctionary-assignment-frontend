<template>
  <div>
    <Question
      v-for="q in questions"
      :key="q.question_id"
      :question="q.question_text"
      :answer="q.answer_text"
    />
    <p v-if="questions.length === 0">No questions yet.</p>
  </div>
</template>

<script>
import Question from '../components/Question.vue'

export default {
  components: { Question },
  props: {
    questions: { type: Array, default: () => [] }
  }
}
</script>
