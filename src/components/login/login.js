import customSwitch from '@/components/common/customSwitch/custom-switch'
import hostPath from 'rootPath/config/host' // 引入api.json文件
require('./login.scss')
const template = require('./login.tpl')
const common = require('@/utils/common')

export const login = {
  template,

  name: 'login',

  // 注册组件
  components: {
    customSwitch
  },

  data () {
    return {
      carouselArray: [], // 背景图链接数组
      form: { // 登录表单
        name: common.getCookie('amlLUName') ? common.getCookie('amlLUName') : '',
        pwd: common.getCookie('amlLPwd') ? common.getCookie('amlLPwd') : '',
        checked: common.getCookie('amlLPwd') !== '', // 在保存密码时会用到
        listSwitch: ['prime', 'mantas'],
        activeIndex: 1,
        sysType: 'mantas'
      }
    }
  },

  // 实例创建后,进行默认数据处理
  created () {
    // 清除登录信息
    common.clearLoginInfo()
  },

  // html挂载在页面后,进行数据初始化
  mounted () {
    document.title = 'Login'
    // 用于背景图数组
    // this.carouselArray = ['url(/static/img/login/login2.jpg)', 'url(/static/img/login/login1.jpg)']
    this.carouselArray = ['url(/static/img/login/login-bg-27.jpg)', 'url(/static/img/login/login-bg-27.jpg)']
  },

  // 方法集合
  methods: {
    // prime / mantas
    loginSwitch (obj) {
      // 如果改变时处理
      this.form.activeIndex = obj.key
      this.form.sysType = obj.val
    },

    onSubmit () {
      // 验证用户ID
      let getLName = this.form.name
      if (getLName === '') {
        return common.warningInfoTip('User Name can not be empty!')
      }

      // 验证用户密码
      let getLPwd = this.form.pwd
      if (getLPwd === '') {
        return common.warningInfoTip('The user password can not be empty!')
      }

      // 用户昵称处理
      let setLName = getLName
      const getCLName = common.getCookie('amlLUName')  // 获得cookie中的用户昵称
      if (getCLName && setLName === getCLName) {
        setLName = getLName
      }

      // 用户密码处理
      let setLPwd = getLPwd
      const getCLPwd = common.getCookie('amlLPwd')  // 获得cookie中的用户密码
      if (getCLPwd && getLPwd === getCLPwd) {
        setLPwd = getLPwd
      }

      // 如果勾选了记住密码
      if (this.form.checked) {
        common.setCookie('amlLUName', setLName)  // 用户昵称
        common.setCookie('amlLPwd', setLPwd)  // 用户加密后的密码
      } else {
        common.delCookie('amlLUName')
        common.delCookie('amlLPwd')
      }

      this.$ajax({
        method: 'post',
        url: `${hostPath.umsApiUrl}/aml/login`,
        data: {
          'sysType': this.form.sysType,
          'userName': this.form.name,
          'password': this.form.pwd
        }
      }).then(res => {
        if (res && res.status === 0 && res.data) {
          const user = res.data.user // 用户信息
          if (user) {
            const getToken = user.token // 登录的token
            const getUserId = user.userId // 用户ID
            const getUserName = user.userName // 用户名
            const getUserImg = user.profileImageUrl // 用户头像
            const getRoleId = user.roles[0].roleId // 角色ID
            const getRoleName = user.roles[0].roleName // 角色名字
            const getListMenu = window.JSON.stringify(res.data.listMenu) // 权限列表
            const getTeamCode = user.teamCode // 角色名字
            const getSysType = this.form.sysType // 系统类型  prime/mantas
            common.setLoginInfo(getToken, getUserId, getUserName, getUserImg, getRoleId, getRoleName, getListMenu, getTeamCode, getSysType)

            // 头部显示用户名与角色
            this.$root.$emit('userInfo', { userName: getUserName, userRole: getRoleName })

            // 默认显示第一个 三级菜单
            let jumpFlag = false
            res.data.listMenu.some((v) => {
              if (v.menuLevel === 3 && v.menuUrl) {
                this.$router.push({name: v.menuUrl.split(',')[0]})
                jumpFlag = true
                return true
              }
            })
            // 如果没有找到二级菜单，则跳转到没有权限页面
            if (!jumpFlag) {
              this.$router.push({name: 'permission'})
            }
          } else {
            common.warningInfoTip('User Info Is Not Find!')
          }
        }
      })
    }
  }
}
