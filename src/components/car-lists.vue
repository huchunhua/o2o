<template>
    <div class="lister-layout">
        <div class="brand-hot">
            <van-index-anchor index="热门品牌"/>
            <ul>
                <li :key="hotIndex" v-for="(hotItem,hotIndex) in brandHot" @click="onBrandSelect(hotItem)">
                    <img :src="hotItem.brandLogo"/>
                    <p>{{hotItem.brandName}}</p>
                </li>
            </ul>
        </div>
        <div class="brand-list">
            <van-index-bar>
                <div :key="index" v-for="(group,index) in brandData"
                     :id="'Letter' + group.value">
                    <van-index-anchor :index="group.value"/>
                    <van-cell :title="brandItem.brandName" v-for="(brandItem,brandIndex) in group.options" :key="brandIndex" @click="onBrandSelect(brandItem)">
                        <img class="brand_logo" slot="icon" :src="brandItem.brandLogo"/>
                    </van-cell>
                </div>
            </van-index-bar>
        </div>
        <div class="series-list">
            <van-popup v-model="showSeries" position="right" @close="showSeries = false">
                <div class="series-popup">
                    <div :key="seriesGroupIndex"
                         v-for="(seriesGroupItem,seriesGroupIndex) in seriesData">
                        <van-index-anchor :index="seriesGroupItem.value" />
                        <van-cell :title="seriesItem.seriesName"
                                  v-for="(seriesItem,seriesIndex) in seriesGroupItem.options" :key="seriesIndex"
                                  @click="onSeriesSelect(seriesItem)" is-link/>
                    </div>
                </div>
            </van-popup>
        </div>
    </div>
</template>

<script>
    export default {
        name: "car-lister",
        data() {
            return {
                showSeries: false,
                brandHot: [],
                brandData: [],
                seriesData: [],
                brandSect: [],
                seriesSect: []
            }
        },
        created() {
            let self = this;
            self.$model.common.getCarBrandLists().then(function (res) {
                self.brandData = res.lists;
                self.brandHot = res.hot;
            });
        },
        methods: {
            onBrandSelect(brandItem) {
                let self = this;
                self.$http.post("member/Car/getFactoryLists", {brandId: brandItem.brandId}).then(function (res) {
                    self.seriesData = res;
                    self.showSeries = true;
                    self.brandSect = brandItem;
                    console.log(res)
                });
            },
            onSeriesSelect(seriesItem) {
                let self = this;
                let outData = {
                    brandId: self.brandSect.brandId,
                    seriesId: seriesItem.seriesId,
                    carInfo: {
                        name: self.brandSect.brandName + '·' + seriesItem.seriesName,
                        logo: self.brandSect.brandLogo
                    }
                };
                // self.showSeries = false;
                self.$emit("confirm", outData);
            },
        }
    }
</script>

<style scoped>
    .brand-list .brand_logo {
        display: block;
        width: 2rem;
        height: 2rem;
        margin-right: 10px;
        border-radius: 30px;
        background-color: #E6E6E6;
    }
    .brand-list>>>.van-cell__title {
        line-height: 2rem;
    }

    .series-list .series-popup {
        height: 100%;
        position: relative;
        font-size: 28px;
        background-color: #FFF
    }

    .series-list >>> .van-popup {
        width: 80%;
        height: 100%;
    }

    .brand-hot ul {
        margin: 0;
        padding: .5rem 0;
    }

    .brand-hot ul li {
        width: 20%;
        padding: .5rem 0;
        display: inline-block;
        overflow: hidden;
        text-align: center;
    }

    .brand-hot ul li img {
        width: 2rem;
        height: 2rem;
    }

    .brand-hot ul li p {
        padding: 0;
        margin: 0;
        font-size: .75rem;
    }

    .md-field-heading {
        line-height: .58rem;
        padding-left: .3rem;
    }
</style>