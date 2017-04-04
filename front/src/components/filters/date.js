import Vue from 'vue'
import moment from 'moment'

Vue.filter('date', function (value,format) {
  if (!value) return ''
  console.log(format)
  return moment(value).format('YYYY-MM-DD HH:mm')
}
