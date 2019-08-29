<template>
    <div class="question-detail">
        <van-nav-bar title="常见问题" left-arrow fixed @click-left="$router.back()"/>
        <div class="page-content">
            <span class="questionTitle">{{dataInfo.questionTitle}}</span>
            <div class="questionContent" v-html="dataInfo.questionContent"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "service",
        data() {
            return {
                dataInfo: []
            }
        },
        created() {
            let params = this.$route.params;
            this.onLoadData(params.id);
        },
        methods: {
            onLoadData(id) {
                let self = this;
                self.$model.system.questionInfo({id:id}).then(function (res) {
                    self.dataInfo = res;
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
    .question-detail {
        padding-top: 46px;
    }

    .page-content {
        margin-top: 5px;
        padding:0 1rem;
        background: #fff;
    }

    .questionTitle {
        margin: 0;
        padding: 1rem 0;
        border-bottom: 1px solid #eee;
        display: block;
        font-weight: 600;
        font-size: 1rem;
    }
    .questionContent {
        padding: 1rem 0;
    }
    .questionContent>>>* {
        margin: 0;
        font-size: .865rem;
    }

</style>