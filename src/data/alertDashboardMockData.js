// alertDashboard的模拟数据
module.exports = {

  // 角色列表
  selectedRoleOptions: [
    { value: 'analyst name', label: 'analyst name' },
    { value: 'lily', label: 'lily' },
    { value: 'rose', label: 'rose' }
  ],

  // To do task 处的图表模拟数据
  legendData: [
    'Escalate - Pending Supervisor Review',
    'Alert under review',
    'Alert under review2',
    'Alerts past due',
    'Alerts under QA',
    'Alerts under QA2',
    'Alerts past due2',
    'Alerts assigned but not started2',
    'Alerts assigned3'
  ],
  seriesData: [
    {value: 62560, name: 'Escalate - Pending Supervisor Review'},
    {value: 36340, name: 'Alert under review'},
    {value: 36340, name: 'Alert under review2'},
    {value: 30520, name: 'Alerts past due'},
    {value: 60560, name: 'Alerts under QA'},
    {value: 30520, name: 'Alerts under QA2'},
    {value: 30520, name: 'Alerts past due2'},
    {value: 30520, name: 'Alerts assigned but not started2'},
    {value: 20520, name: 'Alerts assigned3'}
  ],

  // Monitoring数据
  monitoringList: [
    {num: '226223', title: 'Total number of alert reviewed'},
    {num: '3.1', title: 'Average score for the alert QA reviewed'},
    {num: '45632', title: 'Total transaction amount'},
    {num: '689,133', title: 'Total transaction volume'}
  ],

  // 拆线图处数据1
  otherLegendData1: ['Percentage of alerts reversed by QA'],
  otherSeriesData1: [
    {
      name: 'Percentage of alerts reversed by QA',
      type: 'line',
      stack: '',
      data: [43, 45, 65, 87, 90, 23, 46, 98, 63, 33, 66, 77]
    }
  ],

  // 拆线图处数据2
  otherLegendData2: ['Average review time per alert', 'Average QA review time per alert'],
  otherSeriesData2: [
    {
      name: 'Average review time per alert',
      type: 'line',
      stack: '',
      data: [120, 132, 101, 134, 90, 230, 210, 101, 14, 90, 230, 210]
    },
    {
      name: 'Average QA review time per alert',
      type: 'line',
      stack: '',
      data: [220, 182, 191, 234, 290, 330, 210, 191, 234, 290, 330, 310]
    }
  ],

  // 拆线图处数据3
  otherLegendData3: ['Escalation Rate'],
  otherSeriesData3: [
    {
      name: 'Escalation Rate',
      type: 'line',
      stack: '',
      data: [34, 25, 57, 89, 27, 46, 33, 28, 93, 64, 42, 84]
    }
    // {
    //   name: 'Waive Rate',
    //   type: 'line',
    //   stack: '',
    //   data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210]
    // }
  ],

  // 拆线图处数据4
  otherLegendData4: ['Total number of productive alerts escalation'],
  otherSeriesData4: [
    {
      name: 'Total number of productive alerts escalation',
      type: 'line',
      stack: '',
      data: [73, 45, 65, 37, 70, 83, 46, 98, 63, 63, 66, 97]
    }
  ],

  // 拆线图处数据11
  otherLegendData11: ['Escalation Rate for I reviewed', 'Escalation Rate for team reviewed'],
  otherSeriesData11: [
    {
      name: 'Escalation Rate for I reviewed',
      type: 'line',
      stack: '',
      data: [43, 45, 65, 87, 90, 23, 46, 98, 63, 33, 66, 77]
    },
    {
      name: 'Escalation Rate for team reviewed',
      type: 'line',
      stack: '',
      data: [73, 65, 45, 37, 70, 83, 66, 98, 33, 43, 66, 97]
    }
  ],

  // 拆线图处数据12
  otherLegendData12: ['Percentage of alerts I reviewed but reversed by QA'],
  otherSeriesData12: [
    {
      name: 'Percentage of alerts I reviewed but reversed by QA',
      type: 'line',
      stack: '',
      data: [43, 45, 65, 87, 40, 23, 46, 68, 63, 43, 86, 77]
    }
  ],

  // 拆线图处数据13
  otherLegendData13: ['Waived Rate for I reviewed', 'Waived Rate For team reviewed'],
  otherSeriesData13: [
    {
      name: 'Waived Rate for I reviewed',
      type: 'line',
      stack: '',
      data: [43, 45, 65, 87, 90, 23, 46, 98, 63, 33, 66, 77]
    },
    {
      name: 'Waived Rate For team reviewed',
      type: 'line',
      stack: '',
      data: [73, 65, 45, 37, 70, 83, 96, 48, 33, 43, 66, 97]
    }
  ],

  // 拆线图处数据14
  otherLegendData14: ['Average score for the alerts QA reviewed'],
  otherSeriesData14: [
    {
      name: 'Average score for the alerts QA reviewed',
      type: 'line',
      stack: '',
      data: [3.0, 4.0, 5.5, 7.3, 3.5, 6.6, 8.9, 7.2, 2.5, 8.0, 9.0, 8.3]
    }
  ],

  // 拆线图处数据21
  otherLegendData21: ['Percentage of alerts reversed by QA'],
  otherSeriesData21: [
    {
      name: 'Percentage of alerts reversed by QA',
      type: 'line',
      stack: '',
      data: [43, 45, 65, 87, 90, 23, 46, 98, 63, 33, 66, 77]
    }
  ],

  // 拆线图处数据22
  otherLegendData22: ['Average score for the alerts QA reviewed', 'Average score for the alerts team reviewed'],
  otherSeriesData22: [
    {
      name: 'Average score for the alerts QA reviewed',
      type: 'line',
      stack: '',
      data: [3.0, 4.0, 5.5, 7.3, 3.5, 6.6, 8.9, 7.2, 2.5, 8.0, 9.0, 8.3]
    },
    {
      name: 'Average score for the alerts team reviewed',
      type: 'line',
      stack: '',
      data: [3.0, 4.0, 5.5, 7.3, 3.5, 6.6, 8.9, 7.2, 2.5, 8.0, 9.0, 8.3]
    }
  ]
}
