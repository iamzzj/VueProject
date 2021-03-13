import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/fonts/iconfont.css'
import './assets/css/global.css'
import axios from 'axios'

import TreeTable from 'vue-table-with-tree-grid'

// 导入父富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// 请求进度条
import NProgress from 'nprogress'

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'
// request展示进度条
axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// response中隐藏进度条
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
Vue.prototype.$http = axios

Vue.component('tree-table', TreeTable)
Vue.use(VueQuillEditor)

Vue.filter('dataFormat', function (originVal) {
  const dt = new Date(originVal)
  const year = dt.getFullYear()
  const month = (dt.getMonth() + 1 + '').padStart(2, '0')
  const date = (dt.getDate() + '').padStart(2, '0')

  const hour = (dt.getHours() + '').padStart(2, '0')
  const minutes = (dt.getMinutes() + '').padStart(2, '0')
  const seconds = (dt.getSeconds() + '').padStart(2, '0')

  return `${year}-${month}-${date} ${hour}:${minutes}:${seconds}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
