import customProcessing from '@/components/common/customProcessing/custom-processing'
import common from '@/utils/common' // 引入公共脚本
import apiPath from 'rootPath/config/api.json' // 引入api.json文件
import { Loading } from 'element-ui'
require('./account-detail.scss')
const template = require('./account-detail.tpl')

export const alertReviewAccountDetail = {
  template,

  name: 'alertReviewAccountDetail',

  // 注册组件
  components: {
    customProcessing
  },

  data () {
    return {
      reviewId: '', // id
      originalId: '', // 源ID
      curAccountId: '', // 当前帐号ID
      originalIdSelected: { // originalIdSelected
        selectId: '',
        options: []
      },
      accountInfo: {},  // 帐号信息
      summary: {  // summary列表
        list: [],
        currentPage: 1, // 当前页
        pageSize: 10, // 每页的条数
        total: 0 // 表格总条数
      },
      tableListData: [],
      setOpenDelay: 400, // 提示文本的延迟显示时间
      isShowProcedding: false, // 是否显示点击展示审批框的按钮
      roleId: '',  // 角色ID
      taskId: '',  // 任务ID
      orderId: ''  // 实例ID
    }
  },

  // 实例创建后,进行默认数据处理
  created () {
    this.roleId = common.getCookie('amlRId')
    const getReviewId = this.$route.query.reviewId
    if (getReviewId) {
      this.reviewId = getReviewId
    }
    const getOriginalId = this.$route.query.originalId
    if (getOriginalId) {
      this.originalId = getOriginalId
    }
    const getOrderId = this.$route.query.oId
    if (getOrderId) {
      this.orderId = getOrderId
    }
    const getTaskId = this.$route.query.tId
    if (getTaskId) {
      this.taskId = getTaskId
    }
  },

  // html挂载在页面后,进行数据初始化
  mounted () {
    document.title = 'Account Detail'
    // 初始化检测
    if (common.isLogin()) {
      if (this.reviewId && this.originalId) {
        // 方法执行
        this.init()
      } else {
        common.warningInfoTip('Original/alert ID Is Not Find!')
      }

      // 根据传过来的参数,是否显示审批的按钮
      const getIsShow = this.$route.query.isShow
      if (getIsShow === 'true' || getIsShow === true) {
        this.isShowProcedding = true
        // 审批处相关处理
        this.$refs.customProcessing.sendData.alertId = this.reviewId
        this.$refs.customProcessing.taskId = this.taskId
        this.$refs.customProcessing.orderId = this.orderId
      }
    }
  },

  // 方法集合
  methods: {
    // 返回
    comeBack () {
      window.history.back()
    },

    init () {
      // 查询所有originalId
      this.loadOriginalId()
    },

    // 查询所有originalId
    loadOriginalId () {
      let data = {
        alertId: this.reviewId
      }
      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.review.originalids}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          this.originalIdSelected.options = res.data
          if (res.data.length > 0) {
            this.originalIdSelected.selectId = this.originalId
            // 加载TAB列表
            this.loadTableListData()
          }
        }
      })
    },

    // Account Detail 选择的源ID改变时
    accountDetailSelectedIdChange (val) {
      this.originalId = val
      // 设置默认值
      this.accountInfo = {}
      this.loadTableListData()
    },

    // 帐号列表列表
    loadTableListData () {
      let data = {
        alertId: this.reviewId,
        originalId: this.originalId
      }
      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.review.accDetail.acctList}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          this.tableListData = res.data
          if (res.data.length > 0 && res.data[0]) {
            this.curAccountId = res.data[0].accountId
            // 帐号信息
            this.loadSnapshopData()
            // 帐号信息
            this.loadSummaryData()
          }
        }
      })
    },

    tableRowAct (row, event, column) {
      this.curAccountId = row.accountId
      // 帐号信息
      this.loadSnapshopData()
      // 帐号信息
      this.loadSummaryData()
    },

    // 查询账号信息
    loadSnapshopData () {
      let data = {
        alertId: this.reviewId,
        accountId: this.curAccountId
      }
      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.review.accDetail.info}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          this.accountInfo = res.data
        }
      })
    },

    // Summary列表
    loadSummaryData () {
      let data = {
        accountId: this.curAccountId,
        pageNum: this.summary.currentPage,
        pageSize: this.summary.pageSize
      }
      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.review.accDetail.summary}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          this.summary.list = res.data
          this.summary.total = res.total
        }
      })
    },

    summarySizeChange (val) {
      this.summary.pageSize = val
      // 改变每页条数改变列表
      this.loadSummaryData()
    },

    summaryCurrentChange (val) {
      this.summary.currentPage = val
      // 改变页码改变列表
      this.loadSummaryData()
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
    }
  }
}
