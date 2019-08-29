<template>
  <div style="background:rgba(250, 250, 250, 1);height:1000px;">
    <ShowImg />
    <div class="commodity">
      <div>
        <p style="font-size:16px;font-weight:bold;font-family:PingFangSC;">15元小轿车快洗服务</p>
        <p style="margin-top:5px;font-size:12px;color:rgba(153,153,153,1);">商品简介描述</p>
        <p style="margin-top:10px;">
          <span style="font-size:20px;font-weight:bold;font-family:DIN;">￥15</span>
          <span style="font-size:12px;color:rgba(153,153,153,1);margin-left:10px;">已售200</span>
        </p>
      </div>
      <div>
        <p class="join">加入购物车</p>
        <div style="width:22px;box-sizing:border-box;">
          <img class="shoucang" src="../../../assets/images/o2o/收藏 (1)_wps图片.png" alt />
        </div>
      </div>
    </div>
    <div style="margin-top:10px;padding:10px 15px;box-sizing:border-box;background-color:white;">
      <p style="font-size:14px;font-family:PingFangSC;font-weight:600;color:rgba(51,51,51,1);line-height:20px;">服务须知</p>
      <p style="font-size:14px;font-family:PingFangSC;font-weight:400;color:rgba(153,153,153,1);line-height:20px;margin-top:10px;">有效期:</p>
      <p style="font-size:14px;font-family:PingFangSC;font-weight:400;color:rgba(51,51,51,1);line-height:20px;">购买后30天内有效</p>
      <p style="font-size:14px;font-family:PingFangSC;font-weight:400;color:rgba(153,153,153,1);line-height:20px;margin-top:10px;">预约信息:</p>
      <p style="font-size:14px;font-family:PingFangSC;font-weight:400;color:rgba(51,51,51,1);line-height:20px;">无需预约,消费高峰可能需要排队</p>
      <p style="font-size:14px;font-family:PingFangSC;font-weight:400;color:rgba(153,153,153,1);line-height:20px;margin-top:10px;">规则提醒:</p>
      <p style="font-size:14px;font-family:PingFangSC;font-weight:400;color:rgba(51,51,51,1);line-height:20px;">需当日一次性体验完毕所有项目</p>
      <p style="font-size:14px;font-family:PingFangSC;font-weight:400;color:rgba(51,51,51,1);line-height:20px;">不再与其他优惠同享</p>
      <p style="font-size:14px;font-family:PingFangSC;font-weight:400;color:rgba(153,153,153,1);line-height:20px;margin-top:10px;">商家服务:</p>
      <p style="font-size:14px;font-family:PingFangSC;font-weight:400;color:rgba(51,51,51,1);line-height:20px;">
        描述
      </p>
    </div>
    <Footer />
  </div>
</template>

<script>
import ShowImg from "@/components/industry/showImg";
import Footer from "@/components/industry/footer";
export default {
  components: {
    ShowImg,Footer
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
  margin: 0;
}
.commodity {
  padding: 10px 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  background-color: white;
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
.shoucang {
  width: 22px;
  height: 22px;
  margin-top: 25px;
  margin-left: 48px;
}
</style>