<template>
  <div class="tab-box-container">
    <ul class="nav nav-tabs">
      <li v-for="(tab, index) in tabs" class="nav-item" :style="{width: (100/tabs.length)+'%'}">
        <a class="nav-link" :class="[{active: (index==selected)}, tabLinkClass(index)]" @click="selectTab(index)">
          <strong>{{tab}}</strong>
        </a>
      </li>
    </ul>
    <div class="tab-box-body">
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    props:['tabs'],
    data(){
      return {
        selected: 0
      }
    },
    computed: {
    },
    methods: {
      selectTab(index){
        this.selected = index;
//        this.$emit('onTabChanged',index);
      },
      tabLinkClass: function(index){
        switch(index){
          case 0: return {'text-right': true};
          case (this.tabs.length-1): return {'text-left': true};
          default: return {'text-center': true};
        }
      },
      switchToTab: function (index) {
        if(index >=0 && index < this.tabs.length) {
          this.selected = index;
//          this.$emit('onTabChanged', index);
        }
      },
      getSelectedIndex: function () {
        return this.selected;
      }
    }
  }
</script>

<style>
  .tab-box-container{
    margin-bottom: 2em;
    padding: 0.5em;
    background: white;
    border-radius: 4px;
  }
  .tab-box-body{
    padding: 1em;
    background-color: white;
    border: 1px solid #ccc;
    border-top: 0;
  }
</style>
