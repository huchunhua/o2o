<template>
    <div class="discover-container">
        <van-nav-bar title="发现" fixed/>
        <van-loading class="page-Loading" size="32px" v-if="isLoading" vertical>加载中</van-loading>
        <ul v-if="!isLoading" style="padding-top: 46px">
            <li v-for="(item,index) in dataList" :key="index">
                <div class="item-cover">
                    <img :src="item.pageCover">
                </div>
                <van-cell :title="item.pageName" :label="item.pageJingle">
                    <van-button plain @click="onViewPage(item.pageSerial)">点击查看</van-button>
                </van-cell>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "discover",
        data() {
            return {
                isLoading: true,
                dataList: []
            }
        },
        created() {
            let self = this;
            self.$model.page.discover().then(function (res) {
                self.dataList = res;
                self.isLoading = false;
            }).catch(function (err) {
                console.warn(err)
            })
        },
        methods: {
            onViewPage(pageSerial) {
                this.$toast('敬请期待');
                return false;
                this.$router.push({name: 'PageView', params: {pageSerial: pageSerial, isReturn: true}})
            }
        }
    }
</script>

<style scoped>
    .discover-container {
        /*padding: 1rem;*/
    }

    .discover-container .item-cover img {
        width: 100%;
        /*max-height: 300px;*/
    }

    .discover-container .item-footer {
        font-size: .865rem;
        padding: .75rem 1rem;
        color: #666;
    }

    .discover-container ul li {
        background: #fff;
        box-shadow: 0px 0px 10px #ddd;
        margin-bottom: 1rem;
    }

    .discover-container ul li >>> .van-cell {
        padding: 10px;
    }

    .discover-container ul li >>> .van-cell .van-cell__title {
        max-width: 75%;
    }
    .discover-container ul li >>> .van-cell .van-cell__title span {
        font-weight: bold;
        color: #666;
    }
    .discover-container ul li >>> .van-cell .van-cell__title .van-cell__label {
        width: 100%;
        overflow: hidden;
        height: 20px;
        line-height: 20px;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 0;
    }
    .discover-container ul li >>> .van-cell .van-cell__value {
        justify-content: flex-end;
        align-items: center;
        display: flex;
    }

    .discover-container ul li >>> .van-cell .van-cell__value .van-button {
        border: 1px solid #fb8e06;
        border-radius: 2rem;
        height: 1.75rem;
        line-height: 1.5rem;
        color: #fb8e06;
        font-size: .75rem;
    }

    .page-Loading {
        margin-top: 3rem;
        padding: 10rem 0;
        text-align: center;
    }

    .item-cover {
        max-height: 250px;
        overflow: hidden;
    }
</style>