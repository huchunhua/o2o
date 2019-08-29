<template>
  <div>
    <div style="background:white;">
      <img class="returnImg" src="../../../assets/images/o2o/返回 (1)_wps图片.png" alt />
      <span class="title">优惠券</span>
    </div>
    <div
      style="height:32px;background:RGB(254,248,232);display:flex;justify-content:space-between;padding:8px 15px;box-sizing:border-box;"
    >
      <div style="font-size:12px;color:rgb(235,80,59);">优途优惠券使用说明</div>
      <div style="margin-top:-2px;">
        <img
          style="width:22px;height:22px;"
          src="../../../assets/images/o2o/ic_arrow_r备份_wps图片.png"
        />
      </div>
    </div>
    <CouponTow />
  </div>
</template>

<script>
import CouponTow from "@/components/industry/couponTow";
export default {
  components: {
    CouponTow
  },
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
.returnImg {
  width: 19px;
  height: 19px;
  margin-top: 10px;
  margin-left: 20px;
}
.title {
  font-size: 18px;
  font-family: PingFangSC;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 25px;
  position: absolute;
  top: 6px;
  left: 42%;
}
</style>