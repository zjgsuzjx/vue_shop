import Vue from 'vue'
// 按需引入
import { Upload, CheckboxGroup, Checkbox, Step, Steps, TimelineItem, Timeline, TabPane, Tabs, Cascader, Alert, Option, Select, Tree, Tag, Dialog, Pagination, Tooltip, Switch, TableColumn, Table, Col, Row, Card, BreadcrumbItem, Breadcrumb, Menu, Submenu, MenuItemGroup, MenuItem, Button, Form, FormItem, Input, Message, MessageBox, Container, Aside, Main, Header } from 'element-ui'
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
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Option)
Vue.use(Alert)
Vue.use(Select)
Vue.use(Cascader)
Vue.use(TabPane)
Vue.use(Tabs)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(Steps)
Vue.use(Step)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Upload)
// message有点特殊，要全局挂载
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
