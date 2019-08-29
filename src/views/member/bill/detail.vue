<template>
    <div class="member-bill-detail">
        <div class="detail-header" v-if="isLoaded">
            <h4>
                <img v-if="billInfo.billType == 1" class="detail-icon" src="@/assets/images/icon.fuel.png"/>
                <img v-if="billInfo.billType == 2" class="detail-icon" src="@/assets/images/icon.shop.png"/>
                <img v-if="billInfo.billType == 3" class="detail-icon" src="@/assets/images/icon.mobile.png"/>
                <img v-if="billInfo.billType == 4" class="detail-icon" src="@/assets/images/icon.card.png"/>
                {{billInfo.billSeller}}</h4>
            <h1>-{{billInfo.billAmount}}</h1>
            <span>交易成功</span>
        </div>
        <van-cell-group v-if="isLoaded">
            <van-cell title="付款方式" :value="billInfo.billPayType"/>
            <van-cell title="交易信息" :value="billInfo.billSubject"/>
            <van-cell title="账单分类" :value="billInfo.billTypeText"/>
            <van-cell title="创建时间" :value="billInfo.billTime"/>
            <van-cell title="订单编号" :value="billInfo.billTradeNo"/>
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        name: "detail",
        data() {
          return {
              isLoaded: false,
              billInfo: {}
          }
        },
        created() {
            let that = this;
            that.$store.dispatch("bill/hideTab");
            that.$model.bill.getBillDetail({type: that.$route.params.type, id: that.$route.params.id}).then(function (res) {
                that.billInfo = res.billInfo;
                that.isLoaded = true;
            }).catch(function (err) {
                that.$toast(err);
                console.warn(err);
            });
        }
    }
</script>

<style scoped>
    .detail-header {
        margin: 20px 0 40px 0;
        text-align: center;
    }
    .detail-header h1,.detail-header h4 {
        font-weight: normal;
        margin: 10px 0 0 0;
    }
    .detail-header h4 {
        display: inline-block;
        line-height: 1.5rem;
    }

    .detail-header h4 img {
        margin-right: 10px;
        display: inline-block;
        float: left;
    }

    .detail-header .detail-icon {
        width: 1.5rem;
        height: 1.5rem;
    }
    .detail-header span {
        margin-top: 10px;
        font-size: .865rem;
        display: block;
    }
    .van-cell__title {
        flex: unset;
        margin-right: 20px;
    }
</style>