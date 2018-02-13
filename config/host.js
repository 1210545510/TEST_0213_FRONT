// UMS系统API,用于登录相关处理
const proUmsUrl = 'https://bocumapi.g2l-service.com'
const testUmsUrl = 'http://devbocumapi.g2l-service.com'

// AML系统API
const prodUrl = 'http://amlapi.g2l-service.com'
const testUrl = 'http://devamlapi.g2l-service.com'
const shunUrl = 'http://192.168.1.3:8079'
const huangUrl = 'http://192.168.1.19:8080'
const liuUrl = 'http://192.168.1.102:8080'

module.exports = {
  // UMS API ============
  umsApiUrl: proUmsUrl, // 用户中心正式API
  // umsApiUrl: testUmsUrl, // 测试API

  //AML api ==============
  apiUrl: prodUrl // 正式服务
  // apiUrl: testUrl // 测试服务
  // apiUrl: shunUrl // shun
  // apiUrl: huangUrl // huang
  // apiUrl: liuUrl // liu
}
