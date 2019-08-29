<template>
    <div class="page-container">
        <van-nav-bar :title="pageConfig.pageTitle ? pageConfig.pageTitle : ''" @click-left="isReturn ? $router.back() : $utoo.navigate.close()" left-arrow fixed />
        <PageMaker v-if="!isLoading && pageConfig.pageType == 1" :source="pageContent"/>

        <div class="richHeader" v-if="!isLoading && pageConfig.pageType == 2">
            <span>{{pageConfig.pageJingle}}</span>
            <span>{{pageCreated}}</span>
        </div>
        <div class="richContent" v-if="!isLoading && pageConfig.pageType == 2" v-html="pageContent"/>
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
                pageCreated:'',
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
                self.pageCreated = res.pageCreated;
                self.pageConfig = res.config;
                self.pageContent = res.dataList;
                if(res.config.pageType == 2) {
                    self.pageContent = res.dataList.replace(/<p><br><\/p>/g,'');
                }
                console.log(res.dataList);
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
    .richHeader {
        padding: 1rem 1rem 0 1rem;
        background: #fff;
        font-size: 1.5rem;
        font-weight: 500;
        color: #666;
    }
    .richHeader span {
        display: block;
    }
    .richHeader span:last-child {
        font-size: .75rem;
        color: #999;
        line-height: 2rem;
        font-weight: normal;
    }
    .richContent {
        padding: 1rem;
        background: #fff;
    }
    .richContent>>>p,.richContent>>>h1,.richContent>>>h2,.richContent>>>h3,.richContent>>>h4,.richContent>>>h5 {
        margin: 0;
    }
</style>