<template>
    <div class="car-brand">
        <van-nav-bar title="选择汽车品牌" left-arrow @click-left="$router.back()" fixed/>
        <carLists @confirm="onCarSelectConfirm"></carLists>
    </div>
</template>

<script>
    import carLists from '@/components/car-lists'

    export default {
        name: 'carlist',
        components: {
            carLists
        },
        methods: {
            onCarSelectConfirm(e) {
                this.$router.replace({
                    name: 'CarSeries',
                    params: {id: e.seriesId, logo: e.carInfo.logo, name: e.carInfo.name}
                });
            }
        }
    }
</script>
<style scoped>
    .car-brand {
        padding-top: 46px;
    }
</style>