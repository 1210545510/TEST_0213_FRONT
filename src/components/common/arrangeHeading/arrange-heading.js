/*
*
*   visibleArrangeHeading 是否显示arrange-heading弹框
*   allHeading 所有表头字段
*   checkedHeading 被选中的表头字段
*   disabledHeading 禁止选中的表头字段
*   onSuccess ArrangeHeading成功时的钩子
*
* */
import './arrange-heading.scss'
import template from './arrange-heading.tpl'
import { Loading } from 'element-ui'

// 引用jquery
import $ from 'jquery'

// 引入公共脚本
import common from '@/utils/common'

export default {
  template,

  name: 'arrange-heading',

  // 接收传过来的值
  props: {
    // 显示与隐藏弹框
    visibleArrangeHeading: {
      type: Boolean,
      default: false
    },

    // 所有表头字段
    allHeading: {
      type: Array,
      default: []
    },

    // 被选中的表头字段
    checkedHeading: {
      type: Array,
      default: []
    },

    // 禁止选中的表头字段
    disabledHeading: {
      type: Array,
      default: []
    },

    // ArrangeHeading成功时的钩子
    onSuccess: {
      type: Function
    },

    // 创建alert时请求的链接
    actionUrl: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      getAllHeading: this.allHeading,
      getCheckedHeading: this.checkedHeading
    }
  },

  // 实例创建后,进行默认数据处理
  created () {},

  // 方法集合
  methods: {
    // 关闭弹框
    closeDialogArrangeHeading () {
      this.$emit('visibleChange', false)
      return false
    },

    // 确认保存重新调整后的表头
    confirmArrangeHeading () {
      let dicTbs = []
      // 对被选中的checked表头重新根据在getAllHeading表头中排序
      let newSortArr = []
      this.getAllHeading.forEach((v) => {
        this.getCheckedHeading.some((subv, subi) => {
          if (v.value === subv) {
            newSortArr.push(subv)
            return true
          }
        })
      })
      this.getCheckedHeading = Object.assign([], newSortArr)

      this.getAllHeading.forEach((v) => {
        this.getCheckedHeading.some((subv, subi) => {
          if (v.value === subv) {
            dicTbs.push({dicSid: v.dicSid, sortIndex: subi + 1, userId: common.getUserId()})
            return true
          }
        })
      })

      let data = dicTbs

      if (!this.actionUrl) {
        return common.warningInfoTip('No request path')
      }

      const loadTips = Loading.service()
      this.$ajax({
        method: 'post',
        url: this.actionUrl,
        data: { dicTbs: data }
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res) {
          // 执行重设表头成功后的钩子函数
          this.onSuccess && this.onSuccess(data)
        }
      })
    },

    // 点击箭头移动表头相对位置
    moveHeadingPosition (event) {
      const $target = $(event.target)
      let direction = 'down' // 方向
      if ($target.hasClass('move_button')) {
        $target.addClass('active').siblings('.move_button').removeClass('active')

        // 移动方向
        if ($target.hasClass('move_up_button')) {
          direction = 'up'
        } else {
          direction = 'down'
        }
      } else {
        $target.parent('.move_button').addClass('active').siblings('.move_button').removeClass('active')

        // 移动方向
        if ($target.parent('.move_button').hasClass('move_up_button')) {
          direction = 'up'
        } else {
          direction = 'down'
        }
      }

      // 改变表头的排序顺序
      this.changeHeadingSorting(direction)
    },

    // 改变表头的高亮显示位置
    changeHeadingActived (val) {
      Object.values(this.getAllHeading).forEach((v) => {
        if (v.value === val) {
          this.$set(v, 'isActive', true)
        } else {
          this.$set(v, 'isActive', false)
        }
      })
    },

    // 改变表头的排序
    changeHeadingSorting (direction) {
      let index = 0
      let temp = ''
      // 先获得高亮位置的索引
      Object.keys(this.getAllHeading).some((key) => {
        if (this.getAllHeading[key].isActive === true) {
          index = Number(key)
          return true
        }
      })
      temp = this.getAllHeading[index]

      // 根据方向调整选中的选项在数组中的位置
      if (direction === 'down') {
        if (index !== this.getAllHeading.length - 1) {
          this.getAllHeading[index] = this.getAllHeading[index + 1]
          this.getAllHeading[index + 1] = temp
        }
      } else {
        if (index !== 0) {
          this.getAllHeading[index] = this.getAllHeading[index - 1]
          this.getAllHeading[index - 1] = temp
        }
      }
      // 使用Object.assign重新创建一个数组，继承原数据，解决数据变化，视图不更新问题
      this.getAllHeading = Object.assign([], this.getAllHeading)

      common.resetSortIndex(this.getAllHeading) // 重新排序sortIndex
      common.changeScrollbarPosition(index) // 根据高亮位置，改变滚动条位置
    },

    isDisabled (value) {
      let isDisabled = false
      this.disabledHeading.some((v) => {
        if (v.toLowerCase() === value.toLowerCase()) {
          isDisabled = true
          return true
        }
      })
      return isDisabled
    }
  },

  // 监听数据的变化
  watch: {
    getCheckedHeading (newVal, oldVal) {
      let diffData = ''
      if (newVal.length > oldVal.length) {
        diffData = common.compareArraysFindDiff(newVal, oldVal)
      } else {
        diffData = common.compareArraysFindDiff(oldVal, newVal)
      }

      if (diffData.length) {
        // 改变表头的高亮显示选项
        this.changeHeadingActived(diffData[0])
      }
    },

    // 监听父组件prop传递过来的参数是否更新，动态更新子组件data中的数据
    allHeading (newVal, oldVal) {
      this.getAllHeading = newVal
      // 定时器改变首个数组中的isActive状态
      setTimeout(() => {
        if (this.getAllHeading.length > 0) {
          this.$set(this.getAllHeading[0], 'isActive', true)
        }
      }, 500)
      // 改变高亮位置
      this.changeHeadingActived()
    }
  }
}
