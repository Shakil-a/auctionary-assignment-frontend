<template>
  <div class="question-card">
    <p>Question: {{ question }}</p>
    <p v-if="answer"><strong>Answer:</strong> {{ answer }}</p>
  </div>
</template>

<script>
export default {
  props: {
    question: { type: String, required: true },
    answer: { type: String, default: '' }
  }
}
</script>

<style scoped>
.question-card {
  border-bottom: 1px solid #ddd;
  margin-bottom: 5px;
  padding-bottom: 5px;
}
</style>
