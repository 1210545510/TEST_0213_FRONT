<div class="caseReview_workflowDatail_box">

  <div class="comPartingLine"></div>

  <div class="comComeBack_box clearfix">
    <el-button class="rItem" type="primary" @click="comeBack">&lt;&nbsp;Back</el-button>
  </div>

  <div class="tab_list table_layout_border">
    <el-table
      ref="multipleTable"
      :data="tableListData"
      tooltip-effect="dark"
      style="width: 100%"
      border>
      <el-table-column
        label="Time">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | isEmptyVal | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Beginning Status">
        <template slot-scope="scope">
          <span>{{ scope.row.statusValue | isEmptyVal }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Action">
        <template slot-scope="scope">
          <span>{{ scope.row.action | isEmptyVal }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Next Status">
        <template slot-scope="scope">
          <span>{{ scope.row.nextStatus | isEmptyVal }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Role">
        <template slot-scope="scope">
          <span>{{ scope.row.roleName | isEmptyVal }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="By">
        <template slot-scope="scope">
          <el-tooltip class="val" :content="scope.row.operator | isEmptyVal" placement="top" :open-delay="setOpenDelay">
            <span>{{ scope.row.operator | isEmptyVal }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="Comments">
        <template slot-scope="scope">
          <el-tooltip class="val" :content="scope.row.comments | isEmptyVal" placement="top" :open-delay="setOpenDelay">
            <span>{{ scope.row.comments | isEmptyVal }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="Attachment Name">
        <template slot-scope="scope">
          <span>{{ scope.row.attachmentName | isEmptyVal }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Attachment">
        <template slot-scope="scope">
          <span>{{ scope.row.attachment | isEmptyVal }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Result">
        <template slot-scope="scope">
          <span>{{ scope.row.result | isEmptyVal }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>

</div>