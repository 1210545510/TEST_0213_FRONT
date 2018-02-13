<div class="login_box">

  <!-- start of 背影幻灯 -->
  <el-carousel
    class="login_slide_box"
    indicator-position="none"
    :interval=10000
    arrow="never">
    <el-carousel-item v-for="(item, key) in carouselArray" :key="key" :style="{'background-image': item }"></el-carousel-item>
  </el-carousel>
  <div class="login_slide_mask"></div>
  <!-- end of 背影幻灯 -->

  <div class="login_form_box">
    <div class="logo_title" style="margin-top: -60px;">
      <img src="/static/img/logo_two.png" style="height: 100px;" />
      <div class="title" style="font-size: 40px; width: 510px">AML Intelligent Investigation</div>
    </div>
    <!-- <div class="title">Welcome to <em>AML</em></div> -->
    <div class="content">
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input v-model="form.name" @keyup.enter.native="onSubmit" placeholder="User Name"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="form.pwd" @keyup.enter.native="onSubmit" type="password" placeholder="Pass Word"></el-input>
        </el-form-item>

        <el-form-item>
          <el-checkbox-group v-model="form.checked">
            <el-checkbox label="Remember Me" name="Remember"></el-checkbox>
          </el-checkbox-group>

          <custom-switch
            :width=125
            :listData = form.listSwitch
            :activeIndex = form.activeIndex
            @actionMethod="loginSwitch">
          </custom-switch>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="subBtn">Sign In</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

  <div class="bg" style="
    z-index: 2;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    margin-left: 25%;
    border-left: 3px solid #337cb7;
    position: fixed;
    background-color: rgba(0,63,105,.85);
"></div>

</div>
