<template>
    <div class="car-detail">
        <van-nav-bar title="编辑车辆信息" left-arrow @click-left="$router.back()" fixed/>
        <div class="car-info">
            <van-cell-group>
                <van-cell title="汽车品牌" :value="brandName"/>
                <van-cell title="汽车车系" :value="seriesName"/>
                <van-cell title="汽车车型" :value="productName"/>
                <van-cell title="车牌号码" :value="license"/>
                <van-cell title="购买日期" :value="buyTimeText" is-link @click="showBuyTimePicker = true"/>
            </van-cell-group>
            <van-cell-group>
                <van-cell title="汽车燃油号" :value="oilCodeText" is-link @click="showOilCodePicker = true"/>
                <van-field v-model="weekMoney" label="月加油费用" placeholder="请填写月加油费用" type="number" input-align="right"
                           clearable/>
                <van-field v-model="mileage" label="行驶里程数" placeholder="请填写行驶里程数(公里)" type="number" input-align="right"
                           clearable/>
            </van-cell-group>
            <div class="page-submit">
                <van-button size="large" @click="onSaveEdit(id)">保存</van-button>
            </div>
        </div>
        <van-popup v-model="showOilCodePicker" position="bottom">
            <van-picker show-toolbar :columns="OilCodeColumns" @cancel="showOilCodePicker = false"
                        @confirm="onOilCodeConfirm" :default-index="1"/>
        </van-popup>
        <van-popup v-model="showBuyTimePicker" position="bottom">
            <van-datetime-picker
                    ref="timePicker"
                    v-model="BuyTimeColumns"
                    type="year-month"
                    :formatter="formatter"
                    :max-date="maxDate"
                    @cancel="showBuyTimePicker = false"
                    @confirm="onBuyTimeConfirm"
                    @change="onBuyTimeChange"
            />
        </van-popup>
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
                dataInfo:{},
                showOilCodePicker: false,
                showBuyTimePicker: false,
                OilCodeColumns: ['#0','#92','#95','#98'],
                BuyTimeColumns: new Date(),
                oilCodeText: '',
                buyTimeText: '',
                maxDate: new Date()
            }
        },
        created() {
            this.getDataFn()
        },
        methods: {
            onSaveEdit(id) {
                let _this = this;
                let buyTime = _this.buyTimeText;
                let oil = _this.oilCodeText;
                let weekMoney = _this.weekMoney;
                let mileage = _this.mileage;
                _this.$http.post('member/car/editMemberCar',{id:id,buyTime:buyTime,oil:oil,weekMoney:weekMoney,mileage:mileage}).then(response => {
                    _this.$toast('保存成功');
                    _this.$router.go(-2);
                });
            },
            getDataFn() {
                let _this = this;
                let id = _this.$route.params.id;
                _this.id = id;
                _this.$http.post('member/car/getMemberCarDetail', {id: id}).then(response => {
                    _this.dataInfo = response;
                    _this.id = response.id;
                    _this.brandName = response.brandName;
                    _this.seriesName = response.seriesName;
                    _this.productName = response.productName;
                    _this.license = response.license;
                    _this.buyTimeText = response.buyTime == '' ? '' : response.buyTime;
                    _this.oilCodeText = response.oil;
                    _this.weekMoney = '' + response.weekMoney;
                    _this.mileage = '' + response.mileage;
                });
            },
            onOilCodeConfirm(e) {
                this.oilCodeText = e;
                this.showOilCodePicker = false;
            },
            onBuyTimeConfirm(e) {
                // this.buyTime = e.toString();
                // console.log(this.$refs.timePicker.getValues());
                // this.buyTimeText = e;
                this.showBuyTimePicker = false;
            },
            onBuyTimeChange(picker) {
                let values = picker.getValues();
                this.buyTimeText = values[0]+'-'+values[1];

            },
            formatter(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                } else if (type === 'month') {
                    return `${value}月`
                }
                return value;
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

    .car-info >>> .van-cell-group {
        margin-bottom: 10px;
    }

    .car-info >>> .van-cell .van-cell__title {
        flex: none;
    }
</style>
