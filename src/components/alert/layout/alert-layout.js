import headerComponent from '@/components/common/header/header-component'
import './alert-layout.scss'
import template from './alert-layout.tpl'
import { Loading } from 'element-ui'

// 引入公共脚本
import common from '@/utils/common'

// 引入api.json文件
import apiPath from 'rootPath/config/api.json'

export const alertLayout = {
  template,

  // 注册组件
  components: {
    headerComponent
  },

  data () {
    return {
      caseId: '',
      isShowMenuItem: common.isShowMenu // 权限管理
    }
  },

  // 实例创建后,进行默认数据处理
  created () {
    // this.getFistReview()
  },

  // 方法集合
  methods: {
    // 获得第一条review信息
    getFistReview () {
      const loadTips = Loading.service()
      this.$ajax({
        method: 'get',
        url: `${apiPath.case.review.reviewFist}`,
        params: {
          actorId: common.getUserId(),
          roleId: common.getRoleId()
        }
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0 && res.data) {
          this.caseId = res.data
        }
      })
    }
  }
}
