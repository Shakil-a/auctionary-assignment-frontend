<template>
  <div class="question-section">

    <div v-if="questions.length > 0" class="list-group">

      <div
        v-for="q in questions"
        :key="q.question_id"
        class="list-group-item list-group-item-action shadow-sm mb-2"
      >
        <Question
          :questionData="q"
          :canAnswer="currentUserId === itemOwnerId && !q.answer_text"
          @answered="$emit('answered')"
        />
      </div>

    </div>

    <p v-if="questions.length === 0" class="text-secondary text-center mt-3">
      No questions yet.
    </p>

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

<style scoped>
.question-section {
  margin-top: 1rem;
}
</style>
