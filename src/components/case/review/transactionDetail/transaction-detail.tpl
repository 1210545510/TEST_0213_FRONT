<div class="caseReview_transactionDatail_box">
  <div class="comPartingLine"></div>

  <div class="com_title_box clearfix paddingTop30">
    <h2 class="com_tit_txt lItem">Transaction Detail</h2>
    <el-select
      class="lItem"
      v-model="originalIdSelected.selectId"
      placeholder="No data"
      @change="transactionDetailSelectedIdChange">
      <el-option
        v-for="item in originalIdSelected.options"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>

    <el-button class="rItem" type="primary" @click="comeBack">&lt;&nbsp;Back</el-button>
  </div>


  <el-tabs
    class="com_tab_card_box"
    v-model="transactionDetailActiveName"
    type="card"
    @tab-click="transactionDetailTabFun">
    <!-- start of 选项卡1 -->
    <el-tab-pane label="Alerted transaction analysis" name="0">
      <!-- start of Top 5 counter parties -->
      <div class="table_layout counterParties_box">
        <div class="com_title_box clearfix">
          <h2 class="com_tit_txt lItem">Counterparties</h2>
        </div>

        <el-table
          :data="counterParties.list"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            label="Counterparty Name"
            prop="counterpartyName">
          </el-table-column>
          <el-table-column
            label="Customer Type"
            prop="customerType">
          </el-table-column>
          <el-table-column
            label="Alerted Transaction Amount"
            prop="alertedTransactionAmount">
          </el-table-column>
          <el-table-column
            label="% of Alerted Transaction Amount"
            prop="alertedTransactionAmount2"
            width="220">
          </el-table-column>
          <el-table-column
            label="Alerted Transaction Volume"
            prop="alertedTransactionVolume">
          </el-table-column>
          <el-table-column
            label="Country/Region"
            prop="country">
          </el-table-column>
          <el-table-column
            label="View Details">
            <template slot-scope="scope">
              <el-button type="text" size="small">Subject Detail</el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <!-- start of Top 5 counter parties -->


      <!-- start of transactions -->
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
            <!--width="150">-->
            <!--<template slot-scope="scope">-->
              <!--<span v-if="scope.row && scope.row.date">{{ scope.row.date | isEmptyVal | formatYMD }}</span>-->
            <!--</template>-->
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
      <!-- end of transactions -->


      <!-- start of transactions -->
      <div class="transactions_tab_box table_layout">
        <div class="com_title_box clearfix">
          <h2 class="com_tit_txt lItem">Caseed  transactions</h2>
        </div>
        <el-tabs
          v-model="transactionsTab.name"
          @tab-click="transactionsTabClick"
          type="card">
          <!-- start of Cash Transaction -->
          <el-tab-pane name="0" label="Cash Transaction">
            <el-table
              :data="transactionsTab.cashData"
              style="width: 100%;">
              <el-table-column label="">
                <el-table-column
                  label="Date">
                  <template slot-scope="scope">
                    <span>{{ scope.row.date | isEmptyVal | formatYMD}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="Source"
                  prop="source">
                </el-table-column>
                <el-table-column
                  label="Type"
                  prop="type">
                </el-table-column>
                <el-table-column
                  label="Debit/Credit"
                  prop="debitOrCredit">
                </el-table-column>
              </el-table-column>
              <el-table-column label="Amount">
                <el-table-column
                  label="Base"
                  prop="amountBase">
                </el-table-column>
                <el-table-column
                  label="Activity"
                  prop="amountActivity">
                </el-table-column>
              </el-table-column>
              <el-table-column label="Account">
                <el-table-column
                  label="ID"
                  prop="accountId">
                </el-table-column>
                <el-table-column
                  label="Risk"
                  prop="accountRisk">
                </el-table-column>
              </el-table-column>
              <el-table-column label="Location">
                <el-table-column
                  label="ID"
                  prop="locationID">
                </el-table-column>
                <el-table-column
                  label="Name"
                  prop="locationName">
                </el-table-column>
                <el-table-column
                  label="Address"
                  prop="locationAddress">
                </el-table-column>
                <el-table-column
                  label="Transaction Reference ID"
                  prop="locationTransactionReferenceID">
                </el-table-column>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <!-- end of Cash Transaction-->


          <el-tab-pane name="1" label="Electronic Fund Transaction">
            <el-table
              :data="transactionsTab.electronicData"
              style="width: 100%;">
              <el-table-column label="">
                <el-table-column
                  label="Date">
                  <template slot-scope="scope">
                    <span>{{ scope.row.date | isEmptyVal | formatYMD}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="Source"
                  prop="source">
                </el-table-column>
                <el-table-column
                  label="Type"
                  prop="type">
                </el-table-column>
              </el-table-column>
              <el-table-column label="Amount">
                <el-table-column
                  label="Base"
                  prop="amountBase">
                </el-table-column>
              </el-table-column>
              <el-table-column label="Originator">
                <el-table-column
                  label="Name"
                  prop="originatorName">
                </el-table-column>
                <el-table-column
                  label="Account ID"
                  prop="originatorAccountID">
                </el-table-column>
                <el-table-column
                  label="Risk"
                  prop="originatorRisk">
                </el-table-column>
              </el-table-column>
              <el-table-column label="Beneficiary">
                <el-table-column
                  label="Name"
                  prop="beneficiaryName">
                </el-table-column>
                <el-table-column
                  label="Account ID"
                  prop="beneficiaryAccountID">
                </el-table-column>
                <el-table-column
                  label="Risk"
                  prop="beneficiaryRisk">
                </el-table-column>
              </el-table-column>
              <el-table-column label="">
                <el-table-column
                  label="Transaction Reference ID"
                  prop="transactionReferenceID">
                </el-table-column>
                <el-table-column
                  label="Unrelated Parties"
                  prop="unrelatedParties">
                </el-table-column>
                <el-table-column
                  label="Action">
                  <template slot-scope="scope">
                    <span>Details</span>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <el-tab-pane name="2" label="Monetary Instrument">
            <el-table
              :data="transactionsTab.monetaryData"
              style="width: 100%;">
              <el-table-column label="">
                <el-table-column
                  label="Post Date">
                  <template slot-scope="scope">
                    <span>{{ scope.row.postDate | isEmptyVal | formatYMD}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="Issue Date">
                  <template slot-scope="scope">
                    <span>{{ scope.row.issueDate | isEmptyVal | formatYMD}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="Type"
                  prop="type">
                </el-table-column>
                <el-table-column
                  label="Serial/Check#"
                  prop="serialOrCheck">
                </el-table-column>
                <el-table-column
                  label="Amount"
                  prop="amount">
                </el-table-column>
              </el-table-column>
              <el-table-column label="Remitter">
                <el-table-column
                  label="Name"
                  prop="remitterName">
                </el-table-column>
                <el-table-column
                  label="Account ID"
                  prop="remitterAccountID">
                </el-table-column>
                <el-table-column
                  label="Risk"
                  prop="remitterRisk">
                </el-table-column>
              </el-table-column>
              <el-table-column label="Beneficiary">
                <el-table-column
                  label="Name"
                  prop="beneficiaryName">
                </el-table-column>
                <el-table-column
                  label="Account ID"
                  prop="beneficiaryAccountID">
                </el-table-column>
                <el-table-column
                  label="Risk"
                  prop="beneficiaryRisk">
                </el-table-column>
              </el-table-column>
              <el-table-column label="">
                <el-table-column
                  label="Foreign Check"
                  prop="foreignCheck">
                </el-table-column>
                <el-table-column
                  label="Reference ID"
                  prop="referenceID">
                </el-table-column>
                <el-table-column
                  label="Unrelated Parties"
                  prop="unrelatedParties">
                </el-table-column>
                <el-table-column
                  label="Summary">
                  <template slot-scope="scope">
                    <el-button type="text" size="small">Details</el-button>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- end of transactions -->


      <!-- start of 地图 -->
      <div class="map_box">
        <div class="com_title_box clearfix">
          <el-button class="rItem" @click="toGraphView">Graph View</el-button>
        </div>

        <div class="mar_show_box">
          <iframe frameborder="0" width="1318" height="600" :src="transactionMapUrl"></iframe>
        </div>
      </div>
      <!-- end of 地图 -->


      <!-- start of Payment Message -->
      <div class="paymentMessage_box">
        <div class="com_title_box clearfix">
          <h2 class="com_tit_txt">Payment Message</h2>
        </div>
        <div id="wordCloud" class="paymentMessage_show_box"></div>
      </div>
      <!-- end of Payment Message -->

    </el-tab-pane>
    <!-- end of 选项卡1 -->


    <!-- start of 选项卡2 -->
    <el-tab-pane label="Transaction History Analysis" name="1">
      <div class="historyAnalysis_box clearfix">
        <div class="historyAnalysis_left_box">
          <!-- start of top5Party -->
          <div class="table_layout historyAnalysis_top5Party_box">
            <div class="com_title_box clearfix">
              <h2 class="com_tit_txt lItem">Counterparties</h2>
            </div>

            <custom-switch
              :width=180
              :listData = historyAnalysis.top5NameSwitch
              :activeIndex = historyAnalysis.top5NameIndex
              @actionMethod="historyAnalysisTop5NameSwitch">
            </custom-switch>

            <el-table
              v-if="historyAnalysis.top5NameIndex === 0"
              :data="historyAnalysis.top5Name"
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                label="Party Name"
                prop="name">
              </el-table-column>
              <el-table-column
                label="Volume">
                <template slot-scope="scope">
                  <span v-if="scope.row && scope.row.volume">{{ scope.row.volume | isEmptyVal | formatUSD }}</span>
                </template>
              </el-table-column>
            </el-table>

            <el-table
              v-if="historyAnalysis.top5NameIndex === 1"
              :data="historyAnalysis.top5Name"
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                label="Party Name"
                prop="name">
              </el-table-column>
              <el-table-column
                label="Amount"
                prop="amount">
              </el-table-column>
            </el-table>

          </div>
          <!-- start of top5Party -->

          <!-- start of top5Country -->
          <div class="table_layout historyAnalysis_top5Country_box">
            <div class="com_title_box clearfix">
              <h2 class="com_tit_txt lItem">Countries</h2>
            </div>

            <custom-switch
              :width=180
              :listData = historyAnalysis.top5CountrySwitch
              :activeIndex = historyAnalysis.top5CountryIndex
              @actionMethod="historyAnalysisTop5CountrySwitch">
            </custom-switch>

            <el-table
              v-if="historyAnalysis.top5CountryIndex === 0"
              :data="historyAnalysis.top5Country"
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                label="Party Name"
                prop="name">
              </el-table-column>
              <el-table-column
                label="Volume">
                <template slot-scope="scope">
                  <span v-if="scope.row && scope.row.volume">{{ scope.row.volume | isEmptyVal | formatUSD }}</span>
                </template>
              </el-table-column>
            </el-table>

            <el-table
              v-if="historyAnalysis.top5CountryIndex === 1"
              :data="historyAnalysis.top5Country"
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                label="Party Name"
                prop="name">
              </el-table-column>
              <el-table-column
                label="Amount"
                prop="amount">
              </el-table-column>
            </el-table>

          </div>
          <!-- start of top5Country -->
        </div>

        <div class="historyAnalysis_right_box">
          <div id="wordCloud2" class="historyAnalysis_wordCloud_box"></div>
        </div>
      </div>


      <div class="transactionNum_box">
        <div class="com_title_box clearfix">
          <h2 class="com_tit_txt lItem">Transaction volume based: number of transaction</h2>

          <el-date-picker
            @change="transactionNumDateChange"
            class="rItem"
            v-model="transactionNum.date"
            type="daterange"
            size="small"
            start-placeholder="Start Date"
            end-placeholder="End Date">
          </el-date-picker>

          <custom-switch
            class="rItem"
            :listData = transactionNum.listSwitch1
            :activeIndex = transactionNum.type1
            @actionMethod="transactionNumSwitch1">
          </custom-switch>
        </div>

        <div id="chartObj1" class="chartObj"></div>
      </div>

    </el-tab-pane>
    <!-- end of 选项卡2 -->


    <!-- start of 选项卡3 -->
    <el-tab-pane label="Transaction History" name="2">
      <div class="table_layout transactionMore_historyTab_layout">
        <div class="com_title_box clearfix">
          <h2 class="com_tit_txt lItem">Original Transaction List</h2>

          <div class="rItem search_btn_warp">
          <el-input
          @keyup.enter.native="historySearchFun(transactionHistory.keyWord)"
          placeholder="Search"
          v-model="transactionHistory.keyWord"
          class="input-with-select">
          <el-button
          slot="append"
          icon="el-icon-search"
          @click="historySearchFun(transactionHistory.keyWord)">
          </el-button>
          </el-input>
          </div>

          <!--<el-date-picker-->
          <!--@change="historySelectChange"-->
          <!--class="rItem"-->
          <!--v-model="transactionHistory.dateSelect"-->
          <!--type="daterange"-->
          <!--size="small"-->
          <!--value-format="yyyy-MM-dd"-->
          <!--start-placeholder="Start Date"-->
          <!--end-placeholder="End Date">-->
          <!--</el-date-picker>-->

          <!--<el-button class="rItem">Analysis</el-button>-->
        </div>

        <el-tabs
          v-model="transactionsTabHistory.name"
          @tab-click="transactionsTabHistoryClick"
          type="card">
          <!-- start of Cash Transaction -->
          <el-tab-pane name="0" label="Cash Transaction">
            <el-table
              :data="transactionsTabHistory.cashData"
              style="width: 100%;">
              <el-table-column label="">
                <el-table-column
                  label="Date">
                  <template slot-scope="scope">
                    <span>{{ scope.row.date | isEmptyVal | formatYMD}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="Source"
                  prop="source">
                </el-table-column>
                <el-table-column
                  label="Type"
                  prop="type">
                </el-table-column>
                <el-table-column
                  label="Debit/Credit"
                  prop="debitOrCredit">
                </el-table-column>
              </el-table-column>
              <el-table-column label="Amount">
                <el-table-column
                  label="Base"
                  prop="amountBase">
                </el-table-column>
                <el-table-column
                  label="Activity"
                  prop="amountActivity">
                </el-table-column>
              </el-table-column>
              <el-table-column label="Account">
                <el-table-column
                  label="ID"
                  prop="accountId">
                </el-table-column>
                <el-table-column
                  label="Risk"
                  prop="accountRisk">
                </el-table-column>
              </el-table-column>
              <el-table-column label="Location">
                <el-table-column
                  label="ID"
                  prop="locationID">
                </el-table-column>
                <el-table-column
                  label="Name"
                  prop="locationName">
                </el-table-column>
                <el-table-column
                  label="Address"
                  prop="locationAddress">
                </el-table-column>
                <el-table-column
                  label="Transaction Reference ID"
                  prop="locationTransactionReferenceID">
                </el-table-column>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <!-- end of Cash Transaction-->


          <el-tab-pane name="1" label="Electronic Fund Transaction">
            <el-table
              :data="transactionsTab.electronicData"
              style="width: 100%;">
              <el-table-column label="">
                <el-table-column
                  label="Date">
                  <template slot-scope="scope">
                    <span>{{ scope.row.date | isEmptyVal | formatYMD}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="Source"
                  prop="source">
                </el-table-column>
                <el-table-column
                  label="Type"
                  prop="type">
                </el-table-column>
              </el-table-column>
              <el-table-column label="Amount">
                <el-table-column
                  label="Base"
                  prop="amountBase">
                </el-table-column>
              </el-table-column>
              <el-table-column label="Originator">
                <el-table-column
                  label="Name"
                  prop="originatorName">
                </el-table-column>
                <el-table-column
                  label="Account ID"
                  prop="originatorAccountID">
                </el-table-column>
                <el-table-column
                  label="Risk"
                  prop="originatorRisk">
                </el-table-column>
              </el-table-column>
              <el-table-column label="Beneficiary">
                <el-table-column
                  label="Name"
                  prop="beneficiaryName">
                </el-table-column>
                <el-table-column
                  label="Account ID"
                  prop="beneficiaryAccountID">
                </el-table-column>
                <el-table-column
                  label="Risk"
                  prop="beneficiaryRisk">
                </el-table-column>
              </el-table-column>
              <el-table-column label="">
                <el-table-column
                  label="Transaction Reference ID"
                  prop="transactionReferenceID">
                </el-table-column>
                <el-table-column
                  label="Unrelated Parties"
                  prop="unrelatedParties">
                </el-table-column>
                <el-table-column
                  label="Action">
                  <template slot-scope="scope">
                    <span>Details</span>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <el-tab-pane name="2" label="Monetary Instrument">
            <el-table
              :data="transactionsTab.monetaryData"
              style="width: 100%;">
              <el-table-column label="">
                <el-table-column
                  label="Post Date">
                  <template slot-scope="scope">
                    <span>{{ scope.row.postDate | isEmptyVal | formatYMD}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="Issue Date">
                  <template slot-scope="scope">
                    <span>{{ scope.row.issueDate | isEmptyVal | formatYMD}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="Type"
                  prop="type">
                </el-table-column>
                <el-table-column
                  label="Serial/Check#"
                  prop="serialOrCheck">
                </el-table-column>
                <el-table-column
                  label="Amount"
                  prop="amount">
                </el-table-column>
              </el-table-column>
              <el-table-column label="Remitter">
                <el-table-column
                  label="Name"
                  prop="remitterName">
                </el-table-column>
                <el-table-column
                  label="Account ID"
                  prop="remitterAccountID">
                </el-table-column>
                <el-table-column
                  label="Risk"
                  prop="remitterRisk">
                </el-table-column>
              </el-table-column>
              <el-table-column label="Beneficiary">
                <el-table-column
                  label="Name"
                  prop="beneficiaryName">
                </el-table-column>
                <el-table-column
                  label="Account ID"
                  prop="beneficiaryAccountID">
                </el-table-column>
                <el-table-column
                  label="Risk"
                  prop="beneficiaryRisk">
                </el-table-column>
              </el-table-column>
              <el-table-column label="">
                <el-table-column
                  label="Foreign Check"
                  prop="foreignCheck">
                </el-table-column>
                <el-table-column
                  label="Reference ID"
                  prop="referenceID">
                </el-table-column>
                <el-table-column
                  label="Unrelated Parties"
                  prop="unrelatedParties">
                </el-table-column>
                <el-table-column
                  label="Summary">
                  <template slot-scope="scope">
                    <el-button type="text" size="small">Details</el-button>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>

      <!--<el-pagination-->
        <!--@size-change="transactionHistorySizeChange"-->
        <!--@current-change="transactionHistoryCurrentChange"-->
        <!--:current-page="transactionHistory.currentPage"-->
        <!--:page-size="transactionHistory.pageSize"-->
        <!--:page-sizes="[10, 20, 30, 40, 50, 100]"-->
        <!--layout="total, sizes, prev, pager, next, jumper"-->
        <!--:total="transactionHistory.total">-->
      <!--</el-pagination>-->
    </el-tab-pane>
    <!-- end of 选项卡3 -->
  </el-tabs>


  <!-- start of transcations -->
  <!--<el-dialog-->
    <!--width="1380px"-->
    <!--title="Case Transactions"-->
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
          <!--width="150">-->
          <!--<template slot-scope="scope">-->
            <!--<span v-if="scope.row && scope.row.date">{{ scope.row.date | isEmptyVal | formatYMD }}</span>-->
          <!--</template>-->
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

</div>