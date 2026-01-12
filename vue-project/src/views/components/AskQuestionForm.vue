<template>
  <div>
    <h3>Ask a Question</h3>
    <form @submit.prevent="handleSubmit">
      <textarea v-model="question"></textarea>
      <div v-show="submitted && !question">Question is required</div>
      <br />
      <button>Ask</button>
    </form>
  </div>
</template>

<script>
import { questionService } from '@/services/questions.service'

export default {
  props: ["itemId"],
  data() {
    return { question: "", submitted: false }
  },
  methods: {
    handleSubmit() {
      this.submitted = true
      if (!this.question) return

      questionService.askQuestion(this.itemId, { question_text: this.question })
        .then(() => {
          this.$emit('questionAsked') // notify parent to reload questions
          this.question = ""
          this.submitted = false
        })
        .catch(err => alert("Failed to ask question: " + err))
    }
  }
}
</script>
