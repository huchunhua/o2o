<template>
    <div class="newuser-index">
        <van-nav-bar title="扫码赠券" left-arrow @click-left="$utoo.navigate.close()" fixed/>
        <div class="page-content">
            <div class="downBtn">
            </div>
            <div class="formbg">
                <div class="form">
                    <van-button type="default" @click="$router.push({name:'Download'})"  v-if="isReged">下载优途</van-button>
                    <van-cell-group v-if="!isReged">
                        <van-field v-model="phone" placeholder="请输入手机号" type="number" clearable/>
                        <van-field v-model="code"  placeholder="请输入验证码" type="number" clearable>
                            <van-button slot="button" size="small" type="primary" @click="getCode">获取验证码</van-button>
                        </van-field>
                        <van-field v-model="password" placeholder="设置您的密码" type="password" clearable/>
                    </van-cell-group>
                    <van-button v-if="!isReged" type="default" @click="sub(erpcode)" :erpcode="erpcode">立刻领取</van-button>
                </div>
            </div>
            <div class="formbg">
                <div class="form ruleswrap">
                    <div class="title">活动细则</div>
                    <ul class="rules">
                        <li>发放至手机的优惠劵需下载中油优途APP用手机号注册后可以使用。</li>
                        <li>使用优惠劵时支付的账号需与领取优惠劵使用的账号为一个手机号。</li>
                        <li>发放至中油优途账户里的优惠劵登录即可使用。</li>
                        <li>优惠劵不可叠加使用，每个账号仅限领取一次。</li>
                        <li>最终解释权归中国石油四川销售分公司所有。</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'newuser',
        data() {
            return {
                isReged: false,
                phone: '',
                password: '',
                code: '',
                erpCode: ''
            }
        },
        created() {
            let _this = this,params = _this.$route.params;
            _this.erpcode = (params && params.erpcode) ? params.erpcode : '';
        },
        methods: {
            getCode() {
                let _this = this,phone = _this.phone;
                _this.$http.post('member/account/sendsms', {phone: phone, type: 1}).then(response => {
                    _this.$toast('验证码发送成功，请注意查收')
                });
            },
            sub(erp) {
                let _this = this,
                    phone = _this.phone,
                    password = _this.password,
                    code = _this.code;
                _this.$http.post('member/account/register', {
                    phone: phone,
                    password: password,
                    code: code,
                    erpCode: erp
                }).then(response => {
                    _this.isReged = false;
                    _this.$toast('恭喜您，注册成功！');
                });
            }
        }
    }

</script>
<style scoped>
    .newuser-index{
        padding-top: 46px;
        background:#fc3719 url(../../assets/images/gift-bg.png) no-repeat top center;
        background-size: 100%;
        background-position-y: -10px;
    }
    .page-content {
        padding-top: 20rem;
        padding-bottom: 1rem;
    }

    .formbg{
        margin: 1rem;
        padding: .75rem;
        background-color: #ffa83e;
        border-radius: 1rem;
    }

    .formbg .form{
        border-radius: 1rem;
        background-color: #fff;
        padding: 1rem
    }

    .formbg .form.ruleswrap{
        padding: 10px
    }

    .page-content>>>.van-button{
        height: 1.25rem;
        line-height: 1.25rem;
        background: linear-gradient(180deg, rgba(253, 177, 1, 1), rgba(252, 227, 16, 1));
        border-radius: 10rem;
        font-size: .75rem;
        font-weight: 800;
        color: #333;
        border:none;
    }
    .page-content>>>.van-button:not(.van-button--small){
        width: 100%;
        height: 2.5rem;
        font-size: .865rem;
    }

    .title{
        padding: 20px 0;
        height: 18px;
        font-size: 18px;
        font-weight: bold;
        color: #666;
        text-align: center;
    }

    .rules {
        font-size: 14px;
        color: #999;
        line-height: 2;
        text-align: left;
        list-style: decimal;
        padding-left: 20px;
    }
    .downBtn {
        padding: 1rem;
    }
</style>
