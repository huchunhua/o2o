<template>
    <div class="stand-order-detail">
        <van-nav-bar title="待提货订单" left-arrow fixed @click-left="$router.back()" v-if="tradeType == 1"/>
        <van-nav-bar title="待使用订单" left-arrow fixed @click-left="$router.back()" v-else-if="tradeType == 2"/>
        <div class="info-card">
          <p  v-if="tradeType == 2" class="text-blod">{{product[0].productName}}</p>
          <div  v-if="tradeType == 2" class="store-name">{{orderinfo.storeInfo.storeName}}</div>
          <div class="printOrder">           
             <barcode :value="orderinfo.tradePickNumber" :options="barcode_option" tag="svg" ></barcode>           
          </div>
          <div>
            <img src="../../../assets/images/o2o/ic_password.png">
            {{type == 1 ? '提货码：' : '服务码：'}}
            {{orderinfo.tradePickNumber}}
          </div>
          <van-row type="flex" justify="center" class="padding-sm">
            <van-col span="8" class='text-right'>
               <van-button type="default" @click="refund(orderinfo.tradeSn)">申请退款</van-button>
            </van-col>
            <van-col span="8" class='text-right'>
              <van-button type="default" @click="">再来一单</van-button>
            </van-col>
          </van-row>
          <p class="tips"  v-if="tradeType == 1" v-html="product[0].productDetail"></p>  
        </div>
        <div class="bg-white margin-bottom" v-if="tradeType == 1">
          <img src="../../../assets/images/o2o/map.jpg" style="width: 100%">
          <van-row type="flex" justify="space-between">
            <van-col span="12" class="padding-lrsm padding-topsm">
              <div class="text-grey">自取时间：</div>
              <div>{{orderinfo.tradeTakeTime}}</div>
            </van-col>
            <van-col span="8" class="padding-lrsm padding-topsm">
              <div class="text-grey">预留电话:</div>
              <div>{{orderinfo.TradeReservedPhone}}</div>
            </van-col>
          </van-row>
          <van-radio-group v-model="protocol" class="padding-sm">
            <van-radio name="1" checked-color="#FDC21E">同意<span class="text-blue">《到店自取服务协议》</span></van-radio>
          </van-radio-group>
        </div>
        <sellerInfo :order-info="orderinfo" :seller-info="sellerinfo" :product-info="product" :trade-type="tradeType" :coupon-name="couponName"></sellerInfo>
        <orderInfo :order-info="orderinfo"></orderInfo>
    </div>
</template>

<script>
  import sellerInfo from '@/components/seller-info'
  import orderInfo from '@/components/order-info'
    export default {
        name: "detail",
        components:{
          sellerInfo,
          orderInfo
        },
        data() {
          return {
            orderinfo:{
              storeInfo:{
                storeName:''
              }
            },
            product:[{
              productName:''
            }],
            protocol:'1',
            sellerinfo:{},
            tradeType:'', 
            couponName:'',
            barcode_option:{
              displayValue: false, //是否默认显示条形码数据
              //textPosition  :'top', //条形码数据显示的位置
              background: '#fff', //条形码背景颜色
              valid: function (valid) {
      //           console.log(valid)
              },
              width:'1px',//单个条形码的宽度
              height: '55px',
              fontSize: '22px' //字体大小
             }
          }
        },
        created() {
          let _this = this;
          let id = _this.$route.params.id;
          _this.tradeSn = id;
          _this.type = _this.$route.params.type;
          _this.$http.post('/industry/trade/tradeDetail',{tradeSn:id}).then(function (res) {
            _this.orderinfo = res;
            _this.sellerinfo = res.storeInfo;
            _this.product = res.product;
            _this.tradeType = res.tradeType;
            _this.couponName = res.couponInfo.couponName;
          }); 
        },
        methods:{
          refund(id){
            this.$router.push({ name: 'Refund', params: { id:id}})
          }, 
          confirm(){
            let _this = this;
            let reason = _this.couse;
            _this.$http.post('/industry/trade/refundMoney',{tradeSn:_this.tradeSn,refundContent:reason}).then(function (res) {
              _this.$toast("申请退款成功！")
            });
          }
        }              
    }
</script>

<style scoped>
	.stand-order-detail{
	    padding-top: 46px;
      font-size: 14px;
	}
	.bg-white{
		background:rgba(255,255,255,1);
	}
  .padding-sm{
    padding:15px;
  }  
  .padding-lrsm{
    padding:0 15px;
  }
  .padding-topsm{
    padding-top: 15px;
  }
  .margin-bottom{
    margin-bottom: 10px;
  }
  .text-red{
    font-size:14px;
    font-family:DIN-Medium;
    font-weight:500;
    color:rgba(235,80,59,1)
  }
  .text-grey{
    color:rgba(153,153,153,1);
  }
  .text-blue{
    color:#4A90E2;
  }
  .text-right{
    text-align: right;
  }
  .info-card{
    margin:15px;
    padding:15px;
    text-align: center;
    background-color: #fff;
    border-radius: 6px;
    position: relative;
  }
  .info-card::before,.info-card::after{
    content: '';
    width:20px;
    height: 20px;
    border-radius: 20px;
    position: absolute;
    left:-10px;
    top:90px;
    background-color: #ededed;
  }
  .info-card::after{
    left:auto;
    right:-10px;
  }
  .tips{
    height: 90px;
    overflow-y: scroll;
    margin:0;
  }
  .store-name{
    font-size:12px;
    font-family:PingFangSC;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
  .text-blod{
    font-family:PingFangSC;
    font-weight:600;
  }
  p{
    margin:25px 0 0;
  }
  .van-button{
    height: 30px;
    line-height: 30px;
  }
</style>