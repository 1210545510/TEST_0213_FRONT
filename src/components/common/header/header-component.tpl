<!-- start of 头部 -->
<div class="header clearfix">
  <ul class="nav">
    <router-link tag="li" :to="{name: redirectToNewPath(10010)}"
      :class="matchRoutePath('/alert') ? 'focus' : ''" v-if="isShowMenuItem(10010)">
      <div class="show">
        <i class="icon"><img src="/static/img/n/am.png" alt="" /></i>
        <p class="txt">Alert Management</p>
      </div>
    </router-link>
    <router-link tag="li" :to="{name: redirectToNewPath(10011)}"
      :class="matchRoutePath('/case') ? 'focus' : ''" v-if="isShowMenuItem(10011)">
      <div class="show">
        <i class="icon"><img src="/static/img/n/cm.png" alt="" /></i>
        <p class="txt">Case Management</p>
      </div>
    </router-link>
    <router-link tag="li" :to="{name: redirectToNewPath(10012)}"
      :class="matchRoutePath('/data') ? 'focus' : ''" v-if="isShowMenuItem(10012)">
      <div class="show">
        <i class="icon"><img src="/static/img/n/dc.png" alt="" /></i>
        <p class="txt">Data Repository</p>
      </div>
    </router-link>
    <router-link tag="li" :to="{name: redirectToNewPath(10013)}"
      :class="matchRoutePath('/report') ? 'focus' : ''" v-if="isShowMenuItem(10013)">
      <div class="show">
        <i class="icon"><img src="/static/img/n/r.png" alt="" /></i>
        <p class="txt">Reporting</p>
      </div>
    </router-link>
    <router-link tag="li" :to="{name: redirectToNewPath(10014)}"
      :class="matchRoutePath('/configuration') ? 'focus' : ''" v-if="isShowMenuItem(10014)">
      <div class="show">
        <i class="icon"><img src="/static/img/n/c.png" alt="" /></i>
        <p class="txt">Configuration</p>
      </div>
    </router-link>
  </ul>
  <div class="head_user_info">
    <div class="avatar"><img :src="userAvatarImg" alt="" /></div>
    <div class="info">
      <p class="name">{{ userName }}</p>
      <p class="role">{{ userRole }}</p>
      <el-button type="primary" @click="signOut" class="btn">Sign Out</el-button>
    </div>
  </div>

</div>
<!-- end of 头部 -->
