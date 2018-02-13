// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'babel-polyfill' // 引入兼容性插件
import 'rootPath/config/axios'
import Print from 'vue-print-nb' // 引入打印组件

/* 导入公共样式表 */
import './assets/css/common.scss'
import common from '@/utils/common'

// 配置host
// import hostPath from 'rootPath/config/host'

/* 引入element */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale'
import enLocale from 'element-ui/lib/locale/lang/en'
locale.use(enLocale)
Vue.use(Print) // 使用打印功能

// 判断浏览器版本
common.appVersionIsLessThanIE9()

/* 调用执行 */
Vue.use(ElementUI)
Vue.prototype.$ajax = axios

Vue.config.productionTip = false

// 路由跳转前的处理
router.beforeEach((to, from, next) => {
  // 跳转前先检测打开的页面链接是否不是登录页，且没有token值，跳转到登录页
  const getToken = common.getCookie('amlTk')
  let flag = true
  if (!getToken && to.name !== 'login') {
    // 跳转到一个没有权限的页面
    // router.push({
    //   name: 'permission'
    // })
    // 跳转到ums登录页面
    // location.href = hostPath.logoutUrl
    router.push({
      name: 'login'
    })
    flag = false
  }

  // 从Data Center点击review页面的情况，要判断是否有配置权限，没有权限，不让跳转
  let reviewFlag = false
  if (common.reverseStr(to.name).search(common.reverseStr('Review')) === 0) {
    const listMenu = window.JSON.parse(localStorage.getItem('amlListMenu'))
    if (listMenu && listMenu.length) {
      listMenu.some((v) => {
        if (to.name === v.menuUrl.split(',')[0]) {
          reviewFlag = true
          return true
        }
      })
    }
  } else {
    reviewFlag = true
  }

  if (reviewFlag) {
    flag && next()
  } else {
    // 跳转到一个没有权限的页面
    router.push({
      name: 'permission'
    })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
