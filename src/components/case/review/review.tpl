<div class="case_review_box">
  <div class="comPartingLine"></div>

  <div class="relation_box">
    <div class="com_title_box clearfix">
      <el-button class="lItem" type="primary" @click="createAlert" v-if="isShowMenuItem(10152)">Create Case</el-button>
      <el-button class="lItem" @click="doUnlink" v-if="roleId === '10045' || roleId ==='10052' || roleId === '10053' ">Unlink</el-button>
      <el-button class="lItem" @click="doPrint" v-if="isShowMenuItem(10154)">Print</el-button>
      <el-button class="lItem email" v-if="isShowMenuItem(10155)" @click="doRFI"><i class="icon el-icon-message"></i>RFI</el-button>

      <el-button v-if="isShowBack" class="rItem" type="primary" @click="comeBack">&lt;&nbsp;Back</el-button>

      <div class="fRight search_btn_warp">
        <el-autocomplete
          @keyup.enter.native="relateSearchEnter(relateSearchKeyword)"
          placeholder="Search"
          v-model="relateSearchKeyword"
          :fetch-suggestions="relateSearchAsync"
          class="input-with-select">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="relateSearchEnter(relateSearchKeyword)">
          </el-button>
        </el-autocomplete>
      </div>
    </div>
    <div class="tab_list table_layout_border">
      <el-table
        style="width: 100%"
        ref="relateTable"
        :data="relateTableData"
        tooltip-effect="dark"
        @selection-change="relateHandleSelectionChange"
        highlight-current-row
        @current-change="relateHandleSelectionClick"
        border>
        <el-table-column
          type="selection"
          width="45">
        </el-table-column>
        <el-table-column
          label="Alert ID"
          prop="alertId">
        </el-table-column>
        <!--<el-table-column-->
        <!--label="Alert ID-G"-->
        <!--prop="alertId">-->
        <!--</el-table-column>-->
        <el-table-column
          label="Original ID(M/P)">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row && scope.row.originalId" class="val" :content="scope.row.originalId | isEmptyVal" placement="top" :open-delay="setOpenDelay">
              <span>{{ scope.row.originalId | isEmptyVal }}/</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="Overlap">
          <template slot-scope="scope">
            <el-tooltip class="val" :content="scope.row.overlap | isEmptyVal" placement="top" :open-delay="setOpenDelay">
              <span>{{ scope.row.overlap | isEmptyVal }}/</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="Score">
          <template slot-scope="scope">
            <span>{{ scope.row.score | isEmptyVal }}/</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Subject">
          <template slot-scope="scope">
            <el-tooltip class="val" :content="scope.row.subject | isEmptyVal" placement="top" :open-delay="setOpenDelay">
              <span>{{ scope.row.subject | isEmptyVal }}/</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="Amount">
          <template slot-scope="scope">
            <span v-if="scope.row && scope.row.amount">{{ scope.row.amount | isEmptyVal | formatUSD }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Volume">
          <template slot-scope="scope">
            <span>{{ scope.row.volume | isEmptyVal }}/</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Geography">
          <template slot-scope="scope">
            <span>{{ scope.row.geography | isEmptyVal }}/</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Scenario">
          <template slot-scope="scope">
            <span>{{ scope.row.scenario | isEmptyVal }}/</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Create Date">
          <template slot-scope="scope">
            <span v-if="scope.row && scope.row.creationDate">{{ scope.row.creationDate | isEmptyVal | formatYMD }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Due Date">
          <template slot-scope="scope">
            <span v-if="scope.row && scope.row.dueDate">{{ scope.row.dueDate | isEmptyVal | formatYMD }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <el-pagination
      @size-change="relateTablePageSizeChange"
      @current-change="relateTablePageCurrentChange"
      :current-page="relateTablePage.currentPage"
      :page-size="relateTablePage.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="relateTablePage.total">
    </el-pagination>

    <div v-show="isShowDetailCollapse" class="detail_box clearfix">
      <div class="info">
        <p class="name">SAR Probability Score</p>
        <el-progress :percentage="50"></el-progress>
        <el-button class="btn" type="primary">Detail</el-button>
        <span v-if="reviewInfo.fileUrl">
          <a :href="reviewInfo.fileUrl" target="_blank" class="toView"><i class="icon el-icon-search"></i>View Attachments</a>
        </span>
      </div>
      <div class="list list1">
        <div class="item">
          <h4>Original ID</h4>
          <div>{{ reviewInfo.originalId | isEmptyVal }}</div>
        </div>
        <div class="item">
          <h4>Focus</h4>
          <div>{{ reviewInfo.focus | isEmptyVal }}</div>
        </div>
        <div class="item">
          <h4>Jurisdiction Class</h4>
          <div>{{ reviewInfo.jurisdictionClass | isEmptyVal }}</div>
        </div>
        <div class="item">
          <h4>Geography</h4>
          <div>{{ reviewInfo.geography | isEmptyVal }}</div>
        </div>
        <div class="item">
          <h4>Domain</h4>
          <div>{{ reviewInfo.domain | isEmptyVal }}</div>
        </div>
        <div class="item">
          <h4>Risk Class</h4>
          <div>{{ reviewInfo.riskClass | isEmptyVal }}</div>
        </div>
        <div class="item">
          <h4>Linked Case</h4>
          <div>{{ reviewInfo.linkedCase | isEmptyVal }}</div>
        </div>
        <div class="item">
          <h4>Focus Type</h4>
          <div>{{ reviewInfo.focusType | isEmptyVal }}</div>
        </div>
      </div>
      <div class="list list2">
        <div class="item">
          <h4>Status</h4>
          <div v-if="reviewInfo.status">{{ statusOptions[reviewInfo.status].label }}</div>
        </div>
        <div class="item">
          <h4>Amount</h4>
          <div>{{ reviewInfo.amount | isEmptyVal | formatUSD }}</div>
        </div>
        <div class="item">
          <h4>Volume</h4>
          <div>{{ reviewInfo.volume | isEmptyVal }}</div>
        </div>
        <div class="item">
          <h4>Customer ID</h4>
          <div>{{ reviewInfo.customerId | isEmptyVal }}</div>
        </div>
        <div class="item">
          <h4>Subject</h4>
          <div>{{ reviewInfo.subject | isEmptyVal }}</div>
        </div>
        <div class="item">
          <h4>Account ID <span v-if="allacctid.count">({{allacctid.count}})</span></h4>
          <div>{{ allacctid.first | isEmptyVal }}</div>
        </div>
        <div class="item">
          <h4>Profile Number</h4>
          <div>{{ reviewInfo.profileNumber | isEmptyVal }}</div>
        </div>
      </div>
      <div class="list list3">
        <div class="item">
          <h4>Case Reason</h4>
          <div>{{ reviewInfo.caseReason | isEmptyVal }}</div>
        </div>
        <div class="item">
          <h4>Scenario</h4>
          <div>{{ reviewInfo.scenario | isEmptyVal }}</div>
        </div>
        <div class="item">
          <h4>Highlights</h4>
          <div>{{ reviewInfo.highlights | isEmptyVal }}</div>
        </div>
        <div class="item">
          <h4>Profile</h4>
          <div>{{ allacctid.profile | isEmptyVal }}</div>
        </div>
      </div>
      <div class="list list4">
        <div class="item">
          <h4>Book Date</h4>
          <div>{{ reviewInfo.bookDate | isEmptyVal | formatYMD }}</div>
        </div>
        <div class="item">
          <h4>Business Date</h4>
          <div>{{ reviewInfo.businessDate | isEmptyVal | formatYMD }}</div>
        </div>
        <div class="item">
          <h4>Due Date</h4>
          <div>{{ reviewInfo.dueDate | isEmptyVal | formatYMD }}</div>
        </div>
        <div class="item">
          <h4>Review Start Date</h4>
          <div>{{ reviewInfo.reviewStartDate | isEmptyVal | formatYMD }}</div>
        </div>
        <div class="item">
          <h4>Last Updated date</h4>
          <div>{{ reviewInfo.lastUpdatedDate | isEmptyVal | formatYMD }}</div>
        </div>
        <div class="item">
          <h4>Closed Date</h4>
          <div>{{ reviewInfo.closedDate | isEmptyVal | formatYMD }}</div>
        </div>
      </div>
      <div class="list list5">
        <div v-if="reviewInfo.operators.analystNames && reviewInfo.operators.analystNames.length > 0 "class="item">
          <h4>Analyst</h4>
          <div>
            <div class="subItem" :key="key" v-for="(item, key) in reviewInfo.operators.analystNames">
              <h5>{{ item.userName }}</h5>
              <el-tooltip :content="item.phoneNumber" placement="top" :open-delay="setOpenDelay">
                <p class="onLine">
                    <i class="icon el-icon-phone"></i>{{ item.phoneNumber }}
                </p>
              </el-tooltip>
              <el-tooltip :content="item.email" placement="top" :open-delay="setOpenDelay">
                <p class="onLine"><i class="icon el-icon-message"></i>{{ item.email }}</p>
              </el-tooltip>
              <p>{{ item.teamName }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="list list6">
        <div v-if="reviewInfo.operators.qaNames && reviewInfo.operators.qaNames.length > 0" class="item">
          <h4>QA Analyst</h4>
          <div>
            <div class="subItem" :key="key" v-for="(item, key) in reviewInfo.operators.qaNames">
              <h5>{{ item.userName }}</h5>
              <el-tooltip :content="item.phoneNumber" placement="top" :open-delay="setOpenDelay">
                <p class="onLine">
                  <i class="icon el-icon-phone"></i>{{ item.phoneNumber }}
                </p>
              </el-tooltip>
              <el-tooltip :content="item.email" placement="top" :open-delay="setOpenDelay">
                <p class="onLine"><i class="icon el-icon-message"></i>{{ item.email }}</p>
              </el-tooltip>
              <p>{{ item.teamName }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="detail_Collapse_box" @click="detailCollapseChange"><span class="icon" :class="isShowDetailCollapse ? 'focus' : '' "></span></div>
  </div>

  <div class="comPartingLine"></div>
  <div v-if="relateTableData.length > 0 && snapshopTab.list[0].acct.customerID" class="snapshop_box">
    <div class="com_title_box clearfix">
      <h2 class="com_tit_txt">Case snapshot</h2>
    </div>

    <div class="tabList">
      <el-tabs
        class="snapshopWrapTab_box"
        v-model="snapshopWrapTab.name"
        type="card">
        <!-- start of 帐号信息 -->
        <el-tab-pane name="0" label="Account">
          <el-tabs
            v-model="snapshopTab.name"
            @tab-click="snapshopTabClick"
            type="card">
            <el-tab-pane :name="String(key)" :key="key" v-for="(item, key) in snapshopTab.list">
              <span slot="label">Account ID : {{ item.accountId | isEmptyVal }}</span>
              <div class="tabShow clearfix">
                <div class="tabL">
                  <h3 class="tit">Account</h3>
                  <dl class="show clearfix">
                    <dd class="clearfix">
                      <span class="key">Customer ID :</span>
                      <el-tooltip class="val" :content="item.acct.customerID" placement="top" :open-delay="setOpenDelay">
                        <span>{{ item.acct.customerID | isEmptyVal }}</span>
                      </el-tooltip>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Account ID :</span>
                      <span class="val">{{ item.acct.accountId | isEmptyVal }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Customer Name :</span>
                      <span class="val">{{ item.acct.customerName | isEmptyVal }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Account Name :</span>
                      <span class="val">{{ item.acct.accountName | isEmptyVal }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Type(s) :</span>
                      <span class="val">{{ item.acct.type1 | isEmptyVal }}{{ item.acct.type2 | isEmptyVal }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Registration :</span>
                      <span class="val">{{ item.acct.registration | isEmptyVal }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Tax ID :</span>
                      <el-tooltip class="val" :content="item.acct.taxId" placement="top" :open-delay="setOpenDelay">
                        <span>{{ item.acct.taxId | isEmptyVal }}</span>
                      </el-tooltip>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Open Date :</span>
                      <span class="val">{{ item.acct.openDate | isEmptyVal | formatYMD }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Last Activity :</span>
                      <span class="val">{{ item.acct.lastActivity | isEmptyVal | formatYMD }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Branch :</span>
                      <span class="val">{{ item.acct.branch | isEmptyVal }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Restriction(s) :</span>
                      <span class="val">{{ item.acct.restriction | isEmptyVal }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Effective :</span>
                      <span class="val">{{ item.acct.effective | isEmptyVal }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Effective Match :</span>
                      <span class="val">{{ item.acct.effectiveMatch | isEmptyVal }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">List :</span>
                      <span class="val">{{ item.acct.list | isEmptyVal }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Business :</span>
                      <span class="val">{{ item.acct.business | isEmptyVal }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Grography :</span>
                      <span class="val">{{ item.acct.grography | isEmptyVal }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Customer :</span>
                      <span class="val">{{ item.acct.customer | isEmptyVal }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Summary :</span>
                      <span class="val" @click="SummaryDetailFun()"><i class="link">Detail</i></span>
                    </dd>
                  </dl>
                </div>
                <div class="tabR">
                  <h3 class="tit clearfix">
                    Account Balance
                    <el-select
                      class="rItem"
                      v-model="snapshopTab.month"
                      placeholder="No data"
                      @change="snapshopTabMonthChange">
                      <el-option
                      v-for="item in snapshopTab.monthSelect"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                    </el-select>
                  </h3>
                  <dl class="show clearfix">
                    <dd class="clearfix">
                      <span class="key">Date :</span>
                      <span class="val">{{ item.date | isEmptyVal | formatYMD }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Account ID :</span>
                      <span class="val">{{ item.acct.accountId | isEmptyVal }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Account Networth:</span>
                      <span class="val">{{ item.acct.accountNetWorth | isEmptyVal }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Uncollected Balance  :</span>
                      <span class="val">{{ item.acct.uncollectedBalance | isEmptyVal }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Account Gross Assets :</span>
                      <span class="val">{{ item.acct.accountGrossAssets | isEmptyVal }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Cash/Money Market Fund :</span>
                      <span class="val">{{ item.acct.moneyMarketFund | isEmptyVal }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Debt :</span>
                      <span class="val">{{ item.acct.debt | isEmptyVal }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Equity :</span>
                      <span class="val">{{ item.acct.equity | isEmptyVal }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Bond :</span>
                      <span class="val">{{ item.acct.bond | isEmptyVal }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Mutual Fund  :</span>
                      <span class="val">{{ item.acct.mutualFund | isEmptyVal }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Margin Balance :</span>
                      <span class="val">{{ item.acct.marginBalance | isEmptyVal }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Margin% :</span>
                      <span class="val">{{ item.acct.margin | isEmptyVal }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Last Overdraft Date :</span>
                      <span class="val">{{ item.acct.lastOverdraftDate | isEmptyVal | formatYMD }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Last Overdraft Balance :</span>
                      <span class="val">{{ item.acct.lastOverdraftBalance | isEmptyVal }}</span>
                    </dd>
                    <dd class="clearfix">
                      <span class="key">Last Overdraft Duration :</span>
                      <span class="val">{{ item.acct.lastOverdraftDuration | isEmptyVal }}</span>
                    </dd>
                  </dl>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <!-- end of 帐号信息 -->

        <!-- start of 客户信息 -->
        <el-tab-pane name="1" label="Customer">
          <div class="customer_box">
            <dl class="show clearfix">
              <dd class="clearfix">
                <span class="key">ID :</span>
                <el-tooltip class="val" :content="String(snapshopTab.cusList.id)" placement="top" :open-delay="setOpenDelay">
                  <span>{{ snapshopTab.cusList.id | isEmptyVal }}</span>
                </el-tooltip>
              </dd>
              <dd class="clearfix">
                <span class="key">Name :</span>
                <el-tooltip class="val" :content="String(snapshopTab.cusList.name)" placement="top" :open-delay="setOpenDelay">
                  <span>{{ snapshopTab.cusList.name | isEmptyVal }}</span>
                </el-tooltip>
              </dd>
              <dd class="clearfix">
                <span class="key">Type :</span>
                <el-tooltip class="val" :content="String(snapshopTab.cusList.type)" placement="top" :open-delay="setOpenDelay">
                  <span>{{ snapshopTab.cusList.type | isEmptyVal }}</span>
                </el-tooltip>
              </dd>
              <dd class="clearfix">
                <span class="key">Business Type :</span>
                <el-tooltip class="val" :content="String(snapshopTab.cusList.businessType)" placement="top" :open-delay="setOpenDelay">
                  <span>{{ snapshopTab.cusList.businessType | isEmptyVal }}</span>
                </el-tooltip>
              </dd>
              <dd class="clearfix">
                <span class="key">Tax ID :</span>
                <el-tooltip class="val" :content="String(snapshopTab.cusList.taxId)" placement="top" :open-delay="setOpenDelay">
                  <span>{{ snapshopTab.cusList.taxId | isEmptyVal }}</span>
                </el-tooltip>
              </dd>
              <dd class="clearfix">
                <span class="key">Date of Birth :</span>
                <el-tooltip class="val" :content="String(snapshopTab.cusList.birthdate)" placement="top" :open-delay="setOpenDelay">
                  <span>{{ snapshopTab.cusList.birthdate | isEmptyVal | formatYMD }}</span>
                </el-tooltip>
              </dd>
              <dd class="clearfix">
                <span class="key">Citizenship :</span>
                <el-tooltip class="val" :content="String(snapshopTab.cusList.citizenship)" placement="top" :open-delay="setOpenDelay">
                  <span>{{ snapshopTab.cusList.citizenship | isEmptyVal }}</span>
                </el-tooltip>
              </dd>
              <dd class="clearfix">
                <span class="key">Legal Structure :</span>
                <el-tooltip class="val" :content="String(snapshopTab.cusList.legalStrucTure)" placement="top" :open-delay="setOpenDelay">
                  <span>{{ snapshopTab.cusList.legalStrucTure | isEmptyVal }}</span>
                </el-tooltip>
              </dd>
              <dd class="clearfix">
                <span class="key">Broker/Dealer :</span>
                <el-tooltip class="val" :content="String(snapshopTab.cusList.broker)" placement="top" :open-delay="setOpenDelay">
                  <span>{{ snapshopTab.cusList.broker | isEmptyVal }}</span>
                </el-tooltip>
              </dd>
              <dd class="clearfix">
                <span class="key">ATM Daily Limit :</span>
                <el-tooltip class="val" :content="String(snapshopTab.cusList.atmDailyLimit)" placement="top" :open-delay="setOpenDelay">
                  <span>{{ snapshopTab.cusList.atmDailyLimit | isEmptyVal }}</span>
                </el-tooltip>
              </dd>
              <dd class="clearfix">
                <span class="key">Effective :</span>
                <el-tooltip class="val" :content="String(snapshopTab.cusList.effective)" placement="top" :open-delay="setOpenDelay">
                  <span>{{ snapshopTab.cusList.effective }}</span>
                </el-tooltip>
              </dd>
              <dd class="clearfix">
                <span class="key">Effective Match :</span>
                <el-tooltip class="val" :content="String(snapshopTab.cusList.effectiveMatch)" placement="top" :open-delay="setOpenDelay">
                  <span>{{ snapshopTab.cusList.effectiveMatch | isEmptyVal }}</span>
                </el-tooltip>
              </dd>
              <dd class="clearfix">
                <span class="key">Business :</span>
                <el-tooltip class="val" :content="String(snapshopTab.cusList.business)" placement="top" :open-delay="setOpenDelay">
                  <span>{{ snapshopTab.cusList.business | isEmptyVal }}</span>
                </el-tooltip>
              </dd>
              <dd class="clearfix">
                <span class="key">List :</span>
                <el-tooltip class="val" :content="String(snapshopTab.cusList.list)" placement="top" :open-delay="setOpenDelay">
                  <span>{{ snapshopTab.cusList.list | isEmptyVal }}</span>
                </el-tooltip>
              </dd>
              <dd class="clearfix">
                <span class="key">Summary :</span>
                <span class="val" @click="custSummaryDetailFun()"><i class="link">Detail</i></span>
              </dd>
            </dl>
          </div>
        </el-tab-pane>
        <!-- end of 客户信息 -->
      </el-tabs>
    </div>

  </div>

  <!--<div class="transactions_box table_layout">-->
    <!--<div class="com_title_box clearfix">-->
      <!--<h2 class="com_tit_txt">Case Original Transaction</h2>-->
      <!--<el-button class="rItem" @click="transactionsMore">More</el-button>-->
    <!--</div>-->
    <!--<el-table-->
      <!--:data="transactionsTableData"-->
      <!--style="width: 100%">-->
      <!--<el-table-column-->
        <!--label="Originator Name"-->
        <!--prop="originatorName"-->
        <!--width="150">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--label="Originator Account ID"-->
        <!--prop="originatorAccountID"-->
        <!--width="150">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--label="Originator Risk"-->
        <!--prop="originatorRisk"-->
        <!--width="150">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--label="Originator's Bank"-->
        <!--prop="originatorBank"-->
        <!--width="150">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--label="Intermediary Bank"-->
        <!--prop="intermediaryBank"-->
        <!--width="150">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--label="Beneficiary Name"-->
        <!--prop="beneficiaryName"-->
        <!--width="150">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--label="Beneficiary Account ID"-->
        <!--prop="beneficiaryAccountID"-->
        <!--width="160">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--label="Beneficiary Risk"-->
        <!--prop="beneficiaryRisk"-->
        <!--width="150">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--label="Date"-->
        <!--prop="date"-->
        <!--width="150">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--label="Source"-->
        <!--prop="source"-->
        <!--width="150">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--label="Type"-->
        <!--prop="type"-->
        <!--width="150">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--label="Base"-->
        <!--prop="base"-->
        <!--width="150">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--label="Transaction Reference ID"-->
        <!--prop="transactionReferenceID"-->
        <!--width="200">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--label="Detail"-->
        <!--align="center"-->
        <!--width="150">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button type="text" size="small">Detail</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    <!--</el-table>-->
  <!--</div>-->

  <div class="profile_wrap_box">
    <div class="profile_subject_box">
      <div class="com_title_box clearfix">
        <h2 class="com_tit_txt">Subject Profiles</h2>
      </div>
      <div class="list clearfix">
        <el-table
          style="width: 100%"
          ref="subjectProfileTable"
          :data="subjectProfile"
          tooltip-effect="dark">
          <el-table-column
            label="Customer ID">
            <template slot-scope="scope">
              <el-tooltip class="val" :content="String(scope.row.customerId)" placement="top" :open-delay="setOpenDelay">
                <span>{{ scope.row.customerId | isEmptyVal }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            label="Customer Name">
            <template slot-scope="scope">
              <el-tooltip class="val" :content="String(scope.row.customerName)" placement="top" :open-delay="setOpenDelay">
                <span>{{ scope.row.customerName | isEmptyVal }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            label="Customer Type">
            <template slot-scope="scope">
              <el-tooltip class="val" :content="String(scope.row.customerType)" placement="top" :open-delay="setOpenDelay">
                <span>{{ scope.row.customerType | isEmptyVal }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            label="Type"
            width="60">
            <template slot-scope="scope">
              <router-link class="link" :to="{ name: 'alertReviewSubjectDetail', query: {'reviewId': reviewId, 'cId': customerId, 'isShow': isShowProcedding, 'oId': orderId, 'tId': taskId }}">Detail</router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="detailBtn">
        <span class="link">Account Opening Package &gt;</span>
        <span class="link">Subject Detail &gt;</span>
      </div>
    </div>

    <div class="ccount_profile_box">
      <div class="com_title_box clearfix">
        <h2 class="com_tit_txt">Account Profiles</h2>
        <!--<el-select-->
          <!--class="rItem"-->
          <!--v-model="accountProfile.selectId"-->
          <!--placeholder="No data"-->
          <!--@change="accountProfileSelectedIdChange">-->
          <!--<el-option-->
            <!--v-for="item in accountProfile.options"-->
            <!--:key="item"-->
            <!--:label="item"-->
            <!--:value="item">-->
          <!--</el-option>-->
        <!--</el-select>-->
      </div>

      <div class="list clearfix">
        <el-table
          style="width: 100%"
          ref="accountProfileTable"
          :data="accountProfile.info"
          tooltip-effect="dark">
          <el-table-column
            label="Account ID">
            <template slot-scope="scope">
              <el-tooltip class="val" :content="String(scope.row.accountId)" placement="top" :open-delay="setOpenDelay">
                <span>{{ scope.row.accountId | isEmptyVal }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            label="Type"
            width="100">
            <template slot-scope="scope">
              <el-tooltip class="val" :content="String(scope.row.type)" placement="top" :open-delay="setOpenDelay">
                <span>{{ scope.row.type | isEmptyVal }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="detailBtn">
        <router-link class="link" :to="{ name: 'caseReviewAccountDetail', query: { originalId: accountProfile.selectId, 'reviewId': reviewId, 'isShow': isShowProcedding, 'oId': orderId, 'tId': taskId  }}">Account Detail &gt;</router-link>
      </div>
    </div>

    <div class="transaction_profile_box">
      <div class="com_title_box clearfix">
        <h2 class="com_tit_txt">Transaction Profiles</h2>
        <!--<el-select-->
          <!--class="rItem"-->
          <!--v-model="transactionProfile.selectId"-->
          <!--placeholder="No data"-->
          <!--@change="transactionProfileSelectedIdChange">-->
          <!--<el-option-->
            <!--v-for="item in transactionProfile.options"-->
            <!--:key="item"-->
            <!--:label="item"-->
            <!--:value="item">-->
          <!--</el-option>-->
        <!--</el-select>-->
      </div>

      <div class="transaction_profile_show">
        <iframe frameborder="0" width="100%" height="290" :src="transactionMapUrl"></iframe>
      </div>

      <div class="detailBtn">
        <router-link class="link" :to="{ name: 'caseReviewTransactionDetail', query: { 'originalId': transactionProfile.selectId, 'reviewId': reviewId, 'isShow': isShowProcedding, 'oId': orderId, 'tId': taskId  }}">Transaction Detail &gt;</router-link>
      </div>
    </div>
  </div>

  <div v-if="isShowReviews" class="comPartingLine"></div>
  <div v-if="isShowReviews" class="reviews_box">
    <div class="com_title_box clearfix">
      <h2 class="com_tit_txt">Case Review workflow</h2>

      <div v-if="this.reviewSteps.list.length > 0" class="review_steps_box">
        <el-carousel
          arrow="never"
          :autoplay="false"
          height="150px">
          <el-carousel-item
            v-for="(carouselItem, carouselKey) in reviewSteps.carousel"
            :key="carouselKey">
            <div v-for="(subItem, subKey) in carouselItem"
              :key="subKey"
                 :class="[
                'step_page',
                subItem.status !== 'isWaiting' ? 'isFinish' : 'isWaiting',
                subItem.isActive ? 'isActive' : '',
                subItem.result === 'Disagree' ? 'isRed' : '',
                subItem.status === 8 || subItem.status === 13 ? 'isYellow' : ''
              ]"
              @click="showReviewStepClick(subItem)">
              <div class="step_page_head">
                <i class="icon"></i>
                <span class="line"></span>
              </div>
              <div class="step_page_main">{{ subItem.statusValue }}</div>
              <div class="step_page_time">{{ subItem.createTime | isEmptyVal | formatDate }}</div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>

      <router-link class="rItem" :to="{ name: 'caseReviewWorkflowDetail', query: { 'orderId': orderId }}">
        <el-button type="primary">Aduit Detail</el-button>
      </router-link>
    </div>

    <div class="reviews_info_box">
      <div class="option clearfix">
        <div class="item lItem">Case Narrative</div>
        <div class="item lItem">Case Disposition : &nbsp;&nbsp;<span :class="['escalated', reviewSteps.result === 'Disagree' ? 'isRed' : '' ]">{{ reviewSteps.result }}</span></div>
        <div class="item lItem">{{ reviewSteps.roleName }}：<span>{{ reviewSteps.operator }}</span></div>
        <div v-if="reviewSteps.score" class="item lItem">
          {{ reviewSteps.roleName }} Score：{{ reviewSteps.score }}
          <span class="scoreDetail" @click="showScoreDetail(reviewSteps.taskId)">Detail</span>
          </el-tooltip>
        </div>
        <div class="item rItem">Processing Time: {{ reviewSteps.createTime | isEmptyVal | formatDate }}</div>
      </div>
      <div class="show clearfix">
        <div class="word" v-html="reviewSteps.content"></div>
        <div class="files">
          <p
            :class="checkFileType(item.fileName)"
            :key="key"
            v-for="(item, key) in reviewSteps.files">
            <a :href="item.filePath" target="_blank">{{ item.fileName }}</a>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- start of transcations -->
  <!--<el-dialog-->
    <!--width="1380px"-->
    <!--title="Alerted Transactions"-->
    <!--:visible.sync="transactionMore.visible">-->
    <!--<div class="table_layout transactionMore_tab_layout">-->
      <!--<el-table-->
        <!--class="tab_list"-->
        <!--:data="transactionMore.list"-->
        <!--style="width: 100%">-->
        <!--<el-table-column-->
          <!--label="Originator Name"-->
          <!--prop="originatorName"-->
          <!--width="150">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--label="Originator Account ID"-->
          <!--prop="originatorAccountID"-->
          <!--width="150">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--label="Originator Risk"-->
          <!--prop="originatorRisk"-->
          <!--width="150">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--label="Originator's Bank"-->
          <!--prop="originatorBank"-->
          <!--width="150">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--label="Intermediary Bank"-->
          <!--prop="intermediaryBank"-->
          <!--width="150">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--label="Beneficiary Name"-->
          <!--prop="beneficiaryName"-->
          <!--width="150">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--label="Beneficiary Account ID"-->
          <!--prop="beneficiaryAccountID"-->
          <!--width="160">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--label="Beneficiary Risk"-->
          <!--prop="beneficiaryRisk"-->
          <!--width="150">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--label="Date"-->
          <!--prop="date"-->
          <!--width="150">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--label="Source"-->
          <!--prop="source"-->
          <!--width="150">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--label="Type"-->
          <!--prop="type"-->
          <!--width="150">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--label="Base"-->
          <!--prop="base"-->
          <!--width="150">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--label="Transaction Reference ID"-->
          <!--prop="transactionReferenceID"-->
          <!--width="200">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--label="Detail"-->
          <!--align="center"-->
          <!--width="150">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button type="text" size="small">Detail</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      <!--</el-table>-->
    <!--</div>-->

    <!--<el-pagination-->
      <!--@size-change="transactionMoreSizeChange"-->
      <!--@current-change="transactionMoreCurrentChange"-->
      <!--:current-page="transactionMore.currentPage"-->
      <!--:page-size="transactionMore.pageSize"-->
      <!--:page-sizes="[10, 20, 30, 40, 50, 100]"-->
      <!--layout="total, sizes, prev, pager, next, jumper"-->
      <!--:total="transactionMore.total">-->
    <!--</el-pagination>-->
  <!--</el-dialog>-->
  <!-- start of transcations -->

  <!-- 创建processing弹框组件 -->
  <custom-processing
    v-show="isShowProcedding"
    ref="customProcessing"
    :caseId="String(reviewId)"
    :roleId="roleId">
  </custom-processing>

  <!-- 创建alert弹框组件 -->
  <create-alert
    :visible-create-alert.async="createrOption.dialog"
    :action-url="createrOption.url"
    type="case"
    :on-success="alertSuccessCallBack"
    @visibleChange="visibleCreateAlert">
  </create-alert>

  <!-- 评分弹框 -->
  <el-dialog
    title="Quality Assurance"
    width="80%"
    :visible.sync="scoreData.visible">
    <table class="com_customProcessing_dialogTable">
      <tr>
        <th class="row1">#</th>
        <th class="row2">Quality lssues</th>
        <th class="row3">SAR ltem#</th>
        <th class="row4">Action Required</th>
        <th class="row5">Action Taken</th>
        <th class="row6">Confirm Corrected(Y/N)</th>
      </tr>
      <tr>
        <td class="row1">1</td>
        <td class="row2">SAR Narrative complete,organized,and clearly written</td>
        <td class="row3">{{ scoreData.organizedWritten.sarItem }}</td>
        <td class="row4">{{ scoreData.organizedWritten.actionRequired }}</td>
        <td class="row5">{{ scoreData.organizedWritten.actionToken }}</td>
        <td class="row6">
          <el-radio-group v-model="scoreData.organizedWritten.corrected">
            <el-radio label="Y" disabled>Y</el-radio>
            <el-radio label="N" disabled>N</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td class="row1">2</td>
        <td class="row2">SAR Form accurately and appropriately completed</td>
        <td class="row3">{{ scoreData.accuratelyAppropriately.sarItem }}</td>
        <td class="row4">{{ scoreData.accuratelyAppropriately.actionRequired }}</td>
        <td class="row5">{{ scoreData.accuratelyAppropriately.actionToken }}</td>
        <td class="row6">
          <el-radio-group v-model="scoreData.accuratelyAppropriately.corrected">
            <el-radio label="Y" disabled>Y</el-radio>
            <el-radio label="N" disabled>N</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td class="row1">3</td>
        <td class="row2">Correct grammar and spelling</td>
        <td class="row3">{{ scoreData.grammarSpelling.sarItem }}</td>
        <td class="row4">{{ scoreData.grammarSpelling.actionRequired }}</td>
        <td class="row5">{{ scoreData.grammarSpelling.actionToken }}</td>
        <td class="row6">
          <el-radio-group v-model="scoreData.grammarSpelling.corrected">
            <el-radio label="Y" disabled>Y</el-radio>
            <el-radio label="N" disabled>N</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td class="row1">4</td>
        <td class="row2">Other issuesnoted</td>
        <td class="row3">{{ scoreData.otherIssues.sarItem }}</td>
        <td class="row4">{{ scoreData.otherIssues.actionRequired }}</td>
        <td class="row5">{{ scoreData.otherIssues.actionToken }}</td>
        <td class="row6">
          <el-radio-group v-model="scoreData.otherIssues.corrected">
            <el-radio label="Y" disabled>Y</el-radio>
            <el-radio label="N" disabled>N</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td class="row1">5</td>
        <td class="row2">Quality Grade(1-4)</td>
        <td class="row3" colspan="4">
          <el-radio-group v-model="scoreData.grade">
            <el-radio :label="1" disabled>(1) No Errors</el-radio>
            <el-radio :label="2" disabled>(2) Few Minor Errors</el-radio>
            <el-radio :label="3" disabled>(3) Numerous Minor Errors,or</el-radio>
            <el-radio :label="4" disabled>(4) Critical Errors</el-radio>
          </el-radio-group>
        </td>
      </tr>
    </table>
  </el-dialog>


  <!-- start of summary datail -->
  <el-dialog
    width="1380px"
    title="Summary Detail"
    :visible.sync="summaryDetail.visible">
    <div class="table_layout summaryDetail_tab_layout">
      <el-table
        class="tab_list"
        :data="summaryDetail.list"
        style="width: 100%">
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
    </div>

    <el-pagination
      @size-change="summaryDetailSizeChange"
      @current-change="summaryDetailCurrentChange"
      :current-page="summaryDetail.currentPage"
      :page-size="summaryDetail.pageSize"
      :page-sizes="[10, 20, 30, 40, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="summaryDetail.total">
    </el-pagination>
  </el-dialog>
  <!-- start of summary datail -->


  <!-- start of customer summary datail -->
  <el-dialog
    width="1380px"
    title="Summary Detail"
    :visible.sync="custSummaryDetail.visible">
    <div class="table_layout summaryDetail_tab_layout">
      <el-table
        class="tab_list"
        :data="custSummaryDetail.list"
        style="width: 100%">
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
    </div>

    <!--<el-pagination-->
    <!--@size-change="custSummaryDetailSizeChange"-->
    <!--@current-change="custSummaryDetailCurrentChange"-->
    <!--:current-page="custSummaryDetail.currentPage"-->
    <!--:page-size="custSummaryDetail.pageSize"-->
    <!--:page-sizes="[10, 20, 30, 40, 50, 100]"-->
    <!--layout="total, sizes, prev, pager, next, jumper"-->
    <!--:total="custSummaryDetail.total">-->
    <!--</el-pagination>-->
  </el-dialog>
  <!-- start of customer summary datail -->


  <!-- 创建RFI弹框组件 -->
  <custom-RFI
    :type="1"
    :reviewId="String(reviewId)"
    ref="customRFI">
  </custom-RFI>

</div>
