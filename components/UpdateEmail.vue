<template>
  <div class="form-group">
    <label for="userNameInput">Email</label>
    <div class="input-group">
      <div class="input-group-prepend">
              <span class="input-group-text">
                <!--<i class="fa fa-at fa-lg"></i>-->
                <i class="icons font-lg d-block cui-envelope-letter"></i>
              </span>
      </div>
      <input
          type="email"
          class="form-control"
          :class="inputClass"
          id="userNameInput"
          v-model="textToChange"
          placeholder="temp-mail@domain.com"
      />
      <span class="input-group-append">
        <button class="btn btn-primary" @click="updateEmail" type="button">Change</button>
      </span>
    </div>
    <div v-if="(messageVisible && responseSuccess) || usernameUpdatedSuccessfully" class="valid-feedback" style="display: block">{{responseMessage || 'Email is available.'}}</div>
    <div v-if="messageVisible && !responseSuccess" class="invalid-feedback" style="display: block">{{responseMessage || 'Unknown error.'}}</div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    data(){
      return {
        textToChange: "",
        usernameChecked: false,
        responseSuccess: false,
        responseMessage: "",
        usernameUpdatedSuccessfully: false,
      }
    },
    computed: {
      ...mapState('auth', ['loggedIn', 'user']),
      inputClass: function () {
        return {
          'is-valid': (this.textToChange !== this.user.username && this.usernameChecked && this.responseSuccess),
          'is-invalid': (this.textToChange !== this.user.username && this.usernameChecked && !this.responseSuccess)
        };
      },
      messageVisible: function () {
        return this.usernameChecked;
      }
    },
    mounted(){
      this.textToChange = this.user.email;
    },
    methods: {
      onTextChange(){
        this.usernameUpdatedSuccessfully = false;
        this.usernameChecked = false;
        if(this.checkUsernameTimeout){
          clearTimeout(this.checkUsernameTimeout);
        }
        this.checkUsernameTimeout = setTimeout(() => {
          delete this.checkUsernameTimeout;
          this.$axios.post('/api/v0.1/user/check-email',{username: this.textToChange})
              .then(({data}) => {
                this.usernameChecked = true;
                this.responseSuccess = data.success === true;
                this.responseMessage = data.message;
              })
        },1500);
      },
      updateEmail(){
        this.usernameChecked = false;
        this.usernameUpdatedSuccessfully = false;
        this.$axios.post('/api/v0.1/user/update-email',{email: this.textToChange})
            .then(({data}) => {
              this.usernameChecked = true;
              this.responseSuccess = data.success === true;
              this.responseMessage = data.message;
              if(data.success) {
                this.usernameUpdatedSuccessfully = true;
                this.$auth.fetchUser();
              }
            })
            .catch(error => {
              let data = error.response.data;
              this.usernameChecked = true;
              this.responseSuccess = data.success === true;
              this.responseMessage = data.message;
            })
      }
    }
  }
</script>

<style>
</style>