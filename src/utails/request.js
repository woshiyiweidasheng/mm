import Vue from 'vue'
import axios from 'axios'

//基地址
axios.defaults.baseURL='http://127.0.0.1/heimamm/public'
//允许携带cookie
axios.defaults.withCredentials=true

Vue.prototype.$axios=axios