<template>
    <div>
        <div class="order-item bg-white padding-sm margin-bsm cf" v-for="order in orderInfo">
           <van-row type="flex" justify="space-between" class="padding-sm border-bottom">
             <van-col span="16">
               <van-row>
                  <van-col span="8" class="store-name">{{order.storeName}}</van-col>
                  <van-col span="8" class="store-detail"><van-icon name="arrow" /></van-col>
               </van-row>
             </van-col>
             <van-col span="6" class="order-status text-right" v-if="order.tradeState == 0">已取消</van-col>
             <van-col span="6" class="order-status text-right" v-else-if="order.tradeState == 10">待付款</van-col>
             <van-col span="6" class="order-status text-right" v-else-if="order.tradeState == 20 & order.tradeType == 1">待提货</van-col>
             <van-col span="6" class="order-status text-right" v-else-if="order.tradeState == 20 & order.tradeType == 2">待使用</van-col>
             <van-col span="6" class="order-status text-right" v-else-if="order.tradeState == 30 & order.tradeType == 1">已提货</van-col>
             <van-col span="6" class="order-status text-right" v-else-if="order.tradeState == 30 & order.tradeType == 2">已核验</van-col>
             <van-col span="6" class="order-status text-right" v-else-if="order.tradeState == 40">交易结束</van-col>
             <van-col span="6" class="order-status text-right" v-else-if="order.tradeState == 45">退款中</van-col>
             <van-col span="6" class="order-status text-right" v-else-if="order.tradeState == 50">售后服务中</van-col>
           </van-row>
           <van-card
              :title="item.productName"
              :thumb="item.productImage"
              v-for="item in order.product"
              :key="item.productId"
            >
              <div slot="num">
                ￥{{item.productPrice}}
              </div>              
              <div slot="price">
                x {{item.productNum}}
              </div>
            </van-card>
            <van-row type="flex" justify="end" class="padding-sm goods-total">
              <van-col span="6">共{{order.product.length}}件商品</van-col>
              <van-col span="10" class="text-right">合计：<span class="text-red">￥{{order.tradePayAmount}}</span></van-col>
            </van-row>
            <van-divider />
            <van-row type="flex" justify="space-between">
              <van-col span="8" v-if="order.tradeState == 20" class='margin-topsm'>
                {{order.tradeType === 2 ? '服务码：' : '提货码：'}}
                <span class="text-red">{{order.tradePickNumber}}</span>
              </van-col>
              <van-col span="24" v-if='order.tradeState == 20 & order.tradeType == 2' class="text-right margin-topsm">
                  <span class="text-grey">有效期：{{order.productForceTime}}至{{order.productExpiredTime}}</span>
              </van-col>
            </van-row>
            <div class="btn-wrap fr"  v-if="order.tradeState == 10">
              <van-button type="default">立即支付</van-button>
              <van-button type="default"  @click="choiceCouse(order.tradeSn)">取消订单</van-button>
            </div>               
            <div class="btn-wrap fr" v-else-if="order.tradeState == 20">
              <van-button type="default">再来一单</van-button>
              <van-button type="default" @click="toUse(order.tradeSn,order.tradeType)">查看</van-button>
            </div>   
            <div  v-else-if="order.tradeState == 45">
              <div class='couse'>
                退款原因：{{order.refundContent}}
              </div>
              <div class="btn-wrap fr">
                <van-button type="default" @click="refundDetail(order.tradeSn)">查看</van-button>
              </div>                
            </div>                     
            <div class="btn-wrap fr" v-else-if="order.tradeState == 0 || order.tradeState == 30 || order.tradeState == 40 || order.tradeState == 50">
              <van-button type="default" @click="toDetail(order.tradeSn)">查看</van-button>
            </div>                 
            <div type="flex" justify="end" class="padding-sm text-grey" v-else-if="order.tradeState == 0 || order.tradeState == 30 || order.tradeState == 40 || order.tradeState == 50">
                <van-row type="flex" justify="end">
                  <van-col span="8" class='text-right'>
                    <van-button type="default" @click="toDetail(order.tradeSn)">查看</van-button>
                  </van-col>
                </van-row>               
            </div>
             <van-dialog
              v-model="show"
              title="取消原因"
              show-cancel-button
              @confirm="confirm"
              >
              <van-radio-group v-model="couse">
                <van-cell-group>
                  <van-cell title="订单信息拍错" clickable @click="couse = '订单信息拍错'">
                    <van-radio slot="right-icon" name="订单信息拍错" checked-color="#FDC21E"/>
                  </van-cell>
                  <van-cell title="我不想要了" clickable @click="couse = '我不想要了'">
                    <van-radio slot="right-icon" name="我不想要了" checked-color="#FDC21E"/>
                  </van-cell>            
                  <van-cell title="地址填写错误" clickable @click="couse = '地址填写错误'">
                    <van-radio slot="right-icon" name="地址填写错误" checked-color="#FDC21E"/>
                  </van-cell>            
                  <van-cell title="缺货" clickable @click="couse = '缺货'">
                    <van-radio slot="right-icon" name="缺货" checked-color="#FDC21E"/>
                  </van-cell>            
                  <van-cell title="其他" clickable @click="couse = '其他'">
                    <van-radio slot="right-icon" name="其他" checked-color="#FDC21E"/>
                  </van-cell>
                </van-cell-group>
              </van-radio-group>
            </van-dialog>
        </div>         
    </div>
</template>

<script>
    export default {
        name: "order-item",
        props: {
            orderInfo: {
              type: Array
            }
        },
        data() {
            return {
              show: false,
              couse:''
            }
        },
        created() {
            let self = this;
        },
        methods: {
            choiceCouse(id){
              const _this = this;
              _this.show = true;
              _this.cancenid = id;
            },
            confirm(){
              let _this = this;
              let reason = _this.couse;
              _this.$http.post('/industry/trade/cancelOrder',{tradeSn:_this.cancenid,reason:reason}).then(function (res) {
                _this.$toast("取消订单成功！");
                _this.$emit('updateLists')
              });
            },
            toUse(id,type){
                this.$router.push({ name: 'StandDetail', params: { id:id,type:type}})
            },              
            toDetail(id){
                this.$router.push({ name: 'OrderDetail', params: { id:id}})
            },         
            refundDetail(id){
                this.$router.push({ name: 'RefundDetail', params: { id:id}})
            },

        }
    }
</script>

<style scoped>
    .cf::after, .cf::before {
      content: " ";
      display: table;
    }

    .cf::after {
      clear: both;
    }
    .fr{
      float:right;
    }
    .bg-white{
        background:rgba(255,255,255,1);
        border-radius:4px;
    }
    .margin-bsm{
        margin-bottom: 10px;
    }
    .margin-topsm{
      margin-top: 10px;
    }
    .padding-sm{
        padding:10px;
    }
    .border-bottom{
      border-bottom: 1px solid #ebedf0;
    }
    .text-red{
        font-size:14px;
        font-family:DIN-Medium;
        font-weight:500;
        color:rgba(235,80,59,1);
    }
    .text-grey{
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
    }
    .text-right{
        text-align: right;
    }
    .van-card{
      background-color: #fff;
      padding:5px 0;
    }
    .van-card__thumb{
        width: 50px;
        height: 50px;
    }
    .van-card__content{
        min-height: 50px;
    }
    .van-card__title{
        font-size:12px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:rgba(51,51,51,1);
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
    .van-card__bottom{
        margin-top: 14px
    }
    .goods-total{
      font-size:12px;
      font-family:PingFangSC;
      font-weight:400;
      color:rgba(51,51,51,1);
    }
    .van-button{
      height: 26px;
      line-height: 24px;
    }
    .store-name{
      font-size:14px;
      font-family:PingFangSC;
      font-weight:600;
      color:rgba(51,51,51,1);
      height: 20px;
      line-height: 20px;
    }
    .store-detail{
      color:rgba(153,153,153,1);
      height: 20px;
      line-height: 20px;
    }
    .store-detail .van-icon{
      font-size: 10px;
    }
    .order-status{
      font-size:12px;
      font-family:PingFangSC;
      font-weight:400;
      color:rgba(153,153,153,1);
    }
    .van-divider{
      margin:0;
    }
    .btn-wrap{
      padding:10px 0;
    }
    .btn-wrap .van-button:last-child{
      margin-left:10px;
    }
    .couse{
      padding-top:10px;
      font-size:14px;
      font-family:PingFangSC;
      font-weight:400;
      color:rgba(153,153,153,1);
    }
</style>