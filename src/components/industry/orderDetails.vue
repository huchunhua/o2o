<template>
  <div class="service">
    <div style="display:flex;">
      <div style="width:70px;height:70px;border-radius:4px;border:1px solid rgba(236,236,236,1);">
        <img style="width:70px;height:70px;border-radius:5px;" src="../../assets/images/o2o/pic_shanghu.png" alt />
      </div>
      <div>
        <p style="margin-left:10px;font-weight: bold;">农夫山泉</p>
        <p
          style="margin-left:10px;margin-top:30px;font-size:12px;font-weight:400;color:rgb(153,153,153);"
        >x2</p>
      </div>
    </div>
    <div style="display:flex;align-items:flex-end">
      <p class="join">￥4.5</p>
    </div>
  </div>
</template>

<script>
export default {
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
  margin-top: 10px;
}
.join {
  font-size: 14px;
  font-family: DIN;
  font-weight: 600;
  color: rgb(51, 51, 51);
  
}
</style>