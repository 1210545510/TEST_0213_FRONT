import headerComponent from '@/components/common/header/header-component'
import './header-component.scss'
import template from './header-component.tpl'

// 引入公共脚本
import common from '@/utils/common'

// 引入api.json文件
// import hostPath from 'rootPath/config/host'

// 头像
const userAvatarImg = require('@/assets/images/common/user.png')

export default {
  template,

  name: 'header-component',

  // 注册组件
  components: {
    headerComponent
  },

  data () {
    return {
      isShowMenuItem: common.isShowMenu, // 权限管理
      redirectToNewPath: common.redirectToFirstChildPath, // 根据传入的parentMenuId，查找相关第一个子级路由
      matchRoutePath: (regPath) => {
        return common.matchRoutePath(regPath, this.$route.path)
      }, // 匹配当前路由是否含有指定路径
      userAvatarImg: userAvatarImg,
      userName: 'xxx',
      userRole: 'xxx'
    }
  },

  // 实例创建后,进行默认数据处理
  created () {},

  // html挂载在页面后,进行数据初始化
  mounted () {
    this.userName = common.getCookie('amlUName')
    this.userRole = common.getCookie('amlRName')
    this.$root.$on('userInfo', (info) => {
      this.userName = info.userName
      this.userRole = info.userRole
    })
  },

  // 方法集合
  methods: {
    signOut () {
      // this.$router.push({name: 'login'})
      // 清除登录信息
      common.clearLoginInfo()
      this.$router.push({name: 'login'})
      // 跳转至UMS登录页面
      // location.href = hostPath.logoutUrl
    }
  }
}
