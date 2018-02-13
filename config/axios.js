import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import common from '@/utils/common'
import router from '@/router'
// import qs from "qs"

// 配置host
import hostPath from 'rootPath/config/host'
axios.defaults.baseURL = hostPath.apiUrl

// 如果cookie中有token，则使用cookie中信息
if (common.getCookie('amlTk')) {
  axios.defaults.params = common.getReqParam()
  axios.defaults.data = common.getReqParam()
}

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log(config)
  return config
}, function (error) {
  // 对请求错误做些什么
  // console.log(error)
  return Promise.reject(error)
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (typeof(response.data) === "object") {
    // 判断status是否为0， 或者是否有result数组(工作流接口)
    if(response.data.status === 0 || response.data.result){
      return response.data
    // 状态为-300时，跳转到登录页面
    } else if (response.data.status === -300) {
      router.push({
        name: 'login'
      })
      // 状态为-301时，表示账号在其他设备已经登录
    } else if (response.data.status === -301) {

      MessageBox.alert('Your account has been logged in to other devices', 'Prompt', {
        confirmButtonText: 'Confirm',
        callback: function(action) {
          // 点击确认跳转至登录页面
          router.push({
            name: 'login'
          })
          // 隐藏弹框
          MessageBox.close()
          $('.v-modal').remove()
        }
      })
    } else {
      // 错误信息
      Message({message: response.data.errorInfo, type: "error"})
      return false
    }
  } else {
    return response.data
  }
}, function (error) {
  // 对响应错误做点什么
  console.log(error)
  return Promise.reject(error)
});
