import echarts from 'echarts'
import customSwitch from '@/components/common/customSwitch/custom-switch'
import common from '@/utils/common' // 引入公共脚本
import apiPath from 'rootPath/config/api.json' // 引入api.json文件
import { Loading } from 'element-ui'
require('./visual-analysis.scss')
const template = require('./visual-analysis.tpl')
const mockData = require('@/data/reportVisualAnalysisMockData')  // 导入模拟数据

export const reportVisualAnalysis = {
  template,

  // 注册组件
  components: {
    customSwitch
  },

  data () {
    return {
      chartOption1: {  // 图表1
        listSwitch: ['Daily', 'Weekly', 'Monthly'],
        activeIndex: 2,
        obj: '',
        date: ''
      },
      chartOption2: {  // 图表2
        listSwitch: ['Daily', 'Weekly', 'Monthly'],
        activeIndex: 2,
        obj: '',
        date: ''
      },
      chartOption3: {  // 图表3
        listSwitch: ['Daily', 'Weekly', 'Monthly'],
        activeIndex: 2,
        obj: '',
        date: ''
      },
      chartOption4: {  // 图表4
        listSwitch: ['Daily', 'Weekly', 'Monthly'],
        activeIndex: 2,
        obj: '',
        date: ''
      },
      chartOption5: {  // 图表5
        listSwitch: ['Daily', 'Weekly', 'Monthly'],
        activeIndex: 2,
        obj: '',
        date: '',
        options: [1, 2, 3, 4],
        num: 1
      },
      chartOption6: {  // 图表6
        listSwitch: ['Daily', 'Weekly', 'Monthly'],
        activeIndex: 2,
        obj: '',
        date: ''
      },
      chartOption7: {  // 图表7
        listSwitch: ['Daily', 'Weekly', 'Monthly'],
        activeIndex: 2,
        obj: '',
        date: ''
      }
    }
  },

  // 实例创建后,进行默认数据处理
  created () {},

  // html挂载在页面后,进行数据初始化
  mounted () {
    document.title = 'Visual Analysis'

    // 初始化拆线图1
    this.chartOption1.obj = echarts.init(document.getElementById('chart1'))
    this.loadChartData1()

    // 初始化拆线图2
    this.chartOption2.obj = echarts.init(document.getElementById('chart2'))
    this.loadChartData2()

    // 初始化拆线图3
    this.chartOption3.obj = echarts.init(document.getElementById('chart3'))
    this.loadChartData3()

    // 初始化拆线图4
    this.chartOption4.obj = echarts.init(document.getElementById('chart4'))
    this.loadChartData4()

    // // 初始化拆线图5
    this.chartOption5.obj = echarts.init(document.getElementById('chart5'))
    this.loadChartData5()

    // 初始化拆线图6
    this.chartOption6.obj = echarts.init(document.getElementById('chart6'))
    this.loadChartData6()

    // 初始化拆线图7
    this.chartOption7.obj = echarts.init(document.getElementById('chart7'))
    this.loadChartData7()
  },

  // 方法集合
  methods: {
    // 加载图表1=========================================
    loadChartData1 () {
      const getType = this.chartOption1.activeIndex
      let data = {
        type: getType
      }

      // 如果存在选择时间时
      if (this.chartOption1.date) {
        data.createStartDate = common.formatYMD(this.chartOption1.date[0], 'ch')
        data.createEndDate = common.formatYMD(this.chartOption1.date[1], 'ch')
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.chartOption1.obj.showLoading()
      this.$ajax({
        method: 'get',
        url: `${apiPath.report.VA.getTrend}?${dataUrl}`
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
          this.chartLineStack2(this.chartOption1.obj, legendData, seriesData, xAxisData)
        }
      })
    },

    // Day,Mont,Week
    chartSwitch1 (obj) {
      let getType = obj.key
      // 如果改变时处理
      this.chartOption1.activeIndex = getType
      const end = new Date()
      const start = new Date()
      if (getType === 2) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
      } else if (getType === 1) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      } else if (getType === 0) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      }
      this.$set(this.chartOption1, 'date', [start, end])
      this.loadChartData1()
    },

    // 时间
    chartTimeChange1 (e) {
      this.loadChartData1()
    },

    // 加载图表2=========================================
    loadChartData2 () {
      const getType = this.chartOption2.activeIndex
      let data = {
        type: getType
      }

      // 如果存在选择时间时
      if (this.chartOption2.date) {
        data.createStartDate = common.formatYMD(this.chartOption2.date[0], 'ch')
        data.createEndDate = common.formatYMD(this.chartOption2.date[1], 'ch')
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.chartOption2.obj.showLoading()
      this.$ajax({
        method: 'get',
        url: `${apiPath.report.VA.getYield}?${dataUrl}`
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
                  type: 'bar',
                  data: seriesDataArr
                }
                seriesData.push(obj)
              }
            })
          }
          this.chartLineStack2(this.chartOption2.obj, legendData, seriesData, xAxisData)
        }
      })
    },

    // Day,Mont,Week
    chartSwitch2 (obj) {
      let getType = obj.key
      // 如果改变时处理
      this.chartOption2.activeIndex = getType
      const end = new Date()
      const start = new Date()
      if (getType === 2) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
      } else if (getType === 1) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      } else if (getType === 0) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      }
      this.$set(this.chartOption2, 'date', [start, end])
      this.loadChartData2()
    },

    // 时间
    chartTimeChange2 (e) {
      this.loadChartData2()
    },

    // 加载图表3=========================================
    loadChartData3 () {
      const getType = this.chartOption3.activeIndex
      let data = {
        type: getType
      }

      // 如果存在选择时间时
      if (this.chartOption3.date) {
        data.createStartDate = common.formatYMD(this.chartOption3.date[0], 'ch')
        data.createEndDate = common.formatYMD(this.chartOption3.date[1], 'ch')
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.chartOption3.obj.showLoading()
      this.$ajax({
        method: 'get',
        url: `${apiPath.report.VA.getTrendTotal}?${dataUrl}`
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
          this.chartLineStack2(this.chartOption3.obj, legendData, seriesData, xAxisData)
        }
      })
    },

    // Day,Mont,Week
    chartSwitch3 (obj) {
      let getType = obj.key
      // 如果改变时处理
      this.chartOption3.activeIndex = getType
      const end = new Date()
      const start = new Date()
      if (getType === 2) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
      } else if (getType === 1) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      } else if (getType === 0) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      }
      this.$set(this.chartOption3, 'date', [start, end])
      this.loadChartData3()
    },

    // 时间
    chartTimeChange3 (e) {
      this.loadChartData3()
    },

    // 加载图表4=========================================
    loadChartData4 () {
      this.chartOption4.obj.showLoading()
      const chartLegendData4 = mockData.chartLegendData4
      const chartSeriesData4 = mockData.chartSeriesData4
      const xAxisData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
      this.chartLineStack(this.chartOption4.obj, chartLegendData4, chartSeriesData4, xAxisData)
    },

    // Day,Mont,Week
    chartSwitch4 (obj) {
      // 如果改变时处理
      this.chartOption4.activeIndex = obj.key
    },

    // 时间
    chartTimeChange4 (e) {
      if (e !== null) {
        console.log(e)
      }
    },

    // 加载图表5=========================================
    loadChartData5 () {
      const getType = this.chartOption5.activeIndex
      let data = {
        type: getType,
        number: this.chartOption5.num
      }

      // 如果存在选择时间时
      if (this.chartOption5.date) {
        data.createStartDate = common.formatYMD(this.chartOption5.date[0], 'ch')
        data.createEndDate = common.formatYMD(this.chartOption5.date[1], 'ch')
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.chartOption5.obj.showLoading()
      this.$ajax({
        method: 'get',
        url: `${apiPath.report.VA.getStatisCust}?${dataUrl}`
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
                  type: 'bar',
                  data: seriesDataArr
                }
                seriesData.push(obj)
              }
            })
          }
          this.chartLineStack2(this.chartOption5.obj, legendData, seriesData, xAxisData)
        }
      })
    },

    // Day,Mont,Week
    chartSwitch5 (obj) {
      let getType = obj.key
      // 如果改变时处理
      this.chartOption5.activeIndex = getType
      const end = new Date()
      const start = new Date()
      if (getType === 2) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
      } else if (getType === 1) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      } else if (getType === 0) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      }
      this.$set(this.chartOption5, 'date', [start, end])
      this.loadChartData5()
    },

    // 时间
    chartTimeChange5 (e) {
      this.loadChartData5()
    },

    // SAR number :
    chartOptionChange5 (e) {
      console.log(this.chartOption5.num)
      this.loadChartData5()
    },

    // 加载图表6=========================================
    loadChartData6 () {
      const getType = this.chartOption6.activeIndex
      let data = {
        type: getType
      }

      // 如果存在选择时间时
      if (this.chartOption6.date) {
        data.createStartDate = common.formatYMD(this.chartOption6.date[0], 'ch')
        data.createEndDate = common.formatYMD(this.chartOption6.date[1], 'ch')
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.chartOption6.obj.showLoading()
      this.$ajax({
        method: 'get',
        url: `${apiPath.report.VA.getTrendTotalOfSar}?${dataUrl}`
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
                  type: 'bar',
                  data: seriesDataArr
                }
                seriesData.push(obj)
              }
            })
          }
          this.chartLineStack2(this.chartOption6.obj, legendData, seriesData, xAxisData)
        }
      })
    },

    // Day,Mont,Week
    chartSwitch6 (obj) {
      let getType = obj.key
      // 如果改变时处理
      this.chartOption6.activeIndex = getType
      const end = new Date()
      const start = new Date()
      if (getType === 2) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
      } else if (getType === 1) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      } else if (getType === 0) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      }
      this.$set(this.chartOption6, 'date', [start, end])
      this.loadChartData6()
    },

    // 时间
    chartTimeChange6 (e) {
      this.loadChartData6()
    },

    // 加载图表7=========================================
    loadChartData7 () {
      const getType = this.chartOption7.activeIndex
      let data = {
        type: getType
      }

      // 如果存在选择时间时
      if (this.chartOption7.date) {
        data.createStartDate = common.formatYMD(this.chartOption7.date[0], 'ch')
        data.createEndDate = common.formatYMD(this.chartOption7.date[1], 'ch')
      }

      const dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.chartOption7.obj.showLoading()
      this.$ajax({
        method: 'get',
        url: `${apiPath.report.VA.getTotalNumberTrend}?${dataUrl}`
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
          this.chartLineStack(this.chartOption7.obj, legendData, seriesData, xAxisData)
        }
      })
    },

    // Day,Mont,Week
    chartSwitch7 (obj) {
      let getType = obj.key
      // 如果改变时处理
      this.chartOption7.activeIndex = getType
      const end = new Date()
      const start = new Date()
      if (getType === 2) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
      } else if (getType === 1) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      } else if (getType === 0) {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      }
      this.$set(this.chartOption7, 'date', [start, end])
      this.loadChartData7()
    },

    // 时间
    chartTimeChange7 (e) {
      this.loadChartData7()
    },

    // 图表参数 数值
    chartLineStack (curObj, legendData, seriesData, xAxisData) {
      curObj.hideLoading()
      curObj.clear()
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
          top: 50,
          left: '78%',
          type: 'scroll',
          orient: 'vertical',
          data: legendData,
          formatter: function (name) {
            return echarts.format.truncateText(name, 300, '14px Arial', '…')
          },
          tooltip: {
            show: true
          }
        },
        grid: {
          left: '3%',
          right: '30%',
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
          data: xAxisData
        },
        yAxis: {
          type: 'value',
          name: 'Number'
        },
        series: seriesData
      })
    },

    // 图表参数 百分比
    chartLineStack2 (curObj, legendData, seriesData, xAxisData) {
      curObj.hideLoading()
      curObj.clear()
      curObj.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          },
          formatter: function (params) {
            params = params[0]
            return params.axisValue + '<br/>' + params.seriesName + ' : ' + params.data + '%'
          }
        },
        legend: {
          top: 50,
          left: '78%',
          type: 'scroll',
          orient: 'vertical',
          data: legendData,
          formatter: function (name) {
            return echarts.format.truncateText(name, 300, '14px Arial', '…')
          },
          tooltip: {
            show: true
          }
        },
        grid: {
          left: '3%',
          right: '30%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          show: true
        },
        calculable: true,
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value',
          name: 'The percentage',
          min: 0,
          max: 100,
          axisLabel: {
            formatter: '{value}%'
          }
        },
        series: seriesData
      })
    }
  }
}
