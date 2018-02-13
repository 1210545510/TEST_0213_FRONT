<div class="com_createAlert_box">
  <el-dialog
    :title="type === 'case' ? 'Create Case' : 'Create Alert'"
    :visible.sync="visibleCreateAlert"
    :before-close="closeDialogCreateAlert"
    width="50%">
    <div class="dialog_content dialog_CreateAlert_content dl_form">
      <div class="dl_form_item clearfix">
        <div class="fLeft dl_form_item_fLeft" v-if="type === 'case'">
          <span class="dl_form_name"><i class="red">*</i>Case Type:</span>
          <el-select v-model="createAlertValues.alertType" placeholder="Select Case Type">
            <el-option
              v-for="item in caseTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="fLeft dl_form_item_fLeft" v-else>
          <span class="dl_form_name"><i class="red">*</i>Alert Type:</span>
          <el-select v-model="createAlertValues.alertType" placeholder="Select Alert Type">
            <el-option
              v-for="item in alertTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="fLeft dl_form_emptyitem"></div>
        <div class="fRight dl_form_item_fLeft">
          <!-- <span class="dl_form_name"><i class="red">*</i>Due Date:</span>
          <el-date-picker
            v-model="createAlertValues.dueDate"
            type="date"
            size="small"
            placeholder="Select Due Date">
          </el-date-picker> -->
          <span class="dl_form_name">Subject Type:</span>
          <el-select v-model="createAlertValues.subjectType" placeholder="Select Subject Type">
            <el-option
              v-for="item in subjectTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="dl_form_item clearfix">
        <div class="fLeft dl_form_item_fLeft">
          <span class="dl_form_name"><i class="red">*</i>Subject:</span>
          <el-input v-model="createAlertValues.subject"
            @keyup.native="limitInputChinese(createAlertValues.subject, 'subject')"
            :maxlength="100" placeholder="Enter Subject"></el-input>
        </div>
        <div class="fLeft dl_form_emptyitem"></div>
        <div class="fRight dl_form_item_fLeft">
          <span class="dl_form_name"><i class="red">*</i>Customer ID:</span>
          <el-input v-model="createAlertValues.customerID"
            @keyup.native="limitInputChinese(createAlertValues.customerID, 'customerID')"
            :maxlength="30" placeholder="Enter Customer ID"></el-input>
        </div>
      </div>

      <div class="dl_form_item clearfix">
        <div class="fLeft dl_form_item_fLeft">
          <span class="dl_form_name"><i class="red">*</i>Account ID:</span>
          <el-input v-model="createAlertValues.accountID"
            @keyup.native="limitInputChinese(createAlertValues.accountID, 'accountID')"
            :maxlength="30" placeholder="Enter Account ID"></el-input>
        </div>
        <div class="fLeft dl_form_emptyitem"></div>
        <div class="fRight dl_form_item_fLeft" v-if="type !== 'case'">
          <span class="dl_form_name"><i class="red">*</i>Owner:</span>
          <el-select v-model="createAlertValues.owner" placeholder="Select Owner" :disabled="ownerDisabled">
            <el-option
              v-for="item in ownerOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>


      <!-- <div class="dl_form_item clearfix">
        <div class="fLeft dl_form_item_fLeft">
          <span class="dl_form_name"><i class="red">*</i>Account ID:</span>
          <el-input v-model="createAlertValues.accountID" :maxlength="30" placeholder="Enter Account ID"></el-input>
        </div>
        <div class="fLeft dl_form_emptyitem"></div>
        <div class="fRight dl_form_item_fLeft">
          <el-checkbox v-model="createAlertValues.autoAssignment">Auto Assignment</el-checkbox>
        </div>
      </div> -->

      <div class="dl_form_item alertReason_item clearfix" v-if="type === 'case'">
        <span class="dl_form_name"><i class="red">*</i>Case Reason:</span>
        <el-input
          type="textarea"
          :rows="2"
          :maxlength="200"
          ref="monitorInput"
          @input="monitorInputLen(createAlertValues.alertReason)"
          @keyup.native="limitInputChinese(createAlertValues.alertReason, 'alertReason')"
          placeholder="Enter Case Reason"
          v-model="createAlertValues.alertReason">
        </el-input>
      </div>
      <div class="dl_form_item alertReason_item clearfix" v-else>
        <span class="dl_form_name"><i class="red">*</i>Alert Reason:</span>
        <el-input
          type="textarea"
          :rows="2"
          :maxlength="200"
          ref="monitorInput"
          @input="monitorInputLen(createAlertValues.alertReason)"
          placeholder="Enter Alert Reason"
          @keyup.native="limitInputChinese(createAlertValues.alertReason, 'alertReason')"
          v-model="createAlertValues.alertReason">
        </el-input>
      </div>

      <div class="dl_form_item clearfix">
        <span class="dl_form_name">Upload Attachment:</span>
        <el-upload
          ref="upload"
          class="upload_demo"
          :action="uploadUrl"
          :data="actionData"
          :on-preview="handlePreview"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :before-upload="uploadBefore"
          :limit="10">
          <el-button size="small" type="primary"><i class="el-icon-upload el-icon--left"></i>Upload File</el-button>
        </el-upload>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialogCreateAlert">Cancle</el-button>
      <el-button type="primary" @click="confirmCreateAlert">Save</el-button>
    </span>
  </el-dialog>
</div>
