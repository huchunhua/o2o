<template>
    <div class="integral-index">
        <van-nav-bar title="积分明细" left-arrow fixed @click-left="$utoo.navigate.close()"/>
        <div class="page-content">
            <div id="pointscount" class="nctouch-asset-info">
                <div class="container point">
                    <i class="icon"></i>
                    <dl>
                        <dt>我的积分</dt>
                        <dd>
                            <em>{{info.point}}</em>
                        </dd>
                    </dl>
                </div>
            </div>
            <van-cell v-for="item in lists" :key="item.pl_id" :title="item.pl_desc" >
                <span style="color: red">{{'+'+item.pl_points}}</span>
            </van-cell>
        </div>
    </div>
</template>

<script>
    export default {
        name: "member-integral",
        data() {
            return {
                info:'',
                lists:''
            }
        },
        created() {
            let self = this;
            self.$http.post('http://api.sichuan.95504.net/index.php?act=member_index&op=my_asset').then(function (res) {
                self.info = res;
            });
            self.$http.post('http://api.sichuan.95504.net/index.php?act=member_points&op=pointslog&curpage=1&page=10').then(function (res) {
                self.lists = res.log_list;
                console.log(self.lists)
            })
        },
        methods: {
        }
    }
</script>

<style scoped>
    .integral-index {
        padding-top: 46px;
    }

    .nctouch-asset-info .container.point {
        background: #F6BB43;
        height:4.14rem;
    }
    .nctouch-asset-info .container {
        position: relative;
        z-index: 1;
        height: 3rem;
    }
    .nctouch-asset-info .point .icon {
        background-image: url(../../../assets/images/mcc_10_w.png);
    }
    .nctouch-asset-info .container dl {
        margin: 0 0.5rem 0 5.5rem;
        padding: 0.5rem 0;
        text-align: right;
        color:#fff;
    }
</style>