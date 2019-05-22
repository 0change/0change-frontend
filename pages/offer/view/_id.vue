<template>
  <div>
    <TradeStartModal ref="tradeStartModal" @onSuccess="onTradeStart"/>
    <div class="row bd-1 mb-4">
      <div class="col-sm-6 nosp">
        <div class="bg-gray-1 pd10 bdb-1">{{advertisement.type==='sell' ? $t('pages.offerView.infoBox.titleSeller') : $t('pages.offerView.infoBox.titleBuyer')}}</div>
        <div class="pd10">
          <div class="mgl10 pdl10 tbl-info fx-basis-8" style="border-left: 1px solid #f7f7f7;">
            <table style="display: inline">
              <tr>
                <td><i class="fa fa-at fa-lg"></i></td>
                <td>{{$t('pages.offerView.infoBox.username')}}:&nbsp;</td>
                <td><BaseLink :to="{name: 'profile-id', params: {id: owner._id}}"><strong>{{owner.username}}</strong></BaseLink></td>
              </tr>
              <tr>
                <td><img src="/imgs/brightid-av-1.jpg" alt="" style="width: 1.2em"></td>
                <td>{{$t('pages.offerView.infoBox.bidScore')}}:&nbsp;</td>
                <td><strong class="clr-orange-l">{{owner.brightIdScore}}</strong></td>
              </tr>
              <tr>
                <td><i class="fa fa-circle fa-lg" style="color: #4dbd74"></i></td>
                <td>{{$t('pages.offerView.infoBox.lastSeen')}}:&nbsp;</td>
                <td><strong>{{userLastSeen}}</strong></td>
              </tr>
              <tr>
                <td><i class="fa fa-flag fa-lg"></i></td>
                <td>{{$t('pages.offerView.infoBox.country')}}:&nbsp;</td>
                <td>
                  <span>
                    <i class="flag-icon h6 mb-0" :class="'flag-icon-' + owner.country.toLowerCase()"></i>
                    <strong>{{ownerCountry ? ownerCountry.name : ''}}</strong>
                  </span>
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>{{$t('pages.offerView.infoBox.confirmedTrades')}}:&nbsp;</td>
                <td><strong>{{$t('pages.offerView.infoBox.confirmedTradesCount', {n: ($auth.user.confirmedTrades || '0')})}}</strong></td>
              </tr>
              <!--<tr>-->
                <!--<td>&nbsp;</td>-->
                <!--<td>Trade volume:&nbsp;</td>-->
                <!--<td><strong>xx trades</strong></td>-->
              <!--</tr>-->
              <tr>
                <td>&nbsp;</td>
                <td>{{$t('pages.offerView.infoBox.feedbackScore')}}:&nbsp;</td>
                <td>
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
                </td>
              </tr>
              <tr v-if="false">
                <td><i class="fa fa-check-square fa-lg color-success"></i></td>
                <td>Trusted By:&nbsp;</td>
                <td><strong class="badge badge-success">5 person</strong></td>
              </tr>
              <tr v-if="false">
                <td><i class="fa fa-minus-circle fa-lg color-danger"></i></td>
                <td>Blocked By:&nbsp;</td>
                <td><strong class="badge badge-success">not blocked yet</strong></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="col-sm-6 nosp">
        <div class="bg-gray-1 pd10 bdb-1">{{$t('pages.offerView.infoBox.titleTrade')}}</div>
        <div class="pd10">
          <div class="mgl10 pdl10 tbl-info fx-basis-8" style="border-left: 1px solid #f7f7f7;">
            <table  style="display: inline">
              <tr>
                <td><img :src="'/erc20-tokens/' + advertisement.token.code + '.png'" alt="" style="width: 1.2em"></td>
                <td>{{$t('pages.offerView.infoBox.token')}}:&nbsp;</td>
                <td><strong>{{advertisement.token.title}}</strong></td>
              </tr>
              <tr>
                <td><i class="fa fa-money fa-lg"></i></td>
                <td>{{$t('pages.offerView.infoBox.price')}}:&nbsp;</td>
                <td><strong class="number">{{advertisement.amount|commafy}} {{advertisement.currency.code}}</strong></td>
              </tr>
              <tr>
                <td></td>
                <td>{{$t('pages.offerView.infoBox.tradeLimit')}}:&nbsp;</td>
                <td><strong>{{advertisement.limitMin}} - {{advertisement.limitMax}} {{advertisement.token.code}}</strong></td>
              </tr>
              <tr>
                <td><i class="fa fa-credit-card fa-lg"></i></td>
                <td>{{$t('pages.offerView.infoBox.paymentMethod')}}:&nbsp;</td>
                <td><strong>{{advertisement.paymentMethod.title}}</strong></td>
              </tr>
              <tr>
                <td><i class="fa fa-hourglass-half fa-lg"></i></td>
                <td>{{$t('pages.offerView.infoBox.paymentWindow')}}:&nbsp;</td>
                <td><strong>{{paymentWindow}}</strong></td>
              </tr>
            </table>
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
                <span>{{$t('pages.offerView.tokenBox.titleLimit')}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row bd-1 mb-4">
      <div class="col-sm-12 nosp">
        <div class="bg-gray-1 bdb-1 pd10">{{$t('pages.offerView.termsBox.title')}}</div>
        <div class=" pd10">
          <pre style="white-space: pre-line; width: 100%">{{advertisement.terms}}</pre>
          <div class="form-check checkbox">
            <input class="form-check-input" id="check1" type="checkbox" v-model="termsConfirmed">
            <label class="form-check-label" for="check1">{{$t('pages.offerView.termsBox.checkBoxTitle')}}</label>
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
        >{{advertisement.type=='sell'?$t('pages.offerView.confirmBtn.titleBuy'):$t('pages.offerView.confirmBtn.titleSell')}}</button>
      </div>
      <div class="col-sm-4" v-else>
        <LoginModal ref="advViewLoginModal"/>
        <button
            class="btn btn-pill btn-block btn-success"
            type="button"
            @click="$refs.advViewLoginModal.show($event)"
        >{{$t('pages.offerView.confirmBtn.titleLogOuted')}}</button>
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
  import BaseLink from "../../../components/global/BaseLink";

  export default {
    layout: 'coreui-no-sidemenu',
    components:{BaseLink, TradeStartModal, LoginModal, VueStarRating},
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
      return $axios.post(`/api/v0.1/offer/get`,{id: params.id})
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
        return this.$t('pages.offerView.infoBox.paymentWindowVal',{h: parseInt(parts[0]), m: parseInt(parts[1])});;
      },
      ownerCountry: function () {
        let owner = this.owner;
        if(owner){
          return null; //this.countries.find(c => c.code === owner.country);
        }
      },
      tooltipMessage: function () {
        let message = [];
        if(
          (this.advertisement.limitMin && this.tokenCount < this.advertisement.limitMin)
          ||
          (this.advertisement.limitMax && this.tokenCount > this.advertisement.limitMax)
        )
          message.push(this.$t('pages.offerView.errors.tokenLimit',{min: this.advertisement.limitMin, max:this.advertisement.limitMax}));
        if(!this.termsConfirmed)
          message.push(this.$t('pages.offerView.errors.termsNotConfirmed'));
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
        if(this.owner)
        return this.owner.lastSeenInfo.title;
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
