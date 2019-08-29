<template>
  <div>
    <div class="footer">
      <div style="width:70%;background-color:#333333;display:flex;">
        <div style="margin-left:15px;margin-top:-6px;">
          <img @click="showPopup" src="../../assets/images/o2o/pic_box_color _wps图片.png" alt />
        </div>
        <span class="price">￥ 200</span>
        <div class="count">
          <p>3</p>
        </div>
      </div>
      <div @click="jumpOrder" class="payment">
        <p>去结算</p>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '35%' }">
      <div
        style="display:flex;justify-content:flex-end;margin:10px 10px;padding-bottom:10px;border-bottom:1px solid rgb(236,236,236);box-sizing:border-box;"
      >
        <img
          style="width:14px;height:14px;padding-right:5px;margin-top:2px;"
          src="../../assets/images/o2o/删除 (1)_wps图片.png"
          alt
        />
        <p style="font-size:12px;color:rgba(102,102,102,1);line-height:17px;">清空</p>
      </div>
      <div>
        <Goods />
      </div>
    </van-popup>
  </div>
</template>

<script>
import Goods from "@/components/industry/goods";
export default {
  components: {
    Goods
  },
  data() {
    return {
      show: false
    };
  },
  created() {},
  methods: {
    showPopup(item) {
      this.show = true;
    },
    jumpOrder(){
      this.$router.push("/industryOrder");
    }
  }
};
</script>

<style scoped>
p {
  margin: 0px;
}
.footer {
  width: 100%;
  height: 44px;
  background-color: #333333;
  position: fixed;
  bottom: 0;
  z-index: 3000;
  display: flex;
  justify-content: space-between;
}
.payment {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 44px;
  background-color: #fdc21e;
}
.price {
  color: white;
  font-weight: bold;
  margin-left: 15px;
  margin-top: 13px;
  font-size: 16px;
}
.count {
  width: 14px;
  height: 14px;
  border: 1px solid #eb503b;
  border-radius: 50%;
  color: white;
  background-color: #eb503b;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -17%;
  left: 13%;
}
</style>