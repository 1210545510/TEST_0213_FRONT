import customProcessing from '@/components/common/customProcessing/custom-processing'
import customSwitch from '@/components/common/customSwitch/custom-switch'
import echarts from 'echarts'
import common from '@/utils/common' // 引入公共脚本
import apiPath from 'rootPath/config/api.json' // 引入api.json文件
import { Loading } from 'element-ui'
require('echarts-wordcloud')
require('./transaction-detail.scss')
const template = require('./transaction-detail.tpl')
const mockData = require('@/data/alertReviewTransactionDetailMockData')  // 导入模拟数据

export const alertReviewTransactionDetail = {
  template,

  name: 'alertReviewTransactionDetail',

  // 注册组件
  components: {
    customSwitch,
    customProcessing
  },

  data () {
    return {
      originalId: '',
      reviewId: '',
      originalIdSelected: { // originalIdSelected
        selectId: '',
        options: []
      },
      transactionDetailActiveName: '0', // 选项卡选中项
      counterParties: {
        list: []
      },
      // transactionsTableData: [], // transactions数据
      transactionMore: {
        visible: false,
        list: [],
        currentPage: 1, // 当前页
        pageSize: 10, // 每页的条数
        total: 0 // 表格总条数
      },
      wordCloudObj: null,
      historyAnalysis: { // top5
        top5Name: [],
        top5NameSwitch: ['Volume', 'Amount'], // Volume 为 0 /Amount 为 1
        top5NameIndex: 0,
        top5Country: [],
        top5CountrySwitch: ['Volume', 'Amount'],
        top5CountryIndex: 0, // Volume 为 0 /Amount 为 1
        wordCloudObj: null
      },
      transactionNum: {
        listSwitch1: ['Monthly', 'Weekly'], // Day/Mont/Week
        type1: 0,
        date: '' // 时间段
      },
      transactionHistory: {
        list: [],
        dateSelect: '',
        keyWord: '',
        currentPage: 1, // 当前页
        pageSize: 10, // 每页的条数
        total: 0 // 表格总条数
      },
      isShowProcedding: false, // 是否显示点击展示审批框的按钮
      roleId: '',  // 角色ID
      taskId: '',  // 任务ID
      orderId: '',  // 实例ID
      transactionsTab: {
        name: 0,
        cashData: [], // 现金交易
        electronicData: [], // 电子资金交易
        monetaryData: [] // 货币交易
      },
      transactionsTabHistory: {
        name: 0,
        cashData: [], // 现金交易
        electronicData: [], // 电子资金交易
        monetaryData: [] // 货币交易
      },
      transactionMapUrl: '', // 地图地址
      osType: common.getCookie('amlST') // 系统类型 prime/mantas
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

    // 对接IBM 地图
    this.transactionMapUrl = `${location.protocol}//${window.location.host}/static/ibm/map/transactionMap.html?originalId=${this.originalId}&osType=${this.osType}`
  },

  // html挂载在页面后,进行数据初始化
  mounted () {
    document.title = 'Transaction Detail'

    // 初始化检测
    if (common.isLogin()) {
      if (this.reviewId && this.originalId) {
        // 查询所有originalId
        this.loadOriginalId()
      } else {
        common.warningInfoTip('Original/Alert ID Is Not Find!')
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
    // 源ID切换时,恢复默认参数
    setDefault () {
      this.transactionDetailActiveName = '0' // 选项卡选中项
      this.counterParties = {
        list: []
      }
      this.transactionsTableData = [] // transactions数据
      this.transactionMore = {
        visible: false,
        list: [],
        currentPage: 1, // 当前页
        pageSize: 10, // 每页的条数
        total: 0 // 表格总条数
      }
      this.wordCloudObj = null
      this.historyAnalysis = { // top5
        top5Name: [],
        top5NameSwitch: ['Volume', 'Amount'], // Volume 为 0 /Amount 为 1
        top5NameIndex: 0,
        top5Country: [],
        top5CountrySwitch: ['Volume', 'Amount'],
        top5CountryIndex: 0, // Volume 为 0 /Amount 为 1
        wordCloudObj: null
      }
      this.transactionHistory = {
        list: [],
        dateSelect: '',
        keyWord: '',
        currentPage: 1, // 当前页
        pageSize: 10, // 每页的条数
        total: 0 // 表格总条数
      }
    },

    // 返回
    comeBack () {
      window.history.back()
    },

    init () {
      if (this.transactionDetailActiveName === '0') {
        // 加载Top5 counterParties 列表
        this.loadCounterParties()

        // 加载Transactions
        // this.loadTransactionsTableData()

        // 交易
        this.loadCashTransactions()

        this.wordCloudObj = echarts.init(document.getElementById('wordCloud'))
        this.loadWordCloud(this.wordCloudObj, mockData.wordCloud)
      } else if (this.transactionDetailActiveName === '1') {
        // 查询前5条的交易人
        this.loadHistoryAnalysisTop5Name()
        // 查询前5条的地区
        this.loadHistoryAnalysisTop5Country()

        this.wordCloudObj2 = echarts.init(document.getElementById('wordCloud2'))
        this.loadWordCloud(this.wordCloudObj2, mockData.wordCloud)

        // 统计图表
        this.chartObj1 = echarts.init(document.getElementById('chartObj1'))
        // 加载图表数据
        this.loadchartData1()
      } else if (this.transactionDetailActiveName === '2') {
        // 查询历史交易记录
        // this.loadTransactionHistory()

        // 交易
        this.loadCashTransactionsHistory()
      }
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

            this.init()
          }
        }
      })
    },

    // Account Detail 选择的源ID改变时
    transactionDetailSelectedIdChange (val) {
      this.originalId = val
      this.setDefault() // 恢复默认参数
      this.init()
    },

    // 选择卡切换
    transactionDetailTabFun (tab, event) {
      // 搜索条件设置默认
      this.transactionNum.date = ''  // Transaction History Analysis 图表处
      // this.transactionHistory.dateSelect = '' // 历史列表日期
      this.transactionHistory.keyWord = '' // 历史列表搜索条件
      this.init()
    },

    // Top5 counterParties列表
    loadCounterParties () {
      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `/alert/transaction/${this.originalIdSelected.selectId}/top5`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          this.counterParties.list = res.data
        }
      })
    },

    // loadTransactionsTableData
    // loadTransactionsTableData () {
    //   let data = {
    //     pageNum: 1,
    //     pageSize: 5
    //   }
    //   const dataUrl = common.getDataToUrl(data)
    //
    //   const loadTips = Loading.service()
    //   this.$ajax({
    //     method: 'get',
    //     url: `${apiPath.alert.review.transactionDetail.list}/${this.originalIdSelected.selectId}?${dataUrl}`
    //   }).then(res => {
    //     // 去除加载
    //     loadTips.close()
    //     if (res.status === 0 && res.data) {
    //       this.transactionsTableData = res.data
    //     }
    //   })
    // },

    // transactions More
    // transactionsMore () {
    //   let data = {
    //     pageNum: this.transactionMore.currentPage,
    //     pageSize: this.transactionMore.pageSize
    //   }
    //   const dataUrl = common.getDataToUrl(data)
    //
    //   const loadTips = Loading.service()
    //   this.$ajax({
    //     method: 'get',
    //     url: `${apiPath.alert.review.transactionDetail.list}/${this.originalIdSelected.selectId}?${dataUrl}`
    //   }).then(res => {
    //     // 去除加载
    //     loadTips.close()
    //     if (res.status === 0 && res.data) {
    //       this.transactionMore.list = res.data
    //       this.transactionMore.total = res.total
    //       this.transactionMore.visible = true
    //     }
    //   })
    // },
    // transactionMoreSizeChange (val) {
    //   this.transactionMore.pageSize = val
    //   // 改变每页条数改变列表
    //   this.transactionsMore()
    // },
    // transactionMoreCurrentChange (val) {
    //   this.transactionMore.currentPage = val
    //   // 改变页码改变列表
    //   this.transactionsMore()
    // },

    // Alerted  transactions  现金交易/电子资金交易/货币交易
    loadCashTransactions () {
      this.transactionsTab.cashData = []
      this.transactionsTab.electronicData = []
      this.transactionsTab.monetaryData = []
      let type = 1
      if (this.transactionsTab.name === '1') {
        type = 2
      } else if (this.transactionsTab.name === '2') {
        type = 3
      }

      let sendUrl = `/alert/transaction/${this.originalId}/${type}`

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: sendUrl
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          if (this.transactionsTab.name === '0') {
            this.transactionsTab.cashData = res.data
          } else if (this.transactionsTab.name === '1') {
            this.transactionsTab.electronicData = res.data
          } else if (this.transactionsTab.name === '2') {
            this.transactionsTab.monetaryData = res.data
          }
        }
      })
    },
    // 点击时处理
    transactionsTabClick () {
      this.loadCashTransactions()
    },

    // 地图处 toGraphView
    toGraphView () {},

    /*
    *
    * obj 为展示的对你
    * wc 为词云数据
    * w 宽度
    * h 高度
    *
    * */
    loadWordCloud (obj, wc, w, h) {
      obj.setOption({
        tooltip: {
          show: true
        },
        series: [{
          type: 'wordCloud',
          size: ['80%', '80%'],
          textRotation: [0, 45, 90, -45],
          textPadding: 0,
          autoSize: {
            enable: true,
            minSize: 14
          },
          gridSize: 20,
          textStyle: {
            normal: {
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
              color: function () {
                return 'rgb(' + [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160)
                ].join(',') + ')'
              }
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          data: wc
        }]
      })
      obj.on('click', function (params) {
        window.open(params.data.url)
      })
    },

    // 查询前5条的交易人
    loadHistoryAnalysisTop5Name () {
      let data = {
        type: this.historyAnalysis.top5NameIndex
      }
      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `/alert/transaction/${this.originalIdSelected.selectId}/name/top5?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          this.historyAnalysis.top5Name = res.data
        }
      })
    },
    historyAnalysisTop5NameSwitch (obj) {
      // 如果改变时处理
      this.historyAnalysis.top5NameIndex = obj.key
      this.loadHistoryAnalysisTop5Name()
    },

    // 查询前5条的地区
    loadHistoryAnalysisTop5Country () {
      let data = {
        type: this.historyAnalysis.top5CountryIndex
      }
      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `/alert/transaction/${this.originalIdSelected.selectId}/country/top5?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          this.historyAnalysis.top5Country = res.data
        }
      })
    },
    historyAnalysisTop5CountrySwitch (obj) {
      // 如果改变时处理
      this.historyAnalysis.top5CountryIndex = obj.key
      this.loadHistoryAnalysisTop5Country()
    },

    // Transaction volume based: number of transaction
    loadchartData1 () {
      let data = {}

      // 如果存在选择时间时
      if (this.transactionNum.date) {
        data.startDate = common.formatYMD(this.transactionNum.date[0], 'ch')
        data.endDate = common.formatYMD(this.transactionNum.date[1], 'ch')
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.chartObj1.showLoading()
      this.$ajax({
        method: 'get',
        url: `/alert/transaction/${this.originalIdSelected.selectId}/map?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        this.chartObj1.hideLoading()
        if (res.status === 0 && res.data) {
          const amountArr = []
          const volumeArr = []
          const xAxisData = []
          if (res.data.length > 0) {
            res.data.forEach((val, key) => {
              amountArr.push(val.amount)
              volumeArr.push(val.volume)
              xAxisData.push(common.formatYMD(val.date))
            })
          }
          this.chartData(this.chartObj1, xAxisData, volumeArr, amountArr)
        }
      })
    },

    // 图表参数
    chartData (obj, xAxisData, volumeArr, amountArr) {
      obj.hideLoading()
      obj.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          show: false
        },
        xAxis: [
          {
            type: 'category',
            data: xAxisData,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Total volume',
            min: 0,
            max: 1000000,
            interval: 100000,
            axisLabel: {
              formatter: 'USD{value}'
            }
          },
          {
            type: 'value',
            name: 'Total amount',
            min: 0,
            max: 1000000,
            interval: 100000,
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: 'Total volume',
            type: 'bar',
            data: volumeArr
          },
          {
            name: 'Total amount',
            type: 'bar',
            data: amountArr
          }
        ]
      })
    },

    // Mont/Week
    transactionNumSwitch1 (obj) {
      this.transactionNum.type1 = obj.key
      const end = new Date()
      const start = new Date()
      if (this.transactionNum.type1 === 0) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      } else if (this.transactionNum.type1 === 1) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      }
      this.$set(this.transactionNum, 'date', [start, end])
      this.loadchartData1()
    },

    // 时间选择时处理
    transactionNumDateChange (e) {
      this.loadchartData1()
    },

    // counterParties列表
    // loadTransactionHistory () {
    //   if (this.originalIdSelected.selectId) {
    //     let data = {
    //       pageNum: this.transactionHistory.currentPage,
    //       pageSize: this.transactionHistory.pageSize
    //     }
    //
    //     // 如果存在选择时间时
    //     if (this.transactionHistory.dateSelect) {
    //       data.startDate = this.transactionHistory.dateSelect[0]
    //       data.endDate = this.transactionHistory.dateSelect[1]
    //     }
    //
    //     // 如果存在搜索关键字
    //     if (this.transactionHistory.keyWord) {
    //       data.search = this.transactionHistory.keyWord
    //     }
    //
    //     const dataUrl = common.getDataToUrl(data)
    //
    //     const loadTips = Loading.service()
    //     this.$ajax({
    //       method: 'get',
    //       url: `${apiPath.alert.review.transactionDetail.history}/${this.originalIdSelected.selectId}?${dataUrl}`
    //     }).then(res => {
    //       // 去除加载
    //       loadTips.close()
    //       if (res.status === 0 && res.data) {
    //         this.transactionHistory.list = res.data
    //         this.transactionHistory.total = res.total
    //       }
    //     })
    //   }
    // },
    // transactionHistorySizeChange (val) {
    //   this.transactionHistory.pageSize = val
    //   // 改变每页条数改变列表
    //   this.loadTransactionHistory()
    // },
    // transactionHistoryCurrentChange (val) {
    //   this.transactionHistory.currentPage = val
    //   // 改变页码改变列表
    //   this.loadTransactionHistory()
    // },

    // Alerted  transactions history  现金交易/电子资金交易/货币交易
    loadCashTransactionsHistory () {
      if (this.originalId) {
        this.transactionsTabHistory.cashData = []
        this.transactionsTabHistory.electronicData = []
        this.transactionsTabHistory.monetaryData = []
        let type = 1
        if (this.transactionsTabHistory.name === '1') {
          type = 2
        } else if (this.transactionsTabHistory.name === '2') {
          type = 3
        }

        let sendUrl = `/transaction/${this.originalId}/${type}`

        const loadTips = Loading.service()
        this.$ajax({
          method: 'get',
          url: sendUrl
        }).then(res => {
          // 去除加载
          loadTips.close()
          if (res.status === 0 && res.data) {
            if (this.transactionsTabHistory.name === '0') {
              this.transactionsTabHistory.cashData = res.data
            } else if (this.transactionsTabHistory.name === '1') {
              this.transactionsTabHistory.electronicData = res.data
            } else if (this.transactionsTabHistory.name === '2') {
              this.transactionsTabHistory.monetaryData = res.data
            }
          }
        })
      }
    },
    // 点击时处理
    transactionsTabHistoryClick () {
      this.loadCashTransactionsHistory()
    },

    // history时间选择时处理
    historySelectChange (e) {
      this.loadCashTransactionsHistory()
    },

    // history的搜索
    historySearchFun (kw) {
      this.transactionHistory.keyWord = kw
      this.loadCashTransactionsHistory()
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
