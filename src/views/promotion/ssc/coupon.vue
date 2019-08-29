<template>
    <div class="ssc-coupon">
        <van-nav-bar title="扫码赠券" left-arrow @click-left="$utoo.navigate.close()" fixed/>
        <div class="page-content">
            <img src="../../../assets/images/bg-activity.png"/>
            <div class="page-action">
                <van-button :disabled="isGet" @click="getCoupon">{{isGet ? '已领取' : '立即领取'}}</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'activity',
        data() {
            return {
                isGet: false
            }
        },
        created() {
            if (!this.$utoo.env.isUtoo()) {
                this.$router.push({name: 'SscIndex'});
            }
        },
        methods: {
            getCoupon() {
                let _this = this;
                _this.$http.post('promotion/Coupon/putCoupon').then(response => {
                    _this.isGet = true;
                    _this.$dialog.alert({
                        title: '领取成功',
                        message: '请到我的“优惠券”中查看使用'
                    }).then(() => {
                    });
                });
            }
        }
    }

</script>
<style scoped>
    .ssc-coupon {
        padding-top: 46px;
        padding-bottom: 100px;
        background: #eb003f;
    }

    .page-content img {
        width: 100%
    }

    .page-content .page-action {
        display: block;
        padding: 0 30px;
        margin-top: 20px;
    }

    .page-content >>> .van-button {
        width: 100%;
        background: linear-gradient(to right, #E73E28, #FA7B2D);
        box-shadow: 0px 20px 20px rgba(0, 0, 0, .3);
        border: 1px solid #E73E28;
        border-radius: 40px;
        line-height: 40px;
        height: 40px;
        color: #fff;
    }
</style>
