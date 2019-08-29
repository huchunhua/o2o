<template>
    <div class="coupon-index ">
        <van-nav-bar title="我的卡券" left-arrow fixed @click-left="$utoo.navigate.close()"/>
        <div class="pageLoading" v-if="!isLoaded">
            <van-loading type="spinner"/>
        </div>
        <div class="page-content"  v-if="isLoaded">
            <div v-for="(item,index) in dataList" class="coupon" :key='index' @click="changeInedx(index,item.voucher_code,item.type)">
                <img :src="item.voucher_t_customimg">
                <img src="@/assets/images/ticket_ysy.png" class="mark" v-if="item.voucher_state == 2">
                <img src="@/assets/images/ticket_ysx.png" class="mark" v-if="item.voucher_state == 3">
            </div>
            <van-dialog v-model="show" :title="dataList[showIndex].voucher_code" v-if="dataList.length > 0">
                <div style="font-weight: bold;color:#666">{{dataList[showIndex].voucher_title}}</div>
                <div class="price" style="color: #ff6400;font-weight: bold;">￥{{dataList[showIndex].voucher_price}}
                </div>
                <qriously :value="dataList[showIndex].voucher_code" :size="150"/>
                <van-divider style="margin: 0">使用规则</van-divider>
                <div class="padding-10" v-html="dataList[showIndex].voucher_desc"></div>
            </van-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "voucherlist",
        data() {
            return {
                isLoaded: false,
                dataList: [],
                showIndex: 0,
                show: false
            }
        },
        created() {
            let self = this;
            self.$http.post('http://api.sichuan.95504.net/index.php?act=member_voucher&op=voucher_list&curpage=1&page=100').then(function (res) {
                self.dataList = res.voucher_list;
                setTimeout(function(){
                    self.isLoaded = true;
                }, 1000);
            }).catch(function (err) {
                self.$toast(err);
            });
        },
        methods: {
            changeInedx(index,oldcode,type) {
                let self = this;
                self.show = true;
                self.showIndex = index;
                if(type == 3){
                    self.$http.post('http://api.sichuan.95504.net/index.php?act=login&op=newCode',{oldcode:oldcode}).then(function (res) {
                        self.dataList[self.showIndex].voucher_code = res.code;
                        setTimeout(function(){
                            self.isLoaded = true;
                        }, 1000);
                    }).catch(function (err) {
                        self.$toast(err);
                    });
                }

            },
        }
    }
</script>

<style scoped>
    .coupon-index {
        padding-top: 46px;
    }
    .page-content {
        padding: 10px;
    }



    .pageLoading {
        z-index: 1000;
        position: absolute;
        width: 100%;
        top: 46px;
        bottom: 0;
        display: flex;
        text-align: center;
    }
    .pageLoading>.van-loading {
        margin: auto;
        display: flex;
        justify-content:center;
        align-items:Center;
    }

    .van-dialog {
        text-align: center;
    }

    .coupon {
        position: relative;
        margin-bottom: 5px;
    }

    img {
        width: 100%;
    }

    .coupon .mark {
        position: absolute;
        top: 0;
        right: 0;
        width: 4rem;
        height: 4rem
    }

    .padding-10 {
        padding: 0 1rem;
        height: 5rem;
        overflow: auto;
    }
</style>