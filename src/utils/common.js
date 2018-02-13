// 引用jquery
const $ = require('jquery')
const { Message, Loading } = require('element-ui')
const axios = require('axios')

// 接口环境
const apiUrl = require('rootPath/config/host')
// 引入api.json文件
const apiPath = require('rootPath/config/api.json')

module.exports = {

  // 正则验证部分
  // 是否是数字 0~9
  isNumber (val) {
    if (val) {
      return /^\d+$/.test(val)
    }
    return true
  },

  // 是否是正整数 1~9
  isPosiInteger (val) {
    if (val !== '') {
      return /^[1-9]\d*$/.test(val)
    }
    return true
  },

  // 限制只能输入数字(不能输入小数点)
  limitInputNumber (val) {
    return val.replace(/\D/g, '')
  },

  // 所有输入框限制仅为英文和数字
  limitInputChinese (val) {
    return val.replace(/[\u4E00-\u9FA5]/g, '')
  },

  // 邮箱验证
  mailReg: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,

  // 设置cookie
  setCookie: function (name, value) {
    let getValue = this.getCookie
    if (getValue !== null && getValue !== '') {
      this.delCookie(name)
    }
    let exdate = new Date()
    let expiredays = 60
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = name + '=' + escape(value) + ((expiredays === null) ? '' : ';expires=' + exdate.toGMTString() + ';path=/')
  },

  // 获得cookie
  getCookie: function (name) {
    if (document.cookie.length > 0) {
      let cStart = document.cookie.indexOf(name + '=')
      if (cStart !== -1) {
        cStart = cStart + name.length + 1
        let cEnd = document.cookie.indexOf(';', cStart)
        if (cEnd === -1) cEnd = document.cookie.length
        return unescape(document.cookie.substring(cStart, cEnd))
      }
    }
    return ''
  },

  // 删除cookie
  delCookie: function (name) {
    let exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = this.getCookie(name)
    if (cval !== null) {
      document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() + ';path=/'
    }
  },

  // 设置localStorage
  setLocalStorage (name, value) {
    localStorage.setItem(name, value)
  },

  // 读取localStorage
  getLocalStorage (name, value) {
    const item = localStorage.getItem(name)
    return item
  },

  // 删除localStorage
  delLocalStorage (name) {
    localStorage.removeItem(name)
  },

  // 获取URL中的参数
  getRequest: function () {
    var url = ''
    if (location.hash.indexOf('#') !== -1) {
      url = '?' + location.hash.split('?')[1]
    } else {
      url = location.search // 获取url中"?"符后的字串
    }
    var theRequest = {}
    if (url.indexOf('?') !== -1) {
      var str = url.substr(1)
      var strs = str.split('&')
      for (var i = 0; i < strs.length; i++) {
        var index = strs[i].indexOf('=')
        var strKey = strs[i].substr(0, index).replace(/amp;/, '')
        theRequest[strKey] = strs[i].substr(index + 1)
      }
    }
    return theRequest
  },

  // 检测是否登录
  isLogin: function () {
    const getToken = this.getCookie('amlTk')
    if (getToken) {
      return true
    } else {
      // location.href = '/#/permission' // 这里将会跳转到一个没有权限的页面
      this.router.push({
        name: 'login'
      })
      return false
    }
  },

  // 登录后保存登录信息
  setLoginInfo (token, userId, userName, userImg, roleId, roleName, listMenu, getTeamCode, sysType) {
    this.setCookie('amlTk', token) // 登录的token
    this.setCookie('amlUId', userId) // 用户Id
    this.setCookie('amlUName', userName) // 用户名字
    this.setCookie('amlUImg', userImg) // 用户头像
    this.setCookie('amlRId', roleId) // 角色Id
    this.setCookie('amlRName', roleName) // 角色名字
    this.setLocalStorage('amlListMenu', listMenu) // 权限菜单
    this.setCookie('amlTeamCode', getTeamCode) // 小组编号,主要用于判断分析员是否有那个审批的按钮
    this.setCookie('amlST', sysType) // 系统类型  prime/mantas

    // 授权成功后，设置axios默认参数，避免axios.js加载时没有正确获取cookie信息，请求错误的问题
    axios.defaults.params = {
      token: token,
      userId: userId
    }
    axios.defaults.data = {
      token: token,
      userId: userId
    }
  },

  // 清除登录的信息
  clearLoginInfo () {
    this.delCookie('amlTk')
    this.delCookie('amlUId')
    this.delCookie('amlUName')
    this.delCookie('amlUImg')
    this.delCookie('amlRId')
    this.delCookie('amlRName')
    this.delLocalStorage('amlListMenu') // 权限菜单
    this.delCookie('amlTeamCode')
    this.delCookie('amlST')
  },

  // 判断数据是否为空
  isEmptyVal (val) {
    if (val === undefined || val === '') {
      return '--'
    } else {
      return val
    }
  },

  // 拼装url对象
  getDataToUrl (data) {
    let url = ''
    $.each(data, function (key, val) {
      url += `${key}=${val}&`
    })
    return url.slice(0, url.length - 1)
  },

  // 使用form表单提交数据导出表格
  downloadExcel (params, url) {
    const $form = $('<form>')
    $form.attr('style', 'display:block')
    // $form.attr('target', '_blank')
    $form.attr('method', 'post')
    $form.attr('action', `${apiUrl.apiUrl}${url}`)

    // 传入token和userId
    params.token = this.getCookie('amlTk')
    params.userId = this.getCookie('amlUId')

    // 如果不是空对象
    for (let p in params) {
      let $input = $('<input>')
      $input.attr('type', 'hidden')
      $input.attr('name', p)
      $input.attr('value', params[p])
      $form.append($input)
    }

    $('body').append($form)  // 将表单放置在web中
    $form.submit()
  },

  // 判断当前浏览器是否低于IE9
  appVersionIsLessThanIE9 () {
    if (this.isIE()) {
      if (parseInt(navigator.userAgent.split(';')[1].replace('MSIE', '')) <= 9) {
        Message({message: 'Your IE browser version is too low. In order not to affect the normal use, please download IE10 and above', type: 'warning', duration: 3000})
      }
    }
  },

  // 判断是否是IE浏览器
  isIE () {
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      return true
    } else {
      return false
    }
  },

  // 权限处理,判断是否显示相应的菜单
  isShowMenu (menuId) {
    // 获得列表
    const listMenu = window.JSON.parse(localStorage.getItem('amlListMenu'))
    let flag = false
    if (listMenu && listMenu.length) {
      listMenu.some((v) => {
        if (v.menuId === menuId) {
          flag = true
          return true
        }
      })
    }
    return flag
  },

  // 根据传入的parentMenuId，查找相关联第一个子级路由
  redirectToFirstChildPath (parentMenuId) {
    // 获得列表
    const listMenu = window.JSON.parse(localStorage.getItem('amlListMenu'))
    let path = ''
    if (listMenu && listMenu.length) {
      listMenu.some((v) => {
        if (v.parentMenuId === parentMenuId) {
          path = v.menuUrl.split(',')[0]
          return true
        }
      })
    } else {
      path = 'permission'
    }
    return path
  },

  // 匹配路由路径是否含有指定路径
  matchRoutePath (regPath, routePath) {
    return routePath.indexOf(regPath) === 0
  },

  // 比较两个数组(对象)中不同的选项
  compareArraysFindDiff (longArr, shortArr) {
    let diffData = []
    longArr.forEach((oldV) => {
      let isExist = false
      shortArr.some((newV) => {
        if (oldV === newV) {
          isExist = true
          return true
        }
      })
      if (!isExist) {
        diffData.push(oldV)
      }
    })
    return diffData
  },

  // 改变重新设置表头弹框滚动条位置
  changeScrollbarPosition (index) {
    const height = 40 * index // 高亮位置的高度
    if (height > (330 - 80)) {
      $('.dialog_RerangeHeading_content').scrollTop(height - (330 - 80))
    } else {
      $('.dialog_RerangeHeading_content').scrollTop(0)
    }
  },

  // 排序改变后，重置sortIndex
  resetSortIndex (arr) {
    arr.forEach((v, i) => {
      v.sortIndex = i + 1
    })
  },

  // 将字符串转为驼峰写法的形式
  tranformToHumpStr (str) {
    if (str !== 'Alert assigned to') {
      let strArr = str.toLowerCase().split(' ')
      for (var i = 1; i < strArr.length; i++) {
        strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1)
      }
      const newStr = strArr.join('')
      return newStr.charAt(0).toLowerCase() + newStr.substring(1)
    } else {
      return 'userName'
    }
  },

  // 错误警告提示
  warningInfoTip (info, time) {
    let duration = 2500
    if (time) {
      duration = time
    }
    Message({
      type: 'warning',
      message: info,
      duration: duration
    })
    return false
  },

  // 成功提示
  successInfoTip (info, time) {
    let duration = 2500
    if (time) {
      duration = time
    }
    Message({
      type: 'success',
      message: info,
      duration: duration
    })
    return false
  },

  // 格式化时间 年，月，日，时，分，秒
  formatDate (now) {
    if (!now || now === 'null' || now === '--') {
      return ''
    }
    if (now) {
      now = new Date(now)
      let year = now.getFullYear()
      let month = now.getMonth() + 1
      let date = now.getDate()
      let hour = now.getHours()
      let minute = now.getMinutes()
      let second = now.getSeconds()
      if (month < 10) {
        month = `0${month}`
      }
      if (date < 10) {
        date = `0${date}`
      }
      if (hour < 10) {
        hour = `0${hour}`
      }
      if (minute < 10) {
        minute = `0${minute}`
      }
      if (second < 10) {
        second = `0${second}`
      }
      return `${month}/${date}/${year} ${hour}:${minute}:${second}`
    } else {
      return ''
    }
  },

  // 格式化年月日   type: 中国显示方式(ch)及拼接的方式
  // 注: 只有在接口传参时才需要中国的显示方式,其它为美式
  formatYMD (now, type) {
    if (!now || now === 'null' || now === '--') {
      return '--'
    }
    if (now) {
      now = new Date(now)
      let year = now.getFullYear()
      let month = now.getMonth() + 1
      let date = now.getDate()
      if (month < 10) {
        month = `0${month}`
      }
      if (date < 10) {
        date = `0${date}`
      }
      if (type === 'ch') {
        return `${year}-${month}-${date}`
      } else if (type) {
        return `${year}${type}${month}${type}${date}`
      } else {
        return `${month}/${date}/${year}`
      }
    } else {
      return ''
    }
  },

  // 获取当前登录用户的userId
  getUserId () {
    const userId = this.getCookie('amlUId')
    return userId
  },
  // 获取当前登录用户的roleId
  getRoleId () {
    const roleId = this.getCookie('amlRId')
    return roleId
  },
  // 获取当前登录用户的UserName
  getUserName () {
    const userName = this.getCookie('amlUName')
    return userName
  },
  // 获取必传的用户id与token
  getReqParam () {
    const data = {
      token: this.getCookie('amlTk'),
      userId: this.getCookie('amlUId')
    }
    return data
  },

  // 简单的数组去重
  removalArray (array) {
    let newArr = []
    for (var i = 0, j = array.length; i < j; i++) {
      if (newArr.indexOf(array[i]) === -1) {
        newArr.push(array[i])
      }
    }
    array = newArr
    return array
  },

  // 删除数组中的指定元素
  removeByValue (arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === val) {
        arr.splice(i, 1)
        break
      }
    }
  },

  // 格式化金钱
  formatUSD (val, currency) {
    if (val === '' || val === '--') {
      return ''
    }
    // 先判断数据是否有小数点
    let newVal = String(Number(val).toFixed(2))
    let dotIdx = newVal.lastIndexOf('.')
    let dotVal = '.00' // 保留小数点后面的数据
    if (dotIdx >= 0) {
      dotVal = newVal.substr(dotIdx, newVal.length)
      newVal = newVal.slice(0, dotIdx)
    }

    let len = newVal.length
    let arr = []
    let lastIndex = null
    while (len > 0) {
      lastIndex = len
      len -= 3
      arr.unshift(newVal.substring(len, lastIndex))
    }
    val = arr.join(',')

    if (currency) {
      newVal = `${currency} ${val}${dotVal}`
    } else {
      newVal = `${val}${dotVal}$`
    }
    return newVal
  },

  // 格式化金额数字，不包含小数点，金额符等 输入整数
  formatAmount (val) {
    if (val === '' || val === '--') {
      return ''
    }
    // 先判断数据是否有小数点
    let newVal = String(Number(val))

    let len = newVal.length
    let arr = []
    let lastIndex = null
    while (len > 0) {
      lastIndex = len
      len -= 3
      arr.unshift(newVal.substring(len, lastIndex))
    }
    val = arr.join(',')

    return val
  },

  // 格式化后的解取格式化
  unFormatAmount (val) {
    if (val === '--') {
      return ''
    }
    if (val && String(val).indexOf(',') > 0) {
      return val.split(',').join('')
    }
    return val
  },

  // 获取Data Dictionary中指定dicId的词典详情
  getDictDetail (dicId, cb) {
    const dataUrl = this.getDataToUrl({ dicId: dicId })
    const loadTips = Loading.service()
    axios({
      method: 'get',
      url: `${apiPath.configuration.dataDictionary.dictDetail}${dicId}?${dataUrl}`
    }).then(res => {
      // 去除加载
      loadTips.close()
      if (res && res.data) {
        // 执行回调函数
        cb && cb(res.data)
      }
    })
  },

  // 根据status词典id查询status所有状态  默认为alert (id 为 12)如果是case的话 id 需要传43
  getAllStatus (cb, id) {
    let Id = 12
    if (id) {
      Id = id
    }
    let statusOptions = [{ value: '', label: 'All' }]
    this.getDictDetail(Id, (resData) => {
      resData.dicSubs.forEach((v) => {
        statusOptions.push({ value: v.dicKey, label: v.dicValue })
      })

      // 将获取到的数据通过回调函数传递给执行方法
      cb && cb(statusOptions)
    })
  },

  // 获取指定角色ID下面的用户
  getRoleUsersById (roleId, cb) {
    const loadTips = Loading.service()
    axios({
      method: 'get',
      url: `${apiPath.common.roleUsers}`,
      params: { roleId: roleId }
    }).then(res => {
      // 去除加载
      loadTips.close()
      if (res && res.data) {
        // 执行回调函数
        cb && cb(res.data)
      }
    })
  },

  // 获取指定角色ID下面的用户
  getRoleUsersByRoleName (roleName, cb) {
    const loadTips = Loading.service()
    axios({
      method: 'get',
      url: `${apiPath.common.surrogateUsers}`,
      params: { roleName: roleName }
    }).then(res => {
      // 去除加载
      loadTips.close()
      if (res && res.data) {
        // 执行回调函数
        cb && cb(res.data)
      }
    })
  },

  // 根据指定角色分组下面的用户
  getTeamUsers (roleId, teamCode, cb) {
    const loadTips = Loading.service()
    axios({
      method: 'get',
      url: `${apiPath.common.teamUsers}`,
      params: { teamCode: teamCode, roleId: roleId }
    }).then(res => {
      // 去除加载
      loadTips.close()
      if (res && res.data) {
        // 执行回调函数
        cb && cb(res.data)
      }
    })
  },

  // 获取assigned列表
  getAllAssigned (type, cb) {
    const loadTips = Loading.service()
    axios({
      method: 'get',
      url: `${apiPath.common.assignedList}`,
      params: { type: type }
    }).then(res => {
      // 去除加载
      loadTips.close()
      if (res && res.data) {
        // 执行回调函数
        cb && cb(res.data)
      }
    })
  },

  // 根据dicId获取当前词典所有表头字段与选中表头字段
  getHeadingFields (dicId, successCB1, successCB2) {
    const loadTips = Loading.service()
    axios({
      method: 'get',
      url: `/${dicId}/fields`
    }).then(res => {
      // 去除加载
      loadTips.close()
      if (res && res.data) {
        let existFields = res.data.existFields
        let pendingFields = res.data.pendingFields
        let checkedHeading = []
        let allheading = []

        // 执行成功后的回调函数1
        successCB1 && successCB1()

        // 获取已选中的表头
        pendingFields.forEach((subv, subi) => {
          checkedHeading.push(subv.dicValue)
          let isActive = false
          if (subi === 0) {
            isActive = true
          }
          allheading.push({value: subv.dicValue, isActive: isActive, dicSid: subv.dicSid, sortIndex: subv.sortIndex})
        })

        existFields.forEach((v, i) => {
          let isPendingFiled = true
          pendingFields.some((subv, subi) => {
            if (v.dicValue === subv.dicValue) {
              isPendingFiled = false
              return true
            }
          })
          if (isPendingFiled) {
            allheading.push({value: v.dicValue, isActive: false, dicSid: v.dicSid, sortIndex: v.sortIndex})
          }
        })

        // 执行成功后的回调函数2
        successCB2 && successCB2(checkedHeading, allheading)
      }
    })
  },

  // 表头是否排序
  isSortable (item, sortTime) {
    if (item === 'Score' || item === 'Amount' || item === 'Volume') {
      // 返回custom。表示远程排序， 返回true则表格自动排序
      return 'custom'
    } else {
      if (sortTime && (item === 'Due Date' || item === 'Create Date')) {
        return 'custom'
      }
      return false
    }
  },

  // 点击排序时，获取排序搜索的条件
  getSortType (val, cb) {
    let orderby = ''
    // score排序
    if (val.prop === 'score') {
      if (val.order === 'descending') {
        orderby = 2 // 'score desc'
      } else {
        orderby = 1 // 'score'
      }
    }
    // amount排序
    if (val.prop === 'amount') {
      if (val.order === 'descending') {
        orderby = 4 // 'amount desc'
      } else {
        orderby = 3 // 'amount'
      }
    }
    // volume排序
    if (val.prop === 'volume') {
      if (val.order === 'descending') {
        orderby = 6 // 'volume desc'
      } else {
        orderby = 5 // 'volume'
      }
    }
    // due date排序
    if (val.prop === 'dueDate') {
      if (val.order === 'descending') {
        orderby = 8 // 'dueDate desc'
      } else {
        orderby = 7 // 'dueDate'
      }
    }
    // create date排序
    if (val.prop === 'createDate') {
      if (val.order === 'descending') {
        orderby = 10 // 'createDate desc'
      } else {
        orderby = 9 // 'createDate'
      }
    }

    // 执行回调函数
    cb && cb(orderby)
  },

  // 字段串，三位三位处理 , type 为1时，则需要格式为金额格式 否则为数字字符串就行
  formatNumber: function (val, type) {
    if (val === '--') {
      return ''
    }
    let len = String(val).split('.')[0].length
    let num2 = String(val).split('.')[1]
    let arr = []
    let lastIndex = null
    while (len > 0) {
      lastIndex = len
      len -= 3
      arr.unshift(String(val).substring(len, lastIndex))
    }
    val = arr.join(',')
    if (type && type === 1) {
      return `${val}.00`
    } else {
      if (num2) {
        return Number(`${val}.${num2}`).toFixed(2)
      } else {
        return val
      }
    }
  },

  // 文件名称处理,返回对应的ICON样式
  checkFileType (name) {
    let className = ''
    if (name.indexOf('.jpg') !== -1 || name.indexOf('.jpeg') !== -1 || name.indexOf('.png') !== -1) {
      className = 'com_icon_jpg'
    } else if (name.indexOf('.pdf') !== -1) {
      className = 'com_icon_pdf'
    } else if (name.indexOf('.doc') !== -1) {
      className = 'com_icon_word'
    } else if (name.indexOf('.csv') !== -1 || name.indexOf('.CSV') !== -1 || name.indexOf('.xlsx') !== -1) {
      className = 'com_icon_excel'
    }
    return className
  },

  // 重置对象的值，每个对象值默认为空
  resetObjectVal (obj, speValObj) {
    $.each(obj, (i, v) => {
      obj[i] = ''
    })
  },

  // 简单对象克隆, 对象属性不为Array或者Object对象
  cloneObject (obj) {
    let result = {}
    for (var key in obj) {
      if (key !== 'pageSize' && key !== 'pageNum') {
        result[key] = obj[key]
      }
    }
    return result
  },

  // 字符串翻转方法
  reverseStr (str) {
    // if (!str) return ''
    return str.split('').reverse().join('')
  },

  // 判断数组元素是否全部相等
  isAllEqual (arr) {
    if (arr.length > 0) {
      return !arr.some((value) => {
        return value !== arr[0]
      })
    } else {
      return true
    }
  },

  // 拖动特效
  dragTemplate (downObj, moveObj) {
    const $that = $(downObj)

    $that.on('mousedown', function (e) {
      let ev = e || event
      let disX = ev.clientX - $that.offset().left
      let disY = ev.clientY - $that.offset().top

      $(document).on('mousemove', function (e) {
        let ev = e || event
        let dragL = ev.clientX - disX
        let dragT = ev.clientY - disY

        $(moveObj).offset({'left': dragL})
        $(moveObj).offset({'top': dragT})
        $(moveObj).css({'bottom': 'auto'})
      })

      $(document).on('mouseup', function () {
        $(document).off('mousemove')
        $(document).off('mouseup')
      })
    })
  },

  // 将字符串数组转为数字数组, strArr: 字符串的数组[]， strObj：字符串与数字键值对应的对象[{}]
  strArrToNumArr (strArr, strObj) {
    let numArr = []
    if (strArr.length > 0) {
      strObj.forEach((v) => {
        strArr.some((subv) => {
          if (v.label === subv) {
            numArr.push(v.value)
            return true
          }
        })
      })
    } else {
      numArr = []
    }
    return numArr
  },

  // 将数组对象转为字符串
  objArrToStr (arr, name) {
    let newarr = []
    arr.forEach((v) => {
      newarr.push(v[name])
    })
    return newarr.join(',')
  },

  // 验证上传的文件类型，是否为Excel、word、pdf、cvs、txt等
  isTextType (file) {
    const fileType = file.type
    if (fileType.lastIndexOf('/pdf') > 0 || fileType.lastIndexOf('.sheet') > 0 || fileType.lastIndexOf('.ms-excel') > 0 || fileType.lastIndexOf('text/plain') >= 0 || fileType.lastIndexOf('.document') > 0 || fileType.lastIndexOf('/msword') > 0) {
      return true
    }
    return false
  },

  // 验证上传的文件类型，是否为png/jpeg/gif等
  isPictureType (file) {
    const fileType = file.type
    if (fileType.lastIndexOf('/jpeg') > 0 || fileType.lastIndexOf('/png') > 0 || fileType.lastIndexOf('/x-icon') > 0 || fileType.lastIndexOf('/gif') >= 0) {
      return true
    }
    return false
  },

  // 图表X轴的月份转换
  // month 数字为 1到12分别对应  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  formatChartX (month) {
    let m = ''
    if (month === 1) {
      m = 'Jan'
    } else if (month === 2) {
      m = 'Feb'
    } else if (month === 3) {
      m = 'Mar'
    } else if (month === 4) {
      m = 'Apr'
    } else if (month === 5) {
      m = 'May'
    } else if (month === 6) {
      m = 'Jun'
    } else if (month === 7) {
      m = 'Jul'
    } else if (month === 8) {
      m = 'Aug'
    } else if (month === 9) {
      m = 'Sept'
    } else if (month === 10) {
      m = 'Oct'
    } else if (month === 11) {
      m = 'Nov'
    } else if (month === 12) {
      m = 'Dec'
    }
    return m
  },

  // 获得图表X轴的转化值,
  // type => 0 : Daily 1 : Weekly 2 : Monthly
  // v 为传进来的对象
  getXAxisDataItem (type, v) {
    let xName = ''
    if (type === 0 || type === 1) {
      xName = v.timeName
    } else if (type === 2) {
      xName = this.formatChartX(Number(v.key))
    }
    return xName
  }
}
