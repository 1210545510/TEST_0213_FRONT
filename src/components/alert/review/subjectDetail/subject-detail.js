import customProcessing from '@/components/common/customProcessing/custom-processing'
import common from '@/utils/common' // 引入公共脚本
import apiPath from 'rootPath/config/api.json' // 引入api.json文件
import { Loading } from 'element-ui'
require('./subject-detail.scss')
const template = require('./subject-detail.tpl')

export const alertReviewSubjectDetail = {
  template,

  // 注册组件
  components: {
    customProcessing
  },

  data () {
    return {
      customerId: '',
      reviewId: '',
      isShowProcedding: false, // 是否显示点击展示审批框的按钮
      roleId: '',  // 角色ID
      taskId: '',  // 任务ID
      orderId: '',  // 实例ID
      SubjectInfo: {},
      subjectTab: {
        name: 0
      },
      subjectAcountsTab: {
        list: []
      },
      subjectCITab: {
        list: []
      },
      subjectCRITab: {
        list: []
      }
    }
  },

  // 实例创建后,进行默认数据处理
  created () {
    const getSustomerId = this.$route.query.cId
    if (getSustomerId) {
      this.customerId = getSustomerId
    }
    const getReviewId = this.$route.query.reviewId
    if (getReviewId) {
      this.reviewId = getReviewId
    }
    this.roleId = common.getCookie('amlRId')
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
    document.title = 'Subject Detail'
    // 初始化检测
    if (common.isLogin()) {
      if (this.customerId) {
        this.loadSubjectInfo()
        this.subjectTabClick()
      } else {
        common.warningInfoTip('Customer ID Is Not Find!')
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

    // 查询已审批的历史记录列表
    loadSubjectInfo () {
      let data = {
        customerId: this.customerId
      }
      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.review.subjectDetail.info}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          this.SubjectInfo = res.data
        }
      })
    },

    // 点击时处理
    subjectTabClick () {
      if (this.customerId) {
        if (this.subjectTab.name === '0') {
          this.loadAcount()
        } else if (this.subjectTab.name === '1') {
          this.loadCI()
        } else if (this.subjectTab.name === '2') {
          this.loadCRI()
        }
      }
    },

    // 查询已审批的历史记录列表
    loadAcountInfo () {
      let data = {
        customerId: this.customerId
      }
      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.review.subjectDetail.info}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          this.subjectAcountsTab.list = res.data
        }
      })
    },

    // 选项卡中Acount列表
    loadAcount () {
      let data = {
        customerId: this.customerId
      }
      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.review.subjectDetail.acount}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          this.subjectAcountsTab.list = res.data
        }
      })
    },

    // 选项卡中 Contact Infomation 列表
    loadCI () {
      let data = {
        customerId: this.customerId
      }
      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.review.subjectDetail.CI}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          this.subjectCITab.list = res.data
        }
      })
    },

    // 选项卡中 Customer Risk information 列表
    loadCRI () {
      let data = {
        customerId: this.customerId
      }
      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.review.subjectDetail.CRI}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          this.subjectCRITab.list = res.data
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
