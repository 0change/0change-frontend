<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header"><strong>Create a new offer to sell</strong></div>
          <div class="card-body">
            <!-- Trade type row -->
            <!--<div class="row">-->
              <!--<div class="col-sm-4">-->
                <!--<div class="form-group">-->
                  <!--<label for="adv-type-select">Type</label>-->
                  <!--<select v-model="offer.type" class="form-control" id="adv-type-select" name="select1">-->
                    <!--<option value="">Please select adv type</option>-->
                    <!--<option value="sell">Sell</option>-->
                    <!--<option value="buy">Buy</option>-->
                  <!--</select>-->
                <!--</div>-->
              <!--</div>-->
              <!--<div class="col-sm-8">-->
                  <!--<div class="adv-description">-->
                    <!--<p>What kind of trade offer do you wish to create? If you wish to sell tokens make sure you have token in your wallet.</p>-->
                  <!--</div>-->
              <!--</div>-->
              <!--<div class="adv-row-separator d-sm-none"></div>-->
            <!--</div>-->
            <!-- Token row -->
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="adv-token-select">Token</label>
                  <select v-if="userTokens.length > 0" v-model="advertisement.token" class="form-control" id="adv-token-select" name="select1">
                    <option value="">Select token</option>
                    <option v-for="token in userTokens" :value="token.code">{{token.title}} ({{token.code}})</option>
                  </select>
                  <select v-else class="form-control">
                    <option value="">You have not any token.</option>
                  </select>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="adv-description">
                  <p>What kind of token do you wish to sell/buy ?</p>
                  <p v-if="userTokens.length == 0" class="color-danger">You hav not any tokens to post a trade. Make deposit and try again.</p>
                </div>
              </div>
              <div class="adv-row-separator d-sm-none"></div>
            </div>
            <!-- Payment method row -->
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="adv-payment-method">Payment method</label>
                  <select v-model="advertisement.paymentMethod" class="form-control" id="adv-payment-method">
                    <option value="">Select payment method</option>
                    <option v-for="method in allPaymentMethods" :value="method._id">{{method.title}}</option>
                  </select>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="adv-description">
                  <p>What do you want to receive in exchange for your token?</p>
                </div>
              </div>
              <div class="adv-row-separator d-sm-none"></div>
            </div>
            <!-- Currency row -->
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="adv-payment-currency">Currency</label>
                  <select v-model="advertisement.currency" class="form-control" id="adv-payment-currency" name="currency-select">
                    <option v-for="currency in currencies" :value="currency.code">{{currency.code}} - {{currency.title}}</option>
                  </select>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="adv-description">
                  <p></p>
                </div>
              </div>
              <div class="adv-row-separator d-sm-none"></div>
            </div>
            <!-- Token Amount -->
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="adv-token-amount">Token Price <span class="text-primary"><strong>( in {{advertisement.currency}} )</strong></span></label>
                  <input v-model="advertisement.amount" class="form-control" id="adv-token-amount" type="number" placeholder="example: 2.3241">
                </div>
              </div>
              <div class="col-sm-8">
                <div class="adv-description">
                  <p>How much do you ask for each token ?</p>
                </div>
              </div>
              <div class="adv-row-separator d-sm-none"></div>
            </div>
            <!-- Min Transaction -->
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="adv-trans-min">Min. transaction limit</label>
                  <input v-model="advertisement.limitMin" class="form-control" id="adv-trans-min" type="number" placeholder="example: 0">
                </div>
              </div>
              <div class="col-sm-8">
                <div class="adv-description">
                  <p>Minimum transaction limit in one trade.</p>
                </div>
              </div>
              <div class="adv-row-separator d-sm-none"></div>
            </div>
            <!-- Max Transaction -->
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="adv-trans-max">Max. transaction limit</label>
                  <input v-model="advertisement.limitMax" class="form-control" id="adv-trans-max" type="number" placeholder="example: 100">
                </div>
              </div>
              <div class="col-sm-8">
                <div class="adv-description">
                  <p>Maximum transaction limit in one trade.</p>
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
                <!--<div class="form-group">-->
                  <!--<label for="adv-payment-window">Payment window</label>-->
                  <!--<input v-model="offer.paymentWindow" class="form-control" id="adv-payment-window" type="text" placeholder="example: 04:30">-->
                <!--</div>-->
                <div class="form-group">
                  <label for="adv-payment-window">Payment Window</label>
                  <TimeSelect
                    v-model="advertisement.paymentWindow"
                    class="form-control"
                    title="Payment Window"
                    id="adv-payment-window"
                    style="width: 100%"
                    return="title"
                  />
                </div>
              </div>
              <div class="col-sm-8">
                <div class="adv-description">
                  <p>How much time does the buyer have to confirm payment ?</p>
                </div>
              </div>
              <div class="adv-row-separator d-sm-none"></div>
            </div>
            <!-- Opening Hours -->
            <div class="row">
              <div class="col-sm-4">
                <div style="margin-bottom: 1em">Opening hours</div>
                <div class="controls">
                  <div class="row opening_hours_row" v-for="(day, index) in ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']">
                    <div class="col-md-3">{{day}}</div>
                    <div class="col-sm-3">
                      <label @click="toggleDayEnable(index, $event)" class="switch switch-label switch-success nomg">
                        <input class="switch-input" type="checkbox" v-model="advertisement.openingHours[index].enable==true">
                        <span class="switch-slider" data-checked="On" data-unchecked="Off"></span>
                      </label>
                    </div>
                    <div class="col-md-3">
                      <TimeSelect v-model="advertisement.openingHours[index].start" title="start" :disabled="advertisement.openingHours[index].enable !== true" />
                    </div>
                    <div class="col-md-3">
                      <TimeSelect v-model="advertisement.openingHours[index].end" title="end" :disabled="advertisement.openingHours[index].enable != true" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="adv-description">
                  <p>Optional. Days and hours when you want your offer to be automatically shown and hidden.</p>
                </div>
              </div>
              <div class="adv-row-separator d-sm-none"></div>
            </div>
            <!-- Terms of trade -->
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="company">Terms of trade</label>
                  <textarea v-model="advertisement.terms" rows="10" class="form-control" id="company" type="number" placeholder=""></textarea>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="adv-description">
                  <p>Other information you wish to tell about your trade.</p>
                  <p>Example 1: This offer is only for cash trades. If you want to pay online, contact 0change.com/ad/1234.</p>
                  <p>Example 2: Please make request only when you can complete the payment with cash within 12 hours.</p>
                </div>
              </div>
              <div class="adv-row-separator d-sm-none"></div>
            </div>
          </div>
          <div class="card-footer">
            <button @click="createAdv" class="btn btn-sm btn-success" type="submit">
              <i class="fa fa-save"></i> Publish
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
    type: 'sell',
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
      userTokens: function () {
        if(!this.cryptoTokens || this.cryptoTokens.length < 1)
          return [];
        let tokens = Object.keys(this.balance).map(tokenCode => this.cryptoTokens.find(ct => ct.code === tokenCode));
        return tokens;
      }
    },
    mounted(){
      this.loadUserBalance();
    },
    methods: {
        ...mapActions('global',['registerNewAdvertisement', 'loadUserBalance']),
      async createAdv() {
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
        let response = await this.registerNewAdvertisement(advertisementData);
        if(response.success){
          this.advertisement = {...emptyAdvertisement};
          this.$toast.success('Advertisement created successfully');
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
