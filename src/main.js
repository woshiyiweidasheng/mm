import Vue from 'vue'
import App from './App.vue'
// import axios from 'axios'

Vue.config.productionTip = false
// import '@/styles/base.less'
import router from '@/router'
//导入axios
import '@/utails/request.js'
import '@/plugins/elementUI'
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
