import Vue from 'vue'
import moment from 'moment'

Vue.filter('date', function (value, format) {
  if (!value) return ''
  let defaultformat = 'DD/MM/YYYY'
  if(format) defaultformat = format
  return moment(value).format(defaultformat)
})
