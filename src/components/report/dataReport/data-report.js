import customSwitch from '@/components/common/customSwitch/custom-switch'
import common from '@/utils/common' // 引入公共脚本
import apiPath from 'rootPath/config/api.json' // 引入api.json文件
import { Loading } from 'element-ui'
require('./data-report.scss')
const template = require('./data-report.tpl')

export const reportDataReport = {
  template,

  // 注册组件
  components: {
    customSwitch
  },

  data () {
    return {
      tableListData1: [], // 列表数据1
      searchData1: null, // 用于导出CSV时的公共参数
      tabOption1: {
        selectOpations: [
          {value: 0, name: 'Number of Alerts generated'},
          {value: 1, name: 'Number of Cases Created'},
          {value: 2, name: 'Number of SARs filed'},
          {value: 3, name: 'SAR yield rate'},
          {value: 4, name: 'Total number of referrals to the SAR Team'},
          {value: 5, name: 'Total number of assigned cases pending SAR analysts’ investigation'},
          {value: 6, name: 'Total number of drafted cases pending SAR QA review'},
          {value: 7, name: 'Number of cases with SAR filed versus'},
          {value: 8, name: 'number of cases waived'},
          {value: 9, name: 'Number and percentage of alerts automatically waived but rejected by alert QA'}
        ],
        selectItem: 0,
        activeIndex: 1,
        date: '',
        currentPage: 1, // 当前页
        pageSize: 5, // 每页的条数
        total: 0 // 表格总条数
      },
      tableListData2: [], // 列表数据2
      searchData2: null, // 用于导出CSV时的公共参数
      tabOption2: {
        listSwitch: ['Daily', 'Weekly', 'Monthly'],
        activeIndex: 0,
        time: '',
        currentPage: 1, // 当前页
        pageSize: 5, // 每页的条数
        total: 0 // 表格总条数
      },
      tableListData3: [], // 列表数据3
      searchData3: null, // 用于导出CSV时的公共参数
      tabOption3: {
        listSwitch: ['Daily', 'Weekly', 'Monthly'],
        activeIndex: 0,
        time: '',
        currentPage: 1, // 当前页
        pageSize: 5, // 每页的条数
        total: 0 // 表格总条数
      },
      setOpenDelay: 400 // 提示文本的延迟显示时间
    }
  },

  // 实例创建后,进行默认数据处理
  created () {},

  // html挂载在页面后,进行数据初始化
  mounted () {
    document.title = 'Data Report'

    // 列表1
    this.loadTabData1()

    // 列表2
    this.loadTabData2()

    // 列表3
    this.loadTabData3()
  },

  // 方法集合
  methods: {
    // 加载tab1=========================================
    loadTabData1 () {
      // 清空搜索条件
      this.searchData1 = null

      let data = {
        pageSize: this.tabOption1.pageSize,
        pageNum: this.tabOption1.currentPage
      }

      // 如果存在选择时间时
      if (this.tabOption1.date) {
        data.createStartDate = common.formatYMD(this.tabOption1.date[0], 'ch')
        data.createEndDate = common.formatYMD(this.tabOption1.date[1], 'ch')
      }

      // 保存搜索条件
      this.searchData1 = common.cloneObject(data)
      const dataUrl = common.getDataToUrl(data)

      let sendUrl = ''
      if (this.tabOption1.selectItem === 0) {
        sendUrl = `${apiPath.report.DR.queryAlertsGenerated}?${dataUrl}`
      } else if (this.tabOption1.selectItem === 1) {
        sendUrl = `${apiPath.report.DR.queryCaseCreated}?${dataUrl}`
      } else if (this.tabOption1.selectItem === 2) {
        sendUrl = `${apiPath.report.DR.querySarFiled}?${dataUrl}`
      } else if (this.tabOption1.selectItem === 3) {
        sendUrl = `${apiPath.report.DR.querySarYield}?${dataUrl}`
      } else if (this.tabOption1.selectItem === 4) {
        sendUrl = `${apiPath.report.DR.queryReferralsSar}?${dataUrl}`
      } else if (this.tabOption1.selectItem === 5) {
        sendUrl = `${apiPath.report.DR.queryAnalystsSar}?${dataUrl}`
      } else if (this.tabOption1.selectItem === 6) {
        sendUrl = `${apiPath.report.DR.queryQaSar}?${dataUrl}`
      } else if (this.tabOption1.selectItem === 7) {
        sendUrl = `${apiPath.report.DR.querySarFiledVersus}?${dataUrl}`
      } else if (this.tabOption1.selectItem === 8) {
        sendUrl = `${apiPath.report.DR.queryCasesReasonable}?${dataUrl}`
      } else if (this.tabOption1.selectItem === 9) {
        sendUrl = `${apiPath.report.DR.queryWaivedByQa}?${dataUrl}`
      }

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: sendUrl
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res && res.data) {
          this.tableListData1 = res.data
          this.tabOption1.total = res.total
        }
      })
    },

    // 下拉选项改变时
    selectTitleChange1 () {
      this.loadTabData1()
    },

    // 时间
    tabTimeChange1 (e) {
      this.loadTabData1()
    },

    // 改变每页条数改变列表
    handleSizeChange1 (val) {
      this.tabOption1.pageSize = val
      this.loadTabData1()
    },

    // 改变页码改变列表
    handleCurrentChange1 (val) {
      this.tabOption1.currentPage = val
      this.loadTabData1()
    },

    // 打印
    doPrint1 () {
      console.log('doPrint1')
    },

    // 导出CSV
    exportCSV1 () {
      let sendUrl = ''
      if (this.tabOption1.selectItem === 0) {
        sendUrl = `${apiPath.report.DR.downAlertsGenerated}`
      } else if (this.tabOption1.selectItem === 1) {
        sendUrl = `${apiPath.report.DR.downCaseCreated}`
      } else if (this.tabOption1.selectItem === 2) {
        sendUrl = `${apiPath.report.DR.downSarFiled}`
      } else if (this.tabOption1.selectItem === 3) {
        sendUrl = `${apiPath.report.DR.downSarYield}`
      } else if (this.tabOption1.selectItem === 4) {
        sendUrl = `${apiPath.report.DR.downReferralsSar}`
      } else if (this.tabOption1.selectItem === 5) {
        sendUrl = `${apiPath.report.DR.downAnalystsSar}`
      } else if (this.tabOption1.selectItem === 6) {
        sendUrl = `${apiPath.report.DR.downQaSar}`
      } else if (this.tabOption1.selectItem === 7) {
        sendUrl = `${apiPath.report.DR.downSarFiledVersus}`
      } else if (this.tabOption1.selectItem === 8) {
        sendUrl = `${apiPath.report.DR.downCasesReasonable}`
      } else if (this.tabOption1.selectItem === 9) {
        sendUrl = `${apiPath.report.DR.downWaivedByQa}`
      }
      common.downloadExcel(this.searchData1, sendUrl)
    },

    // 加载tab2=========================================
    loadTabData2 () {
      // 清空搜索条件
      this.searchData2 = null

      let data = {
        pageSize: this.tabOption2.pageSize,
        pageNum: this.tabOption2.currentPage,
        type: this.tabOption2.activeIndex
      }

      // 如果存在选择时间时
      if (this.tabOption2.date) {
        data.createStartDate = common.formatYMD(this.tabOption2.date[0], 'ch')
        data.createEndDate = common.formatYMD(this.tabOption2.date[1], 'ch')
      }

      // 保存搜索条件
      this.searchData2 = common.cloneObject(data)
      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.report.DR.queryEachTotalOfSar}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res && res.data) {
          this.tableListData2 = res.data
          this.tabOption2.total = res.total
        }
      })
    },

    // Day,Mont,Week
    tabSwitch2 (obj) {
      this.tabOption2.activeIndex = obj.key
      const end = new Date()
      const start = new Date()
      if (this.tabOption2.activeIndex === 2) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
      } else if (this.tabOption2.activeIndex === 1) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      } else if (this.tabOption2.activeIndex === 0) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      }
      this.$set(this.tabOption2, 'date', [start, end])
      this.loadTabData2()
    },

    // 时间
    tabTimeChange2 (e) {
      this.loadTabData2()
    },

    // 改变每页条数改变列表
    handleSizeChange2 (val) {
      this.tabOption2.pageSize = val
      this.loadTabData2()
    },

    // 改变页码改变列表
    handleCurrentChange2 (val) {
      this.tabOption2.currentPage = val
      this.loadTabData2()
    },

    // 打印
    doPrint2 () {
      console.log('doPrint2')
    },

    // 导出CSV
    exportCSV2 () {
      let sendUrl = `${apiPath.report.DR.downEachTotalOfSar}`
      common.downloadExcel(this.searchData2, sendUrl)
    },

    // 加载tab3=========================================
    loadTabData3 () {
      // 清空搜索条件
      this.searchData3 = null

      let data = {
        pageSize: this.tabOption3.pageSize,
        pageNum: this.tabOption3.currentPage,
        type: this.tabOption3.activeIndex
      }

      // 如果存在选择时间时
      if (this.tabOption3.date) {
        data.createStartDate = common.formatYMD(this.tabOption3.date[0], 'ch')
        data.createEndDate = common.formatYMD(this.tabOption3.date[1], 'ch')
      }

      // 保存搜索条件
      this.searchData3 = common.cloneObject(data)
      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.report.DR.queryStatisCust}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res && res.data) {
          this.tableListData3 = res.data
          this.tabOption3.total = res.total
        }
      })
    },

    // Day,Mont,Week
    tabSwitch3 (obj) {
      // 如果改变时处理
      this.tabOption3.activeIndex = obj.key
      const end = new Date()
      const start = new Date()
      if (this.tabOption3.activeIndex === 2) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
      } else if (this.tabOption3.activeIndex === 1) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      } else if (this.tabOption3.activeIndex === 0) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      }
      this.$set(this.tabOption3, 'date', [start, end])
      this.loadTabData3()
    },

    // 时间
    tabTimeChange3 (e) {
      this.loadTabData3()
    },

    // 改变每页条数改变列表
    handleSizeChange3 (val) {
      this.tabOption3.pageSize = val
      this.loadTabData3()
    },

    // 改变页码改变列表
    handleCurrentChange3 (val) {
      this.tabOption3.currentPage = val
      this.loadTabData3()
    },

    // 打印
    doPrint3 () {
      console.log('doPrint3')
    },

    // 导出CSV
    exportCSV3 () {
      let sendUrl = `${apiPath.report.DR.downStatisCust}`
      common.downloadExcel(this.searchData3, sendUrl)
    }
  },

  filters: {
    // 格式化金钱
    formatNumber (val, type) {
      return common.formatNumber(val, type)
    },

    // 格式化金钱
    formatUSD (val, currency) {
      return common.formatUSD(val, currency)
    },

    // 过滤是否为空
    isEmptyVal (val) {
      return common.isEmptyVal(val)
    },

    // 过滤是否为空
    formatYMD (val) {
      return common.formatYMD(val)
    }
  }
}
