<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow-sm p-4 w-100" style="max-width: 400px;">

      <h2 class="text-center text-primary mb-4">Login to Auctionary</h2>

      <form @submit.prevent="handleSubmit" novalidate>

        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input
            id="email"
            type="email"
            v-model="email"
            class="form-control"
            :class="{ 'is-invalid': submitted && !email }"
            placeholder="Enter your email"
          />
          <div class="invalid-feedback">
            Email is required
          </div>
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            class="form-control"
            :class="{ 'is-invalid': submitted && !password }"
            placeholder="Enter your password"
          />
          <div class="invalid-feedback">
            Password is required
          </div>
        </div>

        <button class="btn btn-primary w-100" type="submit">
          Login
        </button>

        <div v-if="error" class="alert alert-danger mt-3">
          {{ error }}
        </div>

        <p class="text-center text-secondary mt-3">
          Don’t have an account?
          <router-link to="/register" class="link-primary">
            Register
          </router-link>
        </p>

      </form>
    </div>
  </div>
</template>

<script>
import { userService } from '@/services/user.service'
import EmailValidator from 'email-validator'

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
      submitted: false
    }
  },
  methods: {
    handleSubmit() {
      this.submitted = true
      this.error = ""

      if (!this.email || !this.password) return
      if (!EmailValidator.validate(this.email)) {
        this.error = "Please enter a valid email"
        return
      }

      userService.login(this.email, this.password)
        .then(() => {
          this.$router.push("/")
        })
        .catch(err => {
          this.error = err
          this.submitted = false
        })
    }
  }
}
</script>
