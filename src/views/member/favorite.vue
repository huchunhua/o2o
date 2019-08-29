<template>
    <div class="main-container member-favorite">
        <van-nav-bar title="我的收藏" left-arrow right-text="分享测试" fixed @click-left="$utoo.navigate.close()"
                     @click-right="onShare"/>
        <van-grid :column-num="2" :gutter="10">
            <van-grid-item :key="index" :text="item.goods_name" v-for="(item,index) in dataList">
                <img :src="item.goods_image_url"/>
                <div class="goodsInfo">{{item.goods_name}}</div>
                <div class="goodsFooter">
                    <span>￥{{item.goods_price}}</span>
                    <van-icon name="delete" @click="onDelFavorite(item.fav_id,index)"/>
                </div>
            </van-grid-item>
        </van-grid>
    </div>
</template>

<script>
    export default {
        name: "favorite",
        data() {
            return {
                dataList: []
            }
        },
        created() {
            let self = this;
            self.$http.post('http://api.sichuan.95504.net/index.php?act=member_favorites&op=favorites_list&curpage=1&page=10').then(function (res) {
                self.dataList = res.favorites_list;
            })
        },
        methods: {
            onDelFavorite(fav_id, index) {
                let self = this;
                self.$dialog.confirm({
                    message: '确认删除这个收藏吗?',
                    confirmButtonText: '删除',
                    confirmButtonColor: 'red'
                }).then(() => {
                    self.$http.post('http://api.sichuan.95504.net/index.php?act=member_favorites&op=favorites_del', {fav_id: fav_id}).then(function (res) {
                        self.dataList.splice(index, 1);
                    })
                }).catch(() => {
                })
            },
            onShare() {
                this.$utoo.native.share({
                    share_content: "我在中油优途APP找到了一个宝贝，邀请你来看看",
                    share_img_url: "",
                    share_page_url: "http://m.sichuan.95504.net/tmpl/product_detail.html?ver=0128181237&goods_id=102599",
                    share_subtitle: "徐福记熊博士口嚼糖 葡萄味 26g",
                    share_title: "徐福记熊博士口嚼糖 葡萄味 26g"
                });
            }
        }
    }
</script>

<style scoped>

    .member-favorite > > > .van-grid {
        margin-top: 10px;
    }

    .member-favorite > > > .van-grid .van-grid-item .van-grid-item__content {
        padding: 10px;
    }

    .member-favorite > > > .van-grid .van-grid-item .van-grid-item__content img {
        width: 100%;
    }

    .member-favorite > > > .van-grid .van-grid-item .van-grid-item__content .goodsInfo {
        margin: 0;
        font-size: 14px;
        line-height: 22px;
        height: 44px;
        width: 100%;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2; /* 可以显示的行数，超出部分用...表示*/
        -webkit-box-orient: vertical;
    }

    .member-favorite > > > .van-grid .van-grid-item .van-grid-item__content .goodsFooter {
        width: 100%;
        font-size: 14px;
        margin-top: 10px;
    }

    .member-favorite > > > .van-grid .van-grid-item .van-grid-item__content .goodsFooter span {
        display: inline-block;
        float: left;
        color: #EC5464;
        font-weight: bold;
    }

    .member-favorite > > > .van-grid .van-grid-item .van-grid-item__content .goodsFooter .van-icon {
        display: inline-block;
        line-height: 20px;
        float: right;
        font-size: 16px;
    }
</style>