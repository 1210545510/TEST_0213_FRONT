import common from '@/utils/common' // 引入公共脚本
import apiPath from 'rootPath/config/api.json' // 引入api.json文件
import { Loading } from 'element-ui'
require('./workflow-detail.scss')
const template = require('./workflow-detail.tpl')

export const alertReviewWorkflowDetail = {
  template,

  name: 'alertReviewWorkflowDetail',

  data () {
    return {
      setOpenDelay: 400, // 提示文本的延迟显示时间
      orderId: '', // orderId
      tableListData: [] // table列表
    }
  },

  // 实例创建后,进行默认数据处理
  created () {},

  // html挂载在页面后,进行数据初始化
  mounted () {
    document.title = 'Workflow Detail'

    if (common.isLogin) {
      const getOrderId = this.$route.query.orderId
      if (getOrderId) {
        this.orderId = getOrderId
        // 加载列表
        this.loadListData()
      } else {
        common.warningInfoTip('Order ID Is Not Find!')
      }
    }
  },

  // 方法集合
  methods: {
    // 返回
    comeBack () {
      window.history.back()
    },

    // 查询已审批的历史记录列表
    loadListData () {
      let data = {
        orderId: this.orderId
      }
      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.review.processLog}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          this.tableListData = res.data
        }
      })
    }
  },

  filters: {
    // 格式化金钱
    formatUSD (val, currency) {
      return common.formatUSD(val, currency)
    },

    // 过滤是否为空
    isEmptyVal (val) {
      return common.isEmptyVal(val)
    },

    // 格式化时间
    formatYMD (val) {
      return common.formatYMD(val)
    },

    // 格式化时间
    formatDate (val) {
      return common.formatDate(val)
    }
  }
}
