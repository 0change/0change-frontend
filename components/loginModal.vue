<template>
  <BaseModal :pageDirection="pageDirection" :title="modalTitle" ref="modal" :floatHeight="true" @show="onShow" @hide="onHide">
    <div :class="$style.loginModalContent">
      <div v-if="message" class="notification is-info">
        <span>{{message}}</span>
      </div>
      <div v-if="inputState=='getMobile'" :class="$style.form" @submit.prevent="tryGetOtp">
        <div style="text-align: center">
          <img v-if="qrImage" :src="qrImage" :class="$style.qrimg" />
          <div v-if="!qrImage" :class="$style.qrimg" style="justify-content: center; align-items: center; margin: auto">
            <BaseIcon
                style="color: #209cee; margin: 10px"
                class="fa fa-spinner fa-pulse fa-lg"
                name="spinner"
            />
          </div>
        </div>
        <div :dir="pageDirection" class="alert alert-info" :style="{textAlign: (pageDirection=='rtl' ? 'right' : 'left')}">
          <div v-html="globalComment"></div>
          <h6>&nbsp;</h6>
          <h6>{{$t('components.loginModal.comments.pc.head')}}</h6>
          <ul style="list-style: decimal; padding: 0 1em 0 1em;">
            <li v-for="item in $t('components.loginModal.comments.pc.items')">{{item}}</li>
          </ul>
          <h6>{{$t('components.loginModal.comments.smartPhone.head')}}</h6>
          <ul style="list-style: decimal; padding: 0 1em 0 1em;">
            <li v-for="item in $t('components.loginModal.comments.smartPhone.items')">{{item}}</li>
          </ul>
        </div>
        <div v-if="authError" class="alert alert-danger">
          {{authError}}
        </div>
        <!--<div style="text-align: center">-->
          <!--<input @click="login()" style="width: 10em" type="submit" class="button is-link" value="I Confirmed">-->
        <!--</div>-->
      </div>
    </div>
  </BaseModal>
</template>

<script>
  import {mapState, mapActions, mapGetters} from 'vuex';

  export default {
    data() {
      return {
        mobile: null,
        otp: null,
        inputState: 'getMobile',
        tryingToLogIn: false,
        hasError: false,
        authError: false,
        afterLogin: null,
        message: null
      }
    },
    computed: {
      ...mapState('auth',['qrImage','loginId']),
      ...mapGetters('locales',['pageDirection']),
      modalTitle: function () {
        return this.$t('components.loginModal.header', {website: process.env.WEBSITE_BASE_TITLE})
      },
      globalComment: function () {
        return this.$t('components.loginModal.comments.global', {
          'BrightID': '<a target="_blank" href="https://www.brightid.org/">' + this.$t('components.loginModal.comments.brightID') + '</a>',
          'user guide': '<a target="_blank" href="https://docs.google.com/document/d/1lO7LQ1W7gL_srVp-rpUQdAMAvWew3ZSPvCTuuRP00U0/edit#heading=h.6j9iv1dzd39h">' + this.$t('components.loginModal.comments.userGuide') + '</a>',
        })
      }
    },
    methods: {
      ...mapActions('auth', ['generateQrCode','tryToLogin']),
      login(silent) {
        this.tryingToLogIn = true
        // Reset the authError if it existed.
        this.authError = null
        return this.$auth.loginWith('local',{data:{
          id: this.loginId
        }})
          .then(token => {
            this.$refs.modal.hide();
            this.$toast.success('You logged in successfully');
            // Redirect to the originally requested page, or to the home page
//                            this.$router.push(this.$route.query.redirectFrom || {name: 'home'})
            if (this.afterLogin){
              this.afterLogin();
            }
            else{
              this.$router.go(this.$router.currentRoute);
            }
          })
          .catch(error => {
            if(!silent)
              this.authError = error.response.data.message || 'Server side error';
          })
          .then(()=>{
            this.tryingToLogIn = false;
          })
      },
      show(event, afterLogin, message) {
        this.generateQrCode();
        this.inputState = 'getMobile';
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
      },
      onShow(){
        this.loginInterval = setInterval(()=>{
          this.login(true);
        },5000);
      },
      onHide(){
        clearInterval(this.loginInterval);
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
