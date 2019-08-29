<template>
    <div class="ssc-index">
        <van-nav-bar title="扫码赠券" left-arrow @click-left="$utoo.navigate.close()" fixed/>
        <div class="page-content" v-if="!isUtoo">
            <img src="../../../assets/images/scan-tips.png">
            <van-button @click="$router.push({name:'Download'})">点击下载</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'promotion-ssc-index',
        data() {
            return {
                isUtoo: true
            }
        },
        created() {
            let env = this.$utoo.env.isUtoo();
            this.isUtoo = env;
            if(env) {
                this.$router.push({name:'SscCoupon'})
            }
        },
        methods: {}
    }

</script>
<style scoped>
    .ssc-index {
        padding-top: 46px;
    }

    .page-content {
        padding:40px 30px;
        text-align: center;
    }

    .page-content img {
        width: 12rem
    }

    .page-content >>> .van-button {
        width: 100%;
        background: linear-gradient(to right, #E73E28, #FA7B2D);
        box-shadow: 0px 0px 10px #FA7B2D;
        border: none;
        border-radius: 40px;
        line-height: 40px;
        height: 40px;
        color: #fff;
        margin-top: 30px;
    }
</style>
