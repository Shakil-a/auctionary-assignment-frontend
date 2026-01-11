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
export default {
  data() {
    return { question: "", submitted: false };
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      if (!this.question) return;
      alert("Question valid!");
    },
  },
};
</script>
