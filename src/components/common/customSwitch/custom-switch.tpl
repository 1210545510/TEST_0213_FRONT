<div
  v-if="this.listData.length > 0"
  class="com_customSwitch_box"
  :style="{ width: width + 'px' }">
  <div class="com_customSwitch_item_wrap">
    <div
      class="com_customSwitch_item"
      @click="bindMethod(val, key)"
      :class="key === showActiveIndex ? 'com_customSwitch_item_focus' : ''"
      v-for="(val, key) in listData"
      :key="key">{{val}}</div>
  </div>
  <span
    class="com_customSwitch_tips"
    :style="{ width: showActiveItemWidth + 'px', left: showActiveIndex * showActiveItemWidth + 'px' }">
  </span>
</div>