<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow-sm p-4 w-100" style="max-width: 500px;">

      <h2 class="text-center text-primary mb-4">Create Your Auctionary Account</h2>

      <form @submit.prevent="handleSubmit" novalidate>

        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">First Name</label>
            <input
              type="text"
              v-model="first_name"
              class="form-control"
              :class="{ 'is-invalid': submitted && !first_name }"
              placeholder="e.g. Ash"
            />
            <div class="invalid-feedback">
              First name is required
            </div>
          </div>

          <div class="col-md-6">
            <label class="form-label">Last Name</label>
            <input
              type="text"
              v-model="last_name"
              class="form-control"
              :class="{ 'is-invalid': submitted && !last_name }"
              placeholder="e.g. Williams"
            />
            <div class="invalid-feedback">
              Last name is required
            </div>
          </div>
        </div>

        <div class="mb-3 mt-3">
          <label class="form-label">Email Address</label>
          <input
            type="email"
            v-model="email"
            class="form-control"
            :class="{ 'is-invalid': submitted && (!email || !isEmailValid) }"
            placeholder="you@example.com"
          />
          <div class="invalid-feedback">
            Please enter a valid email
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Password</label>
          <input
            type="password"
            v-model="password"
            class="form-control"
            :class="{ 'is-invalid': submitted && (!password || !passwordPattern.test(password)) }"
            placeholder="At least 8 characters"
          />
          <div class="invalid-feedback">
            Password must be 8–32 chars and include uppercase, lowercase, number & special char
          </div>
        </div>

        <button class="btn btn-primary w-100" type="submit">
          Register
        </button>

        <div v-if="error" class="alert alert-danger mt-3">
          {{ error }}
        </div>

        <p class="text-center text-secondary mt-3">
          Already have an account?
          <router-link to="/login" class="link-primary">
            Login
          </router-link>
        </p>

      </form>
    </div>
  </div>
</template>

<script>
import EmailValidator from 'email-validator'
import { userService } from '@/services/user.service'

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
  computed: {
    isEmailValid() {
      return EmailValidator.validate(this.email)
    }
  },
  methods: {
    async handleSubmit() {
      this.submitted = true
      this.error = ""

      if (!(this.first_name && this.last_name && this.email && this.password)) return
      if (!this.isEmailValid) return
      if (!this.passwordPattern.test(this.password)) return

      try {
        await userService.register({
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password
        })
        await userService.login(this.email, this.password)
        this.$router.push("/")
      } catch (err) {
        this.error = err.message || err || "Registration failed"
      }
    }
  }
}
</script>
