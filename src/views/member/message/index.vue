<template>
    <div class="service-index">
        <van-nav-bar title="消息中心" left-arrow fixed @click-left="$utoo.navigate.close()"/>
        <div class="page-content">
            <van-cell-group>
                <van-cell title="系统消息" label="暂无新消息" is-link>
                    <!--<van-tag round type="danger">69</van-tag>-->
                    <img slot="icon" class="item-icon" src="http://m.sichuan.95504.net/images/system.png"/>
                </van-cell>
                <van-cell title="物流消息" label="暂无新消息" is-link>
                    <img slot="icon" class="item-icon" src="http://m.sichuan.95504.net/images/delivery.png"/>
                </van-cell>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
    export default {
        name: "service",
        data() {
          return {
          }
        },
        created() {

        },
        methods: {
            onContact() {
                window.location.href = 'tel://4000303332'
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
    .item-icon{
        width: 40px;
        height: 40px;
        display: block;
        float: left;
        margin: 3px 10px 3px 0;
    }

</style>