import Vue from 'vue'
// 按需引入
import { Dialog, Pagination, Tooltip, Switch, TableColumn, Table, Col, Row, Card, BreadcrumbItem, Breadcrumb, Menu, Submenu, MenuItemGroup, MenuItem, Button, Form, FormItem, Input, Message, MessageBox, Container, Aside, Main, Header } from 'element-ui'
// 注册组件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Header)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Col)
Vue.use(Row)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Tooltip)
Vue.use(Switch)
Vue.use(Pagination)
Vue.use(Dialog)
// message有点特殊，要全局挂载
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
