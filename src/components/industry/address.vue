<template>
    <div class="shop">
      <div class="shopName">
        <div>
          <img style="width:62px;height:62px;" src="../../assets/images/o2o/pic_shanghu.png" alt />
        </div>
        <div style="margin-left:15px;">
          <p style="font-weight:bold;">大龙燚火锅</p>
          <div>
            <img
              style="width:14px;height:14px;"
              src="../../assets/images/o2o/收藏 (2)_wps图片.png"
              alt
            />
            <img
              style="width:14px;height:14px;"
              src="../../assets/images/o2o/收藏 (2)_wps图片.png"
              alt
            />
            <img
              style="width:14px;height:14px;"
              src="../../assets/images/o2o/收藏 (2)_wps图片.png"
              alt
            />
            <img
              style="width:14px;height:14px;"
              src="../../assets/images/o2o/收藏 (2)_wps图片.png"
              alt
            />
            <img
              style="width:14px;height:14px;"
              src="../../assets/images/o2o/收藏 (3)_wps图片.png"
              alt
            />
          </div>
          <p style="font-size:12px;color:#999999">时间：00:00-24:00</p>
        </div>
      </div>
      <div class="address">
        <div style="margin-top:10px;">
          <p style="font-size:14px;">地址：金牛区一环路</p>
          <p style="font-size:12px;color:#999999;margin-top:5px;">距离你当前位置1.2km</p>
        </div>
        <div style="display:flex;margin-top:10px;">
          <div style="padding-right:5px;border-right: 1px solid #ECECEC;">
            <img style="width:42px;height:36px;" src="../../assets/images/o2o/定位_03.jpg" alt />
          </div>
          <div style="padding-left:5px;">
            <img style="width:42px;height:34px;" src="../../assets/images/o2o/电话_03.jpg" alt />
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: Object,
      // default: 'hello world'
    }
  },
  data() {
    return {
    };
  },
  created() {},
  methods: {}
};
</script>

<style scoped>
p {
  margin: 0px;
}
.shop {
  width: 100%;
  height: 167px;
  padding-top: 35px;
  padding-left: 15px;
  padding-bottom: 10px;
  padding-right: 15px;
  box-sizing: border-box;
  background-color: white;
}
.shopName {
  display: flex;
  padding-right: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #FFECECEC;
}
.address{
  display: flex;
  justify-content: space-between;
}
</style>