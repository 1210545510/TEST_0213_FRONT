<div class="alert_layout_box">

  <header-component></header-component>

  <div class="container">

    <!-- start of 子导航 -->
    <div class="subNav">
      <ul class="clearfix">
        <router-link tag="li" to="/alert/list" v-if="isShowMenuItem(10100)">Alert List</router-link>
        <router-link tag="li" to="/alert/review" v-if="isShowMenuItem(10101)">Alert Review</router-link>
        <router-link tag="li" to="/alert/dashboard" v-if="isShowMenuItem(10102)">Dashboard</router-link>
        <!-- <li><a target="_blank" style="float: right" href="/#/SARReport/home">SARReport</a></li> -->
        <!-- <li><a target="_blank" style="float: right" href="/#/CTReport/home">CTReport</a></li> -->
        <!--<li style="float: right"><router-link tag="a" target="_blank" :to="{ path: '/CTReport/home', query: { caseId: caseId }}">CTReport</router-link></li>-->
        <!--<li style="float: right"><router-link tag="a" target="_blank" :to="{ path: '/SARReport/home', query: { caseId: caseId }}">SARReport</router-link></li>-->
      </ul>
    </div>
    <!-- end of 子导航 -->

    <router-view/>
  </div>
</div>
