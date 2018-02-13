<div class="alert_list_box table_layout">

  <!-- 搜索条件 -->
  <div class="search_toolBar clearfix">

    <div class="search_toolBar_row clearfix">
      <div class="fLeft search_item">
        <span class="search_name">Create Date:</span>
        <el-date-picker
          v-model="searchValues.createDateSelect"
          type="daterange"
          size="small"
          start-placeholder="Start Date"
          end-placeholder="End Date">
        </el-date-picker>
      </div>

      <div class="fLeft search_item">
        <span class="search_name search_name1">Due Date:</span>
        <el-date-picker
          v-model="searchValues.dueDateSelect"
          type="daterange"
          size="small"
          start-placeholder="Start Date"
          end-placeholder="End Date">
        </el-date-picker>
      </div>

      <div class="fRight search_btn_warp">
        <el-input placeholder="Scenario"
          v-model="searchValues.searchScenario"
          :maxlength="50"
          @keyup.enter.native="searchKeyword(searchValues.searchScenario, 'scenario')"
          class="input-with-select">
          <el-button slot="append"
          icon="el-icon-search"
          @click="searchKeyword(searchValues.searchScenario, 'scenario')"></el-button>
        </el-input>
      </div>
      <div class="fRight search_btn_warp">
        <el-input placeholder="Geography"
          v-model="searchValues.searchGeography"
          :maxlength="50"
          @keyup.enter.native="searchKeyword(searchValues.searchGeography, 'geography')"
          class="input-with-select">
          <el-button slot="append"
          icon="el-icon-search"
          @click="searchKeyword(searchValues.searchGeography, 'geography')"></el-button>
        </el-input>
      </div>
      <div class="fRight search_btn_warp" style="margin: 0">
        <el-input placeholder="Alert ID"
          v-model="searchValues.searchAlertID"
          :maxlength="20"
          @keyup.enter.native="searchKeyword(searchValues.searchAlertID, 'alertID')"
          class="input-with-select">
          <el-button slot="append"
          icon="el-icon-search"
          @click="searchKeyword(searchValues.searchAlertID, 'alertID')"></el-button>
        </el-input>
      </div>
    </div>

    <div class="search_toolBar_row clearfix">
      <div class="fLeft search_item">
        <span class="search_name">Status:</span>
        <el-select v-model="searchValues.statusSelect" placeholder="Select Status">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="fLeft search_item">
        <span class="search_name search_name1">Amount:</span>
        <div class="search_range_box">
          <el-input class="" v-model="searchValues.startAmount" placeholder="Min Amount" :maxlength="20"></el-input>
          <span class="line_separator">-</span>
          <el-input class="" v-model="searchValues.endAmount" placeholder="Max Amount" :maxlength="20"></el-input>
        </div>
      </div>
    </div>

    <div class="search_toolBar_row clearfix">
      <div class="fLeft search_item">
        <span class="search_name">Volume:</span>
        <div class="search_range_box">
          <el-input class="" v-model="searchValues.startVolume" placeholder="Min Volume" :maxlength="9"></el-input>
          <span class="line_separator">-</span>
          <el-input class="" v-model="searchValues.endVolume" placeholder="Max Volume" :maxlength="9"></el-input>
        </div>
      </div>

      <div class="fLeft search_item">
        <span class="search_name search_name1">Score:</span>
        <div class="search_range_box">
          <el-input class="" v-model="searchValues.startScore" placeholder="Min Score" :maxlength="20"></el-input>
          <span class="line_separator">-</span>
          <el-input class="" v-model="searchValues.endScore" placeholder="Max Score" :maxlength="20"></el-input>
        </div>
      </div>
    </div>

    <div class="search_toolBar_row clearfix" v-if="roleId === 10044 || roleId === 10047 || roleId === 10053 || roleId === 10050">
      <div class="fLeft search_item">
        <span class="search_name">Assigned to:</span>
        <el-select v-model="searchValues.assignedSelect" placeholder="Select Assigned to">
          <el-option
            v-for="item in assignedOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="search_toolBar_row search_toolBar_btn_row clearfix">
      <div class="fLeft search_item">
        <el-button type="success" @click="screenSearch" v-if="isShowMenuItem(10138)">Search</el-button>
      </div>
      <div class="fRight search_btn_group">

        <el-button type="primary" @click="batchAssign()" v-if="isShowMenuItem(10139)"
          v-show="listActiveName === '0'">Re-assign</el-button>
        <el-button @click="reArrangeHeading" v-if="isShowMenuItem(10140)">Re-arrange Headings</el-button>
        <el-button @click="createAlert" v-if="isShowMenuItem(10141)">Create Alert</el-button>
        <el-button @click="doMerge" v-if="roleId === 10042 || roleId === 10044 || roleId === 10053 ">Merge</el-button>
        <el-button @click="exportCSV" v-if="isShowMenuItem(10142)">Export CSV</el-button>
      </div>
    </div>
  </div>

  <el-tabs class="com_tab_card_box com_tab_card_box1"
    v-model="listActiveName"
    type="card"
    @tab-click="handleTabFun">

    <!-- tab选项1 待处理的case list -->
    <el-tab-pane label="To-do List" name="0">
      <!-- table -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @sort-change=sortChange
        :row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="40">
        </el-table-column>
        <el-table-column
          label="Alert ID"
          prop="alertId"
          width="120">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="String(scope.row.alertId)" placement="top-start" :open-delay=400>
              <i>{{ scope.row.alertId }}</i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="statusValue"
          label="Status"
          width="120">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.statusValue" placement="top-start" :open-delay=400>
              <i>{{ scope.row.statusValue }}</i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          v-for="item in confirmHeading"
          :key="item"
          :prop="tranformToHumpStr(item)"
          :label="item"
          :sortable="isSortable(item, true)"
          width="120">
          <template slot-scope="scope">
            <span v-if="item === 'Due Date'">
              <el-tooltip class="item" effect="dark" :content="formatYMD(scope.row.dueDate)" placement="top-start" :open-delay=400>
                <i>{{ formatYMD(scope.row.dueDate) }}</i>
              </el-tooltip>
            </span>
            <span  v-else-if="item === 'Create Date'">
              <el-tooltip class="item" effect="dark" :content="formatYMD(scope.row.createDate)" placement="top-start" :open-delay=400>
                <i>{{ formatYMD(scope.row.createDate) }}</i>
              </el-tooltip>
            </span>
            <span v-else-if="item === 'Type'">
              <el-tooltip class="item" effect="dark" :content="scope.row.typeValue" placement="top-start" :open-delay=400>
                <i>{{ scope.row.typeValue }}</i>
              </el-tooltip>
            </span>
            <span v-else-if="item === 'Linked Case'">
              <el-tooltip class="item" effect="dark" :content="scope.row.linkCase" placement="top-start" :open-delay=400>
                <i>{{ scope.row.linkCase }}</i>
              </el-tooltip>
            </span>
            <span v-else-if="item === 'Amount'">
              <el-tooltip class="item" effect="dark" :content="scope.row.amount | isEmptyVal | formatUSD" placement="top-start" :open-delay=400>
                <i>{{ scope.row.amount | isEmptyVal | formatUSD }}</i>
              </el-tooltip>
            </span>
            <span  v-else-if="item === 'Business Date'">
              <el-tooltip class="item" effect="dark" :content="formatYMD(scope.row.businessDate)" placement="top-start" :open-delay=400>
                <i>{{ formatYMD(scope.row.businessDate) }}</i>
              </el-tooltip>
            </span>
            <span v-else>
              <el-tooltip class="item" effect="dark" :content="String(scope.row[tranformToHumpStr(item)])" placement="top-start" :open-delay=400>
                <i>{{ scope.row[tranformToHumpStr(item)] }}</i>
              </el-tooltip>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="Assigned to"
          min-width="120">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.userName" placement="top-start" :open-delay=400>
              <i>{{ scope.row.userName }}</i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          prop="action"
          label="Action"
          class-name="noPaddngRight"
          width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.taskId && roleId !== 10041 && roleId !== 10042 && roleId !== 10043"
              v-show="isShowMenuItem(10139)">
              <a class="link" href="javascript:void(0);"
                @click="batchAssign(scope.row.taskId, scope.row.alertId, scope.row.roleId, scope.row.teamCode)"
                >Assign</a>
              <span class="link_split">|</span>
            </span>
            <router-link class="link reviewLink" :to="{ name: 'alertReview', query: { alertId: scope.row.alertId }}">Review</router-link>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-tab-pane>

    <!-- tab选项2 已处理的alert list -->
    <el-tab-pane label="Reviewed List" name="1">
      <!-- table -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @sort-change=sortChange
        :row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="40">
        </el-table-column>
        <el-table-column
          label="Alert ID"
          prop="alertId"
          width="120">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="String(scope.row.alertId)" placement="top-start" :open-delay=400>
              <i>{{ scope.row.alertId }}</i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="statusValue"
          label="Status"
          width="120">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.statusValue" placement="top-start" :open-delay=400>
              <i>{{ scope.row.statusValue }}</i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          v-for="item in confirmHeading"
          :key="item"
          :prop="tranformToHumpStr(item)"
          :label="item"
          :sortable="isSortable(item, true)"
          width="120">
          <template slot-scope="scope">
            <span v-if="item === 'Due Date'">
              <el-tooltip class="item" effect="dark" :content="formatYMD(scope.row.dueDate)" placement="top-start" :open-delay=400>
                <i>{{ formatYMD(scope.row.dueDate) }}</i>
              </el-tooltip>
            </span>
            <span  v-else-if="item === 'Create Date'">
              <el-tooltip class="item" effect="dark" :content="formatYMD(scope.row.createDate)" placement="top-start" :open-delay=400>
                <i>{{ formatYMD(scope.row.createDate) }}</i>
              </el-tooltip>
            </span>
            <span v-else-if="item === 'Type'">
              <el-tooltip class="item" effect="dark" :content="scope.row.typeValue" placement="top-start" :open-delay=400>
                <i>{{ scope.row.typeValue }}</i>
              </el-tooltip>
            </span>
            <span v-else-if="item === 'Linked Case'">
              <el-tooltip class="item" effect="dark" :content="scope.row.linkCase" placement="top-start" :open-delay=400>
                <i>{{ scope.row.linkCase }}</i>
              </el-tooltip>
            </span>
            <span v-else-if="item === 'Amount'">
              <el-tooltip class="item" effect="dark" :content="scope.row.amount | isEmptyVal | formatUSD" placement="top-start" :open-delay=400>
                <i>{{ scope.row.amount | isEmptyVal | formatUSD }}</i>
              </el-tooltip>
            </span>
            <span  v-else-if="item === 'Business Date'">
              <el-tooltip class="item" effect="dark" :content="formatYMD(scope.row.businessDate)" placement="top-start" :open-delay=400>
                <i>{{ formatYMD(scope.row.businessDate) }}</i>
              </el-tooltip>
            </span>
            <span v-else>
              <el-tooltip class="item" effect="dark" :content="String(scope.row[tranformToHumpStr(item)])" placement="top-start" :open-delay=400>
                <i>{{ scope.row[tranformToHumpStr(item)] }}</i>
              </el-tooltip>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="Assigned to"
          min-width="120">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.userName" placement="top-start" :open-delay=400>
              <i>{{ scope.row.userName }}</i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          prop="action"
          label="Action"
          class-name="noPaddngRight"
          width="120">
          <template slot-scope="scope">
            <router-link class="link reviewLink" :to="{ name: 'alertReview', query: { alertId: scope.row.alertId }}">Review</router-link>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-tab-pane>
  </el-tabs>


  <!-- 批量分配弹框  -->
  <el-dialog
    title="Assign"
    :visible.sync="dialogVisibleArr.dialogBatchAssign"
    width="32%">
    <div class="dialog_content dl_form">
      <div class="dl_form_item">
        <span class="dl_form_name" style="min-width: 110px;">Choice Analyst :</span>
        <el-select v-model="batchAssignSelect.analystSelect" placeholder="Select Assigned to" style="width: 65%;">
          <el-option
            v-for="item in assignedOptions1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisibleArr.dialogBatchAssign = false">Cancle</el-button>
      <el-button type="primary" @click="confirmBatchAssign">Save</el-button>
    </span>
  </el-dialog>

  <!-- 改变表头弹框组件 -->
  <arrange-heading
    v-if="allheading.length > 0"
    :action-url="arrangeHeadingUrl"
    :visible-arrange-heading.async="dialogVisibleArr.dialogRerangeHeading"
    :all-heading="allheading"
    :checked-heading="checkedHeading"
    :disabled-heading="disabledHeading"
    :on-success="arrangeSuccessCallBack"
    @visibleChange="visibleArrangeHeading">
  </arrange-heading>

  <!-- 创建alert弹框组件 -->
  <create-alert
    :visible-create-alert.async="dialogVisibleArr.dialogCreateAlert"
    :action-url="addAlertUrl"
    :on-success="alertSuccessCallBack"
    @visibleChange="visibleCreateAlert">
  </create-alert>

</div>
