<div class="report_visualAnalysis_box">
  <div class="chart_box">
    <div class="com_title_box clearfix">
      <h2 class="com_tit_txt lItem">Trend of alerts generated, cases created, and SARs filed</h2>

      <el-date-picker
        @change="chartTimeChange1"
        class="rItem"
        v-model="chartOption1.date"
        type="daterange"
        size="small"
        start-placeholder="Start Date"
        end-placeholder="End Date">
      </el-date-picker>

      <custom-switch
        class="rItem"
        :listData = chartOption1.listSwitch
        :activeIndex = chartOption1.activeIndex
        @actionMethod="chartSwitch1">
      </custom-switch>
    </div>

    <div class="chartShow" id="chart1"></div>
  </div>


  <div class="chart_box">
    <div class="com_title_box clearfix">
      <h2 class="com_tit_txt lItem">Ratios of productive alerts/ SAR yield rate</h2>

      <el-date-picker
        @change="chartTimeChange2"
        class="rItem"
        v-model="chartOption2.date"
        type="daterange"
        size="small"
        start-placeholder="Start Date"
        end-placeholder="End Date">
      </el-date-picker>

      <custom-switch
        class="rItem"
        :listData = chartOption2.listSwitch
        :activeIndex = chartOption2.activeIndex
        @actionMethod="chartSwitch2">
      </custom-switch>
    </div>

    <div class="chartShow" id="chart2"></div>
  </div>


  <div class="chart_box">
    <div class="com_title_box clearfix">
      <h2 class="com_tit_txt lItem">Total number trend</h2>

      <el-date-picker
        @change="chartTimeChange3"
        class="rItem"
        v-model="chartOption3.date"
        type="daterange"
        size="small"
        start-placeholder="Start Date"
        end-placeholder="End Date">
      </el-date-picker>

      <custom-switch
        class="rItem"
        :listData = chartOption3.listSwitch
        :activeIndex = chartOption3.activeIndex
        @actionMethod="chartSwitch3">
      </custom-switch>
    </div>

    <div class="chartShow" id="chart3"></div>
  </div>


  <div class="chart_box">
    <div class="com_title_box clearfix">
      <h2 class="com_tit_txt lItem">Total number of existing cases in each stage</h2>

      <el-date-picker
        @change="chartTimeChange4"
        class="rItem"
        v-model="chartOption4.date"
        type="daterange"
        size="small"
        start-placeholder="Start Date"
        end-placeholder="End Date">
      </el-date-picker>

      <custom-switch
        class="rItem"
        :listData = chartOption4.listSwitch
        :activeIndex = chartOption4.activeIndex
        @actionMethod="chartSwitch4">
      </custom-switch>
    </div>

    <div class="chartShow" id="chart4"></div>
  </div>


  <div class="chart_box">
    <div class="com_title_box clearfix">
      <h2 class="com_tit_txt lItem">Customers and non-customers on which multiple SARs have been filed</h2>

      <el-date-picker
        @change="chartTimeChange5"
        class="rItem"
        v-model="chartOption5.date"
        type="daterange"
        size="small"
        start-placeholder="Start Date"
        end-placeholder="End Date">
      </el-date-picker>

      <div class="rItem">SAR Number :
        <el-select
          v-model="chartOption5.num"
          placeholder="No data"
          @change="chartOptionChange5"
          style="width:60px">
          <el-option
            v-for="item in chartOption5.options"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>

      <custom-switch
        class="rItem"
        :listData = chartOption5.listSwitch
        :activeIndex = chartOption5.activeIndex
        @actionMethod="chartSwitch5">
      </custom-switch>

    </div>

    <div class="chartShow" id="chart5"></div>
  </div>

  <div class="chart_box">
    <div class="com_title_box clearfix">
      <h2 class="com_tit_txt lItem">Trend of Total number of SARs filed</h2>

      <el-date-picker
        @change="chartTimeChange6"
        class="rItem"
        v-model="chartOption6.date"
        type="daterange"
        size="small"
        start-placeholder="Start Date"
        end-placeholder="End Date">
      </el-date-picker>

      <custom-switch
        class="rItem"
        :listData = chartOption6.listSwitch
        :activeIndex = chartOption6.activeIndex
        @actionMethod="chartSwitch6">
      </custom-switch>
    </div>

    <div class="chartShow" id="chart6"></div>
  </div>

  <div class="chart_box">
    <div class="com_title_box clearfix">
      <h2 class="com_tit_txt lItem">Total number trend</h2>

      <el-date-picker
        @change="chartTimeChange7"
        class="rItem"
        v-model="chartOption7.date"
        type="daterange"
        size="small"
        start-placeholder="Start Date"
        end-placeholder="End Date">
      </el-date-picker>

      <custom-switch
        class="rItem"
        :listData = chartOption7.listSwitch
        :activeIndex = chartOption7.activeIndex
        @actionMethod="chartSwitch7">
      </custom-switch>
    </div>

    <div class="chartShow" id="chart7"></div>
  </div>
</div>
