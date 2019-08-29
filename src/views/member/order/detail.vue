<template>
    <div class="member-order-detail">
        <van-nav-bar title="订单详情" left-arrow fixed @click-left="$router.back()"/>
        <div class="member-order-index">
        	<div class="order-statu">
        		<van-row type="flex" justify="space-between">
				  <van-col span="18">
					  <p>{{orderinfo.stateValue}}</p>
					  <div class="btn" @click="refund(orderinfo.tradeSn)">申请退款</div>
					  <div class="btn margin-leftsm">再来一单</div>
					</van-col>
				  <van-col span="6">
				  	<img src="../../../assets/images/o2o/pic_order_succeed.png">
				  </van-col>
				</van-row>
        	</div>
			<sellerInfo :order-info="orderinfo" :seller-info="sellerinfo" :product-info="product" :trade-type="tradeType" :coupon-name="couponName"></sellerInfo>
			<orderInfo :order-info="orderinfo"></orderInfo>
        </div>
    </div>
</template>

<script>
	import sellerInfo from '@/components/seller-info'
	import orderInfo from '@/components/order-info'
    export default {
        name: "detail",
        components: {
            sellerInfo,
            orderInfo
        },
        data() {
            return {
            	sellerinfo:{},
            	orderinfo:{},
            	product:[],
            	tradeType:'',
            	couponName:''
            }
        },
        created() {
              let _this = this;
	          let id = _this.$route.params.id;
	          _this.type = _this.$route.params.type;
	          _this.$http.post('/industry/trade/tradeDetail',{tradeSn:id}).then(function (res) {
	            _this.orderinfo = res;
	            _this.sellerinfo = res.storeInfo;
	            _this.product = res.product;
	            _this.tradeType = res.tradeType;
	            if(res.couponInfo){
	            	_this.couponName = res.couponInfo.couponName	
	            }
	          });         
        },
        methods: {
            refund(id){
                this.$router.push({ name: 'Refund', params: { id:id}})
            },              
        }
    }
</script> 

<style scoped>
.member-order-index {
    padding-top: 46px;
    font-size: 14px;
}
.order-statu{
	width: 100%;
	height:102px;
	background-image: url(../../../assets/images/o2o/bg_detail.png);
	background-size: 100%;
	background-position: center;
	background-repeat: no-repeat;
	padding:20px 15px;
	color:#fff;
}
.order-statu .btn{
	display: inline-block;
	width:84px;
	height:30px;
	line-height: 30px;
	text-align: center;
	border-radius:4px;
	border:1px solid rgba(255,255,255,1);
	font-size:14px;
	font-family:PingFangSC-Semibold;
	font-weight:600;
	color:rgba(255,255,255,1);
}
.margin-leftsm{
	margin-left: 15px;
}
</style>