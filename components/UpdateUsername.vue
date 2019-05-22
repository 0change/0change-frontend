<template>
  <div class="form-group">
    <label for="userNameInput">{{$t('components.updateUsername.label')}}</label>
    <div class="input-group">
      <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-at fa-lg"></i>
              </span>
      </div>
      <input
          class="form-control"
          :class="usernameClass"
          id="userNameInput"
          v-model="usernameToChange"
          @keyup="onUsernameChange"
          autocomplete="off"
      />
      <span class="input-group-append">
        <button class="btn btn-primary" @click="updateUsername" type="button">{{$t('components.updateUsername.btnTitle')}}</button>
      </span>
    </div>
    <div v-if="(messageVisible && responseSuccess) || usernameUpdatedSuccessfully" class="valid-feedback" style="display: block">{{responseMessage || 'Username is available.'}}</div>
    <div v-if="messageVisible && !responseSuccess" class="invalid-feedback" style="display: block">{{responseMessage || 'Username is not available.'}}</div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    data(){
      return {
        usernameToChange: "",
        usernameChecked: false,
        responseSuccess: false,
        responseMessage: "",
        usernameUpdatedSuccessfully: false,
      }
    },
    computed: {
      ...mapState('auth', ['loggedIn', 'user']),
      usernameClass: function () {
        return {
          'is-valid': (this.usernameToChange !== this.user.username && this.usernameChecked && this.responseSuccess),
          'is-invalid': (this.usernameToChange !== this.user.username && this.usernameChecked && !this.responseSuccess)
        };
      },
      messageVisible: function () {
        return this.usernameChecked;
      }
    },
    mounted(){
      this.usernameToChange = this.user.username;
    },
    methods: {
      onUsernameChange(){
        this.usernameUpdatedSuccessfully = false;
        this.usernameChecked = false;
        if(this.checkUsernameTimeout){
          clearTimeout(this.checkUsernameTimeout);
        }
        this.checkUsernameTimeout = setTimeout(() => {
          delete this.checkUsernameTimeout;
          this.$axios.post('/api/v0.1/user/check-username',{username: this.usernameToChange})
              .then(({data}) => {
                this.usernameChecked = true;
                this.responseSuccess = data.success;
                this.responseMessage = data.message;
              })
        },1500);
      },
      updateUsername(){
        this.usernameChecked = false;
//        this.usernameUpdatedSuccessfully = false;
        this.$axios.post('/api/v0.1/user/update-username',{username: this.usernameToChange})
            .then(({data}) => {
              this.usernameChecked = true;
              this.responseSuccess = data.success === true;
              this.responseMessage = data.message;
              if(data.success) {
//                this.usernameUpdatedSuccessfully = true;
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
