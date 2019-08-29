<template>
  <div class="showimg">
    <div class="return">
      <img style="width:14px;height:14px;" src="../../assets/images/o2o/返回 (5)_wps图片.png" />
    </div>
    <div class="right">
      <div class="button">
        <img style="width:14px;height:14px;" src="../../assets/images/o2o/客服_wps图片.png" />
      </div>
      <div class="button">
        <img style="width:14px;height:14px;" src="../../assets/images/o2o/分享_line_wps图片.png" />
      </div>
      <div class="button">
        <img style="width:14px;height:14px;" src="../../assets/images/o2o/更多_wps图片.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style scoped>
.showimg {
  width: 100%;
  height: 280px;
  background-image: url(../../assets/images/o2o/timg.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}
.return {
  background-color: rgba(0, 0, 0, 0.5);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
  box-sizing: border-box;
  margin-top: 10px;
}
.right {
  display: flex;
}
.button {
  background-color: rgba(0, 0, 0, 0.5);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  box-sizing: border-box;
  margin-top: 10px;
}
</style>