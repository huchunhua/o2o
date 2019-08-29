<template>
    <div class="van-cell-group van-hairline--top-bottom van-panel">
        <div class="van-cell van-panel__header">
            <div class="van-cell__image" v-if="image">
                <img :src="image"/>
            </div>
            <div class="van-cell__title"><span>{{title}}</span>
                <div class="van-cell__label"><van-tag class="van-cell__tag" type="danger" v-if="tag">{{tag}}</van-tag>{{label}}</div>
            </div>
            <div class="van-cell__value van-panel__header-value"><span @click="onStore(itemId)">进入店铺</span></div>
        </div>
        <div class="van-panel__content">
            <div class="item_list item_one" v-if="item.length == 1" @click="onClickItem(item[0].url)"><img :src="item[0].image"/></div>
            <van-row class="item_list" gutter="10" v-if="item.length == 2">
                <van-col span="12">
                    <div class="item_two" @click="onClickItem(item[0].url)"><img :src="item[0].image"/></div>
                </van-col>
                <van-col span="12">
                    <div class="item_two" @click="onClickItem(item[1].url)"><img :src="item[1].image"/></div>
                </van-col>
            </van-row>
            <van-row class="item_list" style="border: 1px solid #fafafa;" v-if="item.length == 3">
                <van-col style="width: 66.575%"><div class="item" @click="onClickItem(item[0].url)"><img :src="item[0].image"/></div> </van-col>
                <van-col style="width: 33.425%;border-left: 1px solid #fafafa;">
                    <div class="item" @click="onClickItem(item[1].url)"><img :src="item[1].image"/></div>
                    <div class="item" style="border-top: 1px solid #fafafa;" @click="onClickItem(item[2].url)"><img :src="item[2].image"/></div>
                </van-col>
            </van-row>
            <van-row class="item_list list_four" gutter="1" v-if="item.length == 4" style="background: #fafafa">
                <van-col span="12">
                    <div class="item_four" @click="onClickItem(item[0].url)"><img :src="item[0].image"/></div>
                </van-col>
                <van-col span="12">
                    <div class="item_four" @click="onClickItem(item[1].url)"><img :src="item[1].image"/></div>
                </van-col>
                <van-col span="12" style="margin-top: 1px">
                    <div class="item_four" @click="onClickItem(item[2].url)"><img :src="item[2].image"/></div>
                </van-col>
                <van-col span="12" style="margin-top: 1px;">
                    <div class="item_four" @click="onClickItem(item[3].url)"><img :src="item[3].image"/></div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "street-item",
        props: {
            itemId: {
                required: true,
            },
            image: {
                default: null
            },
            title: {
                required: true
            },
            label: {
                required: true,
                default: ''
            },
            tag: {
                default: ''
            },
            item: {
                default: Array
            }
        },
        methods: {
            onClickItem(url) {
                location.href = url;
            },
            onStore(itemId) {
                location.href = 'http://m.sichuan.95504.net/tmpl/store.html?store_id='+itemId;
            }
        }
    }
</script>

<style scoped>
    .van-panel__header-value {
        flex: unset;
        line-height: 38px;
    }
    .van-panel__header-value span {
        color: #fff;
        font-size: .75rem;
        background: #F1B95E;
        padding: 5px 10px;
        border-radius: 30px;
    }
    .van-cell__image, .van-cell__image img {
        width: 36px;
        height: 36px;
        border: 1px solid #fff;
        box-sizing: border-box;
    }
    .van-cell__image {
        margin-right: .75rem;
        border: 1px solid #eee;
        box-sizing: content-box;
    }
    .van-cell__title {
        color: #333;
        font-size: .865rem;
        line-height: normal !important;
        margin-right: .75rem;
    }
    .van-cell__label {
        font-size: .75rem;
        margin-top: 0;
        line-height: normal !important;
    }
    .van-cell__label .van-cell__tag {
        padding: 0 2px;
        font-size: 10px;
        line-height: 14px;
        height: 14px;
        margin-right: 5px;
    }
    .van-panel__content {
        padding: 10px 15px;
        font-size: .865rem;
    }
    .van-panel__content .item, .van-panel__content .item_two, .van-panel__content .item_four {
        height: 0px;
        padding-bottom: 100%;
        position: relative;
    }
    .van-panel__content .item_four {
        background: #fff;
    }
    .van-panel__content .item img, .van-panel__content .item_two img, .van-panel__content .item_four img{
        width: 100%;
        height: 100%;
        position: absolute;
        border: 1px solid #fff;
        box-sizing: border-box;
    }
    .van-panel__content .item_one img{
        width: 100%;
    }
    .list_four .van-col:nth-child(odd){
        padding-left: 0 !important;

    }
    .list_four .van-col:nth-child(even){
        padding-right: 0 !important;;

    }
</style>