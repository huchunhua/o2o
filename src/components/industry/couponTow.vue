<template>
  <div class="show">
    <div style="color:white;width:92px;">
      <div style="padding-top:20px;padding-left:28px;box-sizing:border-box;">
        <span style="font-size:14px;font-weight:bold;">￥</span>
        <span style="font-size:24px;">10</span>
      </div>
      <div style="font-size:12px;padding-top5px;padding-left:20px;width:100%;">满50元可用</div>
    </div>
    <div style="padding-top:13px;">
        <div style="border-bottom: 1px dashed rgb(236,236,236);width:253px;padding-bottom:10px;">
            <p style="font-size:14px;font-weight:600;padding-left:20px;">店铺满减红包</p>
            <p style="font-size:12px;color:rgba(153,153,153,1);padding-top:2px;padding-left:20px;">有效期至2019.08.31</p>
        </div>
        <p style="font-size:12px;color:rgba(153,153,153,1);padding-top:7px;padding-left:20px;">除酒水外所有商品可用</p>
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
p {
  margin: 0px;
}
.show {
  height: 100px;
  background-image: url(../../assets/images/o2o/bg_coupon_yellow.png);
  margin: 8px 15px;
  box-sizing: border-box;
  display: flex;
  
}
</style>