<template>
  <div class="root">
    <div class="container">
      <ul class="progressbar">
        <li :style="{width: (100/length)+'%'}" :class="{active: i<=step}" v-for="i in length" :key="i">
          <span>
            <i v-if="i<=step" class="fa fa-check fa-lg"></i>
          </span>
          {{labels[i-1]}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    props:['length', 'labels', 'step'],
    data () {
      return {
      }
    },
  }
</script>

<style scoped>
  .container{
    position: relative;
    z-index: 1;
    margin-top: 20px;
  }
  .progressbar{
    counter-reset: step;
    list-style: none;
    padding: 0;
  }
  .progressbar li{
    float: left;
    width: 14.28%;
    position: relative;
    text-align: center;
  }
  .progressbar li span{
    /*content:counter(step);*/
    /*counter-increment: step;*/
    width: 30px;
    height: 30px;
    border: 2px solid #bebebe;
    display: block;
    margin: 0 auto 10px auto;
    border-radius: 50%;
    line-height: 27px;
    background: white;
    color: #bebebe;
    text-align: center;
    font-weight: bold;
  }
  .progressbar li:after{
    content: '';
    position: absolute;
    width:100%;
    height: 3px;
    background: #979797;
    top: 15px;
    left: -50%;
    z-index: -1;
  }
  .progressbar li.active span{
    border-color: #3aac5d;
    background: #3aac5d;
    color: white
  }
  .progressbar li.active:after{
    background: #3aac5d;
  }
  .progressbar li.active - li:after{
                             background: #3aac5d;
                           }
  .progressbar li.active - li>span{
                             border-color: #3aac5d;
                             background: #3aac5d;
                             color: white
                           }
  .progressbar li:first-child:after{
    content: none;
  }
</style>