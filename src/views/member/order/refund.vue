<template>
    <div class="refund">
        <van-nav-bar title="申请退款" left-arrow fixed @click-left="$router.back()"/>
        <div class="content">
          <div class="bg-white">
            <van-cell title="选择退款原因" :value="couse" is-link @click="choiceCouse"/>  
            <van-uploader v-model="fileList" :after-read="afterRead" multiple :max-count="3" upload-text="上传图片" class="padding-sm"/>    
            <div class="desc">退款来源：退款至您的支付账户</div>         
          </div> 
          <div class="margin-top bg-white">
            <van-cell :value="seller"/>    
            <van-card
              :title="item.productName"
              :thumb="item.productImage"
              v-for="item in product"
              :key="item.productId"
            >
              <div slot="num">
                ￥{{item.productPrice}}
              </div>              
              <div slot="price">
                x {{item.productNum}}
              </div>
            </van-card>
            <div class="text-right">
              退款金额：<span class="text-red">￥{{tradePayAmount}}</span>
            </div>         
          </div> 
          <div class="tips">
            <span class="text-grey">温馨提示：</span>
            已提货商品需呀将商品送到便利店，确认商品无损坏后方可退款，部分商品不支持退款
          </div>
        </div>
        <van-row type="flex" justify="space-between" class='btn-wrap'>
          <van-col span="18">
            退款金额￥{{tradePayAmount}}
          </van-col>
          <van-col span="6" class='btn-sub text-center'>
            <span  @click="cancelOrder">提交</span>
          </van-col>
        </van-row>
        <van-dialog
          v-model="show"
          title="取消原因"
          show-cancel-button
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
</template>

<script>

    import axios from 'axios'
    export default {
        name: "detail",
        data() {
            return {
              fileList: [],
              seller:'',
              product:[],
              show: false,
              couse:'订单信息拍错',
              refundImage:'',
              tradePayAmount:''
            }
        },
        created() {
            let _this = this;
            let id = _this.$route.params.id; 
            _this.id = id;
            _this.$http.post('/industry/trade/tradeDetail',{tradeSn:id}).then(function (res) {
              _this.seller = res.storeInfo.storeName;
              _this.product = res.product;
              _this.tradePayAmount = res.tradePayAmount;
            });   
        },
        methods:{
          choiceCouse(){
            const _this = this;
            _this.show = true;
          },
          afterRead(data) {
            let _this = this,
                http = axios.create(),
                formData = new FormData(),
                config = {headers: { "Content-Type": "multipart/form-data" }};
                formData.append('imgFile',data.file);
                http.post('http://sichuan.95504.net/v4/common/upload/upload',formData,config).then(function (res) {
                  if (_this.refundImage === ''){
                    _this.refundImage = res.data.data.id
                  }else{
                    _this.refundImage = _this.refundImage + ',' + res.data.data.id;
                  }
                });  
          },
          cancelOrder(){
            let _this = this;
            let tradeSn = _this.id;
            let refundContent = _this.couse;
            let refundImage = _this.refundImage;
            _this.$http.post('/industry/trade/refundMoney',{tradeSn:tradeSn,refundContent:refundContent,refundImage:refundImage}).then(function (res) {
              _this.$toast("已成功申请退款！")
            }); 
          }
        }
    }
</script>

<style scoped>
  .content{
    margin-top: 46px;
    font-size: 14px;
  }
  .bg-white{
    background-color: #fff;
  }
  .padding-sm{
    padding: 10px 15px;
  }
  .margin-top{
    margin-top: 10px;
  }
  .text-right{
    text-align: right;
    padding: 0 15px 15px 0;
  }
  .text-center{
    text-align: center
  }
  .text-red{
    font-size:14px;
    font-family:DIN-Medium;
    font-weight:500;
    color:rgba(235,80,59,1);
  }
  .desc{
    border-top: 1px solid rgba(236,236,236,1);
    margin:0 15px    ;
    padding:15px 0;
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
  .van-card{
    background-color: #fff;
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
  .tips{
    padding:10px 15px;
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:#333333;
  }
  .tips .text-grey{
    color: #999999;
  }
  .btn-wrap{
    position: fixed;
    bottom:0;
    left:0;
    height: 44px;
    line-height: 44px;
    background:rgba(51,51,51,1);
    width: 100%;
    color:#fff;
  }
  .btn-wrap{
    padding:0 15px;
  }
  .btn-wrap .btn-sub{
    background:rgba(204,204,204,1);
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    padding:0;
  }
  .van-divider{
    margin:0 0 10px;
  }
</style>