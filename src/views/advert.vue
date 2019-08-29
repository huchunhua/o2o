<template>
    <div class="page-container">
        <van-nav-bar :title="pageConfig.pageTitle ? pageConfig.pageTitle : ''" @click-left="isReturn ? $router.back() : $utoo.navigate.close()" left-arrow fixed />
        <PageMaker v-if="!isLoading" :source="pageContent"/>
        <van-loading class="page-Loading" size="32px" v-if="isLoading" vertical>加载中</van-loading>
    </div>
</template>

<script>
    import PageMaker from '@/components/pageMaker'
    export default {
        name: "page",
        components: {
            PageMaker:PageMaker
        },
        data() {
            return {
                isReturn: false,
                isLoading: true,
                pageConfig:{},
                pageContent: []
            }
        },
        created() {
            let self = this,queryParams = self.$route.params;
            if(queryParams.isReturn != undefined) {
                self.isReturn = queryParams.isReturn
            }
            self.$model.page.detail({
                pageSerial:queryParams.pageSerial
            }).then(function (res) {
                self.pageConfig = res.config;
                self.pageContent = res.dataList;
                self.setPageMeta(res.config);
                self.isLoading = false;
            }).catch(function (err) {
                console.warn(err)
            })
        },
        methods: {
            setPageMeta(pageConfig) {
                document.title = pageConfig.pageTitle;
                document.body.style.backgroundColor = pageConfig.bgColor;
                document.body.style.backgroundImage = pageConfig.bgImage ? 'url('+pageConfig.bgImage+')' : '';
                document.body.style.paddingTop = pageConfig.marginTop+'px';
            }
        }
    }
</script>

<style scoped>
    .page-Loading {
        margin-top: 3rem;
        padding: 10rem 0;
        text-align: center;
    }
    .page-container {
        padding-top: 46px;
    }
</style>