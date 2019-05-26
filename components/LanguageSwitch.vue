<template>
  <li class="nav-item dropdown">
    <a href="#" data-toggle="dropdown">
      <div style="display: inline-block">
        <i
          style="font-size: 1.5em; margin-right: 5px"
          :title="currentLocale.name"
          class="flag-icon mb-0 nopd "
          :class="'flag-icon-' + currentLocale.flag"
        ></i>
        <span class="d-none d-sm-inline-block">{{currentLocale.name}}</span>
      </div>
    </a>
    <!--<select class="nomg" @change="onItemSelect" style="background: white">-->
      <!--<option v-for="l in locales" :value="l.code" :selected="l.code === locale">{{l.name}}</option>-->
    <!--</select>-->
    <ul class="dropdown-menu lang-list">
      <li v-for="l in locales" @click="onItemSelect(l)">
        <i
          style="font-size: 1.5em; margin-right: 5px;"
          :title="currentLocale.name"
          class="flag-icon mb-0 nopd"
          :class="'flag-icon-' + l.flag"
        ></i>
        <span>{{l.name}}</span>
      </li>
    </ul>
  </li>
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
      onItemSelect(item){
        let locale = item.code;
        document.cookie = `locale=${locale}`;

        //location.reload();

        this.$i18n.locale = locale;
        this.setLang(locale);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~/design/colors.scss";
  .lang-list{
    display: none;
    flex-wrap: wrap;
    width: 150px;
    right: 0;
    left: inherit;
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    list-style: none;
    padding: 0;
    margin-top: 1rem;
    transition: visibility 1.5s, opacity 1.5s linear;
    border-radius: 0.25rem;

    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: box-shadow 0.2s ease-in-out;
    /* transition: all 0.2s ease-in-out; */
  }

  .lang-list.show{display: flex}

  .lang-list:before, .lang-list:after{
    width: 0;
    height: 0;
    content: " ";
    position: absolute;
    top: -25px;
    right: 1rem;
    border-width: 12px;
    border-style: solid;
    border-color: transparent transparent #ccc transparent;
  }
  .lang-list:after{
    top: -23px;
    border-color: transparent transparent #fff transparent;
  }
  .lang-list li{
    text-align: left;
    flex: 100% 0 0;
    padding: 1em;
    cursor: pointer;
  }
  .lang-list li:hover{
    background: rgba(0,0,0,0.1);
    color: $colorRed1;
  }
</style>
