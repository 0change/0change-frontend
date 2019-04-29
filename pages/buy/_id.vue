<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header"><strong>Trade Status</strong></div>
          <div class="card-body">
            <StepProgress
                :length="5"
                :labels="['Request','Start','Payment','Release','Done']"
                :step="2"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="alert alert-dark" role="alert">
          <div>1: Read all term of trade.</div>
          <div>2: Select the checkbox below it.</div>
          <div>3: third note.</div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="alert alert-dark" role="alert">
          <div><strong>Advertisement: </strong><a href="#">advertisement #4512369</a></div>
          <div><strong>Buyer: </strong><a href="#">Anonymous person</a></div>
          <div><strong>Exchange rate: </strong>2.3754 USD / TOKEN</div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="card">
          <div class="card-header"><strong>Buy Steps</strong></div>
          <div class="card-body">
            <h5><strong>Step 1:</strong> Do Payment according to seller instruction below</h5>
            <div class="alert alert-dark" role="alert">
              <pre style="white-space: pre-line;">
<strong>Step 1:</strong>
    Do payment and attach your receipt here.

<strong>Step 2:</strong>
    text to mt mobile (+1xxx-xxx-xxxx)

<strong>Step 3:</strong>
    some instructions

<strong>Step 4:</strong>
    some instructions
              </pre>
            </div>

            <h5><strong>Step 2:</strong> confirm your payment</h5>

            <button class="btn btn-primary" type="submit" style="width: 100%">I have paid</button>

            <h5><strong>Step 3:</strong> finalize</h5>

            <div class="row">
              <div class="col-sm-6">
                <button class="btn btn-danger" type="submit" style="width: 100%">Dispute</button>
              </div>
              <div class="col-sm-6">
                <button class="btn btn-warning" type="submit" style="width: 100%">Cancel Trade</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card">
          <div class="card-header"><strong>Message History</strong></div>
          <div class="card-body">
            <p>
              <strong>Buyer: </strong> Hi im ready to buy your tokens.
            </p>
            <p>
              <strong>Seller: </strong> Hi. lets start. remember you only have 3 hours to confirm payment
            </p>
            <textarea class="form-control trade-comment" rows="5" placeholder="Write your message to seller"></textarea>

            <button class="btn btn-primary" type="submit">Send</button>
            <input type="file" value="Attachment" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import StepProgress from '~/components/StepProgress.vue';
  export default {
    layout: 'coreui',
    components:{StepProgress}
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
