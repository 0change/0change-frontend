import Vue from 'vue'
import commafy from '~/utils/commafy'
import moment from 'moment'

Vue.filter('commafy', commafy);
Vue.filter('roundNum4d', function (number) {
  return Math.round(number * 10000) / 10000;
});
Vue.filter('std_datetime', function (value) {
  return moment(value).format('YYYY-MM-DD HH:MM');
});


