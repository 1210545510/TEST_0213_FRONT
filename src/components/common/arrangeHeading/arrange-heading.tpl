<div class="com_arrangeHeading_box">
  <el-dialog
    title="Re-arrange Headings"
    :visible.sync="visibleArrangeHeading"
    :before-close="closeDialogArrangeHeading"
    width="30%">
    <div class="dialog_content clearfix">
      <div class="dialog_RerangeHeading_content fLeft">
        <el-checkbox-group v-model="getCheckedHeading">
          <el-checkbox
            v-for="(item, key) in getAllHeading"
            :label="item.value"
            :key="item.value"
            :disabled="isDisabled(item.value)"
            :class="item.isActive ? 'active' : ''">
            {{ item.value }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="RerangeHeading_move_box fRight">
        <span class="move_up_button move_button" @click="moveHeadingPosition($event)">
          <i class="move_up_icon"></i>
        </span>
        <span class="move_down_button move_button active" @click="moveHeadingPosition($event)">
          <i class="move_down_icon"></i>
        </span>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialogArrangeHeading">Cancle</el-button>
      <el-button type="primary" @click="confirmArrangeHeading">Save</el-button>
    </span>
  </el-dialog>
</div>
