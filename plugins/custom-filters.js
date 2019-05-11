import Vue from 'vue'
import commafy from '~/utils/commafy'

Vue.filter('commafy', commafy);
Vue.filter('roundNum4d', function (number) {
  return Math.round(number * 10000) / 10000;
});


