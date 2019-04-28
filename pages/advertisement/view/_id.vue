<template>
  <div>
    <TradeStartModal ref="tradeStartModal" @onSuccess="onTradeStart"/>
    <div class="row bd-1 mb-4">
      <div class="col-sm-6 nosp">
        <div class="bg-gray-1 pd10 bdb-1">{{advertisement.type==='sell' ? 'Seller info' : 'Buyer info'}}</div>
        <div class="pd10">
          <div class="mgl10 pdl10 tbl-info fx-basis-8" style="border-left: 1px solid #f7f7f7;">
            <div class="tbl-info-item">
              <div><i class="fa fa-at fa-lg"></i></div>
              <span>Username:&nbsp;<a href="#"><strong>{{owner.username}}</strong></a></span>
            </div>
            <div class="tbl-info-item">
              <div><img src="/imgs/brightid-av-1.jpg" alt="" style="width: 1.2em"></div>
              <span>BrightID&nbsp;Score:&nbsp;<strong class="clr-orange-l">{{owner.brightIdScore}}</strong></span>
            </div>
            <div class="tbl-info-item">
              <div><i class="fa fa-circle fa-lg" style="color: #4dbd74"></i></div>
              <span>Last&nbsp;seen:&nbsp;<strong>{{userLastSeen}}</strong></span>
            </div>
            <div class="tbl-info-item">
              <div><i class="fa fa-flag fa-lg"></i></div>
              <span>
            <span>Country:&nbsp;</span>
            <i class="flag-icon h6 mb-0" :class="'flag-icon-' + owner.country.toLowerCase()"></i>
            <strong>{{ownerCountry ? ownerCountry.name : ''}}</strong>
          </span>
            </div>
            <!--<div class="tbl-info-item">-->
              <!--<div>&nbsp;</div>-->
              <!--<span>Trade volume:&nbsp;<strong>430 USD</strong></span>-->
            <!--</div>-->
            <div class="tbl-info-item">
              <div>&nbsp;</div>
              <span>Confirmed trades:&nbsp;<strong>{{$auth.user.confirmedTrades >> '0'}} trade</strong></span>
            </div>
            <div class="tbl-info-item">
              <div>&nbsp;</div>
              <span>
                <span>Feedback score:&nbsp;</span>
                <span class="badge badge-success">{{owner.score}}</span>
                <no-ssr>
                  <VueStarRating
                      style="display: inline-block;"
                      :star-size="15"
                      :read-only="true"
                      :rating="owner.score"
                      :show-rating="false"
                  />
                </no-ssr>
              </span>
            </div>
            <div v-if="false" class="tbl-info-item">
              <div><i class="fa fa-check-square fa-lg color-success"></i></div>
              <span>Trusted By:&nbsp;<strong class="badge badge-success">5 person</strong></span>
            </div>
            <div v-if="false" class="tbl-info-item">
              <div><i class="fa fa-minus-circle fa-lg color-danger"></i></div>
              <span>Blocked By:&nbsp;<strong class="badge badge-success">not blocked yet</strong></span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 nosp">
        <div class="bg-gray-1 pd10 bdb-1">Trade info</div>
        <div class="pd10">
          <div class="mgl10 pdl10 tbl-info fx-basis-8" style="border-left: 1px solid #f7f7f7;">
            <div class="tbl-info-item">
              <div><img :src="'/erc20-tokens/' + advertisement.token.code + '.png'" alt="" style="width: 1.2em"></div>
              <span>Token:&nbsp;<strong>{{advertisement.token.title}}</strong></span>
            </div>
            <div class="tbl-info-item">
              <div><i class="fa fa-money fa-lg"></i></div>
              <span>Price&nbsp;<strong class="number">{{advertisement.amount|commafy}} {{advertisement.currency.code}}</strong></span>
            </div>
            <div class="tbl-info-item">
              <div>&nbsp;</div>
              <span>Trade&nbsp;limit:&nbsp;<strong>{{advertisement.limitMin}} - {{advertisement.limitMax}} {{advertisement.token.code}}</strong></span>
            </div>
            <div class="tbl-info-item">
              <div><i class="fa fa-credit-card fa-lg"></i></div>
              <span>Payment&nbsp;methos:&nbsp;<strong>{{advertisement.paymentMethod.title}}</strong></span>
            </div>
            <div class="tbl-info-item">
              <div><i class="fa fa-hourglass-half fa-lg"></i></div>
              <span>Payment&nbsp;window:&nbsp;<strong>{{paymentWindow}}</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row bd-1 mb-4 box-shadow-1">
      <div class="col-lg-4 bdr-1">
        <div class="d-fx pdv-20 pointer">
          <img :src="'/erc20-tokens/' + advertisement.token.code + '.png'" class="token-img-2" style="margin: auto 4px auto 0">
          <div>
            <div class="fs-15">{{advertisement.token.title}}</div>
            <div class="number">{{advertisement.amount | commafy}} {{advertisement.currency.code}}</div>
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="row">
          <div class="col-md-6">
            <div class="d-fx pdv-20">
              <span class="fs-20 mg-v-auto mgr-05" style="color: #cbcbcb"><strong>{{advertisement.currency.code}}</strong></span>
              <div class="mg-v-auto">
                <input placeholder="0.0" v-model="tradeTotalAmount" type="text" class="no-border fs-15">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-fx pdv-20">
              <span class="fs-20 mg-v-auto mgr-05" style="color: #cbcbcb"><strong>{{advertisement.token.code}}</strong></span>
              <div class="mg-v-auto">
                <input placeholder="0.0" v-model="tradeTokenCount" type="text" class="no-border fs-15">
              </div>
              <div class="token-limit" :data-min="advertisement.limitMin" :data-max="advertisement.limitMax">
                <span>limit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row bd-1 mb-4">
      <div class="col-sm-12 nosp">
        <div class="bg-gray-1 bdb-1 pd10">Terms of trade</div>
        <div class=" pd10">
          <pre style="white-space: pre-line; width: 100%">{{advertisement.terms}}</pre>
          <div class="form-check checkbox">
            <input class="form-check-input" id="check1" type="checkbox" v-model="termsConfirmed">
            <label class="form-check-label" for="check1">I read and accept the trade terms.</label>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-sm-4"></div>
      <div class="col-sm-4" v-if="$auth.loggedIn">
        <button
            class="btn btn-pill btn-block btn-success"
            @click="startTrade($event)"
            type="button"
            v-tooltip.top="{show: (showTermsConfirmTooltip && tooltipMessage), content: tooltipMessage, trigger: 'manual', classes:['tooltip-danger', 'text-left']}"
        >{{advertisement.type=='sell'?'Buy':'Sell'}}</button>
      </div>
      <div class="col-sm-4" v-else>
        <LoginModal ref="advViewLoginModal"/>
        <button
            class="btn btn-pill btn-block btn-success"
            type="button"
            @click="$refs.advViewLoginModal.show($event)"
        >Login / Register to continue</button>
      </div>
      <div class="col-sm-4"></div>
    </div>
  </div>
</template>

<script>
  import TradeStartModal from '../../../components/TradeStartModal';
  import {mapGetters, mapActions} from 'vuex';
  import moment from 'moment';
  import LoginModal from '../../../components/loginModal.vue';
  import VueStarRating from 'vue-star-rating';

  export default {
    layout: 'coreui-no-sidemenu',
    components:{TradeStartModal, LoginModal, VueStarRating},
    data(){
      return {
        tokenCount: '',
        totalAmount: '',
        termsConfirmed: false,
        showTermsConfirmTooltip: false,
        tradeCreationInProgress: false,
      };
    },
    asyncData ({ params, $axios }) {
      return $axios.post(`/api/v0.1/advertisement/get`,{id: params.id})
          .then(({data}) => {
            if(data.success)
              return {advertisement: data.advertisement};
            return {advertisement: null}
          })
    },
    computed: {
      ...mapGetters('global', ['countries']),
      owner: function () {
        return this.advertisement ? this.advertisement.user : null;
      },
      paymentWindow: function () {
        let parts = this.advertisement.paymentWindow.split(':');
        return `${parseInt(parts[0])} hours and ${parseInt(parts[1])} minutes`;
      },
      ownerCountry: function () {
        let owner = this.owner;
        if(owner){
          return null; //this.countries.find(c => c.code === owner.country);
        }
      },
      tooltipMessage: function () {
        let message = [];
        if(this.tokenCount < this.advertisement.limitMin || this.tokenCount > this.advertisement.limitMax)
          message.push(`Token count is limited by min:${this.advertisement.limitMin} and max:${this.advertisement.limitMax}`);
        if(!this.termsConfirmed)
          message.push('Terms of trade not confirmed');
        return message.join('<br />');
      },
      tradeTokenCount: {
        get(){
          return this.tokenCount;
        },
        set(newVal){
          this.tokenCount = newVal;
          this.totalAmount = newVal * this.advertisement.amount;
        }
      },
      tradeTotalAmount: {
        get(){
          return this.totalAmount;
        },
        set(newVal){
          this.tokenCount = newVal / this.advertisement.amount;
          this.totalAmount = newVal;
        }
      },
      userLastSeen: function(){
        return moment(this.$auth.user.lastSeen).fromNow();
      }
    },
    methods: {
      ...mapActions('global',['createTrade']),
      startTrade: function (event) {
        if(this.tooltipMessage){
          this.showTermsConfirmTooltip = true;
          return;
        }
        this.$refs.tradeStartModal.show(event);
      },
      async onTradeStart(message){
        this.$refs.tradeStartModal.hide();
        this.tradeCreationInProgress = true;
        let response = await this.createTrade({
          advertisementId: this.advertisement._id,
          message,
          count: this.tokenCount
        });
        if(response.success){
          setTimeout(()=>{
            this.$router.push({name: 'trade-id', params:{id: response.tradeId}});
          },100);
        }else{
          if(response.message){
            alert(response.message);
          }else{
            alert('server side error');
          }
        }
        this.tradeCreationInProgress = false;
      }
    }
  }
</script>

<style>
  .form-token{
    /*background: #20a8d8;*/
    /*color: white;*/
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
  .frm-row{
    display: flex;
  }
  .frm-row label{
    width: 25%;
  }
  .frm-info-box{
    width: 75%;
  }

  .token-limit{
    position: absolute;
    margin-top: auto;
    margin-bottom: auto;
    right: 0;
    padding: 1em 4px 1em 0;
    border-left: 1px dashed #c8ced3;
  }

  .token-limit span{
    writing-mode: vertical-rl;
    text-orientation: mixed;
  }

  .token-limit:before{
    content: attr(data-max);
    background-color: #4dbd74;
    font-size: 0.7em;
    color: white;
    height: 1.3em;
    line-height: 1em;
    border-radius: 0.5em;
    display: inline-block;
    position: absolute;
    right: 115%;
    top: 0;
    padding: 2px 1em;
  }

  .token-limit:after{
    content: attr(data-min);
    background-color: #f86c6b;
    font-size: 0.7em;
    color: white;
    height: 1.3em;
    line-height: 1em;
    border-radius: 0.5em;
    display: inline-block;
    position: absolute;
    right: 115%;
    bottom: 0;
    padding: 2px 1em;
  }

  .tbl-info{
    display: flex;
    height: 100%;
    justify-content: center;
    flex-flow: column nowrap;
  }
  .tbl-info-item{
    width: 100%;
    display: flex;
  }
  .tbl-info-item :nth-child(1){  flex-basis: 2em;  }
  .tbl-info-item :nth-child(2){  flex-basis: 90%;  }
</style>
