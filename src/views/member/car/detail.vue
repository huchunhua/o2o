<template>
    <div class="car-detail">
        <van-nav-bar title="车辆信息" right-text="编辑" left-arrow @click-left="$router.back()" @click-right="onEditCar(id)"
                     fixed/>
        <div class="car-info">
            <van-cell-group>
                <van-cell title="汽车品牌" :value="brandName"/>
                <van-cell title="汽车车系" :value="seriesName"/>
                <van-cell title="汽车车型" :value="productName"/>
                <van-cell title="车牌号码" :value="license"/>
                <van-cell title="购买日期" :value="buyTime"/>
            </van-cell-group>
            <van-cell-group>
                <van-cell title="汽车燃油号" :value="oil"/>
                <van-cell title="月加油费用" :value="weekMoney"/>
                <van-cell title="行驶里程数" :value="mileage"/>
            </van-cell-group>
            <div class="page-submit">
                <van-button type="danger" size="large" @click="onDelCar(id)">删除车辆信息</van-button>
            </div>
            <van-dialog v-model="isAuthentication" @confirm="onEditCar(id)" show-cancel-button>
                <img src="../../../assets/images/icon-integral.png" class="icon">
                <p>请完善车辆信息后<br/>可获得会员积分奖励</p>
            </van-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'car',
        data() {
            return {
                id: '',
                license: "",
                brandName: "",
                factoryName: "",
                seriesName: "",
                productName: "",
                oil: "",
                weekMoney: '',
                mileage: '',
                buyTime: '',
                default: '',
                isFirstEnter: false,
                isAuthentication: true,
                iconDialog: {
                    open: false,
                    btns: [
                        {
                            text: '确认操作',
                            handler: this.onIconConfirm,
                        },
                    ],
                },
            }
        },
        created() {
            this.getDataFn()
        },
        methods: {
            onDelCar(id) {
                let _this = this;
                _this.$http.post('member/car/setMemberCar', {id: id, type: 1}).then(response => {
                    _this.$toast('删除成功');
                    this.$router.back();
                });
            },
            onEditCar(id) {
                this.$router.push({name: 'CarEdit', params: {id: id}});
            },
            getDataFn() {
                let _this = this;
                let id = _this.$route.params.id;
                let isAuthentication = !_this.$route.params.isAuthentication;
                _this.isAuthentication = isAuthentication;
                _this.id = id;
                _this.$http.post('member/car/getMemberCarDetail', {id: id}).then(response => {
                    _this.id = response.id;
                    _this.brandName = response.brandName;
                    _this.seriesName = response.seriesName;
                    _this.productName = response.productName;
                    _this.license = response.license;
                    _this.buyTime = response.buyTime;
                    _this.oil = response.oil;
                    _this.weekMoney = '' + response.weekMoney;
                    _this.mileage = '' + response.mileage;
                });
            }
        },
    }

</script>
<style scoped>
    .car-detail {
        padding-top: 46px;
    }
    .car-info {
        padding: 10px;
    }
    .car-info .page-submit {
        padding: 20px 40px;
    }
    .car-info .page-submit .van-button {
        border-radius: 40px;
        height: 46px;
        line-height: 46px;
    }
    .car-info>>>.van-cell-group {
        margin-bottom: 10px;
    }
    .car-info>>>.van-cell .van-cell__title{
        flex: none;
    }
    .car-info>>>.van-dialog__content{
        text-align: center;
        padding: 20px 0;
        font-size: .865rem;
    }
    .car-info>>>.van-dialog__content p {
        margin: 0;
        line-height: 2;
    }
    .car-info>>>.van-dialog__content img {
        width: 4rem;
    }
</style>
