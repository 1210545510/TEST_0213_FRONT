require('./permission.scss')
const template = require('./permission.tpl')

export const permission = {
  template,
  name: 'permission',

  data () {
    return {}
  },

  // 实例创建后,进行默认数据处理
  created () {},

  // html挂载在页面后,进行数据初始化
  mounted () {
    document.title = 'Permission'
  },

  // 方法集合
  methods: {
    // 返回上一页
    backToPrv () {
      this.$router.back()
    }
  }
}
