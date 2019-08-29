<template>
  <div>
    <div v-for="item in fuwuData" :key="item.productId" class="service">
      <div style="display:flex;">
        <div style="width:70px;height:70px;border-radius:4px;border:1px solid rgba(236,236,236,1);">
          <img style="width:70px;height:70px;" src="../../assets/images/o2o/pic_shanghu.png" alt />
        </div>
        <div>
          <p style="margin-left:10px;font-weight: bold;">{{item.productName}}</p>
          <p style="color:#FF9999;margin-left:10px;font-size:12px;margin-top:2px;">服务描述</p>
          <p style="margin-left:10px;margin-top:13px;font-weight: bold;">￥{{item.productPrice}}</p>
        </div>
      </div>
      <div style="display:flex;align-items:flex-end">
        <p class="join">加入购物车</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fuwuData: {
      type: Array,
      default: ["hello,word"]
    }
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
.service {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.join {
  width: 66px;
  height: 22px;
  background-color: #fdc21e;
  border-radius: 15px;
  font-size: 12px;
  padding-left: 6px;
  padding-top: 5px;
}
</style>