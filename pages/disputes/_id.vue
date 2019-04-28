<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <strong>Dispute messages</strong>
          </div>
          <div class="card-body" v-viewer>
            <p>
              <strong>Buyer: </strong> I payed the money, but seller does not release the tokens.
              <br>
            </p>
            <p>
              <strong>Admin: </strong> <a href="#">@seller</a>, <a href="#">@buyer</a>, please sent your evidence here.
            </p>
            <p>
              <strong>Buyer: </strong> My receipt of payment
              <br>
              <img style="height: 6em; border: 2px solid #aaa; border-radius: 4px; cursor: pointer" src="/imgs/temp-receipt.jpg" alt="">
            </p>
            <p>
              <strong>Seller: </strong> My bank account print
              <br>
              <img style="height: 6em; border: 2px solid #aaa; border-radius: 4px; cursor: pointer" src="/imgs/temp-bank-print.jpg" alt="">
            </p>
            <textarea class="form-control trade-comment" rows="5" placeholder="Write your message to seller"></textarea>

            <button class="btn btn-primary" type="submit">Send</button>
            <input type="file" value="Attachment" />
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <strong>Trade messages</strong>
          </div>
          <div class="card-body">
            <p>
              <strong>Buyer: </strong> Hi im ready to buy your tokens.
            </p>
            <p>
              <strong>Seller: </strong> Hi. lets start. remember you only have 3 hours to confirm payment
            </p>
            <p>
              <strong>Buyer: </strong> I have payed.
            </p>
            <p>
              <strong>Seller: </strong> I did not receive the money.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    layout: 'coreui',
    data() {
      return {
        filter:{
          type: "",
          token: '',
          paymentMethod: ''
        },
        disputes: [
          {
            date: '2018-10-05',
            status: 'done',
            owner: '465475847538',
            trader: 'trade_user_1',
            trade: '465fd65543ffd7',
          }
        ]
      }
    },
    computed: {
      getFilteredAdvertisements(){
        let filtered = this.advertisements;
        if(!!this.filter.type) {
          filtered = filtered.filter(adv => {
            return adv.type.toLowerCase() === this.filter.type;
          });
        }
        if(!!this.filter.token){
          filtered = filtered.filter(adv => {
            return adv.token.title.toLowerCase().includes(this.filter.token.toLowerCase());
          });
        }
        if(!!this.filter.paymentMethod){
          filtered = filtered.filter(adv => {
            return adv.payment.method.toLowerCase().includes(this.filter.paymentMethod.toLowerCase());
          });
        }
        return filtered;
      }
    },
    methods: {
    }
  }
</script>

<style>
  .cc-token-avatar{width: 30px; height: 30px}
  .table-advs td {vertical-align: middle}
  .table-coin-count{width: 100%}
  .table-coin-count td{
    padding: 0.5em 1em;
  }
  .table-coin-count td:nth-child(1){
    padding-right: 3em;
  }
  .table-coin-count td:nth-child(2){
    font-weight: bold;
  }
  .table-coin-count tr:nth-child(odd){
    background: #eee;
  }
  .table-wallet-info{width: 100%; margin-bottom: 1.2em}
  .table-wallet-info td{
    padding: 0.5em 1em;
  }
  .table-wallet-info td:nth-child(1){
    font-weight: bold;
    padding-right: 3em
  }
  .copy-button{
    display: inline-block;
    width: inherit;
    padding: 0.2em 0.5em;
    cursor: pointer;
  }
  .transaction-coin-icon{
    height: 1.5em;
  }
</style>