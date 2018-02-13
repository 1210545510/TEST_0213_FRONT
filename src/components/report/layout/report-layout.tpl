<div class="report_layout_box">

  <header-component></header-component>

  <div class="container">

    <!-- start of 子导航 -->
    <div class="subNav">
      <ul class="clearfix">
        <router-link tag="li" to="/report/visualAnalysis" v-if="isShowMenuItem(10116)">Visual Analysis</router-link>
        <router-link tag="li" to="/report/dataReport" v-if="isShowMenuItem(10117)">Data Report</router-link>
      </ul>
    </div>
    <!-- end of 子导航 -->

    <router-view></router-view>
  </div>
</div>
