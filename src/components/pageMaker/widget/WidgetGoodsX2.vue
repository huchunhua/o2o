<template>
    <div class="WidgetGoodsX2-main" :style="{
    marginTop:source.setting ? source.setting.marginTop+'px' : '5px',
    marginBottom:source.setting ? source.setting.marginBottom+'px' : '5px',
    paddingLeft: source.setting ? source.setting.marginLeft+'px' : '5px',
    paddingRight:source.setting ? source.setting.marginRight+'px' : '5px',
    backgroundColor:source.setting ? source.setting.columnBgColor : '#FFF'}">
        <div class="widget-header" v-if="source.setting && source.setting.columnTitle != ''">
            <span>{{source.setting && source.setting.columnTitle != '' ? source.setting.columnTitle : '无标题'}}</span>
            <a v-if="source.setting && source.setting.moreUrl != ''"
               :href="source.setting && source.setting.moreUrl != '' ? source.setting.moreUrl : '#'">更多
                <van-icon name="arrow"/>
            </a>
        </div>
        <van-grid :column-num="2" :gutter="1">
            <van-grid-item class="goods-item" v-for="(item,index) in source.goods" :key="index"
                           @click="onGoodsClick(item.goods_id)">
                <img :src="item.goods_image"/>
                <h4>{{item.goods_name}}</h4>
                <p class="goods-jingle">{{item.goods_jingle}}</p>
                <p>
                    <span>￥{{item.goods_price}}</span>
                    <span>￥{{item.goods_marketprice}}</span>
                </p>
            </van-grid-item>
        </van-grid>
    </div>
</template>

<script>
    export default {
        name: "WidgetGoodsX2",
        props: {
            source: {
                type: Array | Object,
                required: true
            }
        },
        methods: {
            onGoodsClick(goodsId) {
                window.location.href = "http://m.sichuan.95504.net/tmpl/product_detail.html?goods_id="+goodsId;
            }
        }
    }
</script>
<style scoped>
    .WidgetGoodsX2-main {
        background: transparent !important;
    }
    .WidgetGoodsX2-main>>>.van-grid {
        margin: -2.5px;
        /*padding: 0 5px 5px 5px;*/
    }
    .goods-item img {
        width: 100%;
    }

    .goods-item h4 {
        font-size: .865rem;
        line-height: 20px;
        margin: 0;
        color: #333;
        font-weight: normal;
        height: 40px;
        text-align: left;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }
    .goods-item p {
        margin: 5px 0 0 0;
        font-size: .75rem;
        color: #999;
        width: 100%;
    }
    .goods-item p.goods-jingle {
        line-height: 14px;
        height: 28px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;

    }
    .goods-item p:last-child {
        font-size: .865rem;
    }
    .goods-item p:last-child span:first-child {
        color: #ff6700;
        font-weight: bold;
    }
    .goods-item p:last-child span:last-child {
        float: right;
        text-decoration: line-through;
    }
    .goods-item>>>.van-grid-item__content {
        padding: 10px;
        margin: 2.5px;
    }
</style>