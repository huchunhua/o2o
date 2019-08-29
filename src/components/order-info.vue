<template>
        <div class="order-info bg-white padding-sm">
          <van-row type="flex" justify="space-between">
            <van-col span="6" class='text-blod'>订单信息</van-col>
          </van-row>
          <van-divider />
          <van-row type="flex" justify="space-between" class="line">
            <van-col span="6">订单编号</van-col>
            <van-col span="18" class="text-grey text-right">
              {{orderInfo.tradeSn}}
               <span data-clipboard-action="copy" class="btn-copy" :data-clipboard-text="orderInfo.tradeSn" @click="copyLink">复制</span>
            </van-col>
          </van-row>          
          <van-row type="flex" justify="space-between" class="line">
            <van-col span="6">下单时间</van-col>
            <van-col span="12" class="text-grey text-right">{{orderInfo.tradeCreated}}</van-col>
          </van-row>          
          <van-row type="flex" justify="space-between" class="line">
            <van-col span="6">支付方式</van-col>
            <van-col span="12" class="text-grey text-right">{{orderInfo.tradePayType}}</van-col>
          </van-row>
        </div>
</template>

<script>
    export default {
        name: "order-info",
        props: {
            orderInfo: {
              type: Object
            }
        },
        data() {
            return {
            }
        },
        created() {
            let self = this;
        },
        methods: {
            toUse(id){
                this.$router.push({ name: 'StandDetail', params: { id:id}})
            },              
            toDetail(id){
                this.$router.push({ name: 'OrderDetail', params: { id:id}})
            },         
            refundDetail(id){
                this.$router.push({ name: 'RefundDetail', params: { id:id}})
            },
            copyLink() {
               let _this = this;
               let clipboard = new this.clipboard(".btn-copy");
               clipboard.on('success', function () {
                 _this.$toast("复制成功")
               });
               clipboard.on('error', function () {
                 _this.$toast("复制失败")
               });
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
  .text-grey{
    color:rgba(153,153,153,1);
  }
  .text-right{
    text-align: right;
  }
  .order-info{
    margin-top: 10px;
  }
  .order-info .line{
    height: 40px;
    line-height: 40px;
    font-size: 14px;
  }
  .btn-copy{
    width:32px;
    height:16px;
    padding:0 10px;
    background:rgba(255,255,255,1);
    border-radius:2px;
    border:1px solid rgba(199,199,204,1);
    font-size:11px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
  .van-divider{
    margin:10px 0 0;
  }
  .text-blod{
    font-family:PingFangSC;
    font-weight:600;
  }
</style>