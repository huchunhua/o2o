<template>
    <div class="vip-index">
        <van-nav-bar title="优途会员" left-arrow @click-left="$utoo.navigate.close()" fixed/>
        <div class="page-content">
            <div class="vip-normal" v-if="!isVerifyMemberData">
                <img src="../../assets/images/vip/normal-1.jpg">
                <img src="../../assets/images/vip/normal-2.jpg">
                <div class="action">
                    <div class="btn" @click="onIdent">实名认证</div>
                    <div class="btn" @click="onBindCar">绑定车辆</div>
                </div>
                <img src="../../assets/images/vip/normal-3.jpg">
                <img src="../../assets/images/vip/normal-4.jpg">
            </div>
            <div class="vip-detail" v-if="isVerifyMemberData">
                <div class="vip-info">
                    <div class="vip-avatar">
                        <img :src="dataInfo.avatar ? dataInfo.avatar : require('@/assets/images/head.png')"/>
                        <div class="vip-level vip-level0"  v-if="dataInfo.memberLevel == 0">
                            <img src="../../assets/images/vip0.png"/>
                            <span>普通用户</span>
                        </div>
                        <div class="vip-level vip-level1"  v-if="dataInfo.memberLevel == 1">
                            <img src="../../assets/images/vip1.png"/>
                            <span>大众会员</span>                            
                        </div>                       
                        <div class="vip-level vip-level2"  v-if="dataInfo.memberLevel == 2">
                            <img src="../../assets/images/vip2.png"/>
                            <span>黄金会员</span>                        
                        </div>                        
                        <div class="vip-level vip-level3"  v-if="dataInfo.memberLevel == 3">
                            <img src="../../assets/images/vip3.png"/>
                            <span>铂金会员</span>                       
                        </div>                        
                        <div class="vip-level vip-level4"  v-if="dataInfo.memberLevel == 4">
                            <img src="../../assets/images/vip4.png"/>
                            <span>钻石会员</span>                    
                        </div>
                    </div>
                    <div class="vip-profile">
                        <p>{{dataInfo.nikeName}}</p>
                        <ul class="equity-icon">
                            <li>
                                <img src="../../assets/images/icon-shopno.png" v-if="dataInfo.memberLevel == 0">
                                <img src="../../assets/images/icon-shop.png" v-else>
                            </li>
                            <li>
                                <img src="../../assets/images/icon-birthdayno.png" v-if="dataInfo.memberLevel == 0">
                                <img src="../../assets/images/icon-birthday.png" v-else>
                            </li>
                            <li>
                                <img src="../../assets/images/icon-oilno.png"  v-if="dataInfo.memberLevel == 0 || dataInfo.memberLevel == 1">
                                <img src="../../assets/images/icon-oil.png" v-else>
                            </li>
                            <li>
                                <img src="../../assets/images/icon-phoneno.png" v-if="dataInfo.memberLevel == 0 || dataInfo.memberLevel == 1 || dataInfo.memberLevel == 2">
                                <img src="../../assets/images/icon-phone.png" v-else>
                            </li>
                            <li>
                                <img src="../../assets/images/icon-tour.png" v-if='dataInfo.memberLevel == 4'>
                                <img src="../../assets/images/icon-tourno.png" v-else>
                            </li>
                        </ul>
                        <p>自{{dataInfo.registerTime}}成为中油优途会员</p>
                    </div>
                    <div class="equity-btn" @click="!isBinded">会员权益</div>
                </div>
                <img src="../../assets/images/bevip.png" v-if="dataInfo.memberLevel == 0" class="bevip">
                <div class="total">
                    <div>
                        <p class="tit">共消费</p>
                        ￥{{dataInfo.payMonsy}}
                    </div>
                    <div>
                        <p class="tit">已为您节省</p>
                        ￥{{dataInfo.saveMoney}}
                    </div>
                </div>
                <div class="save border">
                    <div class="title">省钱计算器</div>
                    <div class="tips">下一个会员等级结算期{{dataInfo.memberSettlement}}</div>
                </div>
                <div class="cal-list">
                    <van-cell class="cal-item" :value="'￥'+dataInfo.discountAmount" label="已领取油品优惠券总价值">
                        <template slot="title">
                            <img class="circle" src="../../assets/images/circle.png"/>
                            <span class="custom-title">加油优惠</span>
                        </template>
                    </van-cell>
                    <van-cell class="cal-item" :value="'￥'+dataInfo.coupon" label="已享受购物优惠总价值">
                        <template slot="title">
                            <img class="circle" src="../../assets/images/circle.png"/>
                            <span class="custom-title">购物优惠</span>
                        </template>
                    </van-cell>
                    <van-cell class="cal-item" :value="'￥'+dataInfo.points" label="已获得积分总价值">
                        <template slot="title">
                            <img class="circle" src="../../assets/images/circle.png"/>
                            <span class="custom-title">积分价值</span>
                        </template>
                    </van-cell>
                    <van-cell class="cal-item" :value="'￥'+dataInfo.preferentialMoney" label="已享受增值优惠总价值">
                        <template slot="title">
                            <img class="circle" src="../../assets/images/circle.png"/>
                            <span class="custom-title">增值优惠</span>
                        </template>
                    </van-cell>
                </div>
                <div class="decorate">赚积分</div>
                <div class="newtips">完成任务获取相应积分</div>
                <div class="task-list">
                    <van-cell class="task-item" title="完善信息" label="完成实名信息认证赠送100个积分">
                        <van-button slot="right-icon" :disabled="(isVerifyMemberData == 1)" @click="onIdent">{{isVerifyMemberData == 1 ? '已完成' : '去完成'}}</van-button>
                    </van-cell>
                    <van-cell class="task-item" title="车辆信息" label="完成车辆信息填写赠送100个积分">
                        <van-button slot="right-icon" :disabled="(isVerifyCar == 1)" @click="$router.push({name: 'CarIndex'})">{{isVerifyCar == 1 ? '已完成' : '去完成'}}</van-button>
                    </van-cell>
                    <van-cell class="task-item" title="签到任务" label="签到任务">
                        <van-button slot="right-icon" :disabled="(isCheck == 1)" @click="onSignin">{{isCheck == 1 ? '已完成' : '去完成'}}</van-button>
                    </van-cell>
                    <van-cell class="task-item" title="分享任务" label="每周第一次分享获得5个积分">
                        <van-button slot="right-icon" :disabled="(isVerifyShare == 1)">{{isVerifyShare == 1 ? '已完成' : '去完成'}}</van-button>
                    </van-cell>
                    <van-cell class="task-item" title="推荐会员" label="每邀请一名新用户获得100个积分，每月最多获取300积分">
                        <van-button slot="right-icon" :disabled="(isVerifyRecommendUser == 1)">{{isVerifyRecommendUser == 1 ? '已完成' : '去完成'}}</van-button>
                    </van-cell>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "vip",
        data() {
            return {
                isBinded: true,
                dataInfo: {},
                isVerifyMemberData:'',
                isVerifyCar:'',
                isCheck:'',
                isVerifyShare:'',
                isVerifyRecommendUser:''
            }
        },
        created() {
            this.getData();
        },
        methods: {
            onIdent() {
                this.$utoo.navigate.to('identity',{})
            },
            onBindCar() {
                this.$router.push({name:'CarIndex',params:{isReturn:true}})
            },
            onSignin(){
                let _this = this;
                _this.$http.post('member/profile/checkIn').then(response => {
                    _this.$toast('签到成功');
                    _this.getData()
                });
            },
            getData(){
                let _this = this;
                _this.$http.post('member/profile/preferentialStatistical').then(response => {
                    _this.dataInfo = response;
                    _this.isVerifyMemberData = response.isVerifyMemberData
                    _this.isVerifyCar = response.isVerifyCar
                    _this.isCheck = response.isCheck
                    _this.isVerifyShare = response.isVerifyShare
                    _this.isVerifyRecommendUser = response.isVerifyRecommendUser
                });
            }
        }
    }
</script>

<style scoped>
    img.bevip{
        width: calc(100% - 40px);
        margin:.5rem 20px;
    }
    .vip-index {
        padding-top: 46px;
    }
    .page-content {
    }
    .vip-normal img {
        width:100%;
        display: block;
    }
    .vip-normal .action {
        display:flex;
        padding:0 20px 20px 20px;
        background: #fff;
    }
    .vip-normal .action .btn {
        flex:1;
        height:3rem;
        line-height:3rem;
        background:linear-gradient(0deg,rgba(196,110,58,1),rgba(235,223,185,1));
        border:1px solid rgba(220,220,220,1);
        border-radius:2rem;
        font-size:1rem;
        font-weight:bold;
        color:rgba(51,51,51,1);
        text-align: center;
    }
    .vip-normal .action .btn:last-child {
        margin-left:.3rem
    }
    .vip-detail .border {
        border-bottom:1px solid rgba(244,244,244,1);
    }
    .vip-detail {
        height: 9rem;
        background:#ffffff url(../../assets/images/bg-black.png) no-repeat top center;
        background-size:100%;
    }
    .vip-detail .vip-info {
        display: flex;
        padding: 35px 0;
    }
    .vip-detail .vip-info .vip-avatar {
        margin-left: 2rem;
    }
    .vip-detail .vip-info .vip-avatar>img{
        width: 4rem;
        height: 4rem;
    }
    .vip-detail .vip-info .vip-avatar .vip-level {
        display: flex;
        color: #fff;
        font-size: 12px;
        line-height: 16px;
        border-radius: 16px;
        position: relative;
        background:#434343;
        margin-top: -10px;
    }
    .vip-detail .vip-info .vip-avatar .vip-level.vip-level1,.vip-detail .vip-info .vip-avatar .vip-level.vip-level2{
        background:#B59566;        
    }    
    .vip-detail .vip-info .vip-avatar .vip-level.vip-level3{
        background:#343434;        
    }    
    .vip-detail .vip-info .vip-avatar .vip-level.vip-level4{
        background:#434343;        
    }
    .vip-detail .vip-info .vip-avatar .vip-level>img {
        width: 1.2rem;
        height: 1.2rem;
        margin: 1px;
        position: absolute;
        left: -.8rem;
        top: -4px;
    }
    .vip-detail .vip-info .vip-avatar .vip-level>span {
        flex: 1;
        text-align: center;
    }
    .vip-detail .vip-info .vip-profile {
        padding-left: 10px;
    }
    .vip-detail .vip-info .vip-profile p {
        color: #e4caa2;
        margin: 0;
        font-size: 12px;
    }
    .vip-detail .vip-info .vip-profile p:first-child {
        font-size: 18px;
        color: #e4caa2;
        font-weight: bold;
    }
    .vip-detail .vip-info .vip-profile .equity-icon{
        display: flex;
        padding: 2px 0;
    }
    .vip-detail .vip-info .vip-profile .equity-icon li img {
        width: 1.25rem;
        margin: 2.5px;
    }
    .vip-detail .vip-info .equity-btn {
        position:absolute;
        width:4.55rem;
        height:1.75rem;
        line-height:1.75rem;
        top:5rem;
        right:0;
        background:rgba(228,202,162,1);
        border-radius:1.5rem 0 0 1.5rem;
        color:#fff;
        font-size:.75rem;
        text-align: center;
    }

    .vip-detail .total {
        height:4rem;
        display:flex;
        background-color:#F3F3F3;
        font-size:1rem;
        font-weight:400;
        color:rgba(34,33,32,1);
    }
    .vip-detail .total>div {
        flex:1;
        text-align: center;
        font-weight: bold;
        padding: 10px 0;
        color: #666;
    }
    .vip-detail .total>div:last-child {
        background-color:#E4CAA2;
    }
    .vip-detail .total .tit {
        font-size:1rem;
        margin:0;
        font-weight: normal;
    }
    .vip-detail .save {
        text-align: center;
        padding: 20px;
        background: #ffffff;
    }
    .vip-detail .save .title {
        font-size:1rem;
        font-weight:bold;
        color:#666;
    }
    .vip-detail .save .tips {
        padding: 10px 0;
        font-size:.75rem;
        color:#999;
    }
    .vip-detail .cal-list {
        padding: 0 20px 10px 20px ;
        background: #fff;
    }
    .vip-detail .cal-list .cal-item .van-cell__title img{
        width: 1rem;
        height: 1rem;
        padding: 4px 0;
        float: left;
        margin-right: 10px;
    }
    .vip-detail .cal-list .cal-item .van-cell__title span {
        height: 20px;
        line-height: 20px;
        display: inline-block;
    }
    .vip-detail .cal-list .cal-item .van-cell__value {
        flex: none;
    }
    .vip-detail .cal-list .cal-item .van-cell__label {
        padding-left: 25px;
    }
    .vip-detail .decorate {
        text-align: center;
        background:#ffffff url(../../assets/images/decorate.png) no-repeat center;
        background-size:40%;
        font-size:1rem;
        font-weight:bold;
        color:#666;
    }
    .vip-detail .newtips {
        padding: 10px 0;
        font-size:.75rem;
        color:#999;
        text-align: center;
        background:#ffffff;
    }
    .vip-detail .task-list {
        padding: 0 20px;
        background: #fff;
    }
    .vip-detail .task-list .task-item>>>.van-button{
        height: 30px;
        line-height: 30px;
        border-radius: 32px;
        background: #e4caa2;
        padding: 0 20px;
        color: #fff;
        border: none;
        margin-top: 5px;
    }
</style>