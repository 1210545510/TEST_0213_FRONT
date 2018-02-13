<div class="com_createRFI_box">
  <el-dialog
    title="RFI"
    :visible.sync="visible"
    :before-close="closeRFI"
    width="50%">
    <div class="dialog_content dialog_createRFI_content dl_form">

      <div class="dl_form_item clearfix">
        <div class="fLeft dl_form_item_fLeft">
          <span class="dl_form_name"><i class="red">*</i>From :</span>
          <el-input
            v-model="saveValues.from"
            @keyup.native="limitInputChinese(saveValues.from, 'from')"
            :maxlength="50"
            placeholder="Please input the email address">
          </el-input>
        </div>
      </div>

      <div class="dl_form_item clearfix">
        <div class="fLeft dl_form_item_fLeft">
          <span class="dl_form_name"><i class="red">*</i>To :</span>
          <el-input
            v-model="saveValues.to"
            @keyup.native="limitInputChinese(saveValues.to, 'to')"
            :maxlength="50"
            placeholder="Please input the email address">
          </el-input>
        </div>
      </div>

      <div class="dl_form_item clearfix">
        <div class="fLeft dl_form_item_fLeft">
          <span class="dl_form_name"><i class="red">*</i>Subject :</span>
          <el-input
            v-model="saveValues.subject"
            @keyup.native="limitInputChinese(saveValues.subject, 'subject')"
            :maxlength="100"
            placeholder="Enter Subject">
          </el-input>
        </div>
      </div>

      <div class="dl_form_item alertReason_item clearfix">
        <span class="dl_form_name"><i class="red">*</i>{{showTxt.write.reason}}:</span>
        <el-input
          type="textarea"
          :rows="8"
          :maxlength="2000"
          ref="reasonInput"
          placeholder="Enter Alert Reason"
          @input.native="limitInputChinese(saveValues.comment, 'reason')"
          v-model="saveValues.comment">
        </el-input>
        <div class="com_createRFI_comtainer_info_num">{{editReason.curNum}} / {{editReason.maxNum}}</div>
      </div>

      <div class="dl_form_item uploadFile_item clearfix">
        <span class="dl_form_name">Upload Attachment:</span>
        <el-upload
          ref="upload"
          class="upload_demo"
          :action="uploadUrl"
          :data="actionData"
          :on-preview="handlePreview"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :on-remove="handleRemoveUrl"
          :before-upload="uploadBefore"
          :limit="10">
          <el-button size="small" type="primary"><i class="el-icon-upload el-icon--left"></i>Upload File</el-button>
        </el-upload>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeRFI">Cancle</el-button>
      <el-button type="primary" @click="saveRFI">Save</el-button>
    </span>
  </el-dialog>
</div>
