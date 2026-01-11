<template>
  <div>
    <h1>{{ welcome_message }}</h1>
    <p>Counter: {{ counter }}</p>
    <button v-on:click="increment">Add one</button>
  </div>
  <login />
</template>

<script>
import Login from './Login.vue';

  export default {
    data(){
      return {
        welcome_message: "hello world!",
        counter: 0
      }
    },
    methods: {
      increment(){
        this.counter ++;
      }
    },
    components: {
      Login
    }
  }
</script>

<style scoped>

</style>