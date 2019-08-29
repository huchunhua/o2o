<template>
    <div class="promotion-store-street">
        <van-nav-bar title="逛好店" left-arrow fixed @click-left="$utoo.navigate.close()"/>
        <div class="page-content">
            <!-- <street-item class="street-item" v-for="item in listData" :itemId="item.id" :title="item.title" :label="item.label"
                         :image="item.image" :tag="item.tag" :item="item.item"/> -->
        </div>
    </div>
</template>

<script>
    import streetItem from '@/components/mall/store/street-item';

    export default {
        name: "street",
        components: {
            'street-item': streetItem
        },
        data() {
            return {
                listData: []
            }
        },
        created() {
            let self = this;
            self.$model.mall.storeStreet().then(function (res) {
                self.listData = res;
            }).catch(function (err) {
                console.warn(err);
                self.$toast(err);
            });
            // this.$store.dispatch("common/onLoaded");
        }
    }
</script>

<style scoped>
    .promotion-store-street {
        padding-top: 46px;
        background: #eee;
    }
    .page-content {
        margin-top: 10px;
    }
    .page-content .street-item {
        background: #fff;
        margin-bottom: 10px;
    }
</style>