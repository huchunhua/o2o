<template>
  <div class="coupon2">
    <div>
      <p style="font-size:16px;margin-left:-2px;font-weight:bold;margin-top:4px;">￥10</p>
      <p style="font-size:12px;margin-top:2px;">满100元可用</p>
      <p
        style="font-size:10px;color:#999999; -webkit-transform: scale(0.9);margin-left:-5px;margin-top:2px;"
      >除酒以外所有商品可用</p>
    </div>
    <div>
      <p style="width:15px;color:#FDC21E;font-size:12px;margin-left:-20px;margin-top:15px;">领取</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navInput: ""
    };
  },
  created() {},
  methods: {}
};
</script>

<style scoped>
.coupon2 {
  width: 162px;
  height: 63px;
  background-image: url(../../assets/images/o2o/bg_coupon_youhui.png);
  padding-left: 10px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  margin-right: 10px;
}
p {
  margin: 0;
}
</style>