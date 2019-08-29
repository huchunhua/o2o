<template>
    <div class="car-series">
        <van-nav-bar title="选择汽车车型" left-arrow @click-left="$router.push({name:'CarIndex'})" fixed/>
        <div class="page-content">
            <van-cell class="brand-info" :title="brand">
                <img class="brand_logo" slot="icon" :src="logo"/>
            </van-cell>
            <van-index-anchor index="选择汽车型号"/>
            <!-- <van-cell v-for="item in lists" :title="item.name" is-link @click="addnum(item.id,item.name)"/> -->

        </div>
    </div>
</template>

<script>
    export default {
        name: 'cartype',
        data() {
            return {
                logo: '',
                value: '',
                lists: []
            }
        },
        created() {
            let _this = this,id = _this.$route.params.id,logo = _this.$route.params.logo,brand = _this.$route.params.name;
            _this.id = id;
            _this.logo = logo;
            _this.brand = brand;
            _this.$http.post('member/car/getProductLists', {seriesId: id}).then(response => {
                _this.lists = response.lists;
                _this.logo = response.logo;
                _this.value = response.value;
            });
        },
        methods: {
            addnum(id, name) {
                let _this = this,logo = _this.logo,brand = _this.brand;
                this.$router.replace({name: 'CarLicense', params: {id: id, logo: logo, brand: brand, name: name, id: id}});
            }
        },
    }

</script>
<style scoped>
    .car-series {
        padding-top: 46px;
    }

    .brand-info {
        line-height: 3rem;
        font-weight: bold;
    }

    .brand-info img {
        width: 3rem;
        height: 3rem;
        margin-right: 10px;
    }

    .page-content >>> .van-cell .van-cell__title {
        font-size: 14px;
    }
</style>
