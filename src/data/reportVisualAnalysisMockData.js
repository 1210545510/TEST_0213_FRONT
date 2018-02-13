// 模拟数据
module.exports = {

  // 拆线图处数据1
  chartLegendData1: ['SAR', 'Case', 'Alerts'],
  chartSeriesData1: [
    {
      name: 'SAR',
      type: 'line',
      stack: '',
      data: [1203, 1532, 1071, 1234, 990, 2430, 2610, 1071, 1834, 990, 2430, 2120]
    },
    {
      name: 'Case',
      type: 'line',
      stack: '',
      data: [2420, 1682, 1991, 2534, 2930, 3340, 3110, 1191, 2344, 2190, 3350, 3330]
    },
    {
      name: 'Alerts',
      type: 'line',
      stack: '',
      data: [2620, 1872, 1991, 2334, 2950, 3130, 3130, 1914, 2384, 2950, 3370, 3180]
    }
  ],

  // 拆线图处数据2
  chartLegendData2: ['SAR yield rate', 'Ratios of productive alerts'],
  chartSeriesData2: [
    {
      name: 'SAR yield rate',
      type: 'bar',
      stack: '',
      data: [1203, 1532, 1071, 1234, 990, 2430, 2610, 1071, 1834, 990, 2430, 2120]
    },
    {
      name: 'Ratios of productive alerts',
      type: 'bar',
      stack: '',
      data: [2420, 1682, 1991, 2534, 2930, 3340, 3110, 1191, 2344, 2190, 3350, 3330]
    }
  ],

  // 拆线图处数据3
  chartLegendData3: ['Total number of drafted cases pending SAR QA', 'Total number of assigned cases pending SAR analysts investigation', 'Total number of referrals to the SAR Team'],
  chartSeriesData3: [
    {
      name: 'Total number of drafted cases pending SAR QA',
      type: 'line',
      stack: '',
      data: [1203, 1532, 1071, 1234, 990, 2430, 2610, 1071, 1834, 990, 2430, 2120]
    },
    {
      name: 'Total number of assigned cases pending SAR analysts investigation',
      type: 'line',
      stack: '',
      data: [2420, 1682, 1991, 2534, 2930, 3340, 3110, 1191, 2344, 2190, 3350, 3330]
    },
    // {
    //   name: 'Total number of cases pending assignment to SAR',
    //   type: 'line',
    //   stack: '',
    //   data: [2620, 1872, 1991, 2334, 2950, 3130, 3130, 1914, 2384, 2950, 3370, 3180]
    // },
    {
      name: 'Total number of referrals to the SAR Team',
      type: 'line',
      stack: '',
      data: [1620, 2872, 3991, 1334, 2550, 3830, 2130, 4914, 2384, 2550, 3170, 3680]
    }
  ],

  // 拆线图处数据4
  chartLegendData4: ['Total number of existing cases in 3 SAR', 'Total number of existing cases in 2 SAR', 'Total number of existing cases in 1 SAR'],
  chartSeriesData4: [
    {
      name: 'Total number of existing cases in 3 SAR',
      type: 'line',
      stack: '',
      data: [1203, 1532, 1071, 1234, 990, 2430, 2610, 1071, 1834, 990, 2430, 2120]
    },
    {
      name: 'Total number of existing cases in 2 SAR',
      type: 'line',
      stack: '',
      data: [2420, 1682, 1991, 2534, 2930, 3340, 3110, 1191, 2344, 2190, 3350, 3330]
    },
    {
      name: 'Total number of existing cases in 1 SAR',
      type: 'line',
      stack: '',
      data: [2620, 1872, 1991, 2334, 2950, 3130, 3130, 1914, 2384, 2950, 3370, 3180]
    }
  ],

  // 拆线图处数据5
  chartLegendData5: ['Non-customers on which multiple SARs have been filed', 'Customers on which multiple SARs have been filed'],
  chartSeriesData5: [
    {
      name: 'Non-customers on which multiple SARs have been filed',
      type: 'bar',
      stack: '',
      data: [1203, 1532, 1071, 1234, 990, 2430, 2610, 1071, 1834, 990, 2430, 2120]
    },
    {
      name: 'Customers on which multiple SARs have been filed',
      type: 'bar',
      stack: '',
      data: [2420, 1682, 1991, 2534, 2930, 3340, 3110, 1191, 2344, 2190, 3350, 3330]
    }
  ],

  // 拆线图处数据6
  chartLegendData6: ['Total number of SARs filed from each source of referral and trend analysis'],
  chartSeriesData6: [
    {
      name: 'Total number of SARs filed from each source of referral and trend analysis',
      type: 'bar',
      stack: '',
      data: [1203, 1532, 1071, 1234, 990, 2430, 2610, 1071, 1834, 990, 2430, 2120]
    }
  ],

  // 拆线图处数据7
  chartLegendData7: ['Number and percentage of alerts automatically waived but rejected by alert QA', 'Number of cases with SAR filed versus', 'Number of cases waived and trend analysis'],
  chartSeriesData7: [
    // {
    //   name: 'Number of alerts automatically waived',
    //   type: 'line',
    //   stack: '',
    //   data: [1203, 1532, 1071, 1234, 990, 2430, 2610, 1071, 1834, 990, 2430, 2120]
    // },
    {
      name: 'Number and percentage of alerts automatically waived but rejected by alert QA',
      type: 'line',
      stack: '',
      data: [2420, 1682, 1991, 2534, 2930, 3340, 3110, 1191, 2344, 2190, 3350, 3330]
    },
    {
      name: 'Number of cases with SAR filed versus',
      type: 'line',
      stack: '',
      data: [2620, 1872, 1991, 2334, 2950, 3130, 3130, 1914, 2384, 2950, 3370, 3180]
    },
    {
      name: 'Number of cases waived and trend analysis',
      type: 'line',
      stack: '',
      data: [1620, 2872, 3991, 1334, 2550, 3830, 2130, 4914, 2384, 2550, 3170, 3680]
    }
  ]
}
