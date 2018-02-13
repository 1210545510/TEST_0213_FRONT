<div class="alertReview_accountDatail_box">
  <div class="comPartingLine"></div>

  <div class="com_title_box clearfix paddingTop30">
    <h2 class="com_tit_txt lItem">Account Detail</h2>
    <el-select
      class="lItem"
      v-model="originalIdSelected.selectId"
      placeholder="No data"
      @change="accountDetailSelectedIdChange">
      <el-option
        v-for="item in originalIdSelected.options"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>

    <el-button class="rItem" type="primary" @click="comeBack">&lt;&nbsp;Back</el-button>
  </div>

  <div class="tab_list table_layout_border">
    <el-table
      ref="multipleTable"
      :data="tableListData"
      tooltip-effect="dark"
      @row-click="tableRowAct"
      style="width: 100%"
      border>
      <el-table-column
        label="Account ID"
        prop="accountId">
      </el-table-column>
      <el-table-column
        label="Account Name"
        prop="accountName">
      </el-table-column>
      <el-table-column
        label="Type(s)">
        <template slot-scope="scope">
          <span>{{ scope.row.type1 | isEmptyVal }}{{ scope.row.type2 | isEmptyVal }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Registration">
        <template slot-scope="scope">
          <span>{{ scope.row.registration | isEmptyVal }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Owner Type"
        prop="ownerType">
      </el-table-column>
      <el-table-column
        label="Status"
        prop="status">
      </el-table-column>
      <el-table-column
        label="Branch"
        prop="branch">
      </el-table-column>
      <el-table-column
        label="Source">
        <template slot-scope="scope">
          <span>{{ scope.row.source | isEmptyVal }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Updated on">
        <template slot-scope="scope">
          <span>{{ scope.row.updatedOn | isEmptyVal | formatYMD }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <div class="infomation_box">
    <div class="infomation_show clearfix">
      <div class="lItem">
        <div class="com_title_box clearfix">
          <h2 class="com_tit_txt lItem">Account Contact Information</h2>
        </div>
        <ul class="ul_list">
          <li>
            <span class="tit">Address:</span>
            <div class="dec">{{ accountInfo.country }}{{ accountInfo.state }}/{{ accountInfo.region }}{{ accountInfo.city }}</div>
          </li>
          <li>
            <span class="tit">Description:</span>
            <div class="dec">{{ accountInfo.description | isEmptyVal }}</div>
          </li>
        </ul>
      </div>

      <div class="rItem">
        <div class="com_title_box clearfix">
          <h2 class="com_tit_txt lItem">Account Risk information</h2>
        </div>
        <ul class="ul_list">
          <li>
            <span class="tit">Effective Risk:</span>
            <div class="dec">{{ accountInfo.effectiveRisk | isEmptyVal }}</div>
          </li>
          <li>
            <span class="tit">Business Risk:</span>
            <div class="dec">{{ accountInfo.businessRisk | isEmptyVal }}</div>
          </li>
          <li>
            <span class="tit">Watch List Risk:</span>
            <div class="dec">{{ accountInfo.watchListRisk | isEmptyVal }}</div>
          </li>
          <li>
            <span class="tit">Geography Risk:</span>
            <div class="dec">{{ accountInfo.geographyRisk | isEmptyVal }}</div>
          </li>
          <li>
            <span class="tit">Customer Risk:</span>
            <div class="dec">{{ accountInfo.customerRisk | isEmptyVal }}</div>
          </li>
          <li>
            <span class="tit">KYC Risk:</span>
            <div class="dec">{{ accountInfo.kycRisk | isEmptyVal }}</div>
          </li>
        </ul>
      </div>

    </div>
  </div>

  <div class="snapshop_box">
    <div class="tabShow clearfix">
      <div class="tabL">
        <h3 class="tit">Account</h3>
        <dl class="show clearfix">
          <dd class="clearfix">
            <span class="key">Account ID :</span>
            <el-tooltip class="val" :content="accountInfo.accountId" placement="top" :open-delay="setOpenDelay">
              <span>{{ accountInfo.accountId }}</span>
            </el-tooltip>
          </dd>
          <dd class="clearfix">
            <span class="key">Account Name :</span>
            <span class="val">{{ accountInfo.accountName | isEmptyVal }}</span>
          </dd>
          <dd class="clearfix">
            <span class="key">Type(s) :</span>
            <span class="val">{{ accountInfo.type1 | isEmptyVal }}{{ accountInfo.type2 | isEmptyVal }}</span>
          </dd>
          <dd class="clearfix">
            <span class="key">Registration :</span>
            <span class="val">{{ accountInfo.registration | isEmptyVal | formatYMD }}</span>
          </dd>
          <dd class="clearfix">
            <span class="key">Owner Type :</span>
            <span class="val">{{ accountInfo.ownerType | isEmptyVal }}</span>
          </dd>
          <dd class="clearfix">
            <span class="key">Tax ID :</span>
            <span class="val">{{ accountInfo.taxId | isEmptyVal }}</span>
          </dd>
          <dd class="clearfix">
            <span class="key">Tax Code :</span>
            <el-tooltip class="val" :content="accountInfo.taxCode" placement="top" :open-delay="setOpenDelay">
              <span>{{ accountInfo.taxCode | isEmptyVal }}</span>
            </el-tooltip>
          </dd>
          <dd class="clearfix">
            <span class="key">Household Group ID :</span>
            <span class="val">{{ accountInfo.householdGroupID | isEmptyVal | formatYMD }}</span>
          </dd>
          <dd class="clearfix">
            <span class="key">Open Date :</span>
            <span class="val">{{ accountInfo.openDate | isEmptyVal | formatYMD }}</span>
          </dd>
          <dd class="clearfix">
            <span class="key">Updated on  :</span>
            <span class="val">{{ accountInfo.updatedOn | isEmptyVal | formatYMD }}</span>
          </dd>
          <dd class="clearfix">
            <span class="key">Status :</span>
            <span class="val">{{ accountInfo.status | isEmptyVal }}</span>
          </dd>
          <dd class="clearfix">
            <span class="key">Status Effective :</span>
            <span class="val">{{ accountInfo.statusEffective | isEmptyVal | formatYMD }}</span>
          </dd>
          <dd class="clearfix">
            <span class="key">Last Activity :</span>
            <span class="val">{{ accountInfo.lastActivity | isEmptyVal }}</span>
          </dd>
          <dd class="clearfix">
            <span class="key">Business Unit :</span>
            <span class="val">{{ accountInfo.businessUnit | isEmptyVal }}</span>
          </dd>
          <dd class="clearfix">
            <span class="key">Branch :</span>
            <span class="val">{{ accountInfo.branch | isEmptyVal }}</span>
          </dd>
        </dl>
      </div>
      <div class="tabR">
        <h3 class="tit">Account Balance</h3>
        <dl class="show clearfix">
          <dd class="clearfix">
            <span class="key">Account Networth :</span>
            <el-tooltip class="val" :content="String(accountInfo.accountNetworth)" placement="top" :open-delay="setOpenDelay">
              <span>{{ accountInfo.accountNetworth | isEmptyVal }}</span>
            </el-tooltip>
          </dd>
          <dd class="clearfix">
            <span class="key">Prior Networth :</span>
            <span class="val">{{ accountInfo.priorNetworth | isEmptyVal }}</span>
          </dd>
          <dd class="clearfix">
            <span class="key">%Change From Last Month:</span>
            <span class="val">{{ accountInfo.lastMonthChange | isEmptyVal }}</span>
          </dd>
          <dd class="clearfix">
            <span class="key">Uncollected Balance  :</span>
            <span class="val">{{ accountInfo.uncollectedBalance | isEmptyVal }}</span>
          </dd>
          <dd class="clearfix">
            <span class="key">Last Overdraft Date :</span>
            <span class="val">{{ accountInfo.lastOverdraftDate | isEmptyVal | formatYMD }}</span>
          </dd>
          <dd class="clearfix">
            <span class="key">Last Overdraft Balance :</span>
            <span class="val">{{ accountInfo.lastOverdraftBalance | isEmptyVal | formatYMD }}</span>
          </dd>
          <dd class="clearfix">
            <span class="key">Last Overdraft Duration :</span>
            <span class="val">{{ accountInfo.lastOverdraftDuration | isEmptyVal | formatYMD }}</span>
          </dd>
          <dd class="clearfix">
            <span class="key">Last Overdraft Episodes(6 months) :</span>
            <el-tooltip class="val" :content="accountInfo.lastOverdraftEpisodes | isEmptyVal | formatYMD" placement="top" :open-delay="setOpenDelay">
              <span>{{ accountInfo.lastOverdraftEpisodes | isEmptyVal | formatYMD }}</span>
            </el-tooltip>
          </dd>
          <dd class="clearfix">
            <span class="key">Last Activity Date :</span>
            <span class="val">{{ accountInfo.lastActivityDate | isEmptyVal | formatYMD }}</span>
          </dd>
          <dd class="clearfix">
            <span class="key">Last Statement Date  :</span>
            <span class="val">{{ accountInfo.lastStatementDate | isEmptyVal | formatYMD }}</span>
          </dd>
          <dd class="clearfix">
            <span class="key">Cash/Money Market Fund :</span>
            <span class="val">{{ accountInfo.moneyMarketFund | isEmptyVal }}</span>
          </dd>
          <dd class="clearfix">
            <span class="key">Debt :</span>
            <span class="val">{{ accountInfo.debt | isEmptyVal }}</span>
          </dd>
          <dd class="clearfix">
            <span class="key">Equity :</span>
            <span class="val">{{ accountInfo.equity | isEmptyVal }}</span>
          </dd>
          <dd class="clearfix">
            <span class="key">Bond :</span>
            <span class="val">{{ accountInfo.bond | isEmptyVal }}</span>
          </dd>
          <dd class="clearfix">
            <span class="key">Mutual Fund  :</span>
            <span class="val">{{ accountInfo.mutualFund | isEmptyVal }}</span>
          </dd>
          <dd class="clearfix">
            <span class="key">Margin :</span>
            <span class="val">{{ accountInfo.margin | isEmptyVal }}</span>
          </dd>
          <dd class="clearfix">
            <span class="key">Margin% :</span>
            <span class="val">{{ accountInfo.marginPercentage | isEmptyVal }}</span>
          </dd>
        </dl>
      </div>
    </div>
  </div>


  <div class="com_title_box clearfix paddingTop30">
    <h2 class="com_tit_txt lItem">Account Summary</h2>
  </div>
  <div class="tab_list table_layout_border">
    <el-table
      ref="multipleSummaryTable"
      :data="summary.list"
      tooltip-effect="dark"
      style="width: 100%"
      border>
      <el-table-column
        label="Period Start Date">
        <template slot-scope="scope">
          <span>{{ scope.row.periodStartDate | isEmptyVal | formatYMD }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Deposits">
        <template slot-scope="scope">
          <span>{{ scope.row.deposits | isEmptyVal }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Total Deposits"
        prop="totalDeposits">
      </el-table-column>
      <el-table-column
        label="Incoming Cash"
        prop="incomingCash">
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="summarySizeChange"
      @current-change="summaryCurrentChange"
      :current-page="summary.currentPage"
      :page-size="summary.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="summary.total">
    </el-pagination>
  </div>

  <!-- 创建processing弹框组件 -->
  <custom-processing
    v-show="isShowProcedding"
    ref="customProcessing"
    :roleId="roleId">
  </custom-processing>

</div>
