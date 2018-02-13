import './list.scss'
import template from './list.tpl'
import { Loading } from 'element-ui'

// 引用jquery
// import $ from 'jquery'

// 引入公共脚本
import common from '@/utils/common'

// 引入api.json文件
import apiPath from 'rootPath/config/api.json'

// 引入创建alert组件
import createAlert from '@/components/common/createAlert/create-alert'
import arrangeHeading from '@/components/common/arrangeHeading/arrange-heading'

export const caseList = {
  template,

  name: 'caseList',

  components: { createAlert, arrangeHeading },

  data () {
    return {
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
      assignedOptions: [
        { value: '', label: 'All' }
      ], // 所有assigned选项
      assignedOptions1: [
        { value: '', label: 'All' }
      ], // 分配时，所有分配人
      searchValues: {  // 搜索的选项
        assignedSelect: '', // Alert Assigned to
        createDateSelect: '', // Create Date的日期范围
        dueDateSelect: '', // Due Date的日期范围
        statusSelect: '', // 选中的status状态
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
        dialogBatchAssign: false, // 批量分配弹框
        dialogRerangeHeading: false, // 批量分配弹框
        dialogCreateAlert: false // 创建alert弹框
      },
      batchAssignSelect: {
        departmentSelect: '', // 部门选择
        analystSelect: '' // 部门选择
      }, // 分配选择
      allheading: [], // 所有表头
      checkedHeading: [], // 被选中的表头
      confirmHeading: [], // 确认重新选择后的heading
      disabledHeading: ['Assigned to', 'Case ID', 'Status'], // 禁用状态的表头
      arrangeHeadingUrl: `/36/field`, // 确认设置表头的请求url
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

    // 查询alert列表
    this.getCaseList()

    // 查询所有status
    this.getAllStatus()

    // 获取所有表头字段
    this.getHeadingFields()

    // 获取Case Type
    this.getCaseType()

    // 查询所有assigned
    this.getAllAssigned()
  },

  // html挂载在页面后,进行数据初始化
  mounted () {
    document.title = 'Case List'
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

    // tab切换
    handleTabFun () {
      // 刷新列表
      this.getCaseList()
      // 清空搜索状态
      common.resetObjectVal(this.searchValues)
      // 重置分页
      this.currentPage = 1
    },

    // 重置页码为第一页
    resetPageNum () {
      this.currentPage = 1
      this.searchFlag = true
    },

    // 查询Alert列表
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
      // 是否status
      if (this.searchValues.statusSelect) {
        data.status = this.searchValues.statusSelect
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

      // 是否选中assigned
      if (this.searchValues.assignedSelect) {
        data.userName = this.searchValues.assignedSelect
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

    // 查询所有assigned
    getAllAssigned () {
      // common.getRoleUsersByRoleName('Sar', (resData) => {
      //   resData.forEach((v) => {
      //     this.assignedOptions.push({ value: v.userName, label: v.userName })
      //   })
      // })
      common.getAllAssigned('sar', (resData) => {
        resData.forEach((v) => {
          this.assignedOptions.push({ value: v, label: v })
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
      common.getHeadingFields(36,
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

    // 批量分配弹框
    batchAssign (taskId, caseId, roleId) {
      // 先清空可选择的分配人
      this.assignedOptions1 = [{ value: '', label: 'All' }]

      // roleId为英文字符串，表示小组，角色会分组， roleId为数字，表示角色
      if (roleId) {
        common.getRoleUsersById(roleId, (resData) => {
          resData.forEach((v) => {
            this.assignedOptions1.push({ value: v.userName, label: v.userName })
          })
        })
      }

      // 先清空默认id
      this.assignTaskId = ''
      this.assignAlertId = ''

      if (taskId) {
        this.assignTaskId = taskId
        this.assignCaseId = caseId
      } else {
        // 是否有勾选选项
        if (this.multipleSelection.length === 0) {
          return common.warningInfoTip('Please choose the cases to be assigned')
        }

        // 判断勾选的用户是否含有相同roleId,或则相同分组, 如果不同，提示不可分配
        let roleIds = []
        this.multipleSelection.forEach((v, i) => {
          roleIds.push(v.roleId)
        })
        console.log(roleIds)

        // 判断id数组元素是否相同
        if (!common.isAllEqual(roleIds)) {
          return common.warningInfoTip('Different roles or groups can not be assigned')
        }
        common.getRoleUsersById(roleIds[0], (resData) => {
          resData.forEach((v) => {
            this.assignedOptions1.push({ value: v.userName, label: v.userName })
          })
        })
      }

      // 重置analyst
      this.batchAssignSelect.analystSelect = ''
      this.dialogVisibleArr.dialogBatchAssign = true
    },
    // 改变表头弹框
    reArrangeHeading () {
      this.dialogVisibleArr.dialogRerangeHeading = true
    },
    // 创建alert弹框
    createAlert () {
      this.dialogVisibleArr.dialogCreateAlert = true
    },

    // 导出CSV
    exportCSV () {
      const url = `${apiPath.case.caseList.exportCase}`
      common.downloadExcel(this.searchData, url)
    },

    // 确定批量分配
    confirmBatchAssign () {
      let assignArr = []

      // 是否是单选分配
      if (this.assignTaskId) {
        assignArr.push({ taskId: this.assignTaskId, caseId: this.assignCaseId })
      } else {
        // 根据已选选项，获得要分配的taskId
        this.multipleSelection.forEach((v) => {
          assignArr.push({ taskId: v.taskId, caseId: v.caseId })
        })
      }

      // 是否选择了分析人
      if (!this.batchAssignSelect.analystSelect) {
        return common.warningInfoTip('Please choose the analyst')
      }
      const data = {
        list: assignArr,
        operator: this.batchAssignSelect.analystSelect
      }

      const loadTips = Loading.service()
      this.$ajax({
        method: 'put',
        url: `${apiPath.alert.alertList.assignAlert}`,
        data: data
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res) {
          common.successInfoTip('Assign success')
          this.dialogVisibleArr.dialogBatchAssign = false
          // 刷新列表
          this.getCaseList()
        }
      })
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

    // 创建alert成功后的回调函数 data: 发送的请求参数
    successCallBack (data) {
      console.log(data)
      this.dialogVisibleArr.dialogCreateAlert = false
      // 更新列表数据
      this.getCaseList()
    },

    // 监听弹框被点击关闭时执行的函数
    visibleCreateAlert (val) {
      this.dialogVisibleArr.dialogCreateAlert = val
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
    },

    // 合拼处理
    doMerge () {
      // 是否有勾选选项
      if (this.multipleSelection.length < 2) {
        return common.warningInfoTip('Please select the list and no less than 2 item.')
      }

      // alertId列表
      let caseIdList = []
      this.multipleSelection.forEach((v, i) => {
        caseIdList.push(v.caseId)
      })

      this.$confirm('Are you sure you want to do "Merge"?', 'Confirm', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        const loadTips = Loading.service()
        this.$ajax({
          method: 'post',
          url: `${apiPath.case.caseList.merge}`,
          data: {
            caseIdList: caseIdList
          }
        }).then(res => {
          // 去除加载
          loadTips.close()
          if (res.status === 0) {
            common.successInfoTip('Merge success')
            // 刷新列表
            this.getCaseList()
          }
        })
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
    }
  }
}
