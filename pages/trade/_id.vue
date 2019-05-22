<template>
  <div>
    <div v-if="loading" class="row">
      <div class="col-sm-12">
        Loading ...
      </div>
    </div>
    <div v-if="trade">
      <TradeDisputeModal ref="tradeDisputeModal" @onSuccess="onTradeDispute"/>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header"><strong>{{$t('pages.tradeView.statusBox.title')}}</strong></div>
            <div class="card-body">
              <StepProgress
                v-if="trade.status != 'cancel' && trade.status != 'dispute'"
                :length="4"
                :labels="$t('pages.tradeView.statusBox.allStatus')"
                :step="getTradeStatusStep()"
              />
              <div v-else-if="trade.status == 'cancel'" class="alert alert-warning">
                <!-- TODO: not translated -->
                <h1>Trade canceled by
                  <BaseLink v-if="trade.canceledBy" :to="{name: 'profile-id', params: {id: trade.canceledBy._id}}">{{trade.canceledBy.username}}</BaseLink>
                  <span v-else>ZeroChange</span>
                </h1>
              </div>
              <div v-else class="alert alert-danger">
                <h1>Trade disputed
                  <span v-if="trade.disputedBy"> by <BaseLink :to="{name: 'profile-id', params: {id: trade.disputedBy._id}}">{{trade.disputedBy.username}}</BaseLink></span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div v-if="userIsOperator && trade.status==='dispute'" class="card">
            <div class="card-header">
              <strong>Operator</strong>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-sm-6">
                  <button @click="operatorCancelTrade" class="btn btn-sm btn-danger" style="width: 100%">Cancel Trade</button>
                </div>
                <div class="col-sm-6">
                  <button @click="operatorAcceptTrade" class="btn btn-sm btn-success" style="width: 100%">Release Tokens</button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="canPostFeedback" class="card">
            <div class="card-header"><strong>{{$t('pages.tradeView.feedback.title')}}</strong></div>
            <div class="card-body">
              <div style="margin-bottom: 1em">
                <no-ssr>
                  <VueStarRating
                    :rating="feedbackStar"
                    :star-size="25"
                    :show-rating="false"
                    @rating-selected="setFeedbackStar"
                  />
                </no-ssr>
              </div>
              <textarea v-model="feedbackComment" style="width: 100%" rows="5"></textarea>
            </div>
            <div class="card-footer">
              <button class="btn btn-sm btn-primary" @click="postFeedback">{{$t('pages.tradeView.feedback.btnTitle')}}</button>
            </div>
          </div>
          <div class="card">
            <div class="card-header"><strong>{{$t('pages.tradeView.termsBox.title')}}</strong></div>
            <div class="card-body">
              <pre style="white-space: pre-line;">{{trade.advertisement.terms}}</pre>

              <button v-if="isStartBtnVisible" @click="doStartTrade" class="btn btn-primary" type="submit" style="width: 100%">{{$t('pages.tradeView.btnTitle.start')}}</button>

              <button v-if="isPaymentBtnVisible" @click="doSetTradePaid" class="btn btn-primary" type="submit" style="width: 100%">{{$t('pages.tradeView.btnTitle.pay')}}</button>

              <button v-if="isReleaseBtnVisible" @click="doReleaseTrade" class="btn btn-primary" type="submit" style="width: 100%">{{$t('pages.tradeView.btnTitle.release')}}</button>


              <div class="row" style="margin-top: 1em">
                <div class="col-sm-6">
                  <button v-if="isDisputeBtnVisible" @click="doDisputeTrade" class="btn btn-danger" type="submit" style="width: 100%">{{$t('pages.tradeView.btnTitle.dispute')}}</button>
                </div>
                <div class="col-sm-6">
                  <button v-if="isCancelBtnVisible" @click="doCancelTrade" class="btn btn-warning" type="submit" style="width: 100%">{{$t('pages.tradeView.btnTitle.cancel')}}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="alert alert-dark" role="alert">
            <table>
              <tr>
                <td><strong>{{$t('pages.tradeView.infoBox.offer')}}: </strong></td>
                <td>
                  <BaseLink :to="{name: 'offer-view-id', params:{id: trade.advertisement._id}}">
                    <span>{{trade.advertisement._id}}</span>
                  </BaseLink>
                </td>
              </tr>
              <tr>
                <td><strong>{{traderTitle}}</strong></td>
                <td><BaseLink :to="{name: 'profile-id', params:{id: traderID}}">{{traderUsername}}</BaseLink></td>
              </tr>
              <tr>
                <td><strong>{{$t('pages.tradeView.infoBox.exchangeRate')}}: </strong></td>
                <td><span class="badge badge-primary">{{trade.advertisement.amount}}</span> {{advertisementCurrency}} / TOKEN</td>
              </tr>
              <tr>
                <td><strong>{{$t('pages.tradeView.infoBox.tradeVolume')}}: </strong></td>
                <td><span class="badge badge-primary">{{trade.tokenCount}}</span> {{tradeToken.code}}</td>
              </tr>
            </table>
          </div>
          <div class="card">
            <div class="card-header"><strong>{{$t('pages.tradeView.messageBox.title')}}</strong></div>
            <div class="card-body" v-viewer>
              <p v-for="msg in trade.messages">
                <span v-if="msg.type === 'event'">
                  <span>{{msg.createdAt|std_datetime}}: </span>
                  <span class="badge badge-info">{{$t('pages.tradeView.messageBox.tradeEventMessages.'+msg.content)}}</span>
                </span>
                <span v-else="msg.type !== 'event'">
                  <div>
                    <strong v-if="msg.sender._id === $auth.user._id" class="text-primary">{{$t('You')}}: </strong>
                    <strong v-else>
                      <BaseLink :to="{name:'profile-id', params:{id: msg.sender._id}}">{{msg.sender.username}}: </BaseLink>
                    </strong>
                  </div>
                  <div>
                    <span>{{msg.content}}</span>
                    <br v-if="!!msg.attachments" />
                    <img
                      style="height: 6em; border: 2px solid #aaa; border-radius: 4px; cursor: pointer"
                      v-if="!!msg.attachments"
                      v-for="attachment in msg.attachments"
                      :src="getAttachmentUrl(attachment)"
                    />
                  </div>
                </span>
              </p>
              <textarea v-model="message" class="form-control trade-comment" rows="5" :placeholder="$t('pages.tradeView.messageBox.placeholder')"></textarea>

              <button v-if="sendMessageInProgress" style="width: 6em" class="btn btn-primary" type="submit">
                <i style="font-size: 1em" class="fa fa-spinner fa-lg fa-spin"></i>
              </button>
              <button v-else @click="sendMessage" class="btn btn-primary" style="width: 6em" type="submit">{{$t('pages.tradeView.messageBox.btnSend')}}</button>
              <button v-if="!sendMessageInProgress" @click="$refs.fileUpload.addFiles()" class="btn btn-primary" type="submit">Attachment</button>
              <input type="file" value="Attachment" />
              <VueFileUpload
                ref="fileUpload"
                :buttonsVisible="false"
                targetUrl="/api/v0.1/trade/message"
                :extraFields="{tradeId: trade._id,type: 'text', message}"
              />
            </div>
          </div>
        </div>
      </div>
      <!--<div class="row" style="padding: 2em">-->
      <!--<pre>{{JSON.stringify(trade,null,2)}}</pre>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import TradeDisputeModal from '../../components/TradeDisputeModal';
  import StepProgress from '~/components/StepProgress.vue';
  import VueFileUpload from '~/components/VueFileUpload.vue';
  import VueStarRating from 'vue-star-rating';
  import {mapActions, mapGetters} from 'vuex';
  import replaceAll from '../../utils/replaceAll';
  import BaseLink from "../../components/global/BaseLink";
  // const proxyConfig = require('../../nuxt.proxy.config');
  let apiRoot = process.env._AXIOS_BASE_URL_;

  export default {
    layout: 'coreui',
    components:{TradeDisputeModal, BaseLink, StepProgress, VueStarRating, VueFileUpload},
    data(){
      return{
        loading: true,
        trade: null,
        chatroom: "",
        message: '',
        sendMessageInProgress: false,
        feedbackStar: 0,
        feedbackComment: "",
        liveChatMessages: []
      };
    },
    computed: {
      ...mapGetters('global',['currencies', 'cryptoTokens']),
      ...mapGetters('auth',['hasPermission']),
      tradeToken: function(){
        return this.cryptoTokens.find(ct => ct._id === this.trade.advertisement.token) || {};
      },
      userIsOperator: function(){
        return (
          this.$auth.user._id !== this.trade.user._id
          && this.$auth.user._id !== this.trade.advertisement.user._id
          && this.hasPermission('operator')
        );
      },
      userIsTradeParty: function(){
        return this.$auth.user._id === this.trade.user._id || this.$auth.user._id === this.trade.advertisement.user._id;
      },
      isStartBtnVisible: function () {
        return this.trade.status==='request' && this.$auth.user._id == this.trade.advertisement.user._id;
      },
      isPaymentBtnVisible: function () {
        return this.trade.status==='start' && (
            (this.trade.advertisement.type === 'buy' && this.$auth.user._id == this.trade.advertisement.user._id)
                ||
            (this.trade.advertisement.type === 'sell' && this.$auth.user._id == this.trade.user._id)
        );
      },
      isReleaseBtnVisible: function () {
        return (this.trade.status === 'payment' || this.trade.status === 'dispute') && (
            (this.trade.advertisement.type === 'buy' && this.$auth.user._id == this.trade.user._id)
            ||
            (this.trade.advertisement.type === 'sell' && this.$auth.user._id == this.trade.advertisement.user._id)
        );
      },
      isCancelBtnVisible: function () {
        if(this.trade.status === 'request')
          return true;
        return (this.trade.status === 'start' || this.trade.status === 'payment' || this.trade.status === 'dispute') && (
            (this.trade.advertisement.type === 'buy' && this.$auth.user._id == this.trade.advertisement.user._id)
            ||
            (this.trade.advertisement.type === 'sell' && this.$auth.user._id == this.trade.user._id)
        );
      },
      isDisputeBtnVisible: function () {
        // Only visible for buyer
        return this.trade.status === 'payment' && (
            (this.trade.advertisement.type === 'buy' && this.$auth.user._id === this.trade.advertisement.user._id)
            ||
            (this.trade.advertisement.type === 'sell' && this.$auth.user._id === this.trade.user._id)
        );
      },
      traderTitle: function () {
        if(this.trade.advertisement.user._id === this.$auth.user._id){
          if(this.trade.advertisement.type === 'sell')
            return this.$t('Buyer');
          else
            return this.$t('Seller')
        }else{
          if(this.trade.advertisement.type === 'sell')
            return this.$t('Seller');
          else
            return this.$t('Buyer')
        }
      },
      traderID: function () {
        if(this.trade.advertisement.user._id === this.$auth.user._id){
          return this.trade.user._id;
        }else{
          return this.trade.advertisement.user._id;
        }
      },
      traderUsername: function () {
        if(this.trade.advertisement.user._id === this.$auth.user._id){
          return this.trade.user.username;
        }else{
          return this.trade.advertisement.user.username;
        }
      },
      advertisementCurrency: function () {
        let currency = this.currencies.find(item => item._id===this.trade.advertisement.currency)
        if(currency)
          return currency.code;
        return "---"
      },
      canPostFeedback: function () {
        return ['release','dispute','cancel','done'].indexOf(this.trade.status) >= 0 && this.userIsTradeParty;
      }
    },
    mounted(){
      this.loadTradeInfo();
    },
    beforeDestroy(){
      this.$socket.leave(this.chatroom);
    },
    methods:{
      ...mapActions('global', ['sendTradeMessage', 'startTrade', 'setTradePaid', 'releaseTrade']),
      ...mapActions('notifications', ['readTradeMessages']),
      loadTradeInfo(){
        this.$axios.post(`/api/v0.1/trade/get-info`,{id: this.$route.params.id})
          .then(({data}) => {
            if(data.success){
              this.trade = data.trade;
              if(data.feedback) {
                this.feedbackStar = data.feedback.star;
                this.feedbackComment= data.feedback.comment;
              }
              this.initAfterLoad();
            }
          })
          .catch(error => {})
          .then(() => {
            this.loading = false;
          })
      },
      initAfterLoad(){
        this.chatroom = 'chat-trade-' + this.$route.params.id;
        this.$socket.join(this.chatroom);
        this.$socket.on(this.chatroom, message => {
          console.log(message);
          let audio = new Audio('/sound/plop.mp3');
          audio.play();
          this.trade.messages = [...this.trade.messages, message];
        });

        this.$socket.on('trade-status-changed', data => {
          console.log(data);
          if(data.tradeId === this.$route.params.id){
            Vue.set(this.trade, 'status', data.status);
          }
        });
        this.readTradeMessages(this.trade._id);
      },
      async sendMessage(){
        if(!!this.message) {
          this.sendMessageInProgress = true;
          // return console.log(this.$refs.fileUpload.getFormData());
          // let response = await this.sendTradeMessage({tradeId: this.trade._id, message: this.message});
          this.$axios.post(
            '/api/v0.1/trade/message',
            this.$refs.fileUpload.getFormData(),
            //{headers: {'Content-Type': 'multipart/form-data'}}
          )
            .then(({data}) => data)
            .catch(error => error.response.data)
            .then(response => {
              this.sendMessageInProgress = false;
              if(response.success){
                this.trade.messages = response.messages;
                this.message = "";
                this.$refs.fileUpload.clearFiles();
              }else{
                // TODO: handle global alert modal
                if(response.message)
                  alert(response.message);
                else
                  alert('server side error');
              }
            })
        }else{
          // TODO: global alert modal
          alert('Enter text message');
        }
      },
      getTradeStatusStep(){
        if(!this.trade)
          return 0;
        switch(this.trade.status){
          case 'request': return 1;
          case 'start': return 2;
          case 'payment': return 3;
          case 'release': return 4;
          case 'done': return 5;
        }
      },
      async doStartTrade(){
        this.startTradeInProgress = true;
        let response = await this.startTrade(this.trade._id);
        if(response.success){
          this.trade = response.trade;
        }else{
          alert(response.message || 'server side error');
        }
        this.startTradeInProgress = false;
      },
      async doSetTradePaid(){
//        this.startTradeInProgress = true;
        let response = await this.setTradePaid(this.trade._id);
        if(response.success){
          this.trade = response.trade;
        }else{
          alert(response.message || 'server side error');
        }
//        this.startTradeInProgress = false;
      },
      async doReleaseTrade(){
//        this.startTradeInProgress = true;
        let response = await this.releaseTrade(this.trade._id);
        if(response.success){
          this.trade = response.trade;
        }else{
          alert(response.message || 'server side error');
        }
//        this.startTradeInProgress = false;
      },
      doCancelTrade(){
       this.cancelTradeInProgress = true;
        this.$axios.post('/api/v0.1/trade/cancel',{id: this.trade._id})
          .then(({data}) => data)
          .catch(error => error.response.data)
          .then(response => {
            this.cancelTradeInProgress = false;
            if(response.success){
              this.$toast.success("Trade canceled successfully.");
              Vue.set(this.trade, 'status', response.trade.status);
              Vue.set(this.trade, 'canceledBy', response.trade.canceledBy);
            }else{
              // TODO: handle global alert modal
              this.$toast.error(response.message || "server side error");
            }
          })
      },
      doDisputeTrade(){
        this.$refs.tradeDisputeModal.show();
      },
      async onTradeDispute(message){
        this.$refs.tradeDisputeModal.hide();
        this.disputeTradeInProgress = true;
        this.$axios.post('/api/v0.1/trade/dispute',{id: this.trade._id, message})
          .then(({data}) => data)
          .catch(error => error.response.data)
          .then(response => {
            this.disputeTradeInProgress = false;
            if(response.success){
              this.$toast.success("Dispute registered successfully.");
              Vue.set(this.trade, 'status', response.trade.status);
              Vue.set(this.trade, 'disputedBy', response.trade.disputedBy);
            }else{
              // TODO: handle global alert modal
              this.$toast.error(response.message || "server side error");
            }
          })
      },
      setFeedbackStar(star){
        this.feedbackStar = star;
      },
      postFeedback(){
        if(this.feedbackStar<1 || this.feedbackStar > 5){
          return alert('Please select feedback rate');
        }
        return this.$axios.post(`/api/v0.1/trade/post-feedback`,{tradeId: this.trade._id, star: this.feedbackStar, comment: this.feedbackComment})
            .then(({data}) => {
              return data;
            }).catch(error => {
              return error.response.data;
            })
            .then(data => {
              if(data.success)
                this.$toast.success("Your feedback registered successfully");
              else {
                this.$toast.error(data.message || "Server side error");
              }
            })
      },
      getAttachmentUrl(attachment){
        return apiRoot + attachment.substr(1);
      },
      operatorCancelTrade(){
        if(confirm('Are you sure to cancel the trade ?')){
          this.doCancelTrade();
        }
      },
      operatorAcceptTrade(){
        if(confirm('Are you sure to accept the trade ?')){
          this.doReleaseTrade();
        }
      }
    }
  }
</script>

<style scoped>
  .form-token{
    background: #20a8d8;
    color: white;
    padding: 1em;
    border-radius: 4px;
    margin-right: 1em;
  }
  .form-token input {
    margin-right: 1em;
  }
  .pad-r-1em{
    padding-right: 1em;
  }
  .trade-comment{
    width: 100%;
    resize: none;
    padding: 5px;
    margin-bottom: 1em;
    font-size: 133%;
    box-sizing: border-box;
  }
  .trade-start-btn{
    font-size: 200%;
    width: 100%;
    padding: 15px;
    filter: none;
    white-space: normal;
  }
</style>
