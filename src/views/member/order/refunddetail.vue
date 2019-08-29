<template>
    <div class="refund-order-detail">
        <van-nav-bar title="退款详情" left-arrow fixed @click-left="$router.back()"/>
        <div class="bg-white margin-bottom">
        	<div class="order-num">订单编号：{{orderinfo.tradeSn}}</div>    
        	<van-divider />
            <van-card
                  :title="item.productName"
                  :thumb="item.productImage"
                  v-for="item in orderinfo.product"
                  :key="item.productId"
            >
                <div slot="num">
                    ￥{{item.productPrice}}
                </div>              
                <div slot="price">
                    x {{item.productNum}}
                </div>
            </van-card> 
            <van-cell title="店铺优惠券" :value="orderinfo.couponInfo.couponName" v-if="orderinfo.couponInfo"/>  
            <div class="text-right text-line">
            	合计<span class="text-red">￥{{orderinfo.tradePayAmount}}</span>
            </div>  	
        </div>
        <div class="bg-white margin-bottom">
            <van-cell value="退款原因" class="title"/>   
            <div class="cause">{{orderinfo.refundLogInfo.refundContent}}</div>       	
        </div>        
        <div class="bg-white margin-bottom">
            <van-cell value="退款情况" class="title"/>   
            <van-cell title="申请退款时间" :value="orderinfo.tradeCreated" />       	
            <van-cell title="退款状态" value="退款中" v-if='orderinfo.refundLogInfo.refundState == 0'/>        
            <van-cell title="退款状态" value="已退款" v-else-if='orderinfo.refundLogInfo.refundState == 1'/>          
            <van-cell title="退款状态" value="退款失败" v-else-if='orderinfo.refundLogInfo.refundState == 2'/>  
            <van-cell title="退款时间" :value="orderinfo.refundLogInfo.refundUpdateTime" v-else-if='orderinfo.refundLogInfo.refundState == 1'/>        	
            <van-cell title="联系客服" value="028-83930222" />       	
        </div>
    </div>
</template>

<script>
    export default {
        name: "detail",
        data() {
            return {
              orderinfo:{
                refundLogInfo:{}
              }
            }
        },
        created() {
            let _this = this;
            let id = _this.$route.params.id;
            _this.type = _this.$route.params.type;
            _this.$http.post('/industry/trade/tradeDetail',{tradeSn:id}).then(function (res) {
              _this.orderinfo = res;

            });         
        },
    }
</script>

<style scoped>
	.refund-order-detail{
	    padding-top: 46px;
	}
	.bg-white{
		background:rgba(255,255,255,1);
	}
	.margin-bottom{
		margin-bottom:10px
	}
	.text-line{
		padding:10px 15px;
	}
	.text-right{
		text-align: right;
	}
	.text-red{
		font-size:14px;
		font-family:DIN-Medium;
		font-weight:500;
		color:rgba(235,80,59,1);
	}
	.order-num{
		margin:0 15px;
		padding:10px 0 0;
		font-size:14px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
    .van-divider{
        margin:10px 0;
    }
	.van-card{
		background-color: #fff
	}
    .van-card__thumb{
        width: 50px;
        height: 50px;
    }
    .van-card__content{
        min-height: 50px;
    }
    .van-card__price{
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(153,153,153,1);
    }
    .van-card__bottom{
        margin-top: 14px
    }
    .van-card__num{
        font-size:14px;
        font-family:DIN;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .title{
    	font-size:14px;
		font-family:PingFangSC-Semibold;
		font-weight:600;
		color:rgba(51,51,51,1);
    }
    .cause{
    	padding:10px 15px;
    	font-size:12px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(51,51,51,1);
    }
</style>