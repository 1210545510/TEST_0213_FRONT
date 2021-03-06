import headerComponent from '@/components/common/header/header-component'
import './case-layout.scss'
import template from './case-layout.tpl'

// 引入公共脚本
import common from '@/utils/common'

export const caseLayout = {
  template,

  // 注册组件
  components: {
    headerComponent
  },

  data () {
    return {
      isShowMenuItem: common.isShowMenu // 权限管理
    }
  },

  // 实例创建后,进行默认数据处理
  created () {
  },

  // html挂载在页面后,进行数据初始化
  mounted () {},

  // 方法集合
  methods: {}
}
