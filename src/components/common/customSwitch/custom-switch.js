/*
*
* activeIndex 为显示的选项位置索引,从0开始,如0,1,2,3,...,默认为第一个,索引为0,数字类型
* switchWidth 总宽度,数字类型
* actionMethod 为传入的点击方法, 同时会返回一个对象:
* {
*   val  // 当前对象的值
*   key // 索引值
* }
*
* */
require('./custom-switch.scss')
const template = require('./custom-switch.tpl')

export default {
  template,

  name: 'custom-switch',

  // 接收传过来的值
  props: {
    activeIndex: {
      type: Number,
      default: 0
    },

    width: {
      type: Number,
      default: 258
    },

    listData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },

  data () {
    return {
      showListData: this.listData, // 展示项的数据
      showActiveIndex: this.activeIndex, // 默认显示的选项  序号从0开始,如0,1,2,3,。。。
      showActiveItemWidth: 0 // 一个栏目显示的宽度
    }
  },

  // 实例创建后,进行默认数据处理
  created () {},

  // html挂载在页面后,进行数据初始化
  mounted () {
    if (this.listData.length > 0) {
      this.showActiveItemWidth = this.width / this.listData.length
    }
  },

  // 方法集合
  methods: {
    bindMethod (_val, _key) {
      if (this.showActiveIndex !== _key) {
        this.showActiveIndex = _key
        // 回调的参数
        let obj = {
          val: _val,
          key: _key
        }
        this.$emit('actionMethod', obj)
      }
    }
  }
}
