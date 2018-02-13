import './filing-list.scss'
import template from './filing-list.tpl'
import { Loading } from 'element-ui'

// 引用jquery
// import $ from 'jquery'

// 引入公共脚本
import common from '@/utils/common'

// 引入api.json文件
import apiPath from 'rootPath/config/api.json'
import hostPath from 'rootPath/config/host'

// 引入创建alert组件
import createAlert from '@/components/common/createAlert/create-alert'
import arrangeHeading from '@/components/common/arrangeHeading/arrange-heading'

let fileLoading = null // 文件上传时的变量

export const SARFilingList = {
  template,

  name: 'SARFilingList',

  components: { createAlert, arrangeHeading },

  data () {
    return {
      actionData: common.getReqParam(),
      uploadUrl: `${hostPath.apiUrl}${apiPath.common.uploadUrl}`, // 文件上传的url
      listActiveName: '0', // tab切换选中的name, state 0-待办，1-历史
      roleId: Number(common.getRoleId()), // 当前登录用户的角色id
      isShowMenuItem: common.isShowMenu, // 权限管理
      formatYMD: common.formatYMD,
      tranformToHumpStr: common.tranformToHumpStr, // 字符串转为驼峰值写法
      isSortable: common.isSortable, // 是否排序方法
      statusOptions: [], // 所有status状态
      caseTypeOptions: [
        { value: '', label: 'All' }
      ], // 所有caseType选项
      searchValues: {  // 搜索的选项
        createDateSelect: '', // Create Date的日期范围
        dueDateSelect: '', // Due Date的日期范围
        startAmount: '', // 最小amout值
        endAmount: '', // 最大amout值
        caseTypeSelect: '', // 选中的caseType
        startVolume: '', // 最小volume值
        endVolume: '', // 最大volume值
        startScore: '', // 最小Score值
        endScore: '', // 最大Score值
        searchScenario: '', // Scenario搜索
        searchGeography: '', // Geography搜索
        searchCaseID: '', // alertID搜索
        searchKeyword: '' // 关键词搜索
      },
      dialogVisibleArr: { // 所有弹框的显示隐藏状态
        dialogSARFiling: false, // SARFiling弹框
        dialogRerangeHeading: false // 批量分配弹框
      },
      SARFilingValue: {
        caseID: '',
        reportNo: '', // Report Number
        fileUrl: '' // 附件
      }, // SARFiling弹框内容
      allheading: [], // 所有表头
      checkedHeading: [], // 被选中的表头
      confirmHeading: [], // 确认重新选择后的heading
      disabledHeading: ['Case ID', 'Status'], // 禁用状态的表头
      arrangeHeadingUrl: `/47/field`, // 确认设置表头的请求url
      addCaseUrl: `${apiPath.case.caseList.addCase}`, // 确认创建case的请求url
      tableData: [],
      multipleSelection: [], // 被选中的table数据
      searchFlag: false, // 搜索的标志
      currentPage: 1, // 当前页
      total: 0, // 总条数
      pageSize: 10 // 每页的条数
    }
  },

  // 实例创建后,进行默认数据处理
  created () {
    const status = this.$route.query.status
    if (status) {
      this.searchValues.statusSelect = String(status)
      // 刷新列表
      this.getCaseList()
    }

    // 查询Case列表
    this.getCaseList()

    // 查询所有status
    this.getAllStatus()

    // 获取所有表头字段
    this.getHeadingFields()

    // 获取Case Type
    this.getCaseType()
  },

  // html挂载在页面后,进行数据初始化
  mounted () {
    document.title = 'SAR Filling List'
  },

  // 方法集合
  methods: {
    // 表格被选中深色显示
    tableRowClassName ({row, rowIndex}) {
      let flag = false
      this.multipleSelection.some((v) => {
        if (v.alertId === row.alertId && v.userName === row.userName) {
          flag = true
          return true
        }
      })
      if (flag) {
        return 'selected-row'
      }
      return ''
    },

    // 重置页码为第一页
    resetPageNum () {
      this.currentPage = 1
      this.searchFlag = true
    },

    // 查询Case列表
    getCaseList (type) {
      // 清空搜索条件
      this.searchData = null

      let data = {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        state: this.listActiveName
      }

      // 如果有搜索条件
      // if (type) {
        // 先重置页面为第一页
        // this.resetPageNum()

        // 根据关键词搜索
        // if (type === 'keyword') {
          // 先重置页面为第一页
          // data.pageNum = 1

      // 是否Scenario搜索
      if (this.searchValues.searchScenario) {
        data.scenario = this.searchValues.searchScenario
        // data.search = this.searchValues.searchScenario
      }
      // 是否Geography搜索
      if (this.searchValues.searchGeography) {
        data.geography = this.searchValues.searchGeography
      }
      // 是否caseID搜索
      if (this.searchValues.searchCaseID) {
        data.caseId = this.searchValues.searchCaseID
      }
      if (!common.isNumber(this.searchValues.searchCaseID)) {
        return common.warningInfoTip('Case ID should be number')
      }
        // } else {
          // 先重置页面为第一页
          // data.pageNum = 1

      // 是否Create Date
      if (this.searchValues.createDateSelect) {
        data.createStartDate = common.formatYMD(this.searchValues.createDateSelect[0], 'ch')
        data.createEndDate = common.formatYMD(this.searchValues.createDateSelect[1], 'ch')
      }
      // 是否Due Date
      if (this.searchValues.dueDateSelect) {
        data.dueStartDate = common.formatYMD(this.searchValues.dueDateSelect[0], 'ch')
        data.dueEndDate = common.formatYMD(this.searchValues.dueDateSelect[1], 'ch')
      }
      // 是否最小amout值
      if (this.searchValues.startAmount) {
        data.amountMin = this.searchValues.startAmount
      }
      if (!common.isNumber(this.searchValues.startAmount)) {
        return common.warningInfoTip('Min amount should be number')
      }
      // 是否最大amout值
      if (this.searchValues.endAmount) {
        data.amountMax = this.searchValues.endAmount
      }
      if (!common.isNumber(this.searchValues.endAmount)) {
        return common.warningInfoTip('Max amount should be number')
      }
      // 是否选中Case Type
      if (this.searchValues.caseTypeSelect) {
        data.caseType = this.searchValues.caseTypeSelect
      }
      // 是否最小volume值
      if (this.searchValues.startVolume) {
        data.volumeMin = this.searchValues.startVolume
      }
      if (!common.isNumber(this.searchValues.startVolume)) {
        return common.warningInfoTip('Min volume should be number')
      }
      // 是否最大volume值
      if (this.searchValues.endVolume) {
        data.volumeMax = this.searchValues.endVolume
      }
      if (!common.isNumber(this.searchValues.endVolume)) {
        return common.warningInfoTip('Max volume should be number')
      }
      // 是否最小Score值
      if (this.searchValues.startScore) {
        data.scoreMin = this.searchValues.startScore
      }
      if (!common.isNumber(this.searchValues.startScore)) {
        return common.warningInfoTip('Min score should be number')
      }
      // 是否最大Score值
      if (this.searchValues.endScore) {
        data.scoreMax = this.searchValues.endScore
      }
      if (!common.isNumber(this.searchValues.endScore)) {
        return common.warningInfoTip('Max score should be number')
      }
        // }
      // }

      // 是否有排序条件
      if (this.searchValues.orderby) {
        data.orderby = this.searchValues.orderby
      }

      // 保存搜索条件
      this.searchData = common.cloneObject(data)

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.case.caseList.getCaseList}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        this.tableData = []
        if (res && res.data) {
          const data = res.data
          this.tableData = data
          this.total = res.total
          this.searchFlag = false
        }
      })
    },

    // 获取词典sar status的状态 dicId: 43 位status词典
    getAllStatus () {
      common.getAllStatus((statusOptions) => {
        this.statusOptions = statusOptions
      }, 43)
    },

    // 获取Case Type
    getCaseType () {
      common.getDictDetail(39, (resData) => {
        resData.dicSubs.forEach((v) => {
          this.caseTypeOptions.push({ value: v.dicValue, label: v.dicValue })
        })
      })
    },

    // 排序条件的变化
    sortChange (val) {
      // 获取排序搜索的条件, 执行搜索
      common.getSortType(val, (orderby) => {
        this.searchValues.orderby = orderby
        // 重置页码
        this.resetPageNum()
        this.getCaseList('sort')
      })
    },

    // 获取所有表头字段与当前表头字段
    getHeadingFields () {
      // 根据dicId获取表头字段，传入参数dicId, successCB1, successCB2
      common.getHeadingFields(47,
        () => {
          // 重置所有表头，与已选表头数组
          this.checkedHeading = []
          this.allheading = []
        }, (checkedHeading, allheading) => {
          this.checkedHeading = checkedHeading
          this.confirmHeading = checkedHeading
          this.allheading = allheading
        })
    },

    // 搜索关键词
    searchKeyword (val, type) {
      // 清空三个搜索条件
      this.searchValues.searchScenario = ''
      this.searchValues.searchGeography = ''
      this.searchValues.searchCaseID = ''

      switch (type) {
        case 'scenario':
          this.searchValues.searchScenario = val
          break
        case 'geography':
          this.searchValues.searchGeography = val
          break
        case 'caseID':
          this.searchValues.searchCaseID = val
          break
        default:
          break
      }

      // 重置页码
      this.resetPageNum()
      this.getCaseList('keyword')
    },

    // 点击Screen按钮，根据输入的搜索条件搜索
    screenSearch () {
      // 重置页码
      this.resetPageNum()
      this.getCaseList('screen')
    },

    // 改变表头弹框
    reArrangeHeading () {
      this.dialogVisibleArr.dialogRerangeHeading = true
    },

    // SARFiling弹框
    SARFiling () {
      console.log('SARFiling')
      this.dialogVisibleArr.dialogSARFiling = true
    },

    // 确认SARFiling
    confirmSARFiling () {
      console.log('confirmSARFiling')
    },

    // 文件上传后操作
    uploadBefore (file) {
      common.isTextType(file)
      // 检测上传文件格式
      if (!common.isTextType(file) && !common.isPictureType(file)) {
        return common.warningInfoTip('The file type is not supported, please reupload')
      }
      fileLoading = Loading.service()
    },
    uploadSuccess (response, file, fileList) {
      // 先清空fileUrl
      this.SARFilingValue.fileUrl = ''

      if (response.status === 0) {
        let filePathArr = []
        fileList.forEach((v) => {
          filePathArr.push(v.response.data[0].filePath)
        })
        this.SARFilingValue.fileUrl = filePathArr.join(',')

        // 清空上传的图片数组
        common.successInfoTip('Upload Success !')
      } else {
        this.$refs.upload.clearFiles()
        common.warningInfoTip(response.errorInfo)
      }
      fileLoading.close()
    },
    uploadError (file, fileList) {
      common.warningInfoTip('Error !')
      fileLoading.close()
    },
    handlePreview (file) {
      // 新窗口打开上传的文件
      window.open(file.url)
    },

    // 导出CSV
    exportCSV () {
      const url = `${apiPath.case.caseList.exportCase}`
      common.downloadExcel(this.searchData, url)
    },

    // 重设表头arrange-heading成功后的回调函数 data: 发送的请求参数
    arrangeSuccessCallBack (data) {
      // 重置表头
      this.confirmHeading = []
      // 重新获取表头
      this.getHeadingFields()
      this.dialogVisibleArr.dialogRerangeHeading = false
      // 更新列表数据
      this.getCaseList()
    },

    // 监听设置表头弹框被点击关闭时执行的函数
    visibleArrangeHeading (val) {
      this.dialogVisibleArr.dialogRerangeHeading = val
    },

    // 复选框被选中触发的事件,val为被选中的参数,即table中被选中的所有参数
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      this.pageSize = val
      // 改变每页条数改变列表
      this.getCaseList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      // 改变页码改变列表
      if (!this.searchFlag) {
        this.getCaseList()
      }
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
    }
  }
}
