<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
        <label for="email">Email: </label>
        <input type="email" name="email" v-model="email"/>
        <div v-show="submitted && !email">Email is required</div>

        <label for="password">Password: </label>
        <input type="password" name="password" v-model="password"/>
        <div v-show="submitted && !password">Password is required</div>

        <br /><br />
        <button>Login</button>
        <div v-if="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
    import { userService } from '@/services/user.service';
import EmailValidator from 'email-validator'
    export default {
        data(){
            return {
                email: "",
                password: "",
                error: "",
                submitted: false
            }
        },
        methods: {
            handleSubmit(e){
                this.submitted = true;
                this.error = "";
                const {email, password} = this

                if(!(email && password)){
                    return;
                }

                if(!(EmailValidator.validate(email))){
                    this.error = "Email must be a valid email"
                    return;
                }

                userService.login(email, password)
                .then(result => {
                    console.log("Auth success")
                    this.$router.push("/")
                })
                .catch(error => {
                    this.error = error
                    this.submitted = false
                })
            }
        }
    }
</script>