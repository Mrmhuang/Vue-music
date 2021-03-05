import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default function axiosGet(url) {
  var instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    method:'get'
  })
  return instance(url)
}
