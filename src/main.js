import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

const app = new Vue(App)
wx.cloud.init({
  traceUser: true
})
app.$mount()
