import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 登录
const {login} = require('@/components/login/login')

// alert主体页面框架
const {alertLayout} = require('@/components/alert/layout/alert-layout')
const {alertDashboard} = require('@/components/alert/dashboard/dashboard')
const {alertList} = require('@/components/alert/list/list')
const {alertReview} = require('@/components/alert/review/review')
const {alertReviewLayout} = require('@/components/alert/review/layout/review-layout')
const {alertReviewAccountDetail} = require('@/components/alert/review/accountDetail/account-detail')
const {alertReviewTransactionDetail} = require('@/components/alert/review/transactionDetail/transaction-detail')
const {alertReviewWorkflowDetail} = require('@/components/alert/review/workflowDetail/workflow-detail')
const {alertReviewSubjectDetail} = require('@/components/alert/review/subjectDetail/subject-detail')

// case主体页面框架
const {caseLayout} = require('@/components/case/layout/case-layout')
const {caseDashboard} = require('@/components/case/dashboard/dashboard')
const {caseList} = require('@/components/case/list/list')
const {SARFilingList} = require('@/components/case/filingList/filing-list')
const {caseReview} = require('@/components/case/review/review')
const {caseReviewLayout} = require('@/components/case/review/layout/review-layout')
const {caseReviewAccountDetail} = require('@/components/case/review/accountDetail/account-detail')
const {caseReviewTransactionDetail} = require('@/components/case/review/transactionDetail/transaction-detail')
const {caseReviewWorkflowDetail} = require('@/components/case/review/workflowDetail/workflow-detail')
const {caseReviewSubjectDetail} = require('@/components/case/review/subjectDetail/subject-detail')

// dataCenter主体页面框架
const {dataCenterLayout} = require('@/components/dataCenter/layout/data-center-layout')
const {dataCenter314A} = require('@/components/dataCenter/dc314A/dc314A')
const {dataCenterAlertHistory} = require('@/components/dataCenter/alertHistory/alert-history')
const {dataCenterCaseHistory} = require('@/components/dataCenter/caseHistory/case-history')
const {dataCenterCLIENTBANKList} = require('@/components/dataCenter/CLIENTBANKList/CLIENTBANK-list')
const {dataCenterCLIENTBANKListLayout} = require('@/components/dataCenter/CLIENTBANKList/layout/layout')
const {dataCenterCLIENTBANKListEDD} = require('@/components/dataCenter/CLIENTBANKList/EDDReview/EDD')
const {dataCenterCTRHistory} = require('@/components/dataCenter/CTRHistory/CTR-history')
const {dataCenterCustomerProfile} = require('@/components/dataCenter/customerProfile/customer-profile')
const {dataCenterExternalUserRequest} = require('@/components/dataCenter/externalUserRequest/external-user-request')
const {dataCenterGrandJurySubpoena} = require('@/components/dataCenter/grandJurySubpoena/grand-jury-subpoena')
const {dataCenterRFI} = require('@/components/dataCenter/RFI/RFI')
const {dataCenterSARHistory} = require('@/components/dataCenter/SARHistory/SAR-history')

// configuration主体页面框架
const {configurationLayout} = require('@/components/configuration/layout/configuration-layout')
const {configurationAccountTypes} = require('@/components/configuration/accountTypes/account-types')
const {configurationActivityMaps} = require('@/components/configuration/activityMaps/activity-maps')
const {configurationActivityTypes} = require('@/components/configuration/activityTypes/activity-types')
const {configurationCloseReason} = require('@/components/configuration/closeReason/close-reason')
const {configurationConfigurationCenter} = require('@/components/configuration/configurationCenter/configuration-center')
const {configurationCountries} = require('@/components/configuration/countries/countries')
const {configurationCustomerTypes} = require('@/components/configuration/customerTypes/customer-types')
const {configurationExemptions} = require('@/components/configuration/exemptions/exemptions')
const {configurationFormConfiguration} = require('@/components/configuration/formConfiguration/form-configuration')
const {configurationJobs} = require('@/components/configuration/jobs/jobs')
const {configurationLogs} = require('@/components/configuration/logs/logs')
const {configurationRelationshipTypes} = require('@/components/configuration/relationshipTypes/relationship-types')
const {configurationSequences} = require('@/components/configuration/sequences/sequences')
const {configurationSystemParameters} = require('@/components/configuration/systemParameters/system-parameters')
const {configurationTemplateRules} = require('@/components/configuration/templateRules/template-rules')
const {configurationUserDefindRules} = require('@/components/configuration/userDefindRules/user-defind-rules')
const {configurationDataDictionary} = require('@/components/configuration/dataDictionary/data-dictionary')
const {configurationCommissionedAuthorization} = require('@/components/configuration/commissionedAuthorization/commissioned-authorization')
const {configurationStatusConfiguration} = require('@/components/configuration/statusConfiguration/status-configuration')
const {configurationWorkflowDefinition} = require('@/components/configuration/workflowDefinition/workflow-definition')
const {configurationWorkflowDefinitionLayout} = require('@/components/configuration/workflowDefinition/layout/workflow-definition-layout')
const {configurationWorkflowDefinitionDesign} = require('@/components/configuration/workflowDefinition/design/design')
const {configurationProcessInstance} = require('@/components/configuration/processInstance/process-instance')
const {configurationProcessInstanceLayout} = require('@/components/configuration/processInstance/layout/process-instance-layout')
const {configurationProcessInstanceDetail} = require('@/components/configuration/processInstance/detail/detail')

// report
const {reportLayout} = require('@/components/report/layout/report-layout')
const {reportVisualAnalysis} = require('@/components/report/visualAnalysis/visual-analysis')
const {reportDataReport} = require('@/components/report/dataReport/data-report')

// SAR report
const {SARReportLayout} = require('@/components/SARReport/layout/SAR-report-layout')
const {SARReportHome} = require('@/components/SARReport/home/home')
const {SARReportStep1} = require('@/components/SARReport/step1/step1')
const {SARReportStep2} = require('@/components/SARReport/step2/step2')
const {SARReportStep3} = require('@/components/SARReport/step3/step3')
const {SARReportStep4} = require('@/components/SARReport/step4/step4')
const {SARReportStep5} = require('@/components/SARReport/step5/step5')

// Currency Transaction Report
const {CTReportLayout} = require('@/components/CTReport/layout/CT-report-layout')
const {CTReportHome} = require('@/components/CTReport/home/home')
const {CTReportStep1} = require('@/components/CTReport/step1/step1')
const {CTReportStep2} = require('@/components/CTReport/step2/step2')
const {CTReportStep3} = require('@/components/CTReport/step3/step3')

// 错误或找不到展示的页面
const {error} = require('@/components/common/error/error')

// 没权限页面
const {permission} = require('@/components/common/permission/permission')

export default new Router({
  linkActiveClass: 'focus', // 存在配置时显示的当前样式
  linkExactActiveClass: 'focus',  // 精确配置时显示的当前样式
  routes: [
    { path: '', redirect: { name: 'login' } },
    { path: '/login', name: 'login', component: login },
    { path: '/alert',
      component: alertLayout,
      children: [
        { path: '', redirect: { name: 'alertList' } },
        { path: 'dashboard', name: 'alertDashboard', component: alertDashboard },
        { path: 'list', name: 'alertList', component: alertList },
        { path: 'review',
          component: alertReviewLayout,
          children: [
            { path: '', name: 'alertReview', component: alertReview },
            { path: 'accountDetail', name: 'alertReviewAccountDetail', component: alertReviewAccountDetail },
            { path: 'transactionDetail', name: 'alertReviewTransactionDetail', component: alertReviewTransactionDetail },
            { path: 'WorkflowDetail', name: 'alertReviewWorkflowDetail', component: alertReviewWorkflowDetail },
            { path: 'subjectDetail', name: 'alertReviewSubjectDetail', component: alertReviewSubjectDetail }
          ]
        }
      ]
    },
    { path: '/case',
      component: caseLayout,
      children: [
        { path: '', redirect: { name: 'caseList' } },
        { path: 'dashboard', name: 'caseDashboard', component: caseDashboard },
        { path: 'list', name: 'caseList', component: caseList },
        { path: 'filingList', name: 'SARFilingList', component: SARFilingList },
        { path: 'review',
          component: caseReviewLayout,
          children: [
            { path: '', name: 'caseReview', component: caseReview },
            { path: 'accountDetail', name: 'caseReviewAccountDetail', component: caseReviewAccountDetail },
            { path: 'transactionDetail', name: 'caseReviewTransactionDetail', component: caseReviewTransactionDetail },
            { path: 'WorkflowDetail', name: 'caseReviewWorkflowDetail', component: caseReviewWorkflowDetail },
            { path: 'subjectDetail', name: 'caseReviewSubjectDetail', component: caseReviewSubjectDetail }
          ]
        }
      ]
    },
    { path: '/dataCenter',
      component: dataCenterLayout,
      children: [
        { path: '', redirect: { name: 'dataCenterAlertHistory' } },
        { path: 'dc314A', name: 'dataCenter314A', component: dataCenter314A },
        { path: 'alertHistory', name: 'dataCenterAlertHistory', component: dataCenterAlertHistory },
        { path: 'caseHistory', name: 'dataCenterCaseHistory', component: dataCenterCaseHistory },
        { path: 'CLIENTBANKList',
          component: dataCenterCLIENTBANKListLayout,
          children: [
            { path: '', name: 'dataCenterCLIENTBANKList', component: dataCenterCLIENTBANKList },
            { path: 'EDD', name: 'dataCenterCLIENTBANKListEDD', component: dataCenterCLIENTBANKListEDD }
          ]
        },
        { path: 'CTRHistory', name: 'dataCenterCTRHistory', component: dataCenterCTRHistory },
        { path: 'customerProfile', name: 'dataCenterCustomerProfile', component: dataCenterCustomerProfile },
        { path: 'externalUserRequest', name: 'dataCenterExternalUserRequest', component: dataCenterExternalUserRequest },
        { path: 'grandJurySubpoena', name: 'dataCenterGrandJurySubpoena', component: dataCenterGrandJurySubpoena },
        { path: 'RFI', name: 'dataCenterRFI', component: dataCenterRFI },
        { path: 'SARHistory', name: 'dataCenterSARHistory', component: dataCenterSARHistory }
      ]
    },
    { path: '/configuration',
      component: configurationLayout,
      children: [
        { path: '', redirect: { name: 'configurationConfigurationCenter' } },
        { path: 'accountTypes', name: 'configurationAccountTypes', component: configurationAccountTypes },
        { path: 'activityMaps', name: 'configurationActivityMaps', component: configurationActivityMaps },
        { path: 'activityTypes', name: 'configurationActivityTypes', component: configurationActivityTypes },
        { path: 'closeReason', name: 'configurationCloseReason', component: configurationCloseReason },
        { path: 'configurationCenter', name: 'configurationConfigurationCenter', component: configurationConfigurationCenter },
        { path: 'countries', name: 'configurationCountries', component: configurationCountries },
        { path: 'customerTypes', name: 'configurationCustomerTypes', component: configurationCustomerTypes },
        { path: 'exemptions', name: 'configurationExemptions', component: configurationExemptions },
        { path: 'formConfiguration', name: 'configurationFormConfiguration', component: configurationFormConfiguration },
        { path: 'jobs', name: 'configurationJobs', component: configurationJobs },
        { path: 'logs', name: 'configurationLogs', component: configurationLogs },
        { path: 'relationshipTypes', name: 'configurationRelationshipTypes', component: configurationRelationshipTypes },
        { path: 'sequences', name: 'configurationSequences', component: configurationSequences },
        { path: 'systemParameters', name: 'configurationSystemParameters', component: configurationSystemParameters },
        { path: 'templateRules', name: 'configurationTemplateRules', component: configurationTemplateRules },
        { path: 'userDefindRules', name: 'configurationUserDefindRules', component: configurationUserDefindRules },
        { path: 'dataDictionary', name: 'configurationDataDictionary', component: configurationDataDictionary },
        { path: 'commissionedAuthorization', name: 'configurationCommissionedAuthorization', component: configurationCommissionedAuthorization },
        { path: 'statusConfiguration', name: 'configurationStatusConfiguration', component: configurationStatusConfiguration },
        { path: 'workflowDefinition',
          component: configurationWorkflowDefinitionLayout,
          children: [
            { path: '', name: 'configurationWorkflowDefinition', component: configurationWorkflowDefinition },
            { path: 'design', name: 'configurationWorkflowDefinitionDesign', component: configurationWorkflowDefinitionDesign }
          ]
        },
        { path: 'processInstance',
          component: configurationProcessInstanceLayout,
          children: [
            { path: '', name: 'configurationProcessInstance', component: configurationProcessInstance },
            { path: 'detail', name: 'configurationProcessInstanceDetail', component: configurationProcessInstanceDetail }
          ]
        }
      ]
    },
    { path: '/report',
      component: reportLayout,
      children: [
        { path: '', redirect: { name: 'reportVisualAnalysis' } },
        { path: 'visualAnalysis', name: 'reportVisualAnalysis', component: reportVisualAnalysis },
        { path: 'dataReport', name: 'reportDataReport', component: reportDataReport }
      ]
    },
    { path: '/SARReport',
      component: SARReportLayout,
      children: [
        { path: '', redirect: { name: 'SARReportHome' } },
        { path: 'home', name: 'SARReportHome', component: SARReportHome },
        { path: 'step1', name: 'SARReportStep1', component: SARReportStep1 },
        { path: 'step2', name: 'SARReportStep2', component: SARReportStep2 },
        { path: 'step3', name: 'SARReportStep3', component: SARReportStep3 },
        { path: 'step4', name: 'SARReportStep4', component: SARReportStep4 },
        { path: 'step5', name: 'SARReportStep5', component: SARReportStep5 }
      ]
    },
    { path: '/CTReport',
      component: CTReportLayout,
      children: [
        { path: '', redirect: { name: 'CTReportHome' } },
        { path: 'home', name: 'CTReportHome', component: CTReportHome },
        { path: 'step1', name: 'CTReportStep1', component: CTReportStep1 },
        { path: 'step2', name: 'CTReportStep2', component: CTReportStep2 },
        { path: 'step3', name: 'CTReportStep3', component: CTReportStep3 }
      ]
    },
    { path: '/error', name: 'error', component: error },
    { path: '/permission', name: 'permission', component: permission },
    { path: '*', redirect: { name: 'error' } }
  ]
})
