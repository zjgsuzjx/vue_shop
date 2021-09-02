import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标,这里用了阿里图标
import './assets/fonts/iconfont.css'
import TreeTable from 'vue-table-with-tree-grid'

import axios from 'axios'
import moment from 'moment'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
// 导入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.config.productionTip = false
// 配置请求的根路径
axios.defaults.baseURL = 'https://acg.zjgsuzjx.top:8888/api/private/v1/'
// axios请求拦截，请求时展示进度条
axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须return
  return config
})
// 请求完毕，关闭进度条
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
Vue.prototype.$http = axios

Vue.use(VueQuillEditor)

Vue.component('tree-table', TreeTable)

Vue.filter('FormatData', time => { return moment(time).format('YYYY-MM-DD HH:mm:ss') })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
