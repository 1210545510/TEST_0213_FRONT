/*
*
*   visibleCreateAlert 是否显示createAlert弹框
*   actionUrl 创建alert时请求的链接
*   onSuccess 创建alert成功时的钩子函数
*   type 弹框创建的类型，默认创建alert， 可传递case或alert
*   dataType 弹框的数据来源 0：自动生成;1：External User Request;2：Grand Jury Subpoena;3：314A; 4: 手动创建Alert; 5:手动创建的case
*   showData 弹框时要显示的数据，用于保存
*
* */
import './create-alert.scss'
import template from './create-alert.tpl'
import { Loading } from 'element-ui'

// 引用jquery
import $ from 'jquery'

// 引入公共脚本
import common from '@/utils/common'

// 引入api.json文件
import apiPath from 'rootPath/config/api.json'
import hostPath from 'rootPath/config/host'

let fileLoading = null // 文件上传时的变量

export default {
  template,

  name: 'create-alert',

  // 接收传过来的值
  props: {
    // 显示与隐藏弹框
    visibleCreateAlert: {
      type: Boolean,
      default: false
    },

    // 创建alert或者case时请求的链接
    actionUrl: {
      type: String,
      default: ''
    },

    // 创建alert成功时的钩子
    onSuccess: {
      type: Function
    },

    // 弹框创建的类型，默认创建alert， 或者case
    type: {
      type: String,
      default: 'alert'
    },

    dataType: {
      type: Number,
      default: null
    },

    showData: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      actionData: common.getReqParam(),
      uploadUrl: `${hostPath.apiUrl}${apiPath.common.uploadUrl}`, // 文件上传的url
      alertTypeOptions: [], // alert Type
      caseTypeOptions: [], // case Type
      subjectTypeOptions: [], // subject Type
      ownerOptions: [], // owner
      ownerDisabled: false, // owner是否可选
      createAlertValues: {
        alertID: '', // Alert ID
        createDate: '', // Create Date
        alertType: '', // Alert Type
        dueDate: '', // Due Date
        subjectType: '', // Subject Type
        owner: '', // Owner
        subject: '', // Subject
        customerID: '', // Customer ID
        accountID: '', // Account ID
        autoAssignment: false, // Auto Assignment
        alertReason: '', // Alert Reason
        fileUrl: '' // 上传的文件url
      } // 创建alert时要保存的数据
    }
  },

  // 实例创建后,进行默认数据处理
  created () {
    // 获取alert Type
    this.getAlertType()

    // 获取subject Type
    this.getSubjectType(() => {
      if (this.showData) {
        this.createAlertValues.accountID = this.showData.accountID
        this.subjectTypeOptions.some((v) => {
          if (Number(v.key) === Number(this.showData.subjectType)) {
            this.createAlertValues.subjectType = v.value
            return true
          }
        })
      }
    })

    // 获取Owner
    this.getOwner()

    // 获取Case Type
    this.getCaseType()
    // console.log(this.dataType)
    // console.log(this.showData)
  },

  // html挂载在页面后,进行数据初始化
  mounted () {
    this.initOwner()
  },

  // 方法集合
  methods: {
    // 限制不能输入中文
    limitInputChinese (val, item) {
      this.createAlertValues[item] = common.limitInputChinese(val)
      if (item === 'alertReason') {
        this.monitorInputLen()
      }
    },

    // 处理分析员owner是否可选
    initOwner () {
      const amlTeamCode = common.getCookie('amlTeamCode')
      const amlRId = common.getCookie('amlRId')
      console.log(amlTeamCode)
      if (amlTeamCode && amlRId === '10042') {
        this.createAlertValues.owner = amlTeamCode
        this.ownerDisabled = true
      }
    },

    // 获取alert Type
    getAlertType () {
      common.getDictDetail(42, (resData) => {
        resData.dicSubs.forEach((v) => {
          this.alertTypeOptions.push({ value: v.dicKey, label: v.dicValue })
        })
      })
    },

    // 获取subject Type
    getSubjectType (cb) {
      common.getDictDetail(37, (resData) => {
        resData.dicSubs.forEach((v) => {
          this.subjectTypeOptions.push({ value: v.dicKey, label: v.dicValue, key: v.dicKey })
        })

        cb && cb()
      })
    },

    // 获取Owner
    getOwner () {
      common.getDictDetail(1, (resData) => {
        resData.dicSubs.forEach((v) => {
          this.ownerOptions.push({ value: v.dicKey, label: v.dicValue })
        })
      })
    },

    // 获取Case Type
    getCaseType () {
      common.getDictDetail(39, (resData) => {
        resData.dicSubs.forEach((v) => {
          this.caseTypeOptions.push({ value: v.dicKey, label: v.dicValue })
        })
      })
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
      this.createAlertValues.fileUrl = ''

      if (response.status === 0) {
        let filePathArr = []
        fileList.forEach((v) => {
          filePathArr.push(v.response.data[0].filePath)
        })
        this.createAlertValues.fileUrl = filePathArr.join(',')

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

    // 关闭alert
    closeDialogCreateAlert () {
      this.$emit('visibleChange', false)
      return false
    },

    // 确认创建alert
    confirmCreateAlert () {
      // 判断创建的是Case还是Alert
      if (this.type === 'case') {
        // 是否Case Type
        if (this.createAlertValues.alertType === '') {
          return common.warningInfoTip('Please choose case type')
        }
      } else {
        // 是否Alert Type
        if (this.createAlertValues.alertType === '') {
          return common.warningInfoTip('Please choose alert type')
        }
      }

      // 是否Due Date
      // if (this.createAlertValues.dueDate === '') {
      //   return common.warningInfoTip('Due date can not be empty')
      // }

      // 是否Subject Type
      // if (this.createAlertValues.subjectType === '') {
      //   return common.warningInfoTip('Please choose subject type')
      // }

      // 是否Owner
      if (this.type === 'alert' && this.createAlertValues.owner === '') {
        return common.warningInfoTip('Please choose owner')
      }

      // Subject，Customer ID，Account ID 3个只需要填一个即可
      if (this.createAlertValues.customerID === '' && this.createAlertValues.subject === '' && this.createAlertValues.accountID === '') {
        return common.warningInfoTip('Subject or Customer ID or Account ID can not be number')
      }
      // 如果有Customer ID
      if (this.createAlertValues.customerID !== '') {
        if (!common.isNumber(this.createAlertValues.customerID)) {
          return common.warningInfoTip('Customer ID should be number')
        }
      }

      // 如果有Account ID
      if (this.createAlertValues.accountID !== '') {
        if (!common.isNumber(this.createAlertValues.accountID)) {
          return common.warningInfoTip('Account ID should be number')
        }
      }

      // 是否Alert Reason
      if (this.createAlertValues.alertReason === '') {
        return common.warningInfoTip('Account Reason can not be empty')
      }

      let data = {
        // dueDate: common.formatYMD(this.createAlertValues.dueDate),
        subjectType: this.createAlertValues.subjectType,
        ownerOrg: this.createAlertValues.owner,
        subject: this.createAlertValues.subject,
        customerId: this.createAlertValues.customerID,
        accountId: this.createAlertValues.accountID,
        fileUrl: this.createAlertValues.fileUrl
      }

      // 判断创建的是Case还是Alert
      if (this.type === 'case') {
        data.caseType = this.createAlertValues.alertType
        data.caseReason = this.createAlertValues.alertReason
        data.dataType = 5
      } else {
        data.alertType = this.createAlertValues.alertType
        data.alertReason = this.createAlertValues.alertReason
        data.dataType = 4
      }
      // data_type数据来源，0：自动生成;1：External User Request;2：Grand Jury Subpoena;3：314A; 4: 手动创建Alert; 5:手动创建的case
      if (this.dataType) {
        data.dataType = this.dataType
      }

      if (!this.actionUrl) {
        return common.warningInfoTip('No request path')
      }

      const loadTips = Loading.service()
      this.$ajax({
        method: 'post',
        url: this.actionUrl,
        data: data
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res) {
          // 成功后提示，关闭弹框，刷新列表
          // 判断创建的是Case还是Alert
          if (this.type === 'case') {
            common.successInfoTip('Create case success')
          } else {
            common.successInfoTip('Create alert success')
          }

          // 重置,清空alert弹框数值
          Object.keys(this.createAlertValues).forEach((key) => {
            // 过滤owner
            const amlRId = common.getCookie('amlRId')
            if (amlRId !== '10042') {
              if (key !== 'autoAssignment') {
                this.$set(this.createAlertValues, key, '')
              } else {
                this.$set(this.createAlertValues, key, false)
              }
            } else {
              if (key !== 'owner') {
                if (key !== 'autoAssignment') {
                  this.$set(this.createAlertValues, key, '')
                } else {
                  this.$set(this.createAlertValues, key, false)
                }
              }
            }
          })

          // 执行创建alert成功后的钩子函数
          this.onSuccess && this.onSuccess(this.createAlertValues)

          // 清空文件列表
          $('.length_tips').remove()
          this.$refs.upload.clearFiles()
        }
      })
    },

    // 监控输入框输入长度,显示当前输入长度
    monitorInputLen (val) {
      const $wrap = $(this.$refs.monitorInput.$el).css({'position': 'relative'})
      const maxlength = $wrap.find('textarea').attr('maxlength')
      if (val) {
        const length = val.length
        if ($wrap.find('.length_tips').length > 0) {
          $wrap.find('.length_tips').html(`${length}/${maxlength}`)
        } else {
          $wrap.append(`<i class="length_tips" style="position: absolute; right: 20px; bottom: 0; color: #999; font-size: 9px">${length}/${maxlength}</i>`)
        }
      } else {
        // $wrap.append(`<i class="length_tips" style="position: absolute; right: 20px; bottom: 0; color: #999; font-size: 9px">${length}/${maxlength}</i>`)
      }
    }
  }
}
