<template>
  <BaseModal :title="$t('components.tradeDisputeModal.title')" ref="modal" :floatHeight="true">
    <div :class="$style.loginModalContent">
      <h6>{{$t('components.tradeDisputeModal.messageLabel')}}</h6>
      <textarea rows="5" class="form-control" v-model="textMessage">
      </textarea>
    </div>
    <div class="pd5 bdt-1">
      <!--<BaseLink :to="{name: 'buy-id', params:{id: '4a67b3233d7a'}}">-->
      <!--</BaseLink>-->
        <button @click="callSuccess" class="btn btn-block btn-primary btn-sm" type="button" >{{$t('components.tradeDisputeModal.btnTitle')}}</button>
    </div>
  </BaseModal>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    props:['onSuccess'],
    data() {
      return {
        textMessage: '',
      }
    },
    computed: {
    },
    methods: {
      show(event) {
        let modal = this.$refs.modal;
        modal.show(event);
      },
      hide() {
        this.$refs.modal.hide();
      },
      callSuccess(){
          this.$emit('onSuccess',this.textMessage);
      }
    }
  }
</script>


<style lang="scss" module>

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
