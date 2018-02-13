import echarts from 'echarts'
import customSwitch from '@/components/common/customSwitch/custom-switch'
import common from '@/utils/common' // 引入公共脚本
import apiPath from 'rootPath/config/api.json' // 引入api.json文件
import { Loading } from 'element-ui'
require('./dashboard.scss')
const template = require('./dashboard.tpl')

export const alertDashboard = {
  template,

  name: 'alertDashboard',

  // 注册组件
  components: {
    customSwitch
  },

  data () {
    return {
      sysType: 'mantas', // 系统类型  prime/mantas(默认)
      roleId: Number(common.getRoleId()), // 当前登录用户的角色id
      roleOptions: [], // 角色列表
      toDoList: {
        roleSelected: '', // 选中角色
        date: '', // 时间段
        chartObj: '', // 图表对象
        pending: 0 // Pending处的数据
      },
      stringToArr: (str) => {
        let arr = []
        arr = str.split(',')
        return arr
      },
      allTeamsStr: (obj) => {
        let str = ''
        obj.forEach((v, k) => {
          str += `${v.userNames},`
        })
        return str.slice(0, str.length - 1)
      },
      monitoring: {
        total: '',
        avgScore: '',
        transactionAmount: '',
        transactionVolume: '',
        timeTotal: 0,
        listSwitch1: ['Visual Analysis', 'Data Report'],  // Visual Analysis/Data Report
        type1: 0,
        listSwitch2: ['Daily', 'Weekly', 'Monthly'], // Day/Mont/Week
        type2: 0,
        date: '' // 时间段
      },
      otherEchartLineStackObj1: '', // 拆线图对象
      otherEchartLineStackObj2: '', // 拆线图对象
      otherEchartLineStackObj3: '', // 拆线图对象
      otherEchartLineStackObj4: '', // 拆线图对象
      otherEchartLineStackObj11: '', // 拆线图对象
      otherEchartLineStackObj12: '', // 拆线图对象
      otherEchartLineStackObj13: '', // 拆线图对象
      otherEchartLineStackObj14: '', // 拆线图对象
      otherEchartLineStackObj21: '', // 拆线图对象
      otherEchartLineStackObj22: '', // 拆线图对象
      searchData1: null, // 用于导出CSV时的公共参数
      tableListData1: [], // 列表数据1
      tabOption1: {
        time: '',
        currentPage: 1, // 当前页
        pageSize: 5, // 每页的条数
        total: 0 // 表格总条数
      },
      searchData2: null, // 用于导出CSV时的公共参数
      tableListData2: [], // 列表数据2
      tabOption2: {
        time: '',
        currentPage: 1, // 当前页
        pageSize: 5, // 每页的条数
        total: 0 // 表格总条数
      },
      searchData3: null, // 用于导出CSV时的公共参数
      tableListData3: [], // 列表数据3
      tabOption3: {
        selectOpations: [],
        selectItem: '',
        time: '',
        currentPage: 1, // 当前页
        pageSize: 5, // 每页的条数
        total: 0 // 表格总条数
      },
      searchData4: null, // 用于导出CSV时的公共参数
      tableListData4: [], // 列表数据4
      tabOption4: {
        selectOpations: [],
        selectItem: '',
        time: '',
        currentPage: 1, // 当前页
        pageSize: 5, // 每页的条数
        total: 0 // 表格总条数
      },
      searchData5: null, // 用于导出CSV时的公共参数
      tableListData5: [], // 列表数据4
      tabOption5: {
        selectOpations: [],
        selectItem: '',
        time: '',
        currentPage: 1, // 当前页
        pageSize: 5, // 每页的条数
        total: 0 // 表格总条数
      }
    }
  },

  // 实例创建后,进行默认数据处理
  created () {
    this.sysType = common.getCookie('amlST')
  },

  // html挂载在页面后,进行数据初始化
  mounted () {
    document.title = 'Alert Dashboard'

    if (common.isLogin()) {
      // 查询分析员小组及用户集合,Alert.Supervisor和admin有权限看到此选项
      if (this.roleId === 10044 || this.roleId === 10053) {
        this.loadAnalyst()
      }

      // 初始化To do task 处的图表
      this.todoTaskEchartObj = echarts.init(document.getElementById('todoTaskPie'))
      // 加载图表数据
      this.loadTodoListChartData()

      // 点击饼状图时，跳转到特定的alert list
      this.todoTaskEchartObj.on('click', (param) => {
        // 获取相应status
        const status = param.data.status
        // 跳转至alert list页面
        this.$router.push({name: 'alertList', query: { status: status }})
      })

      // monitoring
      // 初始化拆线图
      if (this.roleId === 10044 || this.roleId === 10047 || this.roleId === 10052 || this.roleId === 10053) {
        // Alert.Supervisor和admin有权限看到此选项
        this.otherEchartLineStackObj1 = echarts.init(document.getElementById('otherEchartLineStack1'))
        this.otherEchartLineStackObj2 = echarts.init(document.getElementById('otherEchartLineStack2'))
        this.otherEchartLineStackObj3 = echarts.init(document.getElementById('otherEchartLineStack3'))
        this.otherEchartLineStackObj4 = echarts.init(document.getElementById('otherEchartLineStack4'))

        // table

        this.loadselectOpations3()
        this.loadselectOpations4()
        this.loadselectOpations5()
      } else if (this.roleId === 10042) {
        // analyst 有权限看到此选项
        this.otherEchartLineStackObj11 = echarts.init(document.getElementById('otherEchartLineStack11'))
        this.otherEchartLineStackObj12 = echarts.init(document.getElementById('otherEchartLineStack12'))
        // this.otherEchartLineStackObj13 = echarts.init(document.getElementById('otherEchartLineStack13'))
        this.otherEchartLineStackObj14 = echarts.init(document.getElementById('otherEchartLineStack14'))
      } else if (this.roleId === 10041 || this.roleId === 10043) {
        // QA 有权限看到此选项
        this.otherEchartLineStackObj21 = echarts.init(document.getElementById('otherEchartLineStack21'))
        this.otherEchartLineStackObj22 = echarts.init(document.getElementById('otherEchartLineStack22'))
      }
      this.monitoringInit()
    }
  },

  // 方法集合
  methods: {
    // 查询分析员小组
    loadAnalyst () {
      // type 可选，系统管理员才用，type=alert或sar
      let data = {
        type: 'alert'
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.dashboard.analystItem}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          this.roleOptions = res.data
        }
        // 加载角色列表 查询角色及用户集合
        // this.loadRole()
      })
    },

    // 查询角色及用户集合
    loadRole () {
      // type 可选，系统管理员才用，type=alert或sar
      let data = {
        roleId: common.getRoleId(),
        type: 'alert'
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.dashboard.rolesItem}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          let arr = []
          res.data.forEach((val, key) => {
            let obj = {
              'name': val.roleName,
              'userNames': val.userNames
            }
            arr.push(obj)
          })
          this.roleOptions = this.roleOptions.concat(arr)
        }
      })
    },

    // To-do list 选择角色 改变时处理 =====================================
    toDoListRoleChange () {
      this.loadTodoListChartData()
    },

    // 时间选择时处理
    toDoListDateChange (e) {
      this.loadTodoListChartData()
    },

    // 获得Pending
    getPending () {
      let data = {
        actorId: common.getUserId(),
        roleId: common.getRoleId()
      }

      // 如果角色列表存在值时
      if (this.toDoList.roleSelected) {
        data.param = this.toDoList.roleSelected
      }

      // 如果存在选择时间时
      if (this.toDoList.date) {
        data.createStartDate = common.formatYMD(this.toDoList.date[0], 'ch')
        data.createEndDate = common.formatYMD(this.toDoList.date[1], 'ch')
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.dashboard.getPending}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          this.toDoList.pending = res.data.total
        }
      })
    },

    // 加载图表数据
    loadTodoListChartData () {
      let data = {
        actorId: common.getUserId(),
        roleId: common.getRoleId()
      }

      // 如果角色列表存在值时
      if (this.toDoList.roleSelected) {
        data.param = this.toDoList.roleSelected
      }

      // 如果存在选择时间时
      if (this.toDoList.date) {
        data.createStartDate = common.formatYMD(this.toDoList.date[0], 'ch')
        data.createEndDate = common.formatYMD(this.toDoList.date[1], 'ch')
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.todoTaskEchartObj.showLoading()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.dashboard.getInfo}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        this.todoTaskEchartObj.hideLoading()
        if (res.status === 0 && res.data) {
          const legendData = []
          const seriesData = []
          if (res.data.length > 0) {
            // 总值, 为了处理显示百分比
            let allValue = 0
            res.data.forEach((val, key) => {
              allValue += val.value
            })
            // 处理数据结构
            res.data.forEach((val, key) => {
              // value值
              let v = val.value
              // 百分比
              const r = (v / allValue * 100).toFixed(2) + '%'
              // 名称 name
              const n = `${val.name} -- ${v} (${r})`
              legendData.push(n)
              let obj = {
                'value': v,
                'name': n,
                'status': val.status
              }
              seriesData.push(obj)
            })
          }
          this.todoListPieData(legendData, seriesData)
        }
      })
      // Pending
      this.getPending()
    },

    // 图表参数
    todoListPieData (legendData, seriesData) {
      this.todoTaskEchartObj.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{d}% <br/>{b}'
        },
        legend: {
          left: '33%',
          bottom: '10%',
          data: legendData,
          formatter: [
            '{a| {name}}'
          ].join('\n'),
          textStyle: {
            rich: {
              a: {
                width: 400
              }
            }
          }
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '80%'],
            center: ['16%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false
                // formatter: '{a|{d}%}\n{b}',
                // rich: {
                //   a: {
                //     fontSize: 16,
                //     lineHeight: 30
                //   }
                // }
              }
              // emphasis: {
              //   show: true
              // }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: seriesData
          }
        ]
      })
    },

    // 加载 Monitoring =====================================================
    monitoringInit () {
      this.loadMonitoringTotal()
      this.loadMonitoringAvgScore()

      if (this.roleId === 10044 || this.roleId === 10047 || this.roleId === 10052 || this.roleId === 10053) {
        this.loadMonitoringAmountVolume()
        // Alert.Supervisor和admin有权限看到此选项
        this.loadOtherLegendData1()
        this.loadOtherLegendData2()
        this.loadOtherLegendData3()
        this.loadOtherLegendData4()

        // table
        this.loadTableLIst1()
        this.loadTableLIst2()
        this.loadTableLIst3()
        this.loadTableLIst4()
        this.loadTableLIst5()
      } else if (this.roleId === 10042) {
        this.loadMonitoringTimeTotal()
        // analyst 有权限看到此选项
        this.loadOtherLegendData11()
        this.loadOtherLegendData12()
        // this.loadOtherLegendData13()
        this.loadOtherLegendData14()
      } else if (this.roleId === 10041 || this.roleId === 10043) {
        this.loadMonitoringTimeTotal()
        // QA 有权限看到此选项
        this.loadOtherLegendData21()
        this.loadOtherLegendData22()
      }
    },

    // Visual Analysis/Data Report -- tab
    typeSwitchTab (obj) {
      this.monitoring.type1 = obj.key
    },

    // Day/Mont/Week
    typeSwitch2 (obj) {
      this.monitoring.type2 = obj.key
      const end = new Date()
      const start = new Date()
      if (this.monitoring.type2 === 2) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
      } else if (this.monitoring.type2 === 1) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      } else if (this.monitoring.type2 === 0) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      }
      this.$set(this.monitoring, 'date', [start, end])
      this.monitoringInit()
    },

    // 时间选择时处理
    monitoringDateChange (e) {
      this.monitoringInit()
    },

    // The total number of case reviewed
    loadMonitoringTotal () {
      let data = {
        actorId: common.getUserId(),
        roleId: common.getRoleId()
      }
      // 如果存在选择时间时
      if (this.monitoring.date) {
        data.createStartDate = common.formatYMD(this.monitoring.date[0], 'ch')
        data.createEndDate = common.formatYMD(this.monitoring.date[1], 'ch')
      }
      const dataUrl = common.getDataToUrl(data)
      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.dashboard.monitoring.total}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          this.monitoring.total = res.data.total
        }
      })
    },
    // Average score for the case QA reviewed
    loadMonitoringAvgScore () {
      let data = {
        actorId: common.getUserId(),
        roleId: common.getRoleId()
      }
      // 如果存在选择时间时
      if (this.monitoring.date) {
        data.createStartDate = common.formatYMD(this.monitoring.date[0], 'ch')
        data.createEndDate = common.formatYMD(this.monitoring.date[1], 'ch')
      }
      const dataUrl = common.getDataToUrl(data)
      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.dashboard.monitoring.avgScore}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          this.monitoring.avgScore = res.data.num
        }
      })
    },
    // The total transaction amount/volume
    loadMonitoringAmountVolume () {
      let data = {
        actorId: common.getUserId(),
        roleId: common.getRoleId()
      }
      // 如果存在选择时间时
      if (this.monitoring.date) {
        data.createStartDate = common.formatYMD(this.monitoring.date[0], 'ch')
        data.createEndDate = common.formatYMD(this.monitoring.date[1], 'ch')
      }
      const dataUrl = common.getDataToUrl(data)
      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.dashboard.monitoring.amountVolume}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          this.monitoring.transactionAmount = res.data.amount
          this.monitoring.transactionVolume = res.data.volume
        }
      })
    },

    // 时间 Average QA review time per alert
    loadMonitoringTimeTotal () {
      let data = {
        actorId: common.getUserId(),
        roleId: common.getRoleId()
      }
      // 如果存在选择时间时
      if (this.monitoring.date) {
        data.createStartDate = common.formatYMD(this.monitoring.date[0], 'ch')
        data.createEndDate = common.formatYMD(this.monitoring.date[1], 'ch')
      }
      const dataUrl = common.getDataToUrl(data)
      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.dashboard.monitoring.timeTotal}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          this.monitoring.timeTotal = res.data.total
        }
      })
    },

    // Alert-Supervisor... ==================
    // 加载拆线图表数据
    loadOtherLegendData1 () {
      // type => 0 : Daily 1 : Weekly 2 : Monthly
      const getType = this.monitoring.type2
      let data = {
        actorId: common.getUserId(),
        roleId: common.getRoleId(),
        type: getType
      }

      // 如果存在选择时间时
      if (this.monitoring.date) {
        data.createStartDate = common.formatYMD(this.monitoring.date[0], 'ch')
        data.createEndDate = common.formatYMD(this.monitoring.date[1], 'ch')
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.otherEchartLineStackObj1.showLoading()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.dashboard.monitoringChart.reversedFoldLine}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res && res.data) {
          const dataInfo = res.data
          const listData = dataInfo.list
          const legendData = dataInfo.title
          const seriesData = []
          const xAxisData = []
          if (listData.length > 0) {
            listData.forEach((val, key) => {
              let seriesDataArr = []
              if (val.length > 0) {
                val.forEach((v, k) => {
                  if (key === 0) {
                    // x 轴的值
                    xAxisData.push(common.getXAxisDataItem(getType, v))
                  }
                  seriesDataArr.push(v.value)
                })
                let obj = {
                  name: legendData[key],
                  type: 'line',
                  data: seriesDataArr
                }
                seriesData.push(obj)
              }
            })
          }
          this.otherEchartLineStack2(this.otherEchartLineStackObj1, legendData, seriesData, xAxisData)
        }
      })
    },

    loadOtherLegendData2 () {
      // type => 0 : Daily 1 : Weekly 2 : Monthly
      const getType = this.monitoring.type2
      let data = {
        actorId: common.getUserId(),
        roleId: common.getRoleId(),
        type: getType
      }

      // 如果存在选择时间时
      if (this.monitoring.date) {
        data.createStartDate = common.formatYMD(this.monitoring.date[0], 'ch')
        data.createEndDate = common.formatYMD(this.monitoring.date[1], 'ch')
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.otherEchartLineStackObj2.showLoading()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.dashboard.monitoringChart.averageFoldLine}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res && res.data) {
          const dataInfo = res.data
          const listData = dataInfo.list
          const legendData = dataInfo.title
          const seriesData = []
          const xAxisData = []
          if (listData.length > 0) {
            listData.forEach((val, key) => {
              let seriesDataArr = []
              if (val.length > 0) {
                val.forEach((v, k) => {
                  if (key === 0) {
                    // x 轴的值
                    xAxisData.push(common.getXAxisDataItem(getType, v))
                  }
                  seriesDataArr.push(v.value)
                })
                let obj = {
                  name: legendData[key],
                  type: 'line',
                  data: seriesDataArr
                }
                seriesData.push(obj)
              }
            })
          }
          this.otherEchartLineStack3(this.otherEchartLineStackObj2, legendData, seriesData, xAxisData)
        }
      })
    },

    loadOtherLegendData3 () {
      // type => 0 : Daily 1 : Weekly 2 : Monthly
      const getType = this.monitoring.type2
      let data = {
        actorId: common.getUserId(),
        roleId: common.getRoleId(),
        type: getType
      }

      // 如果存在选择时间时
      if (this.monitoring.date) {
        data.createStartDate = common.formatYMD(this.monitoring.date[0], 'ch')
        data.createEndDate = common.formatYMD(this.monitoring.date[1], 'ch')
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.otherEchartLineStackObj3.showLoading()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.dashboard.monitoringChart.rateFoldLine}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res && res.data) {
          const dataInfo = res.data
          const listData = dataInfo.list
          const legendData = dataInfo.title
          const seriesData = []
          const xAxisData = []
          if (listData.length > 0) {
            listData.forEach((val, key) => {
              let seriesDataArr = []
              if (val.length > 0) {
                val.forEach((v, k) => {
                  if (key === 0) {
                    // x 轴的值
                    xAxisData.push(common.getXAxisDataItem(getType, v))
                  }
                  seriesDataArr.push(v.value)
                })
                let obj = {
                  name: legendData[key],
                  type: 'line',
                  data: seriesDataArr
                }
                seriesData.push(obj)
              }
            })
          }
          this.otherEchartLineStack2(this.otherEchartLineStackObj3, legendData, seriesData, xAxisData)
        }
      })
    },

    loadOtherLegendData4 () {
      // type => 0 : Daily 1 : Weekly 2 : Monthly
      const getType = this.monitoring.type2
      let data = {
        actorId: common.getUserId(),
        roleId: common.getRoleId(),
        type: getType
      }

      // 如果存在选择时间时
      if (this.monitoring.date) {
        data.createStartDate = common.formatYMD(this.monitoring.date[0], 'ch')
        data.createEndDate = common.formatYMD(this.monitoring.date[1], 'ch')
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.otherEchartLineStackObj4.showLoading()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.dashboard.monitoringChart.escalatedFoldLine}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res && res.data) {
          const dataInfo = res.data
          const listData = dataInfo.list
          const legendData = dataInfo.title
          const seriesData = []
          const xAxisData = []
          if (listData.length > 0) {
            listData.forEach((val, key) => {
              let seriesDataArr = []
              if (val.length > 0) {
                val.forEach((v, k) => {
                  if (key === 0) {
                    // x 轴的值
                    xAxisData.push(common.getXAxisDataItem(getType, v))
                  }
                  seriesDataArr.push(v.value)
                })
                let obj = {
                  name: legendData[key],
                  type: 'line',
                  data: seriesDataArr
                }
                seriesData.push(obj)
              }
            })
          }
          this.otherEchartLineStack2(this.otherEchartLineStackObj4, legendData, seriesData, xAxisData)
        }
      })
    },

    loadOtherLegendData11 () {
      // type => 0 : Daily 1 : Weekly 2 : Monthly
      const getType = this.monitoring.type2
      let data = {
        actorId: common.getUserId(),
        roleId: common.getRoleId(),
        type: getType
      }

      // 如果存在选择时间时
      if (this.monitoring.date) {
        data.createStartDate = common.formatYMD(this.monitoring.date[0], 'ch')
        data.createEndDate = common.formatYMD(this.monitoring.date[1], 'ch')
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.otherEchartLineStackObj11.showLoading()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.dashboard.monitoringChart.analystEscalationRateTeamFoldLine}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res && res.data) {
          const dataInfo = res.data
          const listData = dataInfo.list
          const legendData = dataInfo.title
          const seriesData = []
          const xAxisData = []
          if (listData.length > 0) {
            listData.forEach((val, key) => {
              let seriesDataArr = []
              if (val.length > 0) {
                val.forEach((v, k) => {
                  if (key === 0) {
                    // x 轴的值
                    xAxisData.push(common.getXAxisDataItem(getType, v))
                  }
                  seriesDataArr.push(v.value)
                })
                let obj = {
                  name: legendData[key],
                  type: 'line',
                  data: seriesDataArr
                }
                seriesData.push(obj)
              }
            })
          }
          this.otherEchartLineStack2(this.otherEchartLineStackObj11, legendData, seriesData, xAxisData)
        }
      })
    },

    loadOtherLegendData12 () {
      // type => 0 : Daily 1 : Weekly 2 : Monthly
      const getType = this.monitoring.type2
      let data = {
        actorId: common.getUserId(),
        roleId: common.getRoleId(),
        type: getType
      }

      // 如果存在选择时间时
      if (this.monitoring.date) {
        data.createStartDate = common.formatYMD(this.monitoring.date[0], 'ch')
        data.createEndDate = common.formatYMD(this.monitoring.date[1], 'ch')
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.otherEchartLineStackObj12.showLoading()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.dashboard.monitoringChart.analystReversedFoldLine}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res && res.data) {
          const dataInfo = res.data
          const listData = dataInfo.list
          const legendData = dataInfo.title
          const seriesData = []
          const xAxisData = []
          if (listData.length > 0) {
            listData.forEach((val, key) => {
              let seriesDataArr = []
              if (val.length > 0) {
                val.forEach((v, k) => {
                  if (key === 0) {
                    // x 轴的值
                    xAxisData.push(common.getXAxisDataItem(getType, v))
                  }
                  seriesDataArr.push(v.value)
                })
                let obj = {
                  name: legendData[key],
                  type: 'line',
                  data: seriesDataArr
                }
                seriesData.push(obj)
              }
            })
          }
          this.otherEchartLineStack2(this.otherEchartLineStackObj12, legendData, seriesData, xAxisData)
        }
      })
    },

    loadOtherLegendData13 () {
      // type => 0 : Daily 1 : Weekly 2 : Monthly
      const getType = this.monitoring.type2
      let data = {
        actorId: common.getUserId(),
        roleId: common.getRoleId(),
        type: getType
      }

      // 如果存在选择时间时
      if (this.monitoring.date) {
        data.createStartDate = common.formatYMD(this.monitoring.date[0], 'ch')
        data.createEndDate = common.formatYMD(this.monitoring.date[1], 'ch')
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.otherEchartLineStackObj13.showLoading()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.dashboard.monitoringChart.analystWaivedRateTeamFoldLine}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res && res.data) {
          const dataInfo = res.data
          const listData = dataInfo.list
          const legendData = dataInfo.title
          const seriesData = []
          const xAxisData = []
          if (listData.length > 0) {
            listData.forEach((val, key) => {
              let seriesDataArr = []
              if (val.length > 0) {
                val.forEach((v, k) => {
                  if (key === 0) {
                    // x 轴的值
                    xAxisData.push(common.getXAxisDataItem(getType, v))
                  }
                  seriesDataArr.push(v.value)
                })
                let obj = {
                  name: legendData[key],
                  type: 'line',
                  data: seriesDataArr
                }
                seriesData.push(obj)
              }
            })
          }
          this.otherEchartLineStack2(this.otherEchartLineStackObj13, legendData, seriesData, xAxisData)
        }
      })
    },

    loadOtherLegendData14 () {
      // type => 0 : Daily 1 : Weekly 2 : Monthly
      const getType = this.monitoring.type2
      let data = {
        actorId: common.getUserId(),
        roleId: common.getRoleId(),
        type: getType
      }

      // 如果存在选择时间时
      if (this.monitoring.date) {
        data.createStartDate = common.formatYMD(this.monitoring.date[0], 'ch')
        data.createEndDate = common.formatYMD(this.monitoring.date[1], 'ch')
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.otherEchartLineStackObj14.showLoading()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.dashboard.monitoringChart.analystAverageFoldLine}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res && res.data) {
          const dataInfo = res.data
          const listData = dataInfo.list
          const legendData = dataInfo.title
          const seriesData = []
          const xAxisData = []
          if (listData.length > 0) {
            listData.forEach((val, key) => {
              let seriesDataArr = []
              if (val.length > 0) {
                val.forEach((v, k) => {
                  if (key === 0) {
                    // x 轴的值
                    xAxisData.push(common.getXAxisDataItem(getType, v))
                  }
                  seriesDataArr.push(v.value)
                })
                let obj = {
                  name: legendData[key],
                  type: 'line',
                  data: seriesDataArr
                }
                seriesData.push(obj)
              }
            })
          }
          this.otherEchartLineStack(this.otherEchartLineStackObj14, legendData, seriesData, xAxisData)
        }
      })
    },

    loadOtherLegendData21 () {
      // type => 0 : Daily 1 : Weekly 2 : Monthly
      const getType = this.monitoring.type2
      let data = {
        actorId: common.getUserId(),
        roleId: common.getRoleId(),
        type: getType
      }

      // 如果存在选择时间时
      if (this.monitoring.date) {
        data.createStartDate = common.formatYMD(this.monitoring.date[0], 'ch')
        data.createEndDate = common.formatYMD(this.monitoring.date[1], 'ch')
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.otherEchartLineStackObj21.showLoading()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.dashboard.monitoringChart.qaReversedFoldLine}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res && res.data) {
          const dataInfo = res.data
          const listData = dataInfo.list
          const legendData = dataInfo.title
          const seriesData = []
          const xAxisData = []
          if (listData.length > 0) {
            listData.forEach((val, key) => {
              let seriesDataArr = []
              if (val.length > 0) {
                val.forEach((v, k) => {
                  if (key === 0) {
                    // x 轴的值
                    xAxisData.push(common.getXAxisDataItem(getType, v))
                  }
                  seriesDataArr.push(v.value)
                })
                let obj = {
                  name: legendData[key],
                  type: 'line',
                  data: seriesDataArr
                }
                seriesData.push(obj)
              }
            })
          }
          this.otherEchartLineStack2(this.otherEchartLineStackObj21, legendData, seriesData, xAxisData)
        }
      })
    },

    loadOtherLegendData22 () {
      // type => 0 : Daily 1 : Weekly 2 : Monthly
      const getType = this.monitoring.type2
      let data = {
        actorId: common.getUserId(),
        roleId: common.getRoleId(),
        type: getType
      }

      // 如果存在选择时间时
      if (this.monitoring.date) {
        data.createStartDate = common.formatYMD(this.monitoring.date[0], 'ch')
        data.createEndDate = common.formatYMD(this.monitoring.date[1], 'ch')
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.otherEchartLineStackObj22.showLoading()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.dashboard.monitoringChart.qaAverageTeamFoldLine}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res && res.data) {
          const dataInfo = res.data
          const listData = dataInfo.list
          const legendData = dataInfo.title
          const seriesData = []
          const xAxisData = []
          if (listData.length > 0) {
            listData.forEach((val, key) => {
              let seriesDataArr = []
              if (val.length > 0) {
                val.forEach((v, k) => {
                  if (key === 0) {
                    // x 轴的值
                    xAxisData.push(common.getXAxisDataItem(getType, v))
                  }
                  seriesDataArr.push(v.value)
                })
                let obj = {
                  name: legendData[key],
                  type: 'line',
                  data: seriesDataArr
                }
                seriesData.push(obj)
              }
            })
          }
          this.otherEchartLineStack2(this.otherEchartLineStackObj22, legendData, seriesData, xAxisData)
        }
      })
    },

    // 拆线图表参数
    otherEchartLineStack (curObj, legendData, seriesData, xAxisData) {
      curObj.hideLoading()
      curObj.setOption({
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
          right: 0,
          data: legendData
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {
              show: false
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: seriesData
      })
    },

    // 拆线图表参数 百分比
    otherEchartLineStack2 (curObj, legendData, seriesData, xAxisData) {
      curObj.hideLoading()
      curObj.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
            // label: {
            //   formatter: '{value}%'
            // }
          },
          formatter: function (params) {
            params = params[0]
            return params.axisValue + '<br/>' + params.seriesName + ' : ' + params.data + '%'
          }
        },
        legend: {
          right: 0,
          data: legendData
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {
              show: false
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxisData
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 100,
          axisLabel: {
            formatter: '{value}%'
          }
        },
        series: seriesData
      })
    },

    // 拆线图表参数 分
    otherEchartLineStack3 (curObj, legendData, seriesData, xAxisData) {
      curObj.hideLoading()
      curObj.setOption({
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
          right: 0,
          data: legendData
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {
              show: false
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxisData
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}Min'
          }
        },
        series: seriesData
      })
    },

    // tab1 ===============================
    loadTableLIst1 () {
      // 清空搜索条件
      this.searchData1 = null

      this.tableListData1 = []
      this.tabOption1.total = 400
    },

    // 时间
    tabTimeChange1 (e) {
      if (e !== null) {
        console.log(e)
      }
    },

    handleSizeChange1 (val) {
      console.log(`每页 ${val} 条`)
      this.tabOption1.pageSize = val
      // 改变每页条数改变列表
      this.loadTableLIst1()
    },
    handleCurrentChange1 (val) {
      this.tabOption1.currentPage = val
      // 改变页码改变列表
      this.loadTableLIst1()
    },

    // 打印
    print1 () {
      console.log('print1')
    },

    // 导出CSV
    exportCSV1 () {
      console.log('exportCSV1')
    },

    // tab2 ===============================
    loadTableLIst2 () {
      // 清空搜索条件
      this.searchData2 = null

      this.tableListData2 = []
      this.tabOption2.total = 400
    },

    // 时间
    tabTimeChange2 (e) {
      if (e !== null) {
        console.log(e)
      }
    },

    handleSizeChange2 (val) {
      console.log(`每页 ${val} 条`)
      this.tabOption2.pageSize = val
      // 改变每页条数改变列表
      this.loadTableLIst2()
    },
    handleCurrentChange2 (val) {
      this.tabOption2.currentPage = val
      // 改变页码改变列表
      this.loadTableLIst2()
    },

    // 打印
    print2 () {
      console.log('print2')
    },

    // 导出CSV
    exportCSV2 () {
      console.log('exportCSV2')
    },

    // tab3 ===============================
    loadselectOpations3 () {
      this.tabOption3.selectOpations = [
        {value: 0, label: 'The total number of alerts reviewed'},
        {value: 1, label: 'Escalation Rate'},
        {value: 2, label: 'Total number of productive alerts escalated each month'},
        // {value: 3, label: 'Total transaction volume each month'},
        // {value: 4, label: 'Total transaction amount each month'},
        {value: 5, label: 'Percentage of alert reviewed reversed by QA'}
      ]
      this.tabOption3.selectItem = this.tabOption3.selectOpations[0].value
    },
    loadTableLIst3 () {
      // 清空搜索条件
      this.searchData3 = null

      let data = {
        actorId: common.getUserId(),
        roleId: common.getRoleId(),
        pageSize: this.tabOption3.pageSize,
        pageNum: this.tabOption3.currentPage
      }

      // 如果存在选择时间时
      // if (this.tabOption3.date) {
      //   data.createStartDate = this.tabOption3.date[0]
      //   data.createEndDate = this.tabOption3.date[1]
      // }

      // 保存搜索条件
      this.searchData3 = common.cloneObject(data)
      const dataUrl = common.getDataToUrl(data)

      let sendUrl = ''
      if (this.tabOption3.selectItem === 0) {
        sendUrl = `${apiPath.alert.dashboard.monitoring.totalByMonth}?${dataUrl}`
      } else if (this.tabOption3.selectItem === 1) {
        sendUrl = `${apiPath.alert.dashboard.monitoring.rate}?${dataUrl}`
      } else if (this.tabOption3.selectItem === 2) {
        sendUrl = `${apiPath.alert.dashboard.monitoring.escalated}?${dataUrl}`
      } else if (this.tabOption3.selectItem === 3) {
        sendUrl = `${apiPath.alert.dashboard.monitoring.volumeByMonth}?${dataUrl}`
      } else if (this.tabOption3.selectItem === 4) {
        sendUrl = `${apiPath.alert.dashboard.monitoring.amountByMonth}?${dataUrl}`
      } else if (this.tabOption3.selectItem === 5) {
        sendUrl = `${apiPath.alert.dashboard.monitoring.reversed}?${dataUrl}`
      }

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: sendUrl
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res && res.data) {
          this.tableListData3 = res.data
          this.tabOption3.total = res.total
        }
      })
    },

    selectTitleChange3 () {
      this.loadTableLIst3()
    },

    // 时间
    tabTimeChange3 (e) {
      this.loadTableLIst3()
    },

    handleSizeChange3 (val) {
      this.tabOption3.pageSize = val
      // 改变每页条数改变列表
      this.loadTableLIst3()
    },
    handleCurrentChange3 (val) {
      this.tabOption3.currentPage = val
      // 改变页码改变列表
      this.loadTableLIst3()
    },

    // 打印
    print3 () {
      console.log('print3')
    },

    // 导出CSV
    exportCSV3 () {
      let sendUrl = ''
      if (this.tabOption3.selectItem === 0) {
        sendUrl = `${apiPath.alert.dashboard.monitoring.downTotalByMonth}`
      } else if (this.tabOption3.selectItem === 1) {
        sendUrl = `${apiPath.alert.dashboard.monitoring.downRate}`
      } else if (this.tabOption3.selectItem === 2) {
        sendUrl = `${apiPath.alert.dashboard.monitoring.downEscalated}`
      } else if (this.tabOption3.selectItem === 3) {
        sendUrl = `${apiPath.alert.dashboard.monitoring.downVolumeByMonth}`
      } else if (this.tabOption3.selectItem === 4) {
        sendUrl = `${apiPath.alert.dashboard.monitoring.downAmountByMonth}`
      } else if (this.tabOption3.selectItem === 5) {
        sendUrl = `${apiPath.alert.dashboard.monitoring.downReversed}`
      }
      common.downloadExcel(this.searchData3, sendUrl)
    },

    // tab4 ===============================
    loadselectOpations4 () {
      this.tabOption4.selectOpations = [
        {value: 0, label: 'Average review time per alert'},
        {value: 1, label: 'Average QA review time per alert'}
      ]
      this.tabOption4.selectItem = this.tabOption4.selectOpations[0].value
    },
    loadTableLIst4 () {
      // 清空搜索条件
      this.searchData4 = null

      let data = {
        actorId: common.getUserId(),
        roleId: common.getRoleId(),
        pageSize: this.tabOption4.pageSize,
        pageNum: this.tabOption4.currentPage
      }

      // 如果存在选择时间时
      // if (this.tabOption4.date) {
      //   data.createStartDate = this.tabOption4.date[0]
      //   data.createEndDate = this.tabOption4.date[1]
      // }

      // 保存搜索条件
      this.searchData4 = common.cloneObject(data)
      const dataUrl = common.getDataToUrl(data)

      let sendUrl = ''
      if (this.tabOption4.selectItem === 0) {
        sendUrl = `${apiPath.alert.dashboard.monitoring.reviewTime}?${dataUrl}`
      } else if (this.tabOption4.selectItem === 1) {
        sendUrl = `${apiPath.alert.dashboard.monitoring.reviewTimeQA}?${dataUrl}`
      }

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: sendUrl
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res && res.data) {
          this.tableListData4 = res.data
          this.tabOption4.total = res.total
        }
      })
    },

    selectTitleChange4 () {
      this.loadTableLIst4()
    },

    // 时间
    tabTimeChange4 (e) {
      this.loadTableLIst4()
    },

    handleSizeChange4 (val) {
      this.tabOption4.pageSize = val
      // 改变每页条数改变列表
      this.loadTableLIst4()
    },
    handleCurrentChange4 (val) {
      this.tabOption4.currentPage = val
      // 改变页码改变列表
      this.loadTableLIst4()
    },

    // 打印
    print4 () {
      console.log('print4')
    },

    // 导出CSV
    exportCSV4 () {
      let sendUrl = ''
      if (this.tabOption4.selectItem === 0) {
        sendUrl = `${apiPath.alert.dashboard.monitoring.downReviewTime}`
      } else if (this.tabOption4.selectItem === 1) {
        sendUrl = `${apiPath.alert.dashboard.monitoring.downReviewTimeQA}`
      }
      common.downloadExcel(this.searchData4, sendUrl)
    },

    // tab5 ===============================
    loadselectOpations5 () {
      this.tabOption5.selectOpations = [
        {value: 'FIU', label: 'Total number of alerts for FIU review'},
        {value: 'FCB', label: 'Total number of alerts for FCB review'},
        {value: 'DC', label: 'Total number of alerts for DCT review'},
        {value: 'CTR', label: 'Total number of alerts for CTR review'}
      ]
      this.tabOption5.selectItem = this.tabOption5.selectOpations[0].value
    },
    loadTableLIst5 () {
      // 清空搜索条件
      this.searchData5 = null

      let data = {
        actorId: common.getUserId(),
        roleId: common.getRoleId(),
        pageSize: this.tabOption5.pageSize,
        pageNum: this.tabOption5.currentPage,
        org: this.tabOption5.selectItem
      }

      // 如果存在选择时间时
      // if (this.tabOption5.date) {
      //   data.createStartDate = this.tabOption5.date[0]
      //   data.createEndDate = this.tabOption5.date[1]
      // }

      // 保存搜索条件
      this.searchData5 = common.cloneObject(data)
      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.alert.dashboard.monitoring.review}?${dataUrl}`
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res && res.data) {
          this.tableListData5 = res.data
          this.tabOption5.total = res.total
          // console.log(this.tableListData5)
        }
      })
    },

    selectTitleChange5 () {
      this.loadTableLIst5()
    },

    // 时间
    tabTimeChange5 (e) {
      this.loadTableLIst5()
    },

    handleSizeChange5 (val) {
      this.tabOption5.pageSize = val
      // 改变每页条数改变列表
      this.loadTableLIst5()
    },
    handleCurrentChange5 (val) {
      this.tabOption5.currentPage = val
      // 改变页码改变列表
      this.loadTableLIst5()
    },

    // 打印
    print5 () {
      console.log('print5')
    },

    // 导出CSV
    exportCSV5 () {
      common.downloadExcel(this.searchData5, apiPath.alert.dashboard.monitoring.downReview)
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
    }
  }
}
