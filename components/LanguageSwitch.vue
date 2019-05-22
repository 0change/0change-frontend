<template>
  <div style="display: flex">
    <i
      style="font-size: 1.5em; margin-right: 5px"
      :title="currentLocale.name"
      class="flag-icon mb-0 nopd d-none d-sm-block"
      :class="'flag-icon-' + currentLocale.flag"
    ></i>
    <select class="nomg" @change="onItemSelect" style="background: white">
      <option v-for="l in locales" :value="l.code" :selected="l.code === locale">{{l.name}}</option>
    </select>
  </div>
</template>


<script>
  import {mapState, mapActions} from 'vuex';
  export default {
    computed:{
      ...mapState('locales', ['locales', 'locale']),
      currentLocale:function(){
        return this.locales.find(item => item.code === this.locale);
      }
    },
    methods:{
      ...mapActions('locales', ['setLang']),
      onItemSelect(event){
        let locale = event.target.value;
        document.cookie = `locale=${locale}`;

        //location.reload();

        this.$i18n.locale = locale;
        this.setLang(locale);
      }
    }
  }
</script>
