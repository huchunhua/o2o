<template>
  <div style="background:rgba(250, 250, 250, 1);">
    <div style="background:white;">
      <img
        @click="jumpCommodity"
        class="returnImg"
        src="../../../assets/images/o2o/返回 (1)_wps图片.png"
        alt
      />
      <span class="title">提交订单</span>
    </div>
    <div
      style="padding-left:15px;padding-right:15px;width:100%;height:260px;box-sizing:border-box;background:white;padding-top:20px;"
    >
      <p
        style="font-size:16px;font-family:PingFangSC;font-weight:600;color:rgba(51,51,51,1);line-height:22px;"
      >{{orderData.store.storeAddress}}</p>
      <div class="map" style="height:120px;border-radius:10px;">
        <el-amap
          class="amap-box"
          style="border-radius:10px;"
          vid="amapDemo"
          :zoom="zoom"
          :center="center"
          :plugin="plugin"
        >
          <!-- 标记点 -->
          <el-amap-marker :position="center" vid="marker"></el-amap-marker>
        </el-amap>
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:10px;">
        <div>
          <p style="font-size:14px;font-weight:400;color:rgba(153,153,153,1);">自取时间</p>
          <div style="display:flex;">
            <p style="font-size:14px;font-weight:600;margin-top:2px;">12:00</p>
            <img
              style="width:22px;height:22px;"
              src="../../../assets/images/o2o/ic_arrow_r备份_wps图片.png"
            />
          </div>
        </div>
        <div>
          <p style="font-size:14px;font-weight:400;color:rgba(153,153,153,1);">预留电话</p>
          <div class="obtain">
            <input v-model="value" class="phone" type="text" size="11" />
            <img
              style="width:22px;height:22px;"
              src="../../../assets/images/o2o/ic_arrow_r备份_wps图片.png"
            />
          </div>
        </div>
      </div>
      <div style="display:flex;margin-top:5px;">
        <div>
          <img style="width:18px;height:18px;" src="../../../assets/images/o2o/圈钩_wps图片.png" alt />
        </div>
        <p style="font-size:12px;color:rgb(153, 153, 153);margin-left:3px;">同意</p>
        <p style="font-size:12px;color:rgb(77, 146, 227)">《到店自取服务协议》</p>
      </div>
    </div>
    <div class="orderDetails">
      <p
        style="font-size:14px;font-weight:600;color:rgb(51,51,51);margin-bottom:10px;"
      >{{this.productAll.storeName}}</p>
      <div class="show">
        <div style="margin-top:10px;display:flex;justify-content:space-between;">
          <div class="goods">
            <p style="margin-top:2px;font-weight:600;">商品</p>
          </div>
          <p style="font-size:12px;font-weight:400;">到店自提</p>
        </div>
        <!-- 商品详情 -->
        <div v-for="item in product" :key="item.productId" class="service">
          <div style="display:flex;">
            <div
              style="width:70px;height:70px;border-radius:4px;border:1px solid rgba(236,236,236,1);"
            >
              <img style="width:70px;height:70px;border-radius:5px;" :src="item.productImage" alt />
            </div>
            <div>
              <p style="margin-left:10px;font-weight: bold;">{{item.productName}}</p>
              <p
                style="margin-left:10px;margin-top:30px;font-size:12px;font-weight:400;color:rgb(153,153,153);"
              >x{{item.productNum}}</p>
            </div>
          </div>
          <div style="display:flex;align-items:flex-end">
            <p class="join">￥{{item.productPrice}}</p>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:10px;">
          <div style="font-size:12px;font-weight:400;color:rgba(51,51,51,1);line-height:17px;">平台优惠券</div>
          <div style="display:flex;">
            <p style="font-size:12px;font-weight:400;color:rgba(153,153,153,1);">1张可用</p>
            <p style="margin-top:-3px;">
              <img
                style="width:22px;height:22px;"
                src="../../../assets/images/o2o/ic_arrow_r备份_wps图片.png"
              />
            </p>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:10px;">
          <div style="font-size:12px;font-weight:400;color:rgba(51,51,51,1);line-height:17px;">店铺优惠券</div>
          <div style="display:flex;">
            <p style="font-size:12px;font-weight:400;color:rgba(153,153,153,1);">新店下单立减1元</p>
            <p style="margin-top:-3px;">
              <img
                style="width:22px;height:22px;"
                src="../../../assets/images/o2o/ic_arrow_r备份_wps图片.png"
              />
            </p>
          </div>
        </div>
        <div style="display:flex;justify-content:flex-end;margin-top:5px;">
          <p style="font-size:12px;font-weight:400;margin-right:5px;">已优惠</p>
          <p style="font-size:12px;font-weight:400;margin-right:20px;">￥1</p>
          <p style="font-size:12px;font-weight:400;margin-right:5px;">合计</p>
          <p
            style="font-size:14px;font-family:DIN;font-weight:500;color:rgba(235,80,59,1);"
          >￥{{product[0].productTotal}}</p>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:10px;">
          <div style="font-size:12px;font-weight:400;color:rgba(51,51,51,1);line-height:17px;">备注信息</div>
          <div @click="beizhu" style="display:flex;">
            <p style="font-size:12px;font-weight:400;color:rgb(153,153,153);">填写</p>
            <p style="margin-top:-3px;">
              <img
                style="width:22px;height:22px;"
                src="../../../assets/images/o2o/ic_arrow_r备份_wps图片.png"
              />
            </p>
          </div>
        </div>
      </div>
      <div class="show">
        <div style="margin-top:10px;display:flex;justify-content:space-between;">
          <div class="goodsTow">
            <p style="margin-top:2px;font-weight:600;">服务</p>
          </div>
          <p style="font-size:12px;font-weight:400;">到店服务</p>
        </div>
        <!-- 详情 -->
        <div v-for="item in product" :key="item.productId" class="service">
          <div style="display:flex;">
            <div
              style="width:70px;height:70px;border-radius:4px;border:1px solid rgba(236,236,236,1);"
            >
              <img style="width:70px;height:70px;border-radius:5px;" :src="item.productImage" alt />
            </div>
            <div>
              <p style="margin-left:10px;font-weight: bold;">{{item.productName}}</p>
              <p
                style="margin-left:10px;margin-top:30px;font-size:12px;font-weight:400;color:rgb(153,153,153);"
              >x{{item.productNum}}</p>
            </div>
          </div>
          <div style="display:flex;align-items:flex-end">
            <p class="join">￥{{item.productPrice}}</p>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:10px;">
          <div style="font-size:12px;font-weight:400;color:rgba(51,51,51,1);line-height:17px;">平台优惠券</div>
          <div style="display:flex;">
            <p style="font-size:12px;font-weight:400;color:rgba(153,153,153,1);">1张可用</p>
            <p style="margin-top:-3px;">
              <img
                style="width:22px;height:22px;"
                src="../../../assets/images/o2o/ic_arrow_r备份_wps图片.png"
              />
            </p>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:10px;">
          <div style="font-size:12px;font-weight:400;color:rgba(51,51,51,1);line-height:17px;">店铺优惠券</div>
          <div style="display:flex;">
            <p style="font-size:12px;font-weight:400;color:rgba(153,153,153,1);">新店下单立减1元</p>
            <p style="margin-top:-3px;">
              <img
                style="width:22px;height:22px;"
                src="../../../assets/images/o2o/ic_arrow_r备份_wps图片.png"
              />
            </p>
          </div>
        </div>
        <div style="display:flex;justify-content:flex-end;margin-top:5px;">
          <p style="font-size:12px;font-weight:400;margin-right:5px;">已优惠</p>
          <p style="font-size:12px;font-weight:400;margin-right:20px;">￥1</p>
          <p style="font-size:12px;font-weight:400;margin-right:5px;">合计</p>
          <p style="font-size:14px;font-family:DIN;font-weight:500;color:rgba(235,80,59,1);">￥</p>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:10px;">
          <div style="font-size:12px;font-weight:400;color:rgba(51,51,51,1);line-height:17px;">备注信息</div>
          <div @click="beizhu" style="display:flex;">
            <p style="font-size:12px;font-weight:400;color:rgba(153,153,153,1);">填写</p>
            <p style="margin-top:-3px;">
              <img
                style="width:22px;height:22px;"
                src="../../../assets/images/o2o/ic_arrow_r备份_wps图片.png"
              />
            </p>
          </div>
        </div>
      </div>
      <div style="border-top: 1px solid rgb(236, 236, 236);height:40px;padding-top:10px;">
        <div style="display:flex;justify-content:flex-end;margin-top:5px;">
          <p style="font-size:14px;font-weight:400;margin-right:5px;">已优惠</p>
          <p style="font-size:14px;font-weight:400;margin-right:20px;">￥1</p>
          <p style="font-size:14px;font-weight:400;margin-right:5px;">合计</p>
          <p
            style="font-size:14px;font-family:DIN;font-weight:500;color:rgba(235,80,59,1);"
          >￥{{product[0].productTotal}}</p>
        </div>
      </div>
    </div>
    <div
      style="margin-top:10px;background:white;height:40px;padding-top:3px;padding-left:15px;padding-right:15px;box-sizing:border-box"
    >
      <div style="display:flex;justify-content:space-between;margin-top:10px;">
        <div style="font-size:14px;font-weight:400;color:rgba(51,51,51,1);line-height:17px;">发票</div>
        <div style="display:flex;">
          <p style="font-size:14px;font-weight:400;color:rgba(153,153,153,1);">未选择</p>
          <p style="margin-top:-2px;">
            <img
              style="width:22px;height:22px;"
              src="../../../assets/images/o2o/ic_arrow_r备份_wps图片.png"
            />
          </p>
        </div>
      </div>
    </div>
    <div class="footer">
      <div style="width:70%;background-color:#333333;display:flex;">
        <span class="price">￥ {{this.productAll.tradePayAmount}}</span>
        <span
          style="font-size:12px;font-weight:400;color:rgb(153,153,153);margin-left:15px;margin-top:16px;"
        >已优惠￥{{orderDetails.tradeDiscount}}</span>
      </div>
      <div @click="payment" class="payment">
        <p>提交订单</p>
      </div>
    </div>
    <!-- 备注信息弹出层 -->
    <van-popup v-model="show" position="right" :style="{ width:'100%', height: '100%' }">
      <div style="background:white;">
        <img
          @click="returnOrder"
          class="returnImg"
          src="../../../assets/images/o2o/返回 (1)_wps图片.png"
          alt
        />
        <span class="title">备注信息</span>
        <span style="font-size:14px;;position: absolute;top:10px;left:87%;">完成</span>
      </div>
      <div style="padding:20px 15px;box-sizing:border-box">
        <van-cell-group>
          <van-field
            maxlength="50"
            @input="length"
            style="height:100px;background:RGB(247,247,247)"
            v-model="beizhuvalue"
            type="textarea"
            placeholder="请输入备注信息"
          />
        </van-cell-group>
        <span class="zishu">{{beizhuLength}}/50</span>
      </div>
    </van-popup>
    <div style="height:44px;"></div>
  </div>
</template>

<script>
import axios from "axios";
import OrderDetails from "@/components/industry/orderDetails";
export default {
  components: {
    OrderDetails
  },
  data() {
    let self = this;
    return {
      show: false,
      beizhuvalue: "",
      value: "",
      beizhuLength: 0,
      zoom: 14,
      center: [104.056449, 30.581542], //圆心位置
      radius: 200, //圆半径，单位:米
      loaded: false,
      plugin: [
        {
          pName: "Geolocation",
          showMarker: false,
          events: {
            init(o) {
              //定位成功 自动将marker和circle移到定位点
              o.getCurrentPosition((status, result) => {
                console.log(result);
                if (result && result.position) {
                  self.center = [result.position.lng, result.position.lat];
                  self.loaded = true;
                } else {
                  console.log(`定位失败`);
                }
              });
              console.log(o);
            }
          }
        }
      ],
      product: [
        {
          productId: "productId1",
          productImage:
            "http://sichuan.95504.net/v4/upload/cardimg/20190815/84590ffaed029d1af027579496183faf.jpeg",
          productName: "商品名称1",
          productNum: 7,
          productPrice: "100.50",
          productTotal: ""
        }
      ],
      productAll: {
        tradePayAmount: "",
        storeName: ""
      },
      orderDetails: {
        tradeDiscount: "",
        storeInfo: {
          storeAddress: ""
        }
      },
      cartKey: "",
      orderData: {
        store: {}
      },
      prepayId: ""
    };
  },
  created() {
    this.cartKey = this.$route.params.cartKey;
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      await axios
        .post("/industry/trade/confirm", {
          cartKey: this.cartKey
        })
        .then(res => {
          Object.assign(this.orderData, res);
        });
      console.log(this.orderData);
      await axios
        .post("/industry/trade/tradeList", {
          state: 10
        })
        .then(res => {
          Object.assign(this.productAll, res[0]);
        });
      await axios
        .post("/industry/trade/tradeDetail", {
          tradeSn: this.productAll.tradeSn
        })
        .then(res => {
          const { product } = res;
          Object.assign(this.orderDetails, res);
          Object.assign(this.product, product);
          this.center[0] = res.storeInfo.storeLongitude;
          this.center[1] = res.storeInfo.storeLatitude;
        });
    },
    async payment() {
      await axios
        .post("/industry/trade/create", {
          key: this.orderData.key,
          remark: "",
          takeTime: "2019-9-1",
          reservedPhone: 18781004589,
          cartKey: this.cartKey
        })
        .then(res => {
          this.prepayId = res.prepayId;
        });
      // console.log(this.orderData.price.total)
      this.$utoo.pay.cashier(this.prepayId, this.orderData.price.total);
    },
    jumpCommodity() {
      this.$router.push("/industry");
    },
    beizhu() {
      this.show = true;
    },
    returnOrder() {
      this.show = false;
    },
    length() {
      this.beizhuLength = this.beizhuvalue.length;
    }
  }
};
</script>

<style scoped>
p {
  margin: 0;
}
.returnImg {
  width: 19px;
  height: 19px;
  margin-top: 10px;
  margin-left: 15px;
}
.title {
  font-size: 18px;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 25px;
  position: absolute;
  top: 6px;
  left: 42%;
}
#container {
  width: 100%;
  height: 120px;
}
.map >>> .el-vue-amap {
  height: 100%;
  border-radius: 10px;
  margin-top: 10px;
}
.phone {
  display: inline-block;
  height: 15px;
  border: 1px solid rgba(153, 153, 153, 0.2);
  border-radius: 10px;
  padding-left: 4px;
}
.obtain {
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  display: flex;
  margin-top: 2px;
}
.orderDetails {
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;
  box-sizing: border-box;
  background: white;
  padding-top: 10px;
  margin-top: 10px;
}
.show {
  border-top: 1px solid rgb(236, 236, 236);
}
.goods {
  width: 44px;
  height: 22px;
  background: rgba(253, 194, 30, 1);
  border-radius: 2px;
  font-size: 12px;
  color: white;
  display: flex;
  justify-content: center;
  align-content: center;
}
.goodsTow {
  width: 44px;
  height: 22px;
  background: rgba(255, 119, 2, 1);
  border-radius: 2px;
  font-size: 12px;
  color: white;
  display: flex;
  justify-content: center;
  align-content: center;
}
.footer {
  width: 100%;
  height: 44px;
  background-color: #333333;
  position: fixed;
  bottom: 0;
  z-index: 10;
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
.zishu {
  font-size: 12px;
  color: rgb(153, 153, 153);
  position: absolute;
  top: 17%;
  left: 88%;
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