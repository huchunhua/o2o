<template>
    <div class="member-order-index">
        <van-nav-bar title="我的订单" left-arrow fixed @click-left="$utoo.navigate.close()"/>
<!--         <van-search placeholder="输入商品标题或完整订单号进行搜索" shape="round" show-action>
            <div slot="action">搜索</div>
        </van-search> -->
        <van-tabs v-model="tabActiveName" color="#FDC21E" line-width="20" @click="onClick">
            <van-tab title="全部" name="">
                <div class="tab-content">
                    <p class="title">最近订单</p>
                    <orderItem :order-info="orderlists" v-if="orderlists.length > 0" @updateLists="onLoadData"></orderItem>
                    <div v-else class='order-no'>
                        <img src="../../../assets/images/o2o/pic_null.png">
                        <p>暂无订单</p>
                        <div class="btn-tohome">随便逛逛</div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="待付款" name="10">
                <div class="padding-lrsm"  v-if="orderlists.length > 0">
                    <orderItem :order-info="orderlists" @updateLists="onLoadData"></orderItem>                    
                </div>
                <div v-else class='order-no'>
                    <img src="../../../assets/images/o2o/pic_null.png">
                    <p>暂无订单</p>
                    <div class="btn-tohome">随便逛逛</div>
                </div>
            </van-tab>
            <van-tab title="待使用" name="20">
                <div class="padding-lrsm"  v-if="orderlists.length > 0">
                    <orderItem :order-info="orderlists" @updateLists="onLoadData"></orderItem>                    
                </div>
                <div v-else class='order-no'>
                    <img src="../../../assets/images/o2o/pic_null.png">
                    <p>暂无订单</p>
                    <div class="btn-tohome">随便逛逛</div>
                </div>
            </van-tab>
            <van-tab title="退款/售后" name="50">
                <div class="padding-lrsm"  v-if="orderlists.length > 0">
                    <orderItem :order-info="orderlists" @updateLists="onLoadData"></orderItem>                    
                </div>
                <div v-else class='order-no'>
                    <img src="../../../assets/images/o2o/pic_null.png">
                    <p>暂无订单</p>
                    <div class="btn-tohome">随便逛逛</div>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import orderItem from '@/components/order-item'

    export default {
        name: "index",
        components: {
            orderItem
        },
        data() {
            return {
                tabActiveName: 'all',
                orderlists: []
            }
        },
        created() {
            let _this = this;
            _this.onLoadData()
        },
        methods: {
            onClick(name, title) {
                let _this = this;
                _this.orderstate = name;
                _this.onLoadData()
            },
            onLoadData() {
                let _this = this;
                let state = _this.orderstate;
                _this.$http.post('/industry/trade/tradeList', {state: state}).then(function (res) {
                    _this.orderlists = res
                });
            }
        }
    }
</script>

<style scoped>
    .member-order-index {
        padding-top: 46px;
        font-size: 14px;
    }

    .tab-content {
        padding: 10px 15px;
    }

    .tab-content .title {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 20px;
    }

    .order-no {
        text-align: center;
        padding-top: 100px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
    }

    .btn-tohome {
        margin: 0 auto;
        width: 140px;
        height: 40px;
        line-height: 40px;
        background: rgba(253, 194, 30, 1);
        border-radius: 4px;
        color: #fff;
        text-align: center;
    }
    .padding-lrsm{
        padding:10px 15px 0;
    }
</style>