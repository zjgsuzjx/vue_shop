import Vue from 'vue'
// 按需引入
import { Button, Form, FormItem, Input, Message, MessageBox } from 'element-ui'
// 注册组件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
// message有点特殊，要全局挂载
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox
