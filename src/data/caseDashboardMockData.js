// caseDashboard的模拟数据
module.exports = {

  // 角色列表
  selectedRoleOptions: [
    { value: 'analyst name', label: 'analyst name' },
    { value: 'lily', label: 'lily' },
    { value: 'rose', label: 'rose' }
  ],

  // To do task 处的图表模拟数据
  legendData: [
    'SAR - Pending Approva',
    'Case under review',
    'Case under review2',
    'Case past due',
    'Case under QA',
    'Case under QA2',
    'Case past due2',
    'Case assigned but not started2',
    'Case assigned3'
  ],
  seriesData: [
    {value: 62560, name: 'SAR - Pending Approva'},
    {value: 36340, name: 'Case under review'},
    {value: 36340, name: 'Case under review2'},
    {value: 30520, name: 'Case past due'},
    {value: 60560, name: 'Case under QA'},
    {value: 30520, name: 'Case under QA2'},
    {value: 30520, name: 'Case past due2'},
    {value: 30520, name: 'Case assigned but not started2'},
    {value: 20520, name: 'Case assigned3'}
  ],

  // Monitoring数据
  monitoringList: [
    {num: '226,223', title: 'Total number of Cases reviewed'},
    {num: '336,675', title: 'Total transaction volume and value'},
    {num: '689,133', title: 'Average score for the Cases reviewed'}
  ],

  // 拆线图处数据1
  otherLegendData1: ['Percentage of cases reversed by QA'],
  otherSeriesData1: [
    {
      name: 'Percentage of cases reversed by QA',
      type: 'line',
      stack: '',
      data: [43, 45, 65, 87, 90, 23, 46, 98, 63, 33, 66, 77]
    }
  ],

  // 拆线图处数据2
  otherLegendData2: ['Average review time per case', 'Average QA review time per case'],
  otherSeriesData2: [
    {
      name: 'Average review time per case',
      type: 'line',
      stack: '',
      data: [120, 132, 101, 134, 90, 230, 210, 101, 14, 90, 230, 210]
    },
    {
      name: 'Average QA review time per case',
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
  ],

  // 拆线图处数据4
  otherLegendData4: ['Total number of productive case escalation'],
  otherSeriesData4: [
    {
      name: 'Total number of productive case escalation',
      type: 'line',
      stack: '',
      data: [34, 25, 57, 89, 27, 46, 33, 28, 93, 64, 42, 84]
    }
  ],

  // 拆线图处数据5
  otherLegendData5: ['Workflow time statistics'],
  otherSeriesData5: [
    {
      name: 'Workflow time statistics',
      type: 'bar',
      stack: '',
      data: [120, 132, 101, 134, 90, 230]
    }
  ],

  // 拆线图处数据6
  otherLegendData6: ['Alert review time statistics', 'Case review time statistics'],
  otherSeriesData6: [
    {
      name: 'Alert review time statistics',
      type: 'bar',
      stack: '',
      data: [120, 132, 101, 134, 90, 230]
    },
    {
      name: 'Case review time statistics',
      type: 'bar',
      stack: '',
      data: [220, 182, 191, 234, 290, 330]
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
  otherLegendData12: ['Percentage of Case reviewed but reversed by QA'],
  otherSeriesData12: [
    {
      name: 'Percentage of Case reviewed but reversed by QA',
      type: 'line',
      stack: '',
      data: [43, 45, 65, 87, 40, 23, 46, 68, 63, 43, 86, 77]
    }
  ],

  // 拆线图处数据13
  otherLegendData13: ['Waived Rate for I reviewed', 'Waived Rate for team reviewed'],
  otherSeriesData13: [
    {
      name: 'Waived Rate for I reviewed',
      type: 'line',
      stack: '',
      data: [43, 45, 65, 87, 90, 23, 46, 98, 63, 33, 66, 77]
    },
    {
      name: 'Waived Rate for team reviewed',
      type: 'line',
      stack: '',
      data: [73, 65, 45, 37, 70, 83, 96, 48, 33, 43, 66, 97]
    }
  ],

  // 拆线图处数据14
  otherLegendData14: ['Average score for the Case QA reviewed'],
  otherSeriesData14: [
    {
      name: 'Average score for the Case QA reviewed',
      type: 'line',
      stack: '',
      data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210]
    }
  ],

  // 拆线图处数据21
  otherLegendData21: ['Percentage of cases reversed by QA'],
  otherSeriesData21: [
    {
      name: 'Percentage of cases reversed by QA',
      type: 'line',
      stack: '',
      data: [43, 45, 65, 87, 90, 23, 46, 98, 63, 33, 66, 77]
    }
  ],

  // 拆线图处数据22
  otherLegendData22: ['Average score for the case QA reviewed', 'Average score for the case team reviewed'],
  otherSeriesData22: [
    {
      name: 'Average score for the case QA reviewed',
      type: 'line',
      stack: '',
      data: [210, 282, 191, 234, 290, 330, 160, 191, 234, 190, 300, 310]
    },
    {
      name: 'Average score for the case team reviewed',
      type: 'line',
      stack: '',
      data: [120, 132, 101, 134, 90, 230, 210, 101, 14, 90, 230, 210]
    }
  ]
}
