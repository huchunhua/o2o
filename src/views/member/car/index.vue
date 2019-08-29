<template>
    <div class="car-index">
        <van-nav-bar title="我的车辆" right-text="新增车辆" left-arrow @click-left="isReturn ? $router.back() : $utoo.navigate.close()" @click-right="addcar" fixed/>
        <div class="car-list">
            <div class="car-info" v-for="carinfo in carlist" @click="goInfo(carinfo.id,carinfo.isAuthentication)">
                <div class="car-name">
                    {{carinfo.seriesName}}
                    <div class="auth" v-if="carinfo.isAuthentication">
                        <img src="../../../assets/images/ok.png" class="icon-ok">
                        已认证
                    </div>
                    <div class="toauth" v-else>
                        <img src="../../../assets/images/gift.png" class="icon-gift">
                        认证有礼
                    </div>
                </div>
                <p class="desc">{{carinfo.productName}}</p>
                <p class="num">{{carinfo.license}}</p>
                <img src="../../../assets/images/default.png" class="tagimg" v-if="carinfo.default">
                <div v-else class="setdefault" @click.stop="setdefault(carinfo.id)">设为默认</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'car',
        data() {
            return {
                isReturn: false,
                carlist: []
            }
        },
        created() {
            let _this = this,params = _this.$route.params;
            if(params.isReturn != undefined) {
                _this.isReturn = params.isReturn
            }
            _this.getData();
        },
        methods: {
            goInfo(id, isAuthentication) {
                this.$router.push({name: 'CarDetail', params: {id: id, isAuthentication: isAuthentication}});
            },
            addcar() {
                this.$router.push({name:'CarBrand'})
            },
            setdefault(id) {
                let _this = this;
                _this.$http.post('member/car/setMemberCar', {id: id, type: 2}).then(response => {
                    _this.getData();
                });
            },
            getData() {
                let _this = this;
                _this.$http.post('member/car/getMemberCarLists').then(response => {
                    _this.carlist = response;
                });
            }
        },
    }

</script>
<style scoped>
    .car-index {
        padding-top: 46px;
    }
    .car-list {
        margin-top: 10px;
    }
    .car-info {
        margin: 10px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 34px 1px rgba(115, 115, 115, 0.19);
        border-radius: 10px;
        font-size: 14px;
        padding: 15px;
        text-align: left;
        position: relative;
    }

    .car-info .car-name {
        font-size: 1rem;
        line-height: 24px;
        color: #666;
        font-weight: bold;
    }

    .car-info .auth,.car-info .toauth {
        display: inline-block;
        padding: 0px 8px;
        text-align: center;
        border-radius: 10px;
        color: #fff;
        font-size: 12px;
        line-height: 20px;
    }
    .car-info .auth {
        background-color: #ec4e27;
    }
    .car-info .toauth {
        background-color: #D5D5D5;
    }

    .car-info .auth .icon-ok, .car-info .toauth .icon-gift{
        width: 12px;
        height: 12px;
        margin: 4px 4px 4px 0;
        display: inline-block;
        float: left;
    }

    .car-info .desc {
        font-size: .75rem;
        color: #A7A7A7;
        margin: 5px 0;
    }

    .car-info .tagimg {
        position: absolute;
        top: 0;
        right: 0;
        width: 60px;
        height: 50px;
    }

    .car-info .setdefault {
        position: absolute;
        top: 20px;
        right: 10px;
        padding: 2px 10px;
        line-height: 14px;
        font-size: 12px;
        text-align: center;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(236, 78, 39, 1);
        border-radius: 20px;
        color: #EC4E27
    }
    .car-info .num {
        margin: 0;
        color: #333;
    }
</style>
