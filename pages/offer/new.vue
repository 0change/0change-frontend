<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header"><strong>{{$t('pages.offerNew.mainBox.title')}}</strong></div>
          <div class="card-body">
            <!-- Trade type row -->
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="adv-type-select">Type</label>
                  <select v-model="advertisement.type" class="form-control" id="adv-type-select" name="select1">
                    <option value="">Please select adv type</option>
                    <option value="sell">Sell</option>
                    <option value="buy">Buy</option>
                  </select>
                </div>
              </div>
              <div class="col-sm-8">
                  <div class="adv-description">
                    <p>What kind of trade offer do you wish to create? If you wish to sell tokens make sure you have token in your wallet.</p>
                  </div>
              </div>
              <div class="adv-row-separator d-sm-none"></div>
            </div>
            <!-- Token row -->
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="adv-token-select">{{$t('pages.offerNew.mainBox.token.label')}}</label>
                  <select v-if="tokensToTrade.length > 0" v-model="advertisement.token" class="form-control" id="adv-token-select" name="select1">
                    <option value="">{{$t('pages.offerNew.mainBox.token.placeholder')}}</option>
                    <option v-for="token in tokensToTrade" :value="token.code">{{token.title}} ({{token.code}})</option>
                  </select>
                  <select v-else class="form-control">
                    <option value="">{{$t('pages.offerNew.mainBox.token.noAnyToken')}}</option>
                  </select>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="adv-description">
                  <p>{{$t('pages.offerNew.mainBox.token.description')}}</p>
                  <p v-if="advertisement.type=='sell' && tokensToTrade.length == 0" class="color-danger">{{$t('pages.offerNew.mainBox.token.noAnyTokenAlert')}}</p>
                </div>
              </div>
              <div class="adv-row-separator d-sm-none"></div>
            </div>
            <!-- Payment method row -->
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="adv-payment-method">{{$t('pages.offerNew.mainBox.paymentMethod.label')}}</label>
                  <select v-model="advertisement.paymentMethod" class="form-control" id="adv-payment-method">
                    <option value="">{{$t('pages.offerNew.mainBox.paymentMethod.placeholder')}}</option>
                    <option v-for="method in allPaymentMethods" :value="method._id">{{method.title}}</option>
                  </select>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="adv-description">
                  <p>{{$t('pages.offerNew.mainBox.paymentMethod.description')}}</p>
                </div>
              </div>
              <div class="adv-row-separator d-sm-none"></div>
            </div>
            <!-- Currency row -->
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="adv-payment-currency">{{$t('pages.offerNew.mainBox.currency.label')}}</label>
                  <select v-model="advertisement.currency" class="form-control" id="adv-payment-currency" name="currency-select">
                    <option v-for="currency in currencies" :value="currency.code">{{currency.code}} - {{currency.title}}</option>
                  </select>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="adv-description">
                  <p>{{$t('pages.offerNew.mainBox.currency.description')}}</p>
                </div>
              </div>
              <div class="adv-row-separator d-sm-none"></div>
            </div>
            <!-- Token Amount -->
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label :dir="pageDirection" for="adv-token-amount">{{$t('pages.offerNew.mainBox.price.label')}} <span class="text-primary"><strong>( {{$t('pages.offerNew.mainBox.price.in')}} {{advertisement.currency}} )</strong></span></label>
                  <input v-model="advertisement.amount" class="form-control" id="adv-token-amount" type="number" :placeholder="$t('pages.offerNew.mainBox.price.placeholder')">
                </div>
              </div>
              <div class="col-sm-8">
                <div class="adv-description">
                  <p>{{$t('pages.offerNew.mainBox.price.description')}}</p>
                </div>
              </div>
              <div class="adv-row-separator d-sm-none"></div>
            </div>
            <!-- Min Transaction -->
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="adv-trans-min">{{$t('pages.offerNew.mainBox.limitMin.label')}}</label>
                  <input v-model="advertisement.limitMin" class="form-control" id="adv-trans-min" type="number" :placeholder="$t('pages.offerNew.mainBox.limitMin.placeholder')">
                </div>
              </div>
              <div class="col-sm-8">
                <div class="adv-description">
                  <p>{{$t('pages.offerNew.mainBox.limitMin.description')}}</p>
                </div>
              </div>
              <div class="adv-row-separator d-sm-none"></div>
            </div>
            <!-- Max Transaction -->
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="adv-trans-max">{{$t('pages.offerNew.mainBox.limitMax.label')}}</label>
                  <input v-model="advertisement.limitMax" class="form-control" id="adv-trans-max" type="number" :placeholder="$t('pages.offerNew.mainBox.limitMax.placeholder')">
                </div>
              </div>
              <div class="col-sm-8">
                <div class="adv-description">
                  <p>{{$t('pages.offerNew.mainBox.limitMax.description')}}</p>
                </div>
              </div>
              <div class="adv-row-separator d-sm-none"></div>
            </div>
            <!-- Adv enable -->
            <!--<div class="row">-->
              <!--<div class="col-sm-4">-->
                <!--<div class="form-group">-->
                  <!--<label for="adv-enable">Enable</label>-->
                  <!--<select v-model="offer.enable" class="form-control" id="adv-enable" name="select1">-->
                    <!--<option value="1">enable</option>-->
                    <!--<option value="0">disable</option>-->
                  <!--</select>-->
                <!--</div>-->
              <!--</div>-->
              <!--<div class="col-sm-8">-->
                <!--<div class="adv-description">-->
                  <!--<p>If you want to hide an offer temporarily from search page, disable it.</p>-->
                <!--</div>-->
              <!--</div>-->
              <!--<div class="adv-row-separator d-sm-none"></div>-->
            <!--</div>-->
            <!-- Payment window -->
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="adv-payment-window">{{$t('pages.offerNew.mainBox.paymentWindow.label')}}</label>
                  <TimeSelect
                    ref="timeSelect"
                    v-model="advertisement.paymentWindow"
                    class="form-control"
                    :title="$t('pages.offerNew.mainBox.paymentWindow.placeholder')"
                    id="adv-payment-window"
                    style="width: 100%"
                    return="title"
                  />
                </div>
              </div>
              <div class="col-sm-8">
                <div class="adv-description">
                  <p>{{$t('pages.offerNew.mainBox.paymentWindow.description')}}</p>
                </div>
              </div>
              <div class="adv-row-separator d-sm-none"></div>
            </div>
            <!-- Opening Hours -->
            <div class="row">
              <div class="col-sm-4">
                <div style="margin-bottom: 1em">{{$t('pages.offerNew.mainBox.openingHours.label')}}</div>
                <div class="controls">
                  <div class="row opening_hours_row" v-for="(day, index) in $t('pages.offerNew.mainBox.openingHours.dayTitles')">
                    <div class="col-md-3">{{day}}</div>
                    <div class="col-sm-3">
                      <label @click="toggleDayEnable(index, $event)" class="switch switch-label switch-success nomg">
                        <input class="switch-input" type="checkbox" v-model="advertisement.openingHours[index].enable==true">
                        <span class="switch-slider" data-checked="On" data-unchecked="Off"></span>
                      </label>
                    </div>
                    <div class="col-md-3">
                      <TimeSelect
                        v-model="advertisement.openingHours[index].start"
                        :title="$t('pages.offerNew.mainBox.openingHours.start')"
                        :disabled="advertisement.openingHours[index].enable !== true"
                      />
                    </div>
                    <div class="col-md-3">
                      <TimeSelect
                        v-model="advertisement.openingHours[index].end"
                        :title="$t('pages.offerNew.mainBox.openingHours.end')"
                        :disabled="advertisement.openingHours[index].enable != true"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-8">
                <div :dir="pageDirection" class="adv-description">
                  <p>{{$t('pages.offerNew.mainBox.openingHours.description')}}</p>
                </div>
              </div>
              <div class="adv-row-separator d-sm-none"></div>
            </div>
            <!-- Terms of trade -->
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="company">{{$t('pages.offerNew.mainBox.terms.label')}}</label>
                  <textarea v-model="advertisement.terms" rows="10" class="form-control" id="company" type="number" :placeholder="$t('pages.offerNew.mainBox.terms.placeholder')"></textarea>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="adv-description">
                  <p style="white-space: pre">{{$t('pages.offerNew.mainBox.terms.description')}}</p>
                </div>
              </div>
              <div class="adv-row-separator d-sm-none"></div>
            </div>
          </div>
          <div class="card-footer">
            <button @click="publishAdv" class="btn btn-sm btn-success" type="submit">
              <i class="fa fa-save"></i> {{isEditMode ? $t('pages.offerNew.mainBox.btn.titleEdit') : $t('pages.offerNew.mainBox.btn.titlePublish')}}
            </button>
          </div>
        </div>
      </div>
    </div>
    <BaseModal title="Error" ref="errorsModal">
      <div style="padding: 1em">
        <div v-for="error in registerErrors" class="alert alert-danger">{{error}}</div>
      </div>
    </BaseModal>
  </div>
</template>

<script>
  import TimeSelect from '@/components/TimeSelect';
  import {mapGetters, mapActions} from 'vuex';
  const emptyAdvertisement = {
    type: '',
    token: '',
    paymentMethod: '',
    currency: 'USD',
    amount: '',
    limitMin: '',
    limitMax: '',
    enable: 1,
    paymentWindow: '',
    openingHours: [0,1,2,3,4,5,6].map(i => ({enable: true, start: '', end: ''})),
    terms: ''
  };

  export default {
    middleware: ['auth'],
    layout: 'coreui',
    components: {TimeSelect},
    data() {
      return {
        advertisement: {...emptyAdvertisement},
        registerErrors: []
      }
    },
    computed: {
        ... mapGetters('global',['cryptoTokens', 'currencies', 'allPaymentMethods', 'balance']),
      ...mapGetters('locales',["pageDirection"]),
      isEditMode: function(){
          return !!this.$route.params.id;
      },
      userTokens: function () {
        if(!this.cryptoTokens || this.cryptoTokens.length < 1)
          return [];
        let tokens = Object.keys(this.balance).map(tokenCode => this.cryptoTokens.find(ct => ct.code === tokenCode));
        return tokens;
      },
      tokensToTrade: function () {
        if(this.advertisement.type === 'sell')
          return this.userTokens;
        else if(this.advertisement.type === 'buy')
          return this.cryptoTokens;
        else
          return [];
      }
    },
    mounted(){
      if(this.isEditMode){
        this.loadOfferToEdit();
      }
      this.loadUserBalance();
    },
    methods: {
        ...mapActions('global',['registerNewAdvertisement', 'editAdvertisement', 'loadUserBalance']),
      loadOfferToEdit(){
          let {id} = this.$route.params;
          this.$axios.post('/api/v0.1/offer/get', {id})
            .then(({data}) => {
              console.log(data.advertisement);
              this.advertisement = {
                type: data.advertisement.type,
                token: data.advertisement.token.code,
                paymentMethod: data.advertisement.paymentMethod._id,
                currency: data.advertisement.currency.code,
                amount: data.advertisement.amount,
                limitMin: data.advertisement.limitMin,
                limitMax: data.advertisement.limitMax,
                enable: data.advertisement.enable,
                paymentWindow: data.advertisement.paymentWindow,
                openingHours: data.advertisement.openingHours,
                terms: data.advertisement.terms
              };
            });
      },
      async publishAdv() {
        //alert(JSON.stringify(this.offer, null, 2));
        let advertisementData = JSON.parse(JSON.stringify(this.advertisement));
        for(let i=0 ; i<7 ; i++){
          if(advertisementData.openingHours[i].enable){
            if(advertisementData.openingHours[i].start === '')
              advertisementData.openingHours[i].start = 0;
            if(advertisementData.openingHours[i].end === '')
              advertisementData.openingHours[i].end = 95;
          }
        }
        let response = null;
        if(this.isEditMode)
          response = await this.editAdvertisement({id: this.$route.params.id, advertisement: advertisementData})
        else
          response = await this.registerNewAdvertisement(advertisementData);
        if(response.success){
          this.advertisement = {...emptyAdvertisement};
          this.$toast.success('Advertisement published successfully');
          this.$router.push({name: 'offer'});
        }else{
          if(response.errors && response.errors.length > 0)
            this.registerErrors = response.errors;
          else if(response.message){
            this.registerErrors = [response.message];
          }
          else {
            this.registerErrors = ['Server side error'];
          }
          this.$refs.errorsModal.show();
        }
      },
      toggleDayEnable(index, clickEvent){
        clickEvent.preventDefault();
        this.advertisement.openingHours[index].enable = this.advertisement.openingHours[index].enable === false;
      }
    }
  }
</script>

<style>
  .user-info-table {
    font-size: 1.2em;
  }

  .user-info-table td {
    padding: 0.5em 1em;
  }

  .user-info-table td:nth-child(1) {
    font-weight: bold;
    padding-right: 3em;
  }

  .user-info-table td:nth-child(3) {
    color: #73818f;
    font-size: 0.8em;
  }

  .color-success {
    color: green
  }

  .color-danger {
    color: red
  }

  .avatar-container {
    width: 14em;
    height: 14em;
    border-radius: 25em;
    overflow: hidden;
    position: relative;
    border: 4px solid #aaa;
    margin: auto;
  }

  .avatar-container img {
    width: 100%;
    height: 100%;
  }

  .action-btn {
    width: 100%;
    padding: 0.5em 0;
    border-radius: 0.5em;
    background: #20a8d8;
    color: white;
    font-weight: bold;
    border: 1px solid #2088b6
  }

  .adv-row-separator{
    content: ' ';
    height: 2px;
    border-top: 2px dashed #ddd;
    box-sizing: border-box;
    margin: 2em 2em;
    width: 100%;
  }
  .adv-description {
    padding: 1em;
    color: #555;
    font-style: italic;
  }
  .opening_hours_row{
    margin-bottom: 0.4em;
  }
</style>
