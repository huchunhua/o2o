<template>
    <div class="service-index">
        <van-nav-bar title="客服中心" left-arrow fixed @click-left="$utoo.navigate.close()"/>
        <div class="page-content">
            <van-cell-group>
                <van-cell title="常见问题" is-link @click="$toast('内容准备中');"/>
                <van-cell title="联系客服" is-link @click="showContactConfirm = true"/>
            </van-cell-group>
            <van-dialog v-model="showContactConfirm" show-cancel-button confirmButtonText="呼叫" @cancel="showContactConfirm = false" @confirm="onContact">
                <span>400-030-3332</span>
            </van-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "service",
        data() {
          return {
              showContactConfirm: false
          }
        },
        methods: {
            onContact() {
                this.$utoo.native.calltel('4000303332');
                // window.location.href = 'tel://4000303332'
            }
        }
    }
</script>

<style scoped>
    .service-index {
        padding-top: 46px;
    }
    .page-content {
        margin-top: 5px;
    }
    .page-content>>>.van-dialog .van-dialog__content{
        text-align: center;
        padding: 40px 0 30px 0;
    }
    .page-content>>>.van-dialog .van-dialog__content span {
        font-weight: bold;
    }

</style>