<template>
        <div class="seller-info bg-white padding-sm">
          <van-row type="flex" justify="space-between">
            <van-col span="14" class='text-blod'>{{sellerInfo.storeName}}</van-col>
            <van-col span="10" class="text-right text-yellow">
              <img src="../assets/images/o2o/ic_phone_small.png">
              联系商家
            </van-col>
          </van-row>
          <van-divider />
          <van-row type="flex" justify="space-between" v-if="tradeType == 1">
            <van-col span="6" class="btn-org">商品</van-col>
            <van-col span="6" class="text-right">
              到店自提
            </van-col>
          </van-row>          
          <van-row type="flex" justify="space-between" v-else-if="tradeType == 2">
            <van-col span="6" class="btn-org">服务</van-col>
            <van-col span="6" class="text-right">
              到店服务
            </van-col>
          </van-row>         
          <van-card
              :num="item.productNum"
              :price="item.productPrice"
              :title="item.productName"
              :thumb="item.productImage"
              v-for="item in productInfo"
              :key="item.productId"
          >
              <div slot="num">
                ￥{{item.productPrice}}
              </div>              
              <div slot="price">
                x {{item.productNum}}
              </div>
          </van-card>        
          <van-row type="flex" justify="space-between info-line" v-if="couponName">
            <van-col span="6" class="tit">店铺优惠券</van-col>
            <van-col span="10">{{couponName}}</van-col>
          </van-row>
          <van-row type="flex" justify="end" class="text-right goods-total">
            <van-col span="6">已优惠￥{{orderInfo.tradeDiscount}}</van-col>
            <van-col span="6">合计<span class="text-red">￥{{orderInfo.tradePayAmount}}</span></van-col>
          </van-row>
          <van-divider />
          <van-row type="flex" justify="space-between">
            <van-col span="6">备注信息</van-col>
            <van-col span="12" class="text-grey text-right">{{orderInfo.tradeRemark}}</van-col>
          </van-row>
        </div>
</template>

<script>
    export default {
        name: "seller-info",
        props: {
            orderInfo: {
              type: Object
            },             
            sellerInfo: {
              type: Object
            },            
            productInfo: {
              type: Array
            },
            tradeType:{
              type:String
            },
            couponName:{
              type:String
            }
        },
        data() {
            return {
            }
        },
        created() {
            let self = this;
        },
        // computed: {
        //   // 计算属性的 getter
        //   total: function () {
        //     // `this` 指向 vm 实例
        //     return 47
        //   }
        // },
        methods: {
            toUse(id){
                this.$router.push({ name: 'StandDetail', params: { id:id}})
            },              
            toDetail(id){
                this.$router.push({ name: 'OrderDetail', params: { id:id}})
            },         
            refundDetail(id){
                this.$router.push({ name: 'RefundDetail', params: { id:id}})
            }
        }
    }
</script>

<style scoped>
  .bg-white{
    background:rgba(255,255,255,1);
  }
  .padding-sm{
    padding:15px;
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
  .text-yellow{
    color:#FDC21E;
  }
  .text-right{
    text-align: right;
  }
  .btn-org{
    width:44px;
    height:22px;
    background:rgba(255,119,2,1);
    border-radius:2px;
    color:#fff;
    text-align: center;
    line-height: 22px;
    font-size: 12px;
  }
  .van-card{
    background-color: #fff;
    padding:5px 0;
  }
  .van-card__thumb{
    width: 50px;
    height: 50px;
  }
  .van-card__price{
    font-size:12px;
    font-family:PingFangSC;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
  .van-card__num{
    font-size:14px;
    font-family:DIN;
    font-weight:500;
    color:rgba(51,51,51,1);
  }
  .van-card__content{
    min-height: 50px;
  }
  .van-card__bottom{
    margin-top: 14px
  }
  .goods-total{
    font-size:12px;
    font-family:PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
  }
  .info-line{
    padding:5px 0;
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
    text-align: right;
  }
  .info-line .tit{
    color:rgba(51,51,51,1);
    text-align: left;
  }
  .text-blod{
    font-family:PingFangSC;
    font-weight:600;
  }
</style>