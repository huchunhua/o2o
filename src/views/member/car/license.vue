<template>
    <div class="car-license">
        <van-nav-bar title="输入车牌号" left-arrow @click-left="$router.push({name:'CarIndex'})" fixed/>
        <div class="page-content">
            <div class="carinfo">
                <img :src="logo" class="logo">
                <div>
                    <p class="brand">{{brand}}</p>
                    <p class="type">{{name}}</p>
                </div>
            </div>
            <div class="carnum">
                <van-field v-model="license" placeholder="请输入车牌号"/>
            </div>
            <div class="btn" :id="id" @click="save(id)">保存</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'carnum',
        created() {
            let _this = this,id = _this.$route.params.id,logo = _this.$route.params.logo,brand = _this.$route.params.brand,name = _this.$route.params.name;
            _this.id = id;
            _this.logo = logo;
            _this.brand = brand;
            _this.name = name;
        },
        data() {
            return {
                name: '',
                logo: '',
                id: '',
                license: ''
            }
        },
        methods: {
            save(id) {
                let _this = this,license = _this.license,rules = /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/;
                if (rules.test(license)) {
                    _this.$http.post('member/car/addCar', {productId: id, license: license}).then(response => {
                        _this.$toast('保存成功');
                        _this.$router.back();
                        // _this.$router.replace({name: 'CarIndex'});
                    });
                } else {
                    _this.$toast('请正确填写车牌号')
                }
            }
        },
    }

</script>
<style scoped>
    .car-license {
        padding-top: 46px;
    }
    .page-content {
        margin-top: 20px;
    }
    .carinfo {
        margin: 0 20px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 34px 1px rgba(115, 115, 115, 0.19);
        border-radius: 10px;
        display: flex;
        font-size: 1rem;
        padding: 1rem;
    }

    .carinfo .logo {
        width: 3rem;
        height: 3rem;
        margin-right: 1rem;
    }
    .carinfo div {
        padding: 5px;
        flex: 1;
    }

    .brand {
        margin: 0;
        text-align: left
    }

    .type {
        margin: 0;
        font-size: .75rem;
        color: #999
    }

    .carnum {
        margin: 20px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 34px 1px rgba(115, 115, 115, 0.19);
        border-radius: 10px;
    }
    .carnum>>>.van-cell{
        border-radius: 10px;
        height: 3rem;
        line-height: 2rem;
    }

    .btn {
        margin: 0 20px;
        height: 2.5rem;
        line-height: 2.5rem;
        background: rgba(236, 78, 39, 1);
        border-radius: 2rem;
        font-size: .865rem;
        color: #fff;
        text-align: center;
    }
</style>
