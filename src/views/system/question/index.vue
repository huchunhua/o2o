<template>
    <div class="service-index">
        <van-nav-bar title="常见问题" left-arrow fixed @click-left="$router.back()"/>
        <div class="page-content">
            <van-cell-group>
                <van-cell v-for="(item,index) in dataList" :key="index" :title="item.questionTitle" is-link @click="onItemView(item.id)"/>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
    export default {
        name: "service",
        data() {
            return {
                dataList: []
            }
        },
        created() {
            this.onLoadData();
        },
        methods: {
            onLoadData() {
                let self = this;
                self.$model.system.questionList().then(function (res) {
                    self.dataList = res;
                }).catch(function (err) {
                    self.$toast(err);
                    console.warn(err);
                });
            },
            onItemView(id) {
                this.$router.push({name:'QuestionDetail',params:{id:id}})
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

    .page-content > > > .van-dialog .van-dialog__content {
        text-align: center;
        padding: 40px 0 30px 0;
    }

    .page-content > > > .van-dialog .van-dialog__content span {
        font-weight: bold;
    }

</style>