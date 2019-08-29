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
        <div class="plus">
          <p style="margin-top:-6px;margin-left:2px;">+</p>
        </div>
        <div style="width:22px;box-sizing:border-box;">
          <img class="shoucang" src="../../../assets/images/o2o/收藏 (1)_wps图片.png"/>
        </div>
      </div>
    </div>
    <div style="margin-top:10px;padding:10px 15px;background-color: white;">
        <p style="font-size:14px;font-family:PingFangSC;font-weight:600;color:rgba(51,51,51,1);line-height:20px;">商品详情</p>
        <img style="width:100%;margin-top:10px;" src="../../../assets/images/o2o/timg.jpg" alt="">
    </div>
    <Footer />
  </div>
</template>

<script>
import ShowImg from "@/components/industry/showImg";
import Footer from "@/components/industry/footer";
export default {
  components: {
    ShowImg,
    Footer
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
  margin-top: 30px;
}
.plus {
  width: 20px;
  height: 20px;
  border: 1px solid #fdc21e;
  background-color: #fdc21e;
  border-radius: 50%;
  font-size: 22px;
  color: white;
}
</style>