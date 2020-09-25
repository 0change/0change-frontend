<template>
  <BaseModal :pageDirection="pageDirection" :title="modalTitle" ref="modal" :floatHeight="true" @show="onShow" @hide="onHide">
    <div :class="$style.loginModalContent">
      <div :class="$style.form">
        <div v-if="loginState==='login'" class="form-signin">
          <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label class="sr-only">Email address</label>
          <input v-model="login.email" type="email" class="form-control" placeholder="Email address" required="" autofocus="">
          <label class="sr-only">Password</label>
          <input v-model="login.password" type="password" class="form-control" placeholder="Password" required="">
          <div class="checkbox mb-3 text-left">
            <label>
              <input type="checkbox" value="remember-me"> Remember me
            </label>
          </div>
          <div v-if="authError" class="alert alert-danger">
            {{authError}}
          </div>
          <button class="btn btn-lg btn-primary btn-block" @click="doLogin" type="submit">Sign in</button>
        </div>
        <div v-else class="form-register">
          <h1 class="h3 mb-3 font-weight-normal">Register</h1>
          <div>
            <label class="sr-only">Email address</label>
            <input v-model="register.email" type="email" class="form-control" placeholder="Email address" required="" autofocus="">
            <label class="sr-only">Password</label>
            <input v-model="register.pass1" type="password" class="form-control" placeholder="Password" required="">
            <label class="sr-only">Password</label>
            <input v-model="register.pass2" type="password" class="form-control" placeholder="Retype Password" required="">
          </div>
          <div v-if="registerError" class="alert alert-danger">
            {{registerError}}
          </div>
          <button @click="doRegister" class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        </div>
      </div>
    </div>
    <div v-if="loginState=='login'" class="mb-3 text-center">
      Not a member ? <span @click="loginState='register'" class="alert-link pointer">Register</span>
    </div>
    <div v-else class="mb-3 text-center">
      Already member ? <span @click="loginState='login'" class="alert-link pointer">Login</span>
    </div>
  </BaseModal>
</template>

<script>
  import {mapState, mapActions, mapGetters} from 'vuex';

  export default {
    data() {
      return {
        loginState: "login",
        tryingToLogIn: false,
        login: {
          email: "",
          password: ""
        },
        register: {
          email: "",
          pass1: "",
          pass2: ""
        },
        hasError: false,
        authError: false,
        registerError: '',
        afterLogin: null,
        message: null
      }
    },
    computed: {
      ...mapGetters('locales',['pageDirection']),
      modalTitle: function () {
        return this.$t('components.loginModal.header', {website: process.env.WEBSITE_BASE_TITLE})
      }
    },
    methods: {
      doLogin() {
        this.tryingToLogIn = true
        // Reset the authError if it existed.
        this.authError = null
        return this.$auth.loginWith('local',{data: this.login})
          .then(token => {
            this.$refs.modal.hide();
            this.$toast.success('You logged in successfully');
            // Redirect to the originally requested page, or to the home page
//                            this.$router.push(this.$route.query.redirectFrom || {name: 'home'})
            if (this.afterLogin){
              this.afterLogin();
            }
            else{
              //this.$router.go(this.$router.currentRoute);
              window.location.reload(true);
            }
          })
          .catch(error => {
              this.authError = error.response.data.message || 'Server side error';
          })
          .then(()=>{
            this.tryingToLogIn = false;
          })
      },
      doRegister(){
        let {email, pass1, pass2} = this.register;
        if(!email){
          return this.registerError = "Enter your email";
        }
        if(!pass1){
          return this.registerError = "Enter your password";
        }
        if(!pass2){
          return this.registerError = "Retype your password";
        }
        if(pass1 != pass2){
          return this.registerError = "Password and Retyped password not matched";
        }
        this.$axios.post('/api/v0.1/auth/register', {email, password: pass1})
          .then(({data}) => {
            console.log(data);
            if(data.success){
              this.$toast.success("You registered successfully. try to login");
              this.loginState = 'login'
            }
            else{
              console.log(data)
              this.registerError = data.message || "Server side error"
            }
          })
          .catch(error => {
            console.error(error.response);
            this.registerError = error.response.data.message || "Server side error"
          })
      },
      show(event, afterLogin, message) {
        if(message){
          this.message = message;
        }else{
          this.message = null;
        }
        this.afterLogin=afterLogin;
        let modal = this.$refs.modal;
        modal.show(event);
      },
      async logout() {
        await this.$auth.logout();
        window.location.reload(true);
      },
      onShow(){
      },
      onHide(){
      },
    }
  }
</script>


<style lang="scss" module>
  /*@import '@design';*/

  .qrimg{
    width: 12em;
    height: 12em;
  }

  .form {
    text-align: left;
  }

  .loginModalContent {
    padding: 10px;
  }
</style>

<style lang="scss">
  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
    text-align: center;

    .checkbox {
      font-weight: 400;
    }
    .form-control {
      position: relative;
      box-sizing: border-box;
      height: auto;
      padding: 10px;
      font-size: 16px;
    }
    .form-control:focus {
      z-index: 2;
    }
    input[type="email"] {
      margin-bottom: -1px;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
    input[type="password"] {
      margin-bottom: 10px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }
  .form-register {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
    text-align: center;

    .form-control {
      position: relative;
      box-sizing: border-box;
      height: auto;
      padding: 10px;
      font-size: 16px;
    }
    .form-control:focus {
      z-index: 2;
    }
    input[type="email"] {
      margin-bottom: -1px;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
    input[type="password"]{
      margin-bottom: -1px;
      border-radius: 0;

      &:last-child{
        margin-bottom: 10px;
        border-radius: 0.25rem;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
    }
  }
</style>
