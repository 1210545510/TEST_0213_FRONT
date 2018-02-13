/*
*
*
* */
import './custom-RFI.scss'
import template from './custom-RFI.tpl'
import { Loading } from 'element-ui'

// 引用jquery
// import $ from 'jquery'

// 引入公共脚本
import common from '@/utils/common'

// 引入api.json文件
import apiPath from 'rootPath/config/api.json'
import hostPath from 'rootPath/config/host'

let fileLoading = null // 文件上传时的变量

// 页面展示的文本
const alertOgj = {
  'write': {
    'reason': 'Alert Reason'
  }
}
const caseOgj = {
  'write': {
    'reason': 'Case Reason'
  }
}

export default {
  template,

  name: 'custom-RFI',

  // 接收传过来的值
  props: {
    type: {
      type: Number,
      default: 0
    },
    reviewId: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      getType: this.type, // 类型  0 为 alert 1 为 case
      showTxt: {}, // 展示的文字对象
      visible: false, // 是否显示
      actionData: common.getReqParam(),
      uploadUrl: `${hostPath.apiUrl}${apiPath.common.uploadUrl}`, // 文件上传的url
      alertId: '',
      caseId: '',
      saveValues: {
        from: '', // 发送人邮件地址
        to: '', // 收件人邮件地址
        subject: '', // 发件人
        comment: '', //  发件内容
        fileNames: '', // 上传的文件名
        fileUrls: '' // 上传的文件url
      },
      editReason: { // 正文
        curNum: 0, // 当前输入数
        maxNum: 2000 // 最大输入数
      }
    }
  },

  // 实例创建后,进行默认数据处理
  created () {
    if (this.getType === 1) {
      this.showTxt = caseOgj
    } else {
      this.showTxt = alertOgj
    }
  },

  // html挂载在页面后,进行数据初始化
  mounted () {},

  // 方法集合
  methods: {
    // 限制不能输入中文
    limitInputChinese (val, item) {
      this.saveValues[item] = common.limitInputChinese(val)
      if (item === 'reason') {
        // 监控输入框输入长度,显示当前输入长度
        this.editReason.curNum = val.length
      }
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
      // 先清空fileUrls fileNames
      this.saveValues.fileNames = ''
      this.saveValues.fileUrls = ''

      if (response.status === 0) {
        let fileNameArr = []
        let filePathArr = []
        fileList.forEach((v) => {
          fileNameArr.push(v.response.data[0].fileName)
          filePathArr.push(v.response.data[0].filePath)
        })
        this.saveValues.fileNames = fileNameArr.join(',')
        this.saveValues.fileUrls = filePathArr.join(',')

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
    handleRemoveUrl (file, fileList) {
      let fileNameArr = []
      let filePathArr = []
      fileList.forEach((v) => {
        fileNameArr.push(v.response.data[0].fileName)
        filePathArr.push(v.response.data[0].filePath)
      })
      this.saveValues.fileNames = fileNameArr.join(',')
      this.saveValues.fileUrls = filePathArr.join(',')
    },
    handlePreview (file) {
      // 新窗口打开上传的文件
      window.open(file.url)
    },

    // 关闭信息弹框
    closeRFI () {
      this.visible = false
    },

    // 保存时
    saveRFI () {
      const getFrom = this.saveValues.from
      if (getFrom === '') {
        return common.warningInfoTip('Please input "From" E-Mail')
      } else if (!common.mailReg.test(getFrom)) {
        return common.warningInfoTip('The "From" e-mail format is incorrect')
      }

      const getTo = this.saveValues.to
      if (getTo === '') {
        return common.warningInfoTip('Please input "To" E-Mail')
      } else if (!common.mailReg.test(getTo)) {
        return common.warningInfoTip('The "To" e-mail format is incorrect')
      }

      const getSubject = this.saveValues.subject
      if (getSubject === '') {
        return common.warningInfoTip('Please input "Subject"')
      }

      const getReason = this.saveValues.comment
      if (getReason === '') {
        return common.warningInfoTip('Please input "Reason"')
      } else if (getReason.length > this.editReason.maxNum) {
        return common.warningInfoTip(`The "Reason" can not exceed ${this.editReason.maxNum}`)
      }

      let sendData = this.saveValues
      if (this.getType === 1) {
        sendData.caseId = this.reviewId
      } else {
        sendData.alertId = this.reviewId
      }
      let setMethod = 'post'
      let sendUrl = `${apiPath.alert.review.RFI.save}`

      const loadTips = Loading.service()
      this.$ajax({
        method: setMethod,
        url: sendUrl,
        data: sendData
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0) {
          common.successInfoTip('Save Success !')
          this.closeRFI()
          // 清空信息
          this.saveValues = {
            from: '', // 发送人邮件地址
            to: '', // 收件人邮件地址
            subject: '', // 发件人
            comment: '', //  发件内容
            fileNames: '', // 上传的文件名
            fileUrls: '' // 上传的文件url
          }
        }
      })
    }
  }
}
