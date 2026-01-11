<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="handleSubmit">
      <label>First Name:</label>
      <input type="text" v-model="first_name"/>
      <div v-show="submitted && !first_name">First name is required</div>

      <label>Last Name:</label>
      <input type="text" v-model="last_name"/>
      <div v-show="submitted && !last_name">Last name is required</div>

      <label>Email:</label>
      <input type="email" v-model="email"/>
      <div v-show="submitted && !email">Email is required</div>
      <div v-show="submitted && email && !EmailValidator.validate(email)">Invalid email</div>

      <label>Password:</label>
      <input type="password" v-model="password"/>
      <div v-show="submitted && !password">Password is required</div>
      <div v-show="submitted && password && !passwordPattern.test(password)">
        Password must be 8-32 chars, include upper/lowercase, number, special char
      </div>

      <br /><br />
      <button>Register</button>
      <div v-if="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import EmailValidator from 'email-validator'

export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      error: "",
      submitted: false,
      passwordPattern: /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z]).{8,32}$/
    }
  },
  methods: {
    handleSubmit() {
      this.submitted = true
      this.error = ""

      // Check all fields
      if (!(this.first_name && this.last_name && this.email && this.password)) return
      if (!EmailValidator.validate(this.email)) return
      if (!this.passwordPattern.test(this.password)) return

      alert("Form is valid! Ready to submit")
    }
  }
}
</script>
