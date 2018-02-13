<div class="case_layout_box">

  <header-component></header-component>

  <div class="container">

    <!-- start of 子导航 -->
    <div class="subNav">
      <ul class="clearfix">
        <router-link tag="li" to="/case/list" v-if="isShowMenuItem(10103)">Case List</router-link>
        <router-link tag="li" to="/case/review" v-if="isShowMenuItem(10104)">Case Review</router-link>
        <router-link tag="li" to="/case/dashboard" v-if="isShowMenuItem(10105)">Dashboard</router-link>
        <!--<router-link tag="li" to="/case/filingList" v-if="isShowMenuItem(10105)">SAR Filing List</router-link>-->
      </ul>
    </div>

    <!-- end of 子导航 -->

    <router-view/>
  </div>
</div>
