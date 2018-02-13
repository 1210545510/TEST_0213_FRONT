import customProcessing from '@/components/common/customProcessing/custom-processing'
import createAlert from '@/components/common/createAlert/create-alert'
import common from '@/utils/common' // 引入公共脚本
import customRFI from '@/components/common/customRFI/custom-RFI' // 导入RFI模块
import apiPath from 'rootPath/config/api.json' // 引入api.json文件
import { Loading } from 'element-ui'
require('./review.scss')
const template = require('./review.tpl')

export const caseReview = {
  template,

  name: 'caseReview',

  // 注册组件
  components: {
    customProcessing,
    createAlert,
    customRFI
  },

  data () {
    return {
      isShowMenuItem: common.isShowMenu, // 权限管理
      roleId: '', // 角色ID
      reviewId: '',  // caseId
      taskId: '',  // 任务ID
      orderId: '',  // 实例ID
      curId: null, // 用于点击切换列表时
      originalId: null,
      setOpenDelay: 400, // 提示文本的延迟显示时间
      isShowBack: false, // 是否显示返回按钮
      createrOption: {
        dialog: false, // 创建alert弹框
        url: `${apiPath.case.caseList.addCase}` // 确认创建的请求url
      },
      relateSearchKeyword: '', // 相关列表处的搜索
      relateTableData: [], // 相关列表数据
      relateTablePage: {
        currentPage: 1, // 当前页
        pageSize: 10, // 每页的条数
        total: 0 // 表格总条数
      },
      isLoadInfo: true, // 是否加载相关列表的详情,主要用于关联列表的分页处理
      relateSearchTimeout: null, // 搜索定时器
      allacctid: {
        first: '',
        count: ''
      },
      relateMultipleSelection: [], // 被选中的相关列表数据
      reviewInfo: {
        operators: {
          analystNames: [],
          qaNames: []
        }
      }, // 详情信息
      isShowDetailCollapse: false, // 详情展开收起
      snapshopWrapTab: { // 帐号与客户信息选择卡
        name: '0'
      },
      snapshopTab: { // 显示的选项数字  从 0 开始
        name: '0',
        list: [{
          acct: {}
        }],
        monthSelect: [
          { value: 0, label: 'Jan' },
          { value: 1, label: 'Feb' },
          { value: 2, label: 'Mar' },
          { value: 3, label: 'Apr' },
          { value: 4, label: 'May' },
          { value: 5, label: 'Jun' }
        ],
        month: 0, // 月(0-5), 默认为0
        cusList: [] // 客户快照信息
      },
      snapShopCustId: '', // 快照中的customerId
      snapShopAccountId: '', // 当前 accountId  快照中获得
      statusOptions: [], // 所有status状态
      snapshopData: [],
      transactionsTableData: [], // transactions数据
      profileSelectedIdOptions: [],  // ID列表
      transactionProfileSelectedIdOption: '',   // Transaction Profile选中的ID
      transactionMore: {
        visible: false,
        list: [],
        defaultCurrentPage: 1, // 当前页
        currentPage: 1, // 当前页
        pageSize: 10, // 每页的条数
        defaultPageSize: 10, // 每页的条数
        defaultTotal: 0, // 表格总条数
        total: 0 // 表格总条数
      },
      subjectProfile: [],  // 查询客户信息
      accountProfile: { // 查询帐户资料
        info: [],
        selectId: '',
        options: []
      },
      customerId: '',
      transactionProfile: { // transaction Profile
        info: [],
        selectId: '',
        options: []
      },
      isShowProcedding: false, // 是否显示点击展示审批框的按钮
      isShowReviews: false, // 是否显示步骤历史展示区 默认为隐藏
      reviewSteps: {
        list: [],
        carousel: [], // 走马灯，一页放4个数据
        len: 0,
        result: '',
        roleName: '',
        operator: '',
        score: '',
        taskId: ''
      },
      checkFileType: (name) => {
        return common.checkFileType(name)
      },
      scoreData: {
        visible: false,
        organizedWritten: {
          sarItem: '',
          actionRequired: '',
          actionToken: '',
          corrected: ''
        },
        accuratelyAppropriately: {
          sarItem: '',
          actionRequired: '',
          actionToken: '',
          corrected: ''
        },
        grammarSpelling: {
          sarItem: '',
          actionRequired: '',
          actionToken: '',
          corrected: ''
        },
        otherIssues: {
          sarItem: '',
          actionRequired: '',
          actionToken: '',
          corrected: ''
        },
        grade: '',
        id: ''
      },
      summaryDetail: {   // Summary Detail
        visible: false,
        list: [],
        currentPage: 1, // 当前页
        pageSize: 10, // 每页的条数
        total: 0 // 表格总条数
      },
      custSummaryDetail: {   // customer Summary Detail
        visible: false,
        list: [],
        currentPage: 1, // 当前页
        pageSize: 10, // 每页的条数
        total: 0 // 表格总条数
      },
      transactionMapUrl: '', // 地图地址
      osType: common.getCookie('amlST'), // 系统类型 prime/mantas
      RFI: {
        visible: true
      }
    }
  },

  // 实例创建后,进行默认数据处理
  created () {
    const getCaseId = this.$route.query.caseId
    if (getCaseId) {
      this.reviewId = getCaseId
      this.isShowBack = true
    }
    this.roleId = common.getCookie('amlRId')
  },

  // html挂载在页面后,进行数据初始化
  mounted () {
    document.title = 'Case Review'

    // 初始化检测
    if (common.isLogin()) {
      // 查询所有status
      this.getAllStatus()

      if (this.reviewId) {
        this.$refs.customProcessing.sendData.caseId = this.reviewId
        // 加载相关列表
        this.loadRelateTableData()
      } else {
        // 获取第一条
        this.getFistReview()
      }
    }
  },

  // 方法集合
  methods: {
    // 初始方法
    init () {
      // 加载相关详情信息
      this.loadRelateDatailData()
      this.getAllacctid() // 账号id

      // 加载Snapshop 查询账号快照信息
      this.loadSnapshopData()
      // 加载Snapshop 客户快照信息
      this.loadSnapshopCusData()

      // Original Transaction
      // this.loadTransactionsTableData()

      // 查询客户信息
      this.loadSubjectProfile()

      // 查询帐户资料
      this.loadAccountProfile()

      // 对接IBM
      this.loadTransactionProfile()
    },

    // 返回
    comeBack () {
      window.history.back()
    },

    // 获得第一条review信息
    getFistReview () {
      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.case.review.reviewFist}`,
        params: {
          actorId: common.getUserId(),
          roleId: common.getRoleId()
        }
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          this.reviewId = res.data
          this.$refs.customProcessing.sendData.caseId = this.reviewId
          // 加载相关列表
          this.loadRelateTableData()
        }
      })
    },

    // 创建弹框
    createAlert () {
      this.createrOption.dialog = true
    },

    // 创建alert成功后的回调函数 data: 发送的请求参数
    alertSuccessCallBack (data) {
      this.createrOption.dialog = false
      // 创建成功 操作
      common.successInfoTip('Create Success!')
      this.$router.push({name: 'caseList'})
    },

    // 监听创建alret弹框被点击关闭时执行的函数
    visibleCreateAlert (val) {
      this.createrOption.dialog = false
    },

    // 解绑方法
    doUnlink () {
      let getAlertIds = []
      const selectionList = this.relateMultipleSelection
      if (selectionList.length > 0) {
        if (this.relateTableData.length === 1) {
          return common.warningInfoTip('Unbundling, only one!')
        } else {
          selectionList.forEach(function (val, key) {
            getAlertIds.push(val.id)
          })
        }
      } else {
        return common.warningInfoTip('Please choose the case!')
      }

      this.$confirm('Are you sure you want to do "Unlink"?', 'Confirm', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        const loadTips = Loading.service()
        this.$ajax({
          method: 'put',
          url: `${apiPath.case.review.unbind}`,
          data: {ids: getAlertIds}
        }).then(res => {
          // 去除加载
          loadTips.close()
          // console.log(res)
          if (res.status === 0) {
            window.location.reload()
            common.successInfoTip('Untie success!')
          }
        })
      })
    },

    // 打印操作
    doPrint () {},

    // RFI
    doRFI () {
      this.RFI.visible = true
      this.$refs.customRFI.visible = this.RFI.visible
    },

    // 相关列表处的搜索
    relateSearchEnter (kw) {
      if (!isNaN(kw)) {
        this.$router.push({name: 'caseReview', query: { caseId: kw }})
        window.location.reload()
      } else {
        common.warningInfoTip('Keywords need to be a number!')
      }
    },

    // 远程搜索
    relateSearchAsync (queryString, cb) {
      if (queryString) {
        // 处理非数字
        if (!isNaN(queryString)) {
          clearTimeout(this.relateSearchTimeout)
          this.relateSearchTimeout = setTimeout(() => {
            // cb(results)

            let data = {
              caseId: queryString
            }
            const dataUrl = common.getDataToUrl(data)

            const loadTips = Loading.service()
            this.$ajax({
              method: 'get',
              url: `${apiPath.alert.review.search}?${dataUrl}`
            }).then(res => {
              // 去除加载
              loadTips.close()
              if (res.status === 0 && res.data) {
                const dataInfo = res.data
                let results = []
                // 格式处理
                dataInfo.forEach((val, key) => {
                  let obj = {'value': String(val)}
                  results.push(obj)
                })
                cb(results)
              }
            })
          }, 500)
        } else {
          const arr = []
          cb(arr)
        }
      }
    },

    // 相关列表
    loadRelateTableData () {
      let data = {
        caseId: this.reviewId,
        pageNum: this.relateTablePage.currentPage,
        pageSize: this.relateTablePage.pageSize
      }
      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.review.relateList}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          let dataInfo = res.data
          this.relateTableData = dataInfo
          this.relateTablePage.total = res.total
          if (this.isLoadInfo) {
            const that = this
            setTimeout(() => {
              // 设置选中第一个
              if (dataInfo && dataInfo.length > 0) {
                that.$refs.relateTable.setCurrentRow(dataInfo[0])
                that.curId = dataInfo[0].id
                this.originalId = dataInfo[0].originalId
              } else {
                // 加载相关详情信息
                that.loadRelateDatailData()
                // 查询所有originalId,进入想着详情时会用到
                that.loadOriginalId()
              }
            }, 10)
          }
          this.isLoadInfo = true
        }
      })
    },

    // 复选框被选中触发的事件,val为被选中的参数,即table中被选中的所有参数
    relateHandleSelectionChange (val) {
      // console.log(val)
      this.relateMultipleSelection = val
    },

    // 点击时切换时
    relateHandleSelectionClick (currentRow, oldCurrentRow) {
      if (currentRow) {
        this.curId = currentRow.id
        this.originalId = currentRow.originalId
        this.init()
        // 查询所有originalId,进入想着详情时会用到
        this.loadOriginalId()
      }
    },

    // 分页处处理
    relateTablePageSizeChange (val) {
      this.relateTablePage.pageSize = val
      // 改变每页条数改变列表
      this.isLoadInfo = false
      this.loadRelateTableData()
    },
    relateTablePageCurrentChange (val) {
      this.relateTablePage.currentPage = val
      this.isLoadInfo = false
      this.loadRelateTableData()
    },

    // 详情折叠
    detailCollapseChange () {
      if (this.isShowDetailCollapse) {
        this.isShowDetailCollapse = false
      } else {
        this.isShowDetailCollapse = true
      }
    },

    // 查询详情
    loadRelateDatailData () {
      let data = {
        caseId: this.reviewId
      }

      // 如果有当前ID
      if (this.curId) {
        data.id = this.curId
      }
      if (this.originalId) {
        data.originalId = this.originalId
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.review.reviewInfo.info}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          const dataInfo = res.data
          this.reviewInfo = dataInfo
          this.taskId = dataInfo.taskId
          this.orderId = dataInfo.orderId
          const getStatus = dataInfo.status
          const getCurRoleId = dataInfo.roleId // 获得当前review的角色 ID
          const getCurUName = dataInfo.userName // 获得当前review的用户 名字
          // 如果是分析员(也就是角色ID为10042)当前返回的角色Id和当前登录的角色Id相等时,则说明为同一人  可以进行审批操作 只有alert的才有这个判断
          if (getCurUName === common.getCookie('amlUName') && getCurRoleId === common.getCookie('amlRId') && this.isFromHistory(getStatus)) {
            this.isShowProcedding = true
          }

          this.$refs.customProcessing.taskId = this.taskId
          this.$refs.customProcessing.orderId = this.orderId

          // 加载查询已审批的历史记录列表
          if (dataInfo.orderId) {
            this.loadStepList()
          }
        }
      })
    },

    // 获取词典status的状态
    getAllStatus () {
      common.getAllStatus((statusOptions) => {
        this.statusOptions = statusOptions
      }, 43)
    },

    // 状态判断,看从历史列表过来的是否为已完成了,如果完成了则不能显示审批的按钮
    isFromHistory (status) {
      let falg = false
      if (status !== 11 && status !== 14 && status !== 19) {
        falg = true
      }
      return falg
    },

    // 查询所有账号id
    getAllacctid () {
      let data = {
        caseId: this.reviewId
      }

      // 如果有当前ID
      if (this.curId) {
        data.id = this.curId
      }
      if (this.originalId) {
        data.originalId = this.originalId
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.review.reviewInfo.allId}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          const dataInfo = res.data
          if (dataInfo.length > 0) {
            this.allacctid.first = dataInfo[0]
            this.allacctid.count = dataInfo.length
          }
        }
      })
    },

    // 查询账号快照信息
    loadSnapshopData () {
      let data = {
        originalId: this.originalId,
        month: this.snapshopTab.month
      }

      // 如果有当前ID
      if (this.curId) {
        data.id = this.curId
      }
      if (this.originalId) {
        data.originalId = this.originalId
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.review.acctGet}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          const dataInfo = res.data
          if (dataInfo.length > 0) {
            this.snapshopTab.list = dataInfo
            this.snapShopAccountId = dataInfo[this.snapshopTab.name].accountId
          }
        }
      })
    },

    // 查询客户快照信息
    loadSnapshopCusData () {
      let data = {
        originalId: this.originalId
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.review.custGet}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          this.snapshopTab.cusList = res.data
          this.snapShopCustId = res.data.id
        }
      })
    },

    // 快照帐号切换查看时
    snapshopTabClick (val) {
      this.snapshopTab.month = 0
      if (this.snapshopTab.list.length > 0) {
        this.snapShopAccountId = this.snapshopTab.list[this.snapshopTab.name].accountId
      }
      this.snapshopTabMonthChange()
    },

    // 选择月份时 -- 帐号快照
    snapshopTabMonthChange () {
      let data = {
        accountId: this.snapShopAccountId,
        month: this.snapshopTab.month
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.review.reviewInfo.monthBalance}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          const getAcct = res.data
          const curName = Number(this.snapshopTab.name)
          this.$set(this.snapshopTab.list[curName].acct, 'date', getAcct.date)
          this.$set(this.snapshopTab.list[curName].acct, 'accountNetWorth', getAcct.accountNetWorth)
          this.$set(this.snapshopTab.list[curName].acct, 'uncollectedBalance', getAcct.uncollectedBalance)
          this.$set(this.snapshopTab.list[curName].acct, 'accountGrossAssets', getAcct.accountGrossAssets)
          this.$set(this.snapshopTab.list[curName].acct, 'moneyMarketFund', getAcct.moneyMarketFund)
          this.$set(this.snapshopTab.list[curName].acct, 'debt', getAcct.debt)
          this.$set(this.snapshopTab.list[curName].acct, 'equity', getAcct.equity)
          this.$set(this.snapshopTab.list[curName].acct, 'bond', getAcct.bond)
          this.$set(this.snapshopTab.list[curName].acct, 'mutualFund', getAcct.mutualFund)
          this.$set(this.snapshopTab.list[curName].acct, 'marginBalance', getAcct.marginBalance)
          this.$set(this.snapshopTab.list[curName].acct, 'margin', getAcct.margin)
          this.$set(this.snapshopTab.list[curName].acct, 'lastOverdraftDate', getAcct.lastOverdraftDate)
          this.$set(this.snapshopTab.list[curName].acct, 'lastOverdraftBalance', getAcct.lastOverdraftBalance)
          this.$set(this.snapshopTab.list[curName].acct, 'lastOverdraftDuration', getAcct.lastOverdraftDuration)
        }
      })
    },

    // loadTransactionsTableData 交易记录
    // loadTransactionsTableData () {
    //   let data = {
    //     caseId: this.reviewId,
    //     pageNum: 1,
    //     pageSize: 5
    //   }
    //   const dataUrl = common.getDataToUrl(data)
    //
    //   const loadTips = Loading.service()
    //   this.$ajax({
    //     method: 'get',
    //     url: `${apiPath.alert.review.transactions}?${dataUrl}`
    //   }).then(res => {
    //     // 去除加载
    //     loadTips.close()
    //     if (res.status === 0 && res.data) {
    //       const dataInfo = res.data
    //       if (dataInfo.length > 0) {
    //         this.transactionsTableData = dataInfo
    //       }
    //     }
    //   })
    // },
    //
    // // transactions More
    // transactionsMore () {
    //   this.transactionMore.list = []
    //   this.transactionMore.currentPage = this.transactionMore.defaultCurrentPage
    //   this.transactionMore.pageSize = this.transactionMore.defaultPageSize
    //   this.transactionMore.total = this.transactionMore.defaultTotal
    //   this.transactionsMoreFun()
    // },
    // // 更多的查询方法
    // transactionsMoreFun () {
    //   let data = {
    //     caseId: this.reviewId,
    //     pageNum: this.transactionMore.currentPage,
    //     pageSize: this.transactionMore.pageSize
    //   }
    //   const dataUrl = common.getDataToUrl(data)
    //
    //   const loadTips = Loading.service()
    //   this.$ajax({
    //     method: 'get',
    //     url: `${apiPath.alert.review.transactions}?${dataUrl}`
    //   }).then(res => {
    //     // 去除加载
    //     loadTips.close()
    //     if (res.status === 0 && res.data) {
    //       const dataInfo = res.data
    //       this.transactionMore.list = dataInfo
    //       this.transactionMore.total = res.total
    //       this.transactionMore.currentPage = res.pageNum
    //       this.transactionMore.pageSize = res.pageSize
    //       this.transactionMore.visible = true
    //     }
    //   })
    // },
    // // 改变每页条数改变列表
    // transactionMoreSizeChange (val) {
    //   this.transactionMore.pageSize = val
    //   this.transactionsMoreFun()
    // },
    // // 改变页码改变列表
    // transactionMoreCurrentChange (val) {
    //   this.transactionMore.currentPage = val
    //   this.transactionsMoreFun()
    // },

    // 查询客户信息
    loadSubjectProfile () {
      let data = {
        caseId: this.reviewId,
        originalId: this.originalId
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.review.custInfo}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          this.subjectProfile.push(res.data)
          this.customerId = this.subjectProfile[0].customerId
        }
      })
    },

    // 查询所有originalId
    loadOriginalId () {
      let data = {
        caseId: this.reviewId
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
          this.accountProfile.options = res.data
          this.transactionProfile.options = res.data
          if (res.data.length > 0) {
            this.accountProfile.selectId = this.accountProfile.options[0]
            this.transactionProfile.selectId = this.transactionProfile.options[0]
          }
        }
      })
    },

    // 查询帐户资料
    loadAccountProfile (id) {
      let data = {
        caseId: this.reviewId,
        originalId: this.originalId
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.review.acctInfo}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          this.accountProfile.info = res.data
        }
      })
    },

    // Account Profile 选择的ID改变时
    accountProfileSelectedIdChange (val) {
      this.loadAccountProfile()
    },

    // Transaction Profile
    loadTransactionProfile (id) {
      // 对接IBM
      this.transactionMapUrl = `${location.protocol}//${window.location.host}/static/ibm/map/transactionMap.html?originalId=${this.originalId}&osType=${this.osType}`
    },

    // Transaction Profile 选择的ID改变时
    transactionProfileSelectedIdChange (val) {
      this.loadTransactionProfile()
    },

    // 查询已审批的历史记录列表
    loadStepList () {
      let data = {
        orderId: this.orderId
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.review.processHistory}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        // 恢复默认值
        this.reviewSteps = {
          list: [],
          carousel: [], // 走马灯，一页放4个数据
          result: '',
          roleName: '',
          operator: '',
          score: '',
          taskId: ''
        }
        if (res.status === 0 && res.data) {
          this.reviewSteps.list = res.data
          // 如果存在数据,刚默认展示第一条的审批记录
          if (this.reviewSteps.list.length > 0) {
            // 显示
            this.isShowReviews = true

            const fistItem = this.reviewSteps.list[0]
            this.showReviewStepInfo(fistItem)

            if (this.roleId !== '10044') {
              // 添加当前需要处理的状态,自定义status 为 isWaiting 表示
              this.reviewSteps.list.push({
                isActive: false,
                status: 'isWaiting',
                statusValue: this.statusOptions[this.reviewInfo.status].label,
                taskId: '',
                score: '',
                operator: '',
                roleName: '',
                createTime: '',
                result: ''
              })
            }

            // 一个走马灯幻灯片页面，只放4个数据
            const len = this.reviewSteps.list.length // 数据长度
            const pages = Math.ceil(len / 4) // 幻灯片数
            for (let j = 1; j <= pages; j++) {
              this.reviewSteps.carousel.push([]) // 创建与页数相等的数组数存放数据
            }
            this.reviewSteps.list.forEach((v, i) => {
              for (let j = 1; j <= pages; j++) {
                if (i < j * 4) {
                  this.reviewSteps.carousel[j - 1].push({
                    isActive: v.isActive,
                    status: v.status,
                    statusValue: v.statusValue,
                    taskId: v.taskId,
                    score: v.score,
                    operator: v.operator,
                    roleName: v.roleName,
                    createTime: v.createTime,
                    result: v.result
                  })
                  break
                }
              }
            })
          }
        } else {
          this.isShowReviews = false
        }
      })
    },

    // 步骤点击时
    showReviewStepClick (obj) {
      if (obj.status !== 'isWaiting') {
        // 当前高亮处理
        this.reviewSteps.carousel.forEach(function (item, key) {
          item.forEach((val) => {
            val.isActive = false
          })
        })
        this.showReviewStepInfo(obj)
      }
    },

    // 单个审批记录
    showReviewStepInfo (obj) {
      this.reviewSteps.taskId = obj.taskId
      obj.isActive = true
      // 查询单个审批记录
      let data = {
        taskId: this.reviewSteps.taskId
      }
      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.review.processing.getSaveInfo}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          const dataInfo = res.data
          this.reviewSteps.result = obj.result
          this.reviewSteps.roleName = obj.roleName
          this.reviewSteps.operator = obj.operator
          this.reviewSteps.score = obj.score
          this.reviewSteps.createTime = obj.createTime
          // this.reviewSteps.content = dataInfo.content
          // this.reviewSteps.files = dataInfo.files
          this.$set(this.reviewSteps, 'content', dataInfo.content.replace(/\n/g, '<br/>'))  // 格式处理
          this.$set(this.reviewSteps, 'files', dataInfo.files)
        }
      })
    },

    // 获得评分内容  并 弹框
    showScoreDetail () {
      const taskId = this.reviewSteps.taskId
      if (taskId) {
        // 参数
        let data = {
          taskId: taskId
        }
        const dataUrl = common.getDataToUrl(data)
        const loadTips = Loading.service()
        this.$ajax({
          method: 'get',
          url: `${apiPath.alert.review.processing.getScore}?${dataUrl}`
        }).then(res => {
          // 去除加载
          loadTips.close()
          if (res.status === 0) {
            if (res.data) {
              const dataInfo = res.data
              const organizedWritten = window.JSON.parse(dataInfo.organizedWritten)
              const accuratelyAppropriately = window.JSON.parse(dataInfo.accuratelyAppropriately)
              const grammarSpelling = window.JSON.parse(dataInfo.grammarSpelling)
              const otherIssues = window.JSON.parse(dataInfo.otherIssues)
              this.scoreData = {
                visible: true,
                organizedWritten: {
                  sarItem: organizedWritten.sarItem,
                  actionRequired: organizedWritten.actionRequired,
                  actionToken: organizedWritten.actionToken,
                  corrected: organizedWritten.corrected
                },
                accuratelyAppropriately: {
                  sarItem: accuratelyAppropriately.sarItem,
                  actionRequired: accuratelyAppropriately.actionRequired,
                  actionToken: accuratelyAppropriately.actionToken,
                  corrected: accuratelyAppropriately.corrected
                },
                grammarSpelling: {
                  sarItem: grammarSpelling.sarItem,
                  actionRequired: grammarSpelling.actionRequired,
                  actionToken: grammarSpelling.actionToken,
                  corrected: grammarSpelling.corrected
                },
                otherIssues: {
                  sarItem: otherIssues.sarItem,
                  actionRequired: otherIssues.actionRequired,
                  actionToken: otherIssues.actionToken,
                  corrected: otherIssues.corrected
                },
                grade: dataInfo.grade,
                id: dataInfo.id
              }
            }
          }
        })
      } else {
        common.warningInfoTip('Task ID Is Not Find !')
      }
    },

    // Summary Detail
    SummaryDetailFun () {
      // 清空处理
      this.summaryDetail.list = []
      this.summaryDetail.total = 0

      let data = {
        accountId: this.accountId,
        pageNum: this.summaryDetail.currentPage,
        pageSize: this.summaryDetail.pageSize
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.review.reviewInfo.summaryDetail}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          const dataInfo = res.data
          if (dataInfo) {
            this.summaryDetail.list = dataInfo
            this.summaryDetail.total = res.total
            this.summaryDetail.visible = true
          }
        }
      })
    },
    // 改变每页条数改变列表
    summaryDetailSizeChange (val) {
      this.summaryDetail.pageSize = val
      this.SummaryDetailFun()
    },
    // 改变页码改变列表
    summaryDetailCurrentChange (val) {
      this.summaryDetail.currentPage = val
      this.SummaryDetailFun()
    },

    // customer Summary Detail
    custSummaryDetailFun () {
      // 清空处理
      this.custSummaryDetail.list = []
      this.custSummaryDetail.total = 0

      let data = {
        customerId: this.snapShopCustId
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.review.reviewInfo.custSummaryDetail}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          const dataInfo = res.data
          if (dataInfo) {
            this.custSummaryDetail.list = dataInfo
            this.custSummaryDetail.total = res.total
            this.custSummaryDetail.visible = true
          }
        }
      })
    },
    // 改变每页条数改变列表
    custSummaryDetailSizeChange (val) {
      this.custSummaryDetail.pageSize = val
      this.custSummaryDetailFun()
    },
    // 改变页码改变列表
    custSummaryDetailCurrentChange (val) {
      this.custSummaryDetail.currentPage = val
      this.custSummaryDetailFun()
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
