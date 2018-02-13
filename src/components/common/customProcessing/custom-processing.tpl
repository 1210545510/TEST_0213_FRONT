<div class="com_customProcessing_box">
  <div class="com_customProcessing_title" @click="showContainer"><i class="el-icon-edit-outline"></i>{{showTxt.title}}</div>
  <div v-show="isShow" class="com_customProcessing_comtainer">
    <span class="el-icon-close" @click="hideContainer"></span>
    <div class="com_customProcessing_comtainer_head">
      <span>{{showTxt.title}}</span>
    </div>


    <div class="com_customProcessing_comtainer_tips clearfix">
      <span v-if="roleId === '10042' || roleId === '10044' ">
        <span>Dispositon :&nbsp;&nbsp;</span>
        <el-radio-group
          v-model="sendData.result">
          <el-radio name="Escalate" label="Escalate">Escalate</el-radio>
          <el-radio name="Waive" label="Waive">Waive</el-radio>
        </el-radio-group>
      </span>

      <span v-if="roleId === '10045' ">
        <span>Dispositon :&nbsp;&nbsp;</span>
        <el-radio-group
          v-model="sendData.result">
          <el-radio name="SAR" label="SAR">SAR</el-radio>
          <el-radio name="Reasonable" label="Reasonable">Reasonable</el-radio>
        </el-radio-group>
      </span>

      <el-button
        v-if="roleId === '10041' || roleId === '10043' || roleId === '10046' "
        class="rItem"
        @click="getSoreInfo"
        size="small">Analyst Score</el-button>

      <!-- <a
        v-if="roleId === '10045'"
        class="rItem"
        href="/#/SARReport/home"
        target="_blank">
        <el-button size="small">SAR DRAFT Generation</el-button>
      </a> -->
      <router-link
        class="rItem"
        tag="a" target="_blank"
        v-if="roleId === '10045'"
        :to="{ path: '/SARReport/home', query: { caseId: caseId }}">
        <el-button size="small">SAR DRAFT Generation</el-button>
      </router-link>

      <a
        v-if="roleId === '10046'"
        class="rItem"
        href="/#/SARReport/home"
        target="_blank">
        <el-button size="small">Modify SAR Draft </el-button>
      </a>
    </div>

    <div class="com_customProcessing_comtainer_info clearfix">
      <div class="com_customProcessing_comtainer_info_left">
        <el-input
          class="com_customProcessing_comtainer_info_edit"
          type="textarea"
          :maxlength="5000"
          ref="monitorInput"
          @input="monitorInputLen"
          placeholder="input..."
          v-model="sendData.content">
        </el-input>
        <div class="com_customProcessing_comtainer_info_num">{{edit.curNum}} /（{{edit.minNum}}-{{edit.maxNum}}）</div>
      </div>
      <div class="com_customProcessing_comtainer_info_right">
        <el-upload
          class="uploadFileBrn"
          ref="upload"
          name="files"
          :show-file-list="false"
          :action="uploadUrl"
          :data="uploadData"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :before-upload="uploadBefore">
          <el-button class="com_customProcessing_comtainer_info_uploadFile" size="small" type="primary">Upload File</el-button>
        </el-upload>

        <div class="files">
          <p
            :class="checkFileType(item.fileName)"
            :key="key"
            v-for="(item, key) in sendData.files">
            <a :href="item.filePath" target="_blank">{{ item.fileName }}</a>
            <span class="t c" @click="uploadRemoveFile(key)"><i class="el-icon-error"></i></span>
            <!--<a class="t s" href="#"><i class="el-icon-success"></i>View the results</a>-->
            <!--<a class="t e" href="#"><i class="el-icon-error"></i>View the results</a>-->
          </p>
        </div>
      </div>
    </div>

    <div class="com_customProcessing_comtainer_btn clearfix">
      <el-button size="small" type="success" @click="save">Save</el-button>

      <el-button
        v-if="roleId === '10042' || roleId === '10044' || roleId === '10045' || roleId === '10049'"
        class="rItem"
        size="small"
        type="success"
        @click="submit">Submit</el-button>
      <el-button
        v-if="roleId === '10041' || roleId === '10043' || roleId === '10046' || roleId === '10047' || roleId === '10048'"
        class="rItem"
        size="small"
        type="success"
        @click="agree">Agree</el-button>
      <el-button
        v-if="roleId === '10041' || roleId === '10043' || roleId === '10046' || roleId === '10047' || roleId === '10048'"
        class="rItem"
        size="small"
        type="danger"
        @click="disagree">Disagree</el-button>
    </div>

  </div>
  <div v-show="isShow" class="com_customProcessing_mask" @click="hideContainer"></div>

  <!-- 评分弹框 -->
  <el-dialog
    v-if="roleId && showTxt.score"
    title="Quality Assurance"
    width="80%"
    :modal-append-to-body=false
    :visible.sync="danalystSoreDialog.visible">
    <table class="com_customProcessing_dialogTable">
      <tr>
        <th class="row1">#</th>
        <th class="row2">{{ showTxt.score.row2 }}</th>
        <th class="row3">{{ showTxt.score.row3 }}</th>
        <th class="row4">{{ showTxt.score.row4 }}</th>
        <th class="row5">{{ showTxt.score.row5 }}</th>
        <th class="row6">{{ showTxt.score.row6 }}</th>
      </tr>
      <tr>
        <td class="row1">1</td>
        <td class="row2">{{ showTxt.score.tit1 }}</td>
        <td class="row3">
          <el-input
            type="textarea"
            placeholder="input..."
            :maxlength="1000"
            v-model="scoreData.organizedWritten.sarItem">
          </el-input>
        <td class="row4">
          <el-input
            type="textarea"
            placeholder="input..."
            :maxlength="1000"
            v-model="scoreData.organizedWritten.actionRequired">
          </el-input>
        </td>
        <td class="row5">
          <el-input
            type="textarea"
            placeholder="input..."
            :maxlength="1000"
            v-model="scoreData.organizedWritten.actionToken">
          </el-input>
        </td>
        <td class="row6">
          <el-radio-group v-model="scoreData.organizedWritten.corrected">
            <el-radio label="Y">Y</el-radio>
            <el-radio label="N">N</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td class="row1">2</td>
        <td class="row2">{{ showTxt.score.tit2 }}</td>
        <td class="row3">
          <el-input
            type="textarea"
            placeholder="input..."
            :maxlength="1000"
            v-model="scoreData.accuratelyAppropriately.sarItem">
          </el-input>
        <td class="row4">
          <el-input
            type="textarea"
            placeholder="input..."
            :maxlength="1000"
            v-model="scoreData.accuratelyAppropriately.actionRequired">
          </el-input>
        </td>
        <td class="row5">
          <el-input
            type="textarea"
            placeholder="input..."
            :maxlength="1000"
            v-model="scoreData.accuratelyAppropriately.actionToken">
          </el-input>
        </td>
        <td class="row6">
          <el-radio-group v-model="scoreData.accuratelyAppropriately.corrected">
            <el-radio label="Y">Y</el-radio>
            <el-radio label="N">N</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td class="row1">3</td>
        <td class="row2">{{ showTxt.score.tit3 }}</td>
        <td class="row3">
          <el-input
            type="textarea"
            placeholder="input..."
            :maxlength="1000"
            v-model="scoreData.grammarSpelling.sarItem">
          </el-input>
        <td class="row4">
          <el-input
            type="textarea"
            placeholder="input..."
            :maxlength="1000"
            v-model="scoreData.grammarSpelling.actionRequired">
          </el-input>
        </td>
        <td class="row5">
          <el-input
            type="textarea"
            placeholder="input..."
            :maxlength="1000"
            v-model="scoreData.grammarSpelling.actionToken">
          </el-input>
        </td>
        <td class="row6">
          <el-radio-group v-model="scoreData.grammarSpelling.corrected">
            <el-radio label="Y">Y</el-radio>
            <el-radio label="N">N</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td class="row1">4</td>
        <td class="row2">{{ showTxt.score.tit4 }}</td>
        <td class="row3">
          <el-input
            type="textarea"
            placeholder="input..."
            :maxlength="1000"
            v-model="scoreData.otherIssues.sarItem">
          </el-input>
        <td class="row4">
          <el-input
            type="textarea"
            placeholder="input..."
            :maxlength="1000"
            v-model="scoreData.otherIssues.actionRequired">
          </el-input>
        </td>
        <td class="row5">
          <el-input
            type="textarea"
            placeholder="input..."
            :maxlength="1000"
            v-model="scoreData.otherIssues.actionToken">
          </el-input>
        </td>
        <td class="row6">
          <el-radio-group v-model="scoreData.otherIssues.corrected">
            <el-radio label="Y">Y</el-radio>
            <el-radio label="N">N</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td class="row1">5</td>
        <td class="row2">{{ showTxt.score.tit5 }}</td>
        <td class="row3" colspan="4">
          <el-radio-group v-model="scoreData.grade">
            <el-radio :label="1">{{ showTxt.score.tit5Dec1 }}</el-radio>
            <el-radio :label="2">{{ showTxt.score.tit5Dec2 }}</el-radio>
            <el-radio :label="3">{{ showTxt.score.tit5Dec3 }}</el-radio>
            <el-radio :label="4">{{ showTxt.score.tit5Dec4 }}</el-radio>
          </el-radio-group>
        </td>
      </tr>
    </table>

    <div slot="footer" class="dialog-footer">
      <el-button @click="danalystSoreDialog.visible = false">Cancel</el-button>
      <el-button type="primary" @click="soreSaveTips">Save</el-button>
    </div>
  </el-dialog>

  <el-dialog
    width="30%"
    title="Note"
    :modal-append-to-body=false
    :visible.sync="danalystSoreDialog.innerVisible">
    <p><i style="color:#eb9e05" class="el-icon-warning"></i>&nbsp;&nbsp;You are sure to save it?</p>
    <div slot="footer" class="dialog-footer">
      <el-button @click="danalystSoreDialog.innerVisible = false">NO</el-button>
      <el-button type="primary" @click="soreSave">Yes</el-button>
    </div>
  </el-dialog>


</div>
