<template>
    <div class="bill-layout">
        <van-nav-bar title="我的账单" left-arrow fixed @click-left="$utoo.navigate.close()"/>
        <div class="pageLoading" v-if="!$store.state.common.requestLoaded">
            <van-loading type="spinner"/>
        </div>
        <router-view/>
        <van-tabbar class="bill-tabbar" v-if="$store.state.bill.billTabShowed" v-model="$store.state.bill.billTabSelected" active-color="#ffcf11" :fixed="true">
            <van-tabbar-item to="/member/bill/index">
                <span>账单</span>
                <img slot="icon" slot-scope="props" :src="props.active ? require('@/assets/images/icon.bill.active.png') : require('@/assets/images/icon.bill.normal.png')"/>
            </van-tabbar-item>
            <van-tabbar-item to="/member/bill/stat">
                <span>统计</span>
                <img slot="icon" slot-scope="props" :src="props.active ? require('@/assets/images/icon.statistics.active.png') : require('@/assets/images/icon.statistics.normal.png')"/>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: "layout",
        data() {
            return {}
        }
    }
</script>
<style scoped>
    .bill-layout {
        padding-top: 46px;
    }
    .bill-tabbar {
        z-index: 2000;
    }
    .bill-tabbar .van-tabbar-item>>>.van-tabbar-item__text{
        font-size: .865rem;
    }
    .van-tabbar-item__icon img {
        height: 22px;
    }

    .pageLoading {
        z-index: 1000;
        position: absolute;
        width: 100%;
        top: 100px;
        bottom: 50px;
        display: flex;
        background: rgba(255,255,255,1);
        text-align: center;
    }
    .pageLoading>.van-loading {
        margin: auto;
        display: flex;
        justify-content:center;
        align-items:Center;
    }
</style>
