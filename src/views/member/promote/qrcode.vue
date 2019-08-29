<template>
    <div class="promote-qrcode">
        <van-nav-bar title="我的推广码" left-arrow @click-left="$router.back()" fixed/>
        <div class="page-content">
            <div class="erpQrCode">
                <img class="codeImage" :src="erpurl">
                <img class="logoImage" src="../../../assets/images/logo.png">
            </div>
            <p class="erpCodeText">
                {{erpcode}}
            </p>
            <p class="slogan">
                <img src="../../../assets/images/slogan.png"/>
            </p>
            <div class="qrcode-section">
                <van-button type="default">分享</van-button>
                <van-button type="warning">保存图片</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                erpcode: '',
                erpurl: '../assets/image/slogan.png'
            }
        },
        created() {
            let _this = this;
            _this.$http.post('member/staffer/getQrcodeInfo').then(response => {
                _this.erpurl = response.erpUrl;
                _this.erpcode = response.erpCode;
            });
        }
    }
</script>
<style scoped>
    .promote-qrcode {
        padding-top: 46px;
    }

    .page-content {
        padding: 40px;
    }

    .page-content .erpQrCode {
        width: 14rem;
        height: 14rem;
        position: relative;
        margin: auto;
    }

    .page-content .erpQrCode .codeImage {
        width: 14rem;
        height: 14rem;
    }

    .page-content .erpQrCode .logoImage {
        width: 3rem;
        height: 3rem;
        position: absolute;
        top: 5.5rem;
        left: 5.5rem;
        border: 2px solid #fff;
        border-radius: 8px;
        background: #fff;
    }

    .page-content .erpCodeText {
        text-align: center;
    }

    .page-content .slogan {
        text-align: center;
    }

    .page-content .slogan img {
        width: 15rem;
    }

    .page-content .qrcode-section {
        text-align: center;
    }

    .page-content .qrcode-section >>> .van-button {
        padding: 0 30px;
        border-radius: 40px;
        height: 36px;
        line-height: 36px;
        margin: 0 10px;
        border: none;
    }
</style>