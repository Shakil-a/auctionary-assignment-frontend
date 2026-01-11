<template>
  <div>
    <Question
      v-for="q in questions"
      :key="q.id"
      :user="q.user"
      :question="q.question"
      :answer="q.answer"
    />
    <p v-if="questions.length === 0">No questions yet.</p>
  </div>
</template>

<script>
import Question from './views/components/Question.vue'

export default {
  components: { Question },
  props: {
    questions: { type: Array, default: () => [] }
  }
}
</script>
