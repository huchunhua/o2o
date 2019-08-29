<template>
    <div class="member-fuelcard">
        <div class="page-content">
            <div class="page-title">
                中国石油昆仑加油卡章程
                <span>总则</span>
            </div>
            <div class="card-rule">
                <ul>
                    <li>中国石油昆仑加油卡（以下简称“昆仑加油卡”）由中国石油天然气股份有限公司统一发行，各省市销售公司具体承办发行，可在全国各地的昆仑加油卡联网加油站使用。</li>
                    <li>使用昆仑加油卡可在昆仑加油卡联网加油站加油、购买便利店商品和加油站其他服务性收费的支付。</li>
                    <li>同意本章程的单位和个人可根据需要申办昆仑加油卡。</li>
                    <li>使用昆仑加油卡须遵守本章程的各项条款。</li>
                </ul>
            </div>
            <div class="page-footer">
                <div class="page-btns">
                    <van-loading size="2rem" type="spinner" vertical v-if="!loaded">加载中，请稍候
                    </van-loading>
                    <van-button size="large" @click="jumpToRecharge" v-if="loaded && isAllow">油卡充值</van-button>
                    <van-button size="large" @click="jumpToInquire" v-if="loaded && isAllow">充值查询</van-button>
                    <div class="notAllowTips" v-if="loaded && !isAllow">
                        &nbsp;&nbsp;&nbsp;&nbsp;很抱歉，由于一些特殊的原因，我们暂时没有查询到您的授权信息，导致暂不能为您提供服务。请尝试重新登陆优途并从优途App进入本页面，如仍有问题，请联系客服以获得帮助。
                    </div>
                </div>
            </div>
        </div>
        <div class="page-copyright">
            <div class="petro-logo"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "fuelcard",
        data() {
            return {
                loaded: false,
                isAllow: false,
                rechargeUrl: '',
                inquireUrl: ''
            }
        },
        created() {
            let self = this;
            // self.$toast(self.$utoo.storage.get('token'));
            self.$http.post('http://api.sichuan.95504.net/index.php?act=member_index&op=gascard').then(function (res) {
                self.isAllow = res.isAllow;
                self.rechargeUrl = res.rechargeUrl;
                self.inquireUrl = res.inquireUrl;
                self.loaded = true;
            });
        },
        methods: {
            jumpToRecharge() {
                location.href = this.rechargeUrl;
            },
            jumpToInquire() {
                location.href = this.inquireUrl;
            }
        }
    }
</script>

<style scoped>
    .page-content {
        background: url("../../assets/images/fuelcard.png") no-repeat top center;
        background-size: 100%;
        min-height: 600px;
        padding: 1rem;
    }

    .page-title {
        font-size: 1.25rem;
        color: #fff;
        text-align: center;
    }

    .page-title span {
        font-size: 1rem;
        display: block;
        line-height: 2.5;
        border-bottom: 1px solid #de7233;
        margin: 0 .75rem .5rem .75rem;
    }

    .card-rule {
        height: 20rem;
    }
    .card-rule ul {
        padding-left: 1rem;
    }

    .card-rule ul li {
        list-style: decimal;
        color: #fff;
        font-size: 14px;
        line-height: 1.5;
        margin-bottom: .5rem;
    }
    .page-footer .page-btns {
        padding: 2rem;
    }

    .page-footer .page-btns > .van-button {
        color: #fff;
        background: linear-gradient(to right, #F46B45, #EEA749);
        border-radius: 3rem;
        height: 3rem;
        line-height: 3rem;
        margin-top: 1rem;
        box-shadow: 0 5px 20px rgba(244, 107, 69, .4);
        border: none;
    }

    .page-footer .page-btns > .van-button:first-child {
        margin: 0;
    }

    .page-copyright {
        position: absolute;
        bottom: 1rem;
        width: 100%;
    }

    .page-copyright .petro-logo {
        background: transparent url(../../assets/images/petro-logo.png) center no-repeat;
        background-size: 100%;
        width: 6rem;
        height: 3rem;
        margin: auto;
    }

    .notAllowTips {
        font-size: .75rem;
        line-height: 1.5;
        letter-spacing: 3px;
        padding: 1rem;
        background: #fffbe8;
        border: 1px solid #ed6a0c;
        border-radius: .75rem;
        color: #ed6a0c;
        margin-bottom: 4rem;
    }
</style>