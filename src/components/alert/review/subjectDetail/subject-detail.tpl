<div class="alertReview_subjectDatail_box">
  <div class="comPartingLine"></div>

  <div class="com_title_box clearfix paddingTop30">
    <h2 class="com_tit_txt lItem">Subject Detail</h2>

    <el-button class="rItem" type="primary" @click="comeBack">&lt;&nbsp;Back</el-button>
  </div>

  <div class="subjectDetail_info_box">
    <dl class="com_dl_list_box clearfix">
      <dd class="clearfix">
        <span class="key">Customer ID :</span>
        <span class="val">{{SubjectInfo.customerId | isEmptyVal }}</span>
      </dd>
      <dd class="clearfix">
        <span class="key">Customer Name :</span>
        <span class="val">{{SubjectInfo.customerName | isEmptyVal }}</span>
      </dd>
      <dd class="clearfix">
        <span class="key">Alias :</span>
        <span class="val">{{SubjectInfo.alias | isEmptyVal }}</span>
      </dd>
      <dd class="clearfix">
        <span class="key">Customer Type :</span>
        <span class="val">{{SubjectInfo.customerType | isEmptyVal }}</span>
      </dd>
      <dd class="clearfix">
        <span class="key">Tax ID :</span>
        <span class="val">{{SubjectInfo.taxId | isEmptyVal }}</span>
      </dd>
      <dd class="clearfix">
        <span class="key">Date of Birth :</span>
        <span class="val">{{SubjectInfo.birthdate | isEmptyVal }}</span>
      </dd>
      <dd class="clearfix">
        <span class="key">Marital Status :</span>
        <span class="val">{{SubjectInfo.maritalStatus | isEmptyVal }}</span>
      </dd>
      <dd class="clearfix">
        <span class="key">Citizenship :</span>
        <span class="val">{{SubjectInfo.citizenship | isEmptyVal }}</span>
      </dd>
      <dd class="clearfix">
        <span class="key">Foreign public Official :</span>
        <span class="val">{{SubjectInfo.foreignPublicOfficial | isEmptyVal }}</span>
      </dd>
      <dd class="clearfix">
        <span class="key">ATM Daily Limit :</span>
        <span class="val">{{SubjectInfo.atmDailyLimit | isEmptyVal }}</span>
      </dd>
      <dd class="clearfix">
        <span class="key">Employee :</span>
        <span class="val">{{SubjectInfo.employee | isEmptyVal }}</span>
      </dd>
      <dd class="clearfix">
        <span class="key">Employee Status :</span>
        <span class="val">{{SubjectInfo.employeeStatus | isEmptyVal }}</span>
      </dd>
      <dd class="clearfix">
        <span class="key">Works for FI :</span>
        <span class="val">{{SubjectInfo.worksForFI | isEmptyVal }}</span>
      </dd>
      <dd class="clearfix">
        <span class="key">Residence :</span>
        <span class="val">{{SubjectInfo.residence | isEmptyVal }}</span>
      </dd>
      <dd class="clearfix">
        <span class="key">Added :</span>
        <span class="val">{{SubjectInfo.added | isEmptyVal }}</span>
      </dd>
      <dd class="clearfix">
        <span class="key">Updated on :</span>
        <span class="val">{{SubjectInfo.updatedOn | isEmptyVal | formatYMD}}</span>
      </dd>
      <dd class="clearfix">
        <span class="key">Estimated Networth :</span>
        <span class="val">{{SubjectInfo.estimatedNetworth | isEmptyVal }}</span>
      </dd>
      <dd class="clearfix">
        <span class="key">Estimated Annual Income :</span>
        <span class="val">{{SubjectInfo.estimatedAnnualIncome | isEmptyVal }}</span>
      </dd>
      <dd class="clearfix">
        <span class="key">Estimated Liquid Networth :</span>
        <span class="val">{{SubjectInfo.estimatedLiquidNetworth | isEmptyVal }}</span>
      </dd>
      <dd class="clearfix">
        <span class="key">Source Outside of US :</span>
        <span class="val">{{SubjectInfo.sourceOutside | isEmptyVal }}</span>
      </dd>
      <dd class="clearfix">
        <span class="key">Public/Private :</span>
        <span class="val">{{SubjectInfo.publicPrivate | isEmptyVal }}</span>
      </dd>
      <dd class="clearfix">
        <span class="key">Depend Count :</span>
        <span class="val">{{SubjectInfo.dependCount | isEmptyVal }}</span>
      </dd>
      <dd class="clearfix">
        <span class="key">Compensation :</span>
        <span class="val">{{SubjectInfo.compensation | isEmptyVal }}</span>
      </dd>
      <dd class="clearfix">
        <span class="key">Credit Rating :</span>
        <span class="val">{{SubjectInfo.creditRating | isEmptyVal }}</span>
      </dd>
      <dd class="clearfix">
        <span class="key">Credit Rating Source :</span>
        <span class="val">{{SubjectInfo.creditRatingSource | isEmptyVal }}</span>
      </dd>
      <dd class="clearfix">
        <span class="key">Credit Score :</span>
        <span class="val">{{SubjectInfo.creditScore | isEmptyVal }}</span>
      </dd>
    </dl>
  </div>

  <el-tabs
    class="com_tab_card_box"
    v-model="subjectTab.name"
    @tab-click="subjectTabClick"
    type="card">
    <el-tab-pane name="0" label="Account">
      <el-table
        :data="subjectAcountsTab.list"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          label="Account ID"
          width="120">
          <template slot-scope="scope">
            {{scope.row.accountId | isEmptyVal}}
          </template>
        </el-table-column>
        <el-table-column
          label="Account Name"
          width="120">
          <template slot-scope="scope">
            {{scope.row.accountName | isEmptyVal}}
          </template>
        </el-table-column>
        <el-table-column
          label="Type(s)"
          prop="type1 + type2"
          width="120">
          <template slot-scope="scope">
            {{scope.row.type1}}{{scope.row.type2}}
          </template>
        </el-table-column>
        <el-table-column
          label="Registration"
          width="120">
          <template slot-scope="scope">
            {{scope.row.registration | isEmptyVal}}
          </template>
        </el-table-column>
        <el-table-column
          label="Tax ID"
          width="120">
          <template slot-scope="scope">
            {{scope.row.taxId | isEmptyVal}}
          </template>
        </el-table-column>
        <el-table-column
          label="Tax Code"
          width="120">
          <template slot-scope="scope">
            {{scope.row.taxCode | isEmptyVal}}
          </template>
        </el-table-column>
        <el-table-column
          label="Open Date"
          width="120">
          <template slot-scope="scope">
            {{scope.row.openDate | isEmptyVal | formatYMD}}
          </template>
        </el-table-column>
        <el-table-column
          label="Last Activity"
          width="120">
          <template slot-scope="scope">
            {{scope.row.lastActivity | isEmptyVal | formatYMD}}
          </template>
        </el-table-column>
        <el-table-column
          label="Branch"
          width="120">
          <template slot-scope="scope">
            {{scope.row.branch | isEmptyVal}}
          </template>
        </el-table-column>
        <el-table-column
          label="Restriction(s)"
          width="120">
          <template slot-scope="scope">
            {{scope.row.restriction | isEmptyVal}}
          </template>
        </el-table-column>
        <el-table-column
          label="Role"
          width="120">
          <template slot-scope="scope">
            {{scope.row.role | isEmptyVal}}
          </template>
        </el-table-column>
        <el-table-column
          label="Related"
          width="120">
          <template slot-scope="scope">
            {{scope.row.related | isEmptyVal}}
          </template>
        </el-table-column>
        <el-table-column
          label="Trade"
          width="120">
          <template slot-scope="scope">
            {{scope.row.trade | isEmptyVal}}
          </template>
        </el-table-column>
        <el-table-column
          label="WithDraw"
          width="120">
          <template slot-scope="scope">
            {{scope.row.withDraw | isEmptyVal}}
          </template>
        </el-table-column>
        <el-table-column
          label="POA"
          width="120">
          <template slot-scope="scope">
            {{scope.row.poa | isEmptyVal}}
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>

    <el-tab-pane name="1" label="Contact Infomation">
      <el-table
        :data="subjectCITab.list"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          label="Address">
          <template slot-scope="scope">
            {{scope.row.country}}{{scope.row.state}}/{{scope.row.region}}{{scope.row.city}}p
          </template>
        </el-table-column>
        <el-table-column
          label="Description">
          <template slot-scope="scope">
            {{scope.row.description | isEmptyVal}}
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>

    <el-tab-pane name="2" label="Customer Risk information">
      <el-table
        :data="subjectCRITab.list"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          label="Effective Risk">
          <template slot-scope="scope">
            {{scope.row.effectiveRisk | isEmptyVal}}
          </template>
        </el-table-column>
        <el-table-column
          label="Business Risk">
          <template slot-scope="scope">
            {{scope.row.businessRisk | isEmptyVal}}
          </template>
        </el-table-column>
        <el-table-column
          label="Watch List Risk">
          <template slot-scope="scope">
            {{scope.row.watchListRisk | isEmptyVal}}
          </template>
        </el-table-column>
        <el-table-column
          label="Geography Risk">
          <template slot-scope="scope">
            {{scope.row.geographyRisk | isEmptyVal}}
          </template>
        </el-table-column>
        <el-table-column
          label="Customer Risk">
          <template slot-scope="scope">
            {{scope.row.customerRisk | isEmptyVal}}
          </template>
        </el-table-column>
        <el-table-column
          label="KYC Risk">
          <template slot-scope="scope">
            {{scope.row.kycRisk | isEmptyVal}}
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>

  <!-- 创建processing弹框组件 -->
  <custom-processing
    v-show="isShowProcedding"
    ref="customProcessing"
    :roleId="roleId">
  </custom-processing>

</div>