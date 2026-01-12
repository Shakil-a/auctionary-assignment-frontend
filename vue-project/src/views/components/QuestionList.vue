<template>
  <div>
    <Question
      v-for="q in questions"
      :key="q.question_id"
      :questionData="q"
      :canAnswer="currentUserId === itemOwnerId && !q.answer_text"
      @answered="$emit('answered')"
    />
    <p v-if="questions.length === 0">No questions yet.</p>
  </div>
</template>

<script>
import Question from '../components/Question.vue'
export default {
  components: { Question },
  props: {
    questions: { type: Array, default: () => [] },
    currentUserId: { type: Number, required: true },
    itemOwnerId: { type: Number, required: true }
  }
}
</script>
