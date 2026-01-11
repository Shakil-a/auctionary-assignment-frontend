<template>
  <div>
    <h3>Answer Question</h3>
    <form @submit.prevent="handleSubmit">
      <textarea v-model="answer"></textarea>
      <div v-show="submitted && !answer">Answer is required</div>

      <br />
      <button>Answer</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return { answer: "", submitted: false };
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      if (!this.answer) return;
      alert("Answer valid!");
    },
  },
};
</script>
