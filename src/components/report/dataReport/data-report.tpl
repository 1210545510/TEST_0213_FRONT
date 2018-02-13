<div class="report_dataReport_box">
  <div class="list_box">
    <div class="com_title_box clearfix">
      <el-select
        class="selectOpations lItem"
        v-model="tabOption1.selectItem"
        @change="selectTitleChange1"
        placeholder="Not Data">
        <el-option
          v-for="item in tabOption1.selectOpations"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <div class="com_title_box clearfix">

      <el-date-picker
        @change="tabTimeChange1"
        class="lItem"
        v-model="tabOption1.date"
        type="daterange"
        size="small"
        start-placeholder="Start Date"
        end-placeholder="End Date">
      </el-date-picker>

      <el-button class="rItem" @click="exportCSV1">Export CSV</el-button>
      <el-button class="rItem" type="primary" @click="doPrint1">Print</el-button>

    </div>

    <div class="tab_list table_layout_border">
      <el-table
        ref="multipleTable"
        :data="tableListData1"
        tooltip-effect="dark"
        style="width: 100%"
        border>
        <el-table-column
          label="Year"
          prop="year"
          width="50">
        </el-table-column>
        <el-table-column
          label="Jan"
          prop="January">
        </el-table-column>
        <el-table-column
          label="Feb"
          prop="February">
        </el-table-column>
        <el-table-column
          label="Mar"
          prop="March">
        </el-table-column>
        <el-table-column
          label="Apr"
          prop="April">
        </el-table-column>
        <el-table-column
          label="May"
          prop="May">
        </el-table-column>
        <el-table-column
          label="Jun"
          prop="June">
        </el-table-column>
        <el-table-column
          label="Jul"
          prop="July">
        </el-table-column>
        <el-table-column
          label="Aug"
          prop="August">
        </el-table-column>
        <el-table-column
          label="Sep"
          prop="September">
        </el-table-column>
        <el-table-column
          label="Oct"
          prop="October">
        </el-table-column>
        <el-table-column
          label="Nov"
          prop="November">
        </el-table-column>
        <el-table-column
          label="Dec"
          prop="December">
        </el-table-column>
      </el-table>
    </div>

    <el-pagination
      @size-change="handleSizeChange1"
      @current-change="handleCurrentChange1"
      :current-page="tabOption1.currentPage"
      :page-size="tabOption1.pageSize"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tabOption1.total">
    </el-pagination>

  </div>


  <div class="list_box">
    <div class="com_title_box clearfix">
      <h2 class="com_tit_txt lItem">Total number of SARs filed from each source of referral</h2>
    </div>

    <div class="com_title_box clearfix">
      <custom-switch
        class="lItem"
        :listData = tabOption2.listSwitch
        :activeIndex = tabOption2.activeIndex
        @actionMethod="tabSwitch2">
      </custom-switch>

      <el-date-picker
        @change="tabTimeChange2"
        class="lItem"
        v-model="tabOption2.date"
        type="daterange"
        size="small"
        start-placeholder="Start Date"
        end-placeholder="End Date">
      </el-date-picker>

      <el-button class="rItem" @click="exportCSV2">Export CSV</el-button>
      <el-button class="rItem" type="primary" @click="doPrint2">Print</el-button>

    </div>

    <div class="tab_list table_layout_border">
      <el-table
        ref="multipleTable"
        :data="tableListData2"
        tooltip-effect="dark"
        style="width: 100%"
        border>
        <el-table-column
          label="Date">
          <template slot-scope="scope">
            <span>{{ scope.row.timeName | isEmptyVal | formatYMD }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="FCB"
          prop="FCB">
        </el-table-column>
        <el-table-column
          label="DCT"
          prop="DCT">
        </el-table-column>
        <el-table-column
          label="FIU"
          prop="FIU">
        </el-table-column>
        <el-table-column
          label="CTR"
          prop="CTR">
        </el-table-column>
      </el-table>
    </div>

    <el-pagination
      @size-change="handleSizeChange2"
      @current-change="handleCurrentChange2"
      :current-page="tabOption2.currentPage"
      :page-size="tabOption2.pageSize"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tabOption2.total">
    </el-pagination>

  </div>


  <div class="list_box">
    <div class="com_title_box clearfix">
      <h2 class="com_tit_txt lItem">Customers and non-customers on which multiple SARs have been filed</h2>
    </div>

    <div class="com_title_box clearfix">
      <custom-switch
        class="lItem"
        :listData = tabOption3.listSwitch
        :activeIndex = tabOption3.activeIndex
        @actionMethod="tabSwitch3">
      </custom-switch>

      <el-date-picker
        @change="tabTimeChange3"
        class="lItem"
        v-model="tabOption3.date"
        type="daterange"
        size="small"
        start-placeholder="Start Date"
        end-placeholder="End Date">
      </el-date-picker>

      <el-button class="rItem" @click="exportCSV3">Export CSV</el-button>
      <el-button class="rItem" type="primary" @click="doPrint3">Print</el-button>

    </div>

    <div class="tab_list table_layout_border">
      <el-table
        ref="multipleTable"
        :data="tableListData3"
        tooltip-effect="dark"
        style="width: 100%"
        border>
        <el-table-column
          label="Date">
          <template slot-scope="scope">
            <span>{{ scope.row.timeName | isEmptyVal | formatYMD }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Customers on which multiple SARs have been filed">
          <el-table-column
            label="One SAR"
            prop="customersSarCount1">
          </el-table-column>
          <el-table-column
            label="Two SAR"
            prop="customersSarCount2">
          </el-table-column>
          <el-table-column
            label="Three SAR"
            prop="customersSarCount3">
          </el-table-column>
          <el-table-column
            label="Four+"
            prop="customersSarCount4">
          </el-table-column>
        </el-table-column>
        <el-table-column label="NON-Customers on which multiple SARs have been filed">
          <el-table-column
            label="Two SAR"
            prop="nonCustomersSarCount1">
          </el-table-column>
          <el-table-column
            label="Three SAR"
            prop="nonCustomersSarCount2">
          </el-table-column>
          <el-table-column
            label="One SAR"
            prop="nonCustomersSarCount3">
          </el-table-column>
          <el-table-column
            label="Four+"
            prop="nonCustomersSarCount4">
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>

    <el-pagination
      @size-change="handleSizeChange3"
      @current-change="handleCurrentChange3"
      :current-page="tabOption3.currentPage"
      :page-size="tabOption3.pageSize"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tabOption3.total">
    </el-pagination>

  </div>

</div>