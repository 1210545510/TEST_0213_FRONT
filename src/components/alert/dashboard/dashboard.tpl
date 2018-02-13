<div class="alert_dashboard_box">
  <div class="comPartingLine"></div>

  <div class="alert_dashboard_item_box">
    <div class="com_title_box clearfix">
      <h2 class="com_tit_txt">To-do List</h2>

      <el-date-picker
        @change="toDoListDateChange"
        class="rItem"
        v-model="toDoList.date"
        type="daterange"
        size="small"
        start-placeholder="Start Date"
        end-placeholder="End Date">
      </el-date-picker>

      <!-- Alert.Supervisor和admin有权限看到此选项 -->
      <el-select
        v-if="roleId === 10044 || roleId === 10053"
        class="rItem"
        clearable
        v-model="toDoList.roleSelected"
        placeholder="Please Select"
        @change="toDoListRoleChange">
        <el-option-group
          class="customGroup"
          v-for="groups in roleOptions"
          :key="groups.teamCode">
          <el-option
            class="mainTitle"
            :label="groups.teamCode"
            :value="allTeamsStr(groups.roleList)">
          </el-option>
          <el-option-group
            class="customGroup"
            v-for="group in groups.roleList"
            :key="group.roleName">
            <el-option
              class="title"
              :label="group.roleName"
              :value="group.userNames">
            </el-option>
            <el-option
              v-for="item in stringToArr(group.userNames)"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-option-group>
        </el-option-group>
      </el-select>

    </div>

    <div class="todoTaskPie_box">
      <div id="todoTaskPie"></div>

      <div class="pending_box">
        <h4>Alerts Pending</h4>
        <p class="num">{{ toDoList.pending | formatNumber }}</p>
      </div>
    </div>

  </div>

  <div class="comPartingLine"></div>
  <div class="alert_dashboard_item_box">
    <div class="com_title_box clearfix">
      <h2 class="com_tit_txt lItem">Monitoring</h2>

      <!-- Alert.Supervisor和admin有权限看到此选项 -->
      <custom-switch
        v-if="roleId === 10044 || roleId === 10053"
        class="lItem"
        :listData = monitoring.listSwitch1
        :activeIndex = monitoring.type1
        @actionMethod="typeSwitchTab">
      </custom-switch>

      <el-date-picker
        v-show="monitoring.type1 === 0"
        @change="monitoringDateChange"
        class="rItem"
        v-model="monitoring.date"
        type="daterange"
        size="small"
        start-placeholder="Start Date"
        end-placeholder="End Date">
      </el-date-picker>

      <custom-switch
        v-show="monitoring.type1 === 0"
        class="rItem"
        :listData = monitoring.listSwitch2
        :activeIndex = monitoring.type2
        @actionMethod="typeSwitch2">
      </custom-switch>

    </div>

    <!-- 选择卡1 -->
    <div v-show="monitoring.type1 === 0">
      <div>
        <!-- Alert.Supervisor和admin有权限看到此选项及Sar.Officer、Sar.Supervisor及admin有权限看到此选项 -->
        <el-row
          v-if="roleId === 10044 || roleId === 10047 || roleId === 10052 || roleId === 10053"
          type="flex"
          class="monitoring_list_box"
          justify="space-around">
          <el-col
            :span="10">
            <div class="num">{{ monitoring.total | isEmptyVal | formatNumber }}</div>
            <div class="tit">Total number of alerts reviewed</div>
          </el-col>
          <el-col
            :span="10">
            <div class="num">{{ monitoring.avgScore | isEmptyVal | formatNumber }}</div>
            <div class="tit">Average score for the alerts QA reviewed</div>
          </el-col>
          <!--<el-col-->
            <!--:span="5">-->
            <!--<div class="num">{{ monitoring.transactionAmount | isEmptyVal | formatUSD }}</div>-->
            <!--<div class="tit">Total transaction amount</div>-->
          <!--</el-col>-->
          <!--<el-col-->
            <!--:span="5">-->
            <!--<div class="num">{{ monitoring.transactionVolume | isEmptyVal | formatNumber }}</div>-->
            <!--<div class="tit">Total transaction volume</div>-->
          <!--</el-col>-->
        </el-row>

        <!-- analyst 有权限看到此选项 -->
        <el-row
          v-if="roleId=== 10042"
          type="flex"
          class="monitoring_list_box"
          justify="space-around">
          <el-col
            :span="7">
            <div class="num">{{ monitoring.total | isEmptyVal | formatNumber }}</div>
            <div class="tit">Total number of alerts reviewed</div>
          </el-col>
          <el-col
            :span="7">
            <div class="num">{{ monitoring.avgScore | isEmptyVal | formatNumber }}</div>
            <div class="tit">Average score for the alerts QA reviewed</div>
          </el-col>
          <el-col
            :span="7">
            <div class="num">{{ monitoring.timeTotal }} Hour</div>
            <div class="tit">Average review time per alert</div>
          </el-col>
        </el-row>

        <!-- QA 有权限看到此选项 -->
        <el-row
          v-else-if="roleId=== 10041 || roleId=== 10043"
          type="flex"
          class="monitoring_list_box"
          justify="space-around">
          <el-col
            :span="7">
            <div class="num">{{ monitoring.total | isEmptyVal | formatNumber }}</div>
            <div class="tit">Total number of alerts I conducted QA review</div>
          </el-col>
          <el-col
            :span="7">
            <div class="num">{{ monitoring.avgScore | isEmptyVal | formatNumber }}</div>
            <div class="tit">Average score for the alerts I conducted QA review</div>
          </el-col>
          <el-col
            :span="7">
            <div class="num">{{ monitoring.timeTotal }} Hour</div>
            <div class="tit">My average QA review time per alert</div>
          </el-col>
        </el-row>
      </div>

      <div>
        <!-- Alert.Supervisor和admin有权限看到此选项 -->
        <div v-if="roleId === 10044 || roleId === 10047 || roleId === 10052 || roleId === 10053">
          <div class="otherEchartLineStack" id="otherEchartLineStack1"></div>
          <div class="otherEchartLineStack" id="otherEchartLineStack2"></div>
          <div class="otherEchartLineStack" id="otherEchartLineStack3"></div>
          <div class="otherEchartLineStack" id="otherEchartLineStack4"></div>
        </div>

        <!-- analyst 有权限看到此选项 -->
        <div v-else-if="roleId === 10042">
          <div class="otherEchartLineStack" id="otherEchartLineStack11"></div>
          <div class="otherEchartLineStack" id="otherEchartLineStack12"></div>
          <!--<div class="otherEchartLineStack" id="otherEchartLineStack13"></div>-->
          <div class="otherEchartLineStack" id="otherEchartLineStack14"></div>
        </div>

        <!-- QA 有权限看到此选项 -->
        <div v-else-if="roleId=== 10041 || roleId=== 10043">
          <div class="otherEchartLineStack" id="otherEchartLineStack21"></div>
          <div class="otherEchartLineStack" id="otherEchartLineStack22"></div>
        </div>
      </div>
    </div>

    <!-- start of dataReport -->
    <div v-show="monitoring.type1 === 1">
      <!-- start of tab1 -->
      <div class="tab_list_box">
        <div class="com_title_box clearfix">
          <h2 v-if="sysType === 'prime' " class="com_tit_txt lItem">Total number of alerts generated from each Prime rule</h2>
          <h2 v-else class="com_tit_txt lItem">Total number of alerts generated from each Mantas scenario</h2>
        </div>

        <div class="com_title_box clearfix">

          <el-date-picker
            @change="tabTimeChange1"
            class="lItem"
            v-model="tabOption1.time"
            type="daterange"
            size="small"
            start-placeholder="Start Date"
            end-placeholder="End Date">
          </el-date-picker>

          <el-button class="rItem" @click="exportCSV1">Export CSV</el-button>
          <el-button class="rItem" type="primary" @click="print1">Print</el-button>

        </div>

        <div class="tab_list table_layout_border">
          <el-table
            ref="multipleTable"
            :data="tableListData1"
            tooltip-effect="dark"
            style="width: 100%"
            border>
            <el-table-column
              label="Date"
              prop="date">
            </el-table-column>
            <el-table-column
              label="Scenario1"
              prop="scenario1">
            </el-table-column>
            <el-table-column
              label="Scenario2"
              prop="scenario2">
            </el-table-column>
            <el-table-column
              label="Scenario3"
              prop="scenario3">
            </el-table-column>
            <el-table-column
              label="Scenario4"
              prop="scenario4">
            </el-table-column>
            <el-table-column
              label="Scenario5"
              prop="scenario5">
            </el-table-column>
            <el-table-column
              label="Scenario6"
              prop="scenario6">
            </el-table-column>
            <el-table-column
              label="Scenario7"
              prop="scenario7">
            </el-table-column>
            <el-table-column
              label="Scenario8"
              prop="scenario8">
            </el-table-column>
            <el-table-column
              label="Scenario9"
              prop="scenario9">
            </el-table-column>
            <el-table-column
              label="Scenario10"
              prop="scenario10">
            </el-table-column>
            <el-table-column
              label="Scenario11"
              prop="scenario11">
            </el-table-column>
            <el-table-column
              label="Scenario12"
              prop="scenario12">
            </el-table-column>
            <el-table-column
              label="Scenario13"
              prop="scenario13">
            </el-table-column>
            <el-table-column
              label="Scenario14"
              prop="scenario14">
            </el-table-column>
            <el-table-column
              label="Scenario15"
              prop="scenario15">
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
      <!-- end of tab1 -->

      <!-- start of tab2 -->
      <div class="tab_list_box">
        <div class="com_title_box clearfix">
          <h2 v-if="sysType === 'prime' " class="com_tit_txt lItem">Total number of alerts escalated from each Prime rule</h2>
          <h2 v-else class="com_tit_txt lItem">Total number of alerts escalated from each Mantas scenario</h2>
        </div>

        <div class="com_title_box clearfix">

          <el-date-picker
            @change="tabTimeChange2"
            class="lItem"
            v-model="tabOption2.time"
            type="daterange"
            size="small"
            start-placeholder="Start Date"
            end-placeholder="End Date">
          </el-date-picker>

          <el-button class="rItem" @click="exportCSV2">Export CSV</el-button>
          <el-button class="rItem" type="primary" @click="print2">Print</el-button>

        </div>

        <div class="tab_list table_layout_border">
          <el-table
            ref="multipleTable"
            :data="tableListData2"
            tooltip-effect="dark"
            style="width: 100%"
            border>
            <el-table-column
              label="Date"
              prop="date">
            </el-table-column>
            <el-table-column
              label="Scenario1"
              prop="scenario1">
            </el-table-column>
            <el-table-column
              label="Scenario2"
              prop="scenario2">
            </el-table-column>
            <el-table-column
              label="Scenario3"
              prop="scenario3">
            </el-table-column>
            <el-table-column
              label="Scenario4"
              prop="scenario4">
            </el-table-column>
            <el-table-column
              label="Scenario5"
              prop="scenario5">
            </el-table-column>
            <el-table-column
              label="Scenario6"
              prop="scenario6">
            </el-table-column>
            <el-table-column
              label="Scenario7"
              prop="scenario7">
            </el-table-column>
            <el-table-column
              label="Scenario8"
              prop="scenario8">
            </el-table-column>
            <el-table-column
              label="Scenario9"
              prop="scenario9">
            </el-table-column>
            <el-table-column
              label="Scenario10"
              prop="scenario10">
            </el-table-column>
            <el-table-column
              label="Scenario11"
              prop="scenario11">
            </el-table-column>
            <el-table-column
              label="Scenario12"
              prop="scenario12">
            </el-table-column>
            <el-table-column
              label="Scenario13"
              prop="scenario13">
            </el-table-column>
            <el-table-column
              label="Scenario14"
              prop="scenario14">
            </el-table-column>
            <el-table-column
              label="Scenario15"
              prop="scenario15">
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
      <!-- end of tab2 -->

      <!-- start of tab3 -->
      <div class="tab_list_box">
        <div class="com_title_box clearfix">
          <el-select
            class="selectOpations lItem"
            v-model="tabOption3.selectItem"
            @change="selectTitleChange3"
            placeholder="Not Data">
            <el-option
              v-for="item in tabOption3.selectOpations"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>

        <div class="com_title_box clearfix">

          <!--<el-date-picker-->
            <!--@change="tabTimeChange3"-->
            <!--class="lItem"-->
            <!--v-model="tabOption3.time"-->
            <!--type="daterange"-->
            <!--size="small"-->
            <!--start-placeholder="Start Date"-->
            <!--end-placeholder="End Date">-->
          <!--</el-date-picker>-->

          <el-button class="rItem" @click="exportCSV3">Export CSV</el-button>
          <el-button class="rItem" type="primary" @click="print3">Print</el-button>

        </div>

        <div class="tab_list table_layout_border">
          <el-table
            ref="multipleTable"
            :data="tableListData3"
            tooltip-effect="dark"
            style="width: 100%"
            border>
            <el-table-column
              label="Year"
              prop="year">
            </el-table-column>
            <el-table-column
              label="January"
              prop="january">
            </el-table-column>
            <el-table-column
              label="February"
              prop="february">
            </el-table-column>
            <el-table-column
              label="March"
              prop="march">
            </el-table-column>
            <el-table-column
              label="April"
              prop="april">
            </el-table-column>
            <el-table-column
              label="May"
              prop="may">
            </el-table-column>
            <el-table-column
              label="June"
              prop="june">
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
      <!-- end of tab3 -->

      <!-- start of tab4 -->
      <div class="tab_list_box">
        <div class="com_title_box clearfix">
          <el-select
            class="selectOpations lItem"
            v-model="tabOption4.selectItem"
            @change="selectTitleChange4"
            placeholder="Not Data">
            <el-option
              v-for="item in tabOption4.selectOpations"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>

        <div class="com_title_box clearfix">

          <!--<el-date-picker-->
            <!--@change="tabTimeChange4"-->
            <!--class="lItem"-->
            <!--v-model="tabOption4.time"-->
            <!--type="daterange"-->
            <!--size="small"-->
            <!--start-placeholder="Start Date"-->
            <!--end-placeholder="End Date">-->
          <!--</el-date-picker>-->

          <el-button class="rItem" @click="exportCSV4">Export CSV</el-button>
          <el-button class="rItem" type="primary" @click="print4">Print</el-button>

        </div>

        <div class="tab_list table_layout_border">
          <el-table
            ref="multipleTable"
            :data="tableListData4"
            tooltip-effect="dark"
            style="width: 100%"
            border>
            <el-table-column
              label=""
              prop="userName">
            </el-table-column>
            <el-table-column
              label="January"
              prop="january">
            </el-table-column>
            <el-table-column
              label="February"
              prop="february">
            </el-table-column>
            <el-table-column
              label="March"
              prop="march">
            </el-table-column>
            <el-table-column
              label="April"
              prop="april">
            </el-table-column>
            <el-table-column
              label="May"
              prop="may">
            </el-table-column>
            <el-table-column
              label="June"
              prop="june">
            </el-table-column>
          </el-table>
        </div>

        <el-pagination
          @size-change="handleSizeChange4"
          @current-change="handleCurrentChange4"
          :current-page="tabOption4.currentPage"
          :page-size="tabOption4.pageSize"
          :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tabOption4.total">
        </el-pagination>

      </div>
      <!-- end of tab4 -->

      <!-- start of tab5 -->
      <div class="tab_list_box">
        <div class="com_title_box clearfix">
          <el-select
            class="selectOpations lItem"
            v-model="tabOption5.selectItem"
            @change="selectTitleChange5"
            placeholder="Not Data">
            <el-option
              v-for="item in tabOption5.selectOpations"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>

        <div class="com_title_box clearfix">

          <!--<el-date-picker-->
            <!--@change="tabTimeChange5"-->
            <!--class="lItem"-->
            <!--v-model="tabOption5.time"-->
            <!--type="daterange"-->
            <!--size="small"-->
            <!--start-placeholder="Start Date"-->
            <!--end-placeholder="End Date">-->
          <!--</el-date-picker>-->

          <el-button class="rItem" @click="exportCSV5">Export CSV</el-button>
          <el-button class="rItem" type="primary" @click="print5">Print</el-button>

        </div>

        <div class="tab_list table_layout_border">
          <el-table
            ref="multipleTable"
            :data="tableListData5"
            tooltip-effect="dark"
            style="width: 100%"
            border>
            <el-table-column
              label="Date"
              prop="reviewDate">
            </el-table-column>
            <el-table-column label="Total number of alert for FIU review">
              <el-table-column
                label="Analyst 1"
                prop="analyst1">
              </el-table-column>
              <el-table-column
                label="Analyst 2"
                prop="analyst2">
              </el-table-column>
              <el-table-column
                label="Analyst 3"
                prop="analyst3">
              </el-table-column>
              <el-table-column
                label="Team Total"
                prop="teamTotal">
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>

        <el-pagination
          @size-change="handleSizeChange5"
          @current-change="handleCurrentChange5"
          :current-page="tabOption5.currentPage"
          :page-size="tabOption5.pageSize"
          :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tabOption5.total">
        </el-pagination>

      </div>
      <!-- end of tab5 -->


    </div>
    <!-- end of dataReport -->

  </div>

</div>
