/*
*
* ====== alert ============
* Alert.analyst=10042
* Alert.QA.Waive=10041
* Alert.QA.Escalate=10043
* Alert.Supervisor=10044
*
* ====== case ============
* Sar.analyst=10045
* Sar.QA=10046
* Sar.Officer=10047
* Sar.Coordinator=10048
* Sar.Narrative=10049
* Sar.Supervisor=10052
*
* ======== admin ==========
* AML.admin=10053
*
* */

/*
*
*  调用说明:
*  1、页面上调用组件时需要传入角色ID (roleId),用于判断显示的内容。如::roleId="这里是传入的ID"
*  2、数据加载时需要传入:
*    (1)、实例ID (orderId),用于
*    (2)、任务ID (taskId),用于查询当前的审批及评分内容
*    (3)、alertId/caseId ,用于提交或是显示的相关操作,如在alert下 传入 alertId; 在case下 传入 caseId,
*         注:这alertId与caseId都是传到到sendData这个对象下
*
**/

import { Loading } from 'element-ui'
import common from '@/utils/common' // 引入公共脚本
import hostPath from 'rootPath/config/host' // 引入host
import apiPath from 'rootPath/config/api.json' // 引入api.json文件
import $ from 'jquery' // 引入jquery

require('./custom-processing.scss')
const template = require('./custom-processing.tpl')

// 页面展示的文本
const alertOgj = {
  'title': 'Alert Disposition',
  'score': {
    'row2': 'Quality lssues',
    'row3': 'Alert ltem#',
    'row4': 'Action Required',
    'row5': 'Action Taken',
    'row6': 'Confirm Corrected(Y/N)',
    'tit1': 'Alert Narrative complete,organized,and clearly writte',
    'tit2': 'Alert Form accurately and appropriately completed',
    'tit3': 'Correct grammar and spelling',
    'tit4': 'Other issuesnoted',
    'tit5': 'Quality Grade(1-4)',
    'tit5Dec1': '(1) No Errors',
    'tit5Dec2': '(2) Few Minor Errors',
    'tit5Dec3': '(3) Numerous Minor Errors,or',
    'tit5Dec4': '(4) Critical Errors'
  }
}
const caseOgj = {
  'title': 'Case Disposition',
  'score': {
    'row2': 'Quality lssues',
    'row3': 'SAR ltem#',
    'row4': 'Action Required',
    'row5': 'Action Taken',
    'row6': 'Confirm Corrected(Y/N)',
    'tit1': 'SAR Narrative complete,organized,and clearly writte',
    'tit2': 'SAR Form accurately and appropriately completed',
    'tit3': 'Correct grammar and spelling',
    'tit4': 'Other issuesnoted',
    'tit5': 'Quality Grade(1-4)',
    'tit5Dec1': '(1) No Errors',
    'tit5Dec2': '(2) Few Minor Errors',
    'tit5Dec3': '(3) Numerous Minor Errors,or',
    'tit5Dec4': '(4) Critical Errors'
  }
}

export default {
  template,

  name: 'customProcessing',

  // 接收传过来的值
  props: {
    type: {
      type: Number,
      default: 0
    },
    roleId: {
      type: String,
      default: ''
    },
    caseId: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      getType: this.type, // 类型  0 为 alert 1 为 case
      showTxt: {}, // 展示的文字对象
      isShow: false, // 是否展示内容框
      orderId: '', // 实例ID
      taskId: '',  // 任务ID
      uploadUrl: `${hostPath.apiUrl}${apiPath.common.uploadUrl}`, // 文件上传URL
      uploadData: {
        token: common.getCookie('amlTk'),
        userId: common.getCookie('amlUId')
      },
      saveUrl: '', // 保存请求链接-alert-case
      submitUrl: '', // 提交请求链接-alert-case
      submitToUrl: '', // 提交成功时跳转
      saveScoreUrl: '', // 保存评分请求链接
      getScoreUrl: '', // 获得评分请求链接
      editScoreUrl: '', // 修改评分请求链接
      sendData: {
        alertId: '',  // 这个在保存评分时也会用到
        caseId: '', // 这个在保存评分时也会用到
        approvalId: '', // 再保存时才有
        content: '', // 审批意见 (可选)
        result: '', // 结果  如：Escalate/Waive， SAR/Reasonable, agree/disagree
        score: '', // 评分  最后的那人才有 QA 对 分析员的评分 1 到 4
        files: [],
        roleId: this.roleId // 角色ID
      },
      edit: { // 正文
        curNum: 0, // 当前输入数
        minNum: 500, // 最小输入数
        maxNum: 5000 // 最大输入数
      },
      checkFileType: (name) => {
        return common.checkFileType(name)
      },
      danalystSoreDialog: { // 评分弹框
        visible: false,
        innerVisible: false
      },
      scoreData: {
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
      setAutoSave: null, // 用于自动保存定时器
      setAutoSaveTime: 10000, // 用于自动保存定时器时间
      checkWordTimeout: null // 用于判断是否含有敏感字
    }
  },

  // 实例创建后,进行默认数据处理
  created () {
    if (this.roleId === '10042' || this.roleId === '10041' || this.roleId === '10043' || this.roleId === '10044') {
      this.showTxt = alertOgj // 文本展示
      this.saveUrl = `${apiPath.alert.review.processing.save}` // 保存
      this.submitUrl = `${apiPath.alert.review.processing.submit}${this.roleId}` // 提交/同意/不同意
      this.submitToUrl = 'alertList' // 提交后跳转的路由名字
      this.saveScoreUrl = `${apiPath.alert.review.processing.saveScore}` // 保存评分
    } else if (this.roleId === '10045' || this.roleId === '10046' || this.roleId === '10047' || this.roleId === '10048' || this.roleId === '10049' || this.roleId === '10052') {
      this.showTxt = caseOgj
      this.saveUrl = `${apiPath.case.review.processing.save}`
      this.submitUrl = `${apiPath.case.review.processing.submit}${this.roleId}`
      this.submitToUrl = 'caseList'
      this.saveScoreUrl = `${apiPath.case.review.processing.saveScore}`
    }
    // 公共部分
    this.editScoreUrl = `${apiPath.alert.review.processing.editScore}` // 修改评分
  },

  // html挂载在页面后,进行数据初始化
  mounted () {
    // console.log(this.sendData)
    // 拖动
    common.dragTemplate('.com_customProcessing_comtainer_head', '.com_customProcessing_comtainer')
  },

  // 方法集合
  methods: {
    // 点击展示内容框
    showContainer () {
      this.isShow = true
      $('.com_customProcessing_comtainer').css({'bottom': 0, 'top': 'auto', 'right': 0, 'left': 'auto'})
      // 清除默认值
      this.sendData.approvalId = ''
      this.sendData.result = ''
      this.sendData.content = ''
      this.sendData.files = []
      this.getSaveInfo()

      // 弹框前先清空弹框内容
      this.sendData.content = ''
      this.sendData.files = []
      this.sendData.result = ''
      this.sendData.score = ''
    },

    // 点击隐藏内容框
    hideContainer () {
      clearTimeout(this.setAutoSave)
      this.isShow = false
    },

    // 拉取已保存的内容
    getSaveInfo () {
      const taskId = this.taskId
      if (taskId) {
        // 参数
        let data = {
          taskId: taskId
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
            this.sendData.approvalId = dataInfo.approvalId
            this.sendData.result = dataInfo.result
            this.sendData.content = dataInfo.content
            this.edit.curNum = this.sendData.content.length
            this.sendData.files = dataInfo.files
            // 设置内容后处理因内容区内容变化而导致执行自动保存
            clearTimeout(this.setAutoSave)
          }
        })
      } else {
        common.warningInfoTip('Task ID Is Not Find !')
      }
    },

    // 保存时
    save () {
      // 手动保存时,关闭定时器
      clearTimeout(this.setAutoSave)
      let loadTips = null
      if (this.sendData.approvalId === '') {
        loadTips = Loading.service()
      }
      this.$ajax({
        method: 'post',
        url: this.saveUrl,
        data: this.sendData
      }).then(res => {
        // 去除加载
        if (this.sendData.approvalId === '') {
          loadTips.close()
        }
        if (res.status === 0) {
          this.sendData.approvalId = res.data
          common.successInfoTip('Save Success !')
        }
      })
    },

    // 上传文件操作
    uploadBefore (file) {
      // console.log(file)
      clearTimeout(this.setAutoSave)
    },
    uploadSuccess (file, fileList) {
      this.sendData.files = fileList.response.data.concat(this.sendData.files)
      // 定时保存
      this.setAutoSave = setTimeout(() => {
        console.log('save')
        this.save()
      }, this.setAutoSaveTime)
      // 清空上传的图片数组
      common.successInfoTip('Upload Success !')
    },
    uploadError (file, fileList) {
      common.warningInfoTip('Error !')
    },
    uploadRemoveFile (key) {
      this.sendData.files.splice(key, 1)
    },

    // 获得评分内容  并 弹框
    getSoreInfo () {
      const taskId = this.taskId
      if (taskId) {
        // 设置默认值
        this.scoreData = {
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
        }

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
            // 展示弹框
            this.danalystSoreDialog.visible = true
          }
        })
      } else {
        common.warningInfoTip('Task ID Is Not Find !')
      }
    },

    // 保存评分时提示
    soreSaveTips () {
      if (this.scoreData.grade === '') {
        return common.warningInfoTip('Please choose the "Quality Grade"!')
      }
      this.danalystSoreDialog.innerVisible = true
    },

    // 保存评分
    soreSave () {
      let sendData = {
        accuratelyAppropriately: window.JSON.stringify(this.scoreData.accuratelyAppropriately),
        alertId: this.sendData.alertId,
        caseId: this.sendData.caseId,
        grade: this.scoreData.grade,
        grammarSpelling: window.JSON.stringify(this.scoreData.grammarSpelling),
        organizedWritten: window.JSON.stringify(this.scoreData.organizedWritten),
        otherIssues: window.JSON.stringify(this.scoreData.otherIssues)
      }
      let setMethod = 'post'
      let setUrl = this.saveScoreUrl
      if (this.scoreData.id) {
        setMethod = 'put'
        setUrl = `${this.editScoreUrl}${this.scoreData.id}`
        sendData.id = this.scoreData.id
      }
      const loadTips = Loading.service()
      this.$ajax({
        method: setMethod,
        url: setUrl,
        data: sendData
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0) {
          common.successInfoTip('Save Success !')
          this.danalystSoreDialog.visible = false
          this.danalystSoreDialog.innerVisible = false
        }
      })
    },

    // 提交
    submit () {
      // 手动保存时,关闭定时器
      clearTimeout(this.setAutoSave)
      // 判断提示
      if (this.sendData.result === '' && this.roleId !== '10049') {
        return common.warningInfoTip('Please choose the "Disposition"')
      }
      if (this.sendData.content.length < 500) {
        return common.warningInfoTip('The content can not be less than 500 words!')
      }
      this.$confirm('You are sure to submit it?', 'Note', {
        confirmButtonText: 'yes',
        cancelButtonText: 'no',
        type: 'warning'
      }).then(() => {
        const loadTips = Loading.service()
        this.$ajax({
          method: 'post',
          url: this.submitUrl,
          data: this.sendData
        }).then(res => {
          // 去除加载
          loadTips.close()
          if (res.status === 0) {
            common.successInfoTip('Save Success !')
            this.$router.push({name: this.submitToUrl})
          }
        })
      }).catch(() => {})
    },

    // 同意
    agree () {
      // 手动保存时,关闭定时器
      clearTimeout(this.setAutoSave)
      if (this.sendData.content.length < 500) {
        return common.warningInfoTip('The content can not be less than 500 words!')
      }
      this.$confirm('Whether to submit "Agree" results?', 'Confirm', {
        confirmButtonText: 'yes',
        cancelButtonText: 'no',
        type: 'warning'
      }).then(() => {
        this.sendData.result = 'Agree'
        const loadTips = Loading.service()
        this.$ajax({
          method: 'post',
          url: this.submitUrl,
          data: this.sendData
        }).then(res => {
          // 去除加载
          loadTips.close()
          if (res.status === 0) {
            common.successInfoTip('Save Success !')
            this.$router.push({name: this.submitToUrl})
          }
        })
      }).catch(() => {})
    },

    // 不同意
    disagree () {
      // 手动保存时,关闭定时器
      clearTimeout(this.setAutoSave)
      if (this.sendData.content.length < 500) {
        return common.warningInfoTip('The content can not be less than 500 words!')
      }
      this.$confirm('Whether to submit "Disagree" results?', 'Confirm', {
        confirmButtonText: 'yes',
        cancelButtonText: 'no',
        type: 'warning'
      }).then(() => {
        this.sendData.result = 'Disagree'
        const loadTips = Loading.service()
        this.$ajax({
          method: 'post',
          url: this.submitUrl,
          data: this.sendData
        }).then(res => {
          // 去除加载
          loadTips.close()
          if (res.status === 0) {
            common.successInfoTip('Save Success !')
            this.$router.push({name: this.submitToUrl})
          }
        })
      }).catch(() => {})
    },

    // 监控输入框输入长度,显示当前输入长度
    monitorInputLen (obj) {
      this.sendData.content = common.limitInputChinese(obj)
      this.edit.curNum = obj.length
      clearTimeout(this.setAutoSave)
      // 定时保存
      this.setAutoSave = setTimeout(() => {
        this.save()
      }, this.setAutoSaveTime)
      //
      // clearTimeout(this.checkWordTimeout)
      // this.checkWordTimeout = setTimeout(() => {
      //   const rule = / yang /g
      //   if (obj.match(rule)) {
      //     common.warningInfoTip(`${obj} is Keyword!`)
      //   }
      // }, 500)
    }
  }
}
