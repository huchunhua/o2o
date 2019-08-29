<template>
    <div style="width:100%;background:#FFFAFA;">
        <!-- 导航 -->
        <div>
            <div class="nav">
                <img
                        @click="fanhui"
                        class="returnImg"
                        src="../../../assets/images/o2o/返回 (1)_wps图片.png"
                        alt
                />
                <div class="navInput">
                    <van-search @focus="sousuo" placeholder="搜索商品" v-model="navInput"/>
                </div>
                <img
                        v-if="shoucang"
                        @click="shoucangstore"
                        class="shoucang"
                        src="../../../assets/images/o2o/收藏 (1)_wps图片.png"
                        alt
                />
                <div
                        style="font-size:14px;color:rgb(51,51,51);margin-top:8px;margin-left:12px;"
                        v-if="sousuoButton"
                >搜索
                </div>
            </div>
        </div>
        <div v-if="shoucang">
            <!-- 商店信息 -->
            <!-- <Address :title="storeData" /> -->
            <div class="shop">
                <div class="shopName">
                    <div>
                        <img style="width:62px;height:62px;" :src="storeData.storeLogo" alt/>
                    </div>
                    <div style="margin-left:15px;">
                        <p style="font-weight:bold;">{{storeData.storeName}}</p>
                        <div>
                            <van-rate size="10px" readonly="true" v-model="storeData.storeStar"/>
                        </div>
                        <p
                                style="font-size:12px;color:#999999"
                        >时间：{{storeData.storeSaleTime}}-{{storeData.storeRestTime}}</p>
                    </div>
                </div>
                <div class="address">
                    <div style="margin-top:10px;">
                        <p
                                style="font-size:14px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;width:240px;"
                        >{{storeData.storeAddress}}</p>
                        <p style="font-size:12px;color:#999999;margin-top:5px;">距离你当前位置{{distance}}</p>
                    </div>
                    <div style="display:flex;margin-top:10px;">
                        <div style="padding-right:5px;border-right: 1px solid #ECECEC;">
                            <img style="width:42px;height:36px;" src="../../../assets/images/o2o/定位_03.jpg" alt/>
                        </div>
                        <div style="padding-left:5px;">
                            <img style="width:42px;height:34px;" src="../../../assets/images/o2o/电话_03.jpg" alt/>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 优惠券 -->
            <div class="coupon">
                <p style="font-weight:bold;">优惠券</p>
                <div style="margin-top:5px;display:flex;overflow-x:scroll;;flex-wrap:nowrap">
                    <div class="coupon2">
                        <div>
                            <p style="font-size:16px;margin-left:-2px;font-weight:bold;margin-top:4px;">￥10</p>
                            <p style="font-size:12px;margin-top:2px;">满100元可用</p>
                            <p
                                    style="font-size:10px;color:#999999; -webkit-transform: scale(0.9);margin-left:-5px;margin-top:2px;"
                            >除酒以外所有商品可用</p>
                        </div>
                        <div>
                            <p
                                    style="width:15px;color:#FDC21E;font-size:12px;margin-left:-20px;margin-top:15px;"
                            >领取</p>
                        </div>
                    </div>
                    <div class="coupon2">
                        <div>
                            <p style="font-size:16px;margin-left:-2px;font-weight:bold;margin-top:4px;">￥10</p>
                            <p style="font-size:12px;margin-top:2px;">满100元可用</p>
                            <p
                                    style="font-size:10px;color:#999999; -webkit-transform: scale(0.9);margin-left:-5px;margin-top:2px;"
                            >除酒以外所有商品可用</p>
                        </div>
                        <div>
                            <p
                                    style="width:15px;color:#FDC21E;font-size:12px;margin-left:-20px;margin-top:15px;"
                            >领取</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 商品详情 -->
            <div id="tabs">
                <van-tabs
                        background="#FFFAFA"
                        line-width="30"
                        line-height="2"
                        color="#fdc21e"
                        v-model="activeName"
                        type="line"
                        :swipeable="true"
                >
                    <van-tab title="推荐商品" name="a">
                        <div style="display:flex;">
                            <div>
                                <van-sidebar v-model="activeKey">
                                    <van-sidebar-item
                                            v-for="item in classList"
                                            :key="item.classId"
                                            :title="item.className"
                                            @click="shangpingChange"
                                    />
                                </van-sidebar>
                            </div>
                            <div style="width:100%;">
                                <div
                                        v-for="item in productData"
                                        :key="item.productId"
                                        :id="item.productId"
                                        class="goods"
                                >
                                    <div style="display:flex;">
                                        <div
                                                style="width:70px;height:70px;border-radius:4px;border:1px solid rgba(236,236,236,1);"
                                        >
                                            <img
                                                    style="width:70px;height:70px;border-radius:5px;"
                                                    :src="item.productImage"
                                                    alt
                                            />
                                        </div>
                                        <div>
                                            <p style="margin-left:10px;font-weight: bold;">{{item.productName}}</p>
                                            <p
                                                    style="margin-left:10px;margin-top:30px;font-weight: bold;"
                                            >￥{{item.productPrice}}</p>
                                        </div>
                                    </div>
                                    <div style="display:flex;align-items:flex-end">
                                        <div @click="minus" :class="{minus:display,minus1:noDisplay}">
                                            <p
                                                    :id="item.productId"
                                                    :name="item.productNum"
                                                    style="margin-top:-20px;margin-left:1px;"
                                            >-</p>
                                        </div>
                                        <p :class="{number:display,number1:noDisplay}">{{count}}</p>
                                        <div class="plus" @click="plus">
                                            <p
                                                    :id="item.productId"
                                                    :name="item.productNum"
                                                    style="margin-top:-6px;margin-left:2px;"
                                            >+</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="推荐服务" name="b">
                        <div style="display:flex;">
                            <div>
                                <van-sidebar v-model="activeKey">
                                    <van-sidebar-item
                                            v-for="item in fuwuList"
                                            :key="item.classId"
                                            :title="item.className"
                                            @click="fuwuChange"
                                    />
                                </van-sidebar>
                            </div>
                            <div style="width:100%;">
                                <Service :fuwuData="fuwuData"/>
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
        <!-- 底部 -->
        <div>
            <div class="footer">
                <div style="width:70%;background-color:#333333;display:flex;">
                    <div
                            @click="showPopupFooter"
                            ref="gouwuche"
                            :class="{gouwuche:display,gouwuche1:noDisplay}"
                    >
                        <!-- <img
                          @click="showPopupFooter"
                          src="../../../assets/images/o2o/pic_bag_black_wps图片.png"
                          alt
                        />-->
                    </div>
                    <span class="price">￥ {{extendInfo}}</span>
                    <div :class="{count:display,count1:noDisplay}" class="count">
                        <p>{{count}}</p>
                    </div>
                </div>
                <div @click="jumpOrder" :class="{payment1:display,payment:noDisplay}">
                    <p>去结算</p>
                </div>
            </div>
            <!-- 底部弹出层 -->
            <van-popup v-model="footerShow" position="bottom" :style="{ height: '35%' }">
                <div
                        style="display:flex;justify-content:flex-end;margin:10px 10px;padding-bottom:10px;border-bottom:1px solid rgb(236,236,236);box-sizing:border-box;"
                >
                    <img
                            style="width:14px;height:14px;padding-right:5px;margin-top:2px;"
                            src="../../../assets/images/o2o/删除 (1)_wps图片.png"
                            alt
                    />
                    <p @click="clear" style="font-size:12px;color:rgba(102,102,102,1);line-height:17px;">清空</p>
                </div>
                <div>
                    <!-- <Goods :productData="productData" /> -->
                    <div v-for="item in productList" :key="item.productId" class="goods">
                        <div style="display:flex;">
                            <div
                                    style="width:70px;height:70px;border-radius:4px;border:1px solid rgba(236,236,236,1);"
                            >
                                <img style="width:70px;height:70px;border-radius:5px;" :src="item.productImage" alt/>
                            </div>
                            <div>
                                <p style="margin-left:10px;font-weight: bold;">{{item.productName}}</p>
                                <p
                                        style="margin-left:10px;margin-top:30px;font-weight: bold;"
                                >￥{{item.productPrice}}</p>
                            </div>
                        </div>
                        <div style="display:flex;align-items:flex-end">
                            <div @click="minus" :class="{minus:display,minus1:noDisplay}">
                                <p
                                        :id="item.productId"
                                        :number="item.productNum"
                                        style="margin-top:-20px;margin-left:1px;"
                                >-</p>
                            </div>
                            <p :class="{number:display,number1:noDisplay}">{{count}}</p>
                            <div class="plus" @click="plus">
                                <p
                                        :id="item.productId"
                                        :number="item.productNum"
                                        style="margin-top:-6px;margin-left:2px;"
                                >+</p>
                            </div>
                        </div>
                    </div>
                    <div style="height:44px;"></div>
                </div>
            </van-popup>
        </div>
        <!-- 搜索弹出内容 -->
        <div v-if="sousuoButton" style="padding-top:12px;padding-left:15px;">
            <p style="font-size:14px;font-weight:600;color:rgb(51,51,51);">店内热门搜索</p>
            <div style="display:flex;margin-top:10px;">
                <p
                        style="width:50px;height:26px;background:rgb(244,244,244);border-radius:13px;font-size:12px;padding:5px 13px;box-sizing:border-box;margin-right:10px;"
                >薯片</p>
                <p
                        style="width:62px;height:26px;background:rgb(244,244,244);border-radius:13px;font-size:12px;padding:5px 13px;box-sizing:border-box;margin-right:10px;"
                >餐巾纸</p>
                <p
                        style="width:62px;height:26px;background:rgb(244,244,244);border-radius:13px;font-size:12px;padding:5px 13px;box-sizing:border-box;margin-right:10px;"
                >方便面</p>
                <p
                        style="width:74px;height:26px;background:rgb(244,244,244);border-radius:13px;font-size:12px;padding:5px 13px;box-sizing:border-box;"
                >农夫山泉</p>
            </div>
        </div>
        <div style="height:44px;"></div>
    </div>
</template>

<script>
    import axios from "axios";
    import Nav from "@/components/industry/nav";
    import Address from "@/components/industry/address";
    import Coupon from "@/components/industry/coupon";
    import Goods from "@/components/industry/goods";
    // import Footer from "@/components/industry/footer";
    import Service from "@/components/industry/service";

    export default {
        components: {
            Nav,
            Address,
            Coupon,
            Goods,
            Service
        },
        data() {
            return {
                navInput: "",
                activeName: "a",
                activeKey: 0,
                footerShow: false,
                sousuoButton: false,
                shoucang: true,
                count: 0,
                display: false,
                noDisplay: true,
                distance: "",
                storeData: {
                    distance: 6488.34,
                    sales: 2,
                    storeAddress: "四川省成都市高新区中海国际大厦D座601",
                    storeId: "storeId1",
                    storeImage:
                        "http://sichuan.95504.net/v4/upload/images/20190808/0826ba3f5e00596bd79a471f44f99306.jpg",
                    storeLatitude: "30.584047317505",
                    storeLogo:
                        "http://sichuan.95504.net/v4/upload/images/20190808/0826ba3f5e00596bd79a471f44f99306.jpg",
                    storeLongitude: "104.05434417725",
                    storeName: "大龙燚火锅",
                    storePhone: "13689050710",
                    storeRestTime: "22:00",
                    storeSaleTime: "09:00",
                    storeStar: 5
                },
                classList: [],
                fuwuList: [],
                productData: [],
                fuwuData: [],
                productList: [],
                extendInfo: "0",
                getFormGoods: "",
                cartKey: ""
            };
        },
        created() {
        },
        mounted() {
            this.getData();
            this.conversion(this.storeData.distance);
        },
        methods: {
            shoucangstore(e) {
                e.target.src =
                    "data:image/png;base64,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";
                axios
                    .post("industry/collection/addCollection", {
                        type: 1,
                        storeId: "storeId1"
                    })
                    .then(res => {
                        const {data} = res;
                        this.productData = data;
                    });
            },
            async shangpingChange(index) {
                await axios
                    .post("industry/store/storeProductList", {
                        class: this.classList[index].classId,
                        storeId: "storeId1"
                    })
                    .then(res => {
                        const {data} = res;
                        this.productData = data;
                    });
            },
            async fuwuChange(index) {
                await axios
                    .post("industry/store/storeProductList", {
                        class: this.fuwuList[index].classId,
                        storeId: "storeId1"
                    })
                    .then(res => {
                        const {data} = res;
                        this.fuwuData = data;
                    });
            },
            sousuo() {
                this.sousuoButton = true;
                this.shoucang = false;
            },
            fanhui() {
                this.sousuoButton = false;
                this.shoucang = true;
            },
            plus(e) {
                console.log(e.target.id);
                console.log(e.target.name);
                if (this.count === 0) {
                    axios
                        .post("industry/cart/add", {
                            productId: e.target.id,
                            productNum: e.target.className
                        })
                        .then(res => {
                            console.log(res);
                        });
                } else {
                    axios.post("industry/cart/incre", {
                        productId: e.target.id
                    });
                }
                this.display = true;
                this.noDisplay = false;
                this.count++;
            },
            minus(e) {
                if (this.count === 1) {
                    this.display = false;
                    this.noDisplay = true;
                    axios.post("industry/cart/del", {
                        productId: e.target.id
                    });
                }
                axios.post("industry/cart/reduce", {
                    productId: e.target.id
                });
                this.count--;
            },
            clear() {
                axios
                    .post("industry/cart/clear", {
                        storeId: "storeId1"
                    })
                    .then(res => {
                        console.log(res);
                    });
            },
            async showPopupFooter(e) {
                if (this.count !== 0) {
                    this.footerShow = true;
                    await axios
                        .post("industry/cart/index", {
                            storeId: "storeId1"
                        })
                        .then(res => {
                            const {productList} = res;
                            const {extendInfo} = res;
                            this.extendInfo = extendInfo.totalAmount;
                            Object.assign(this.productList, productList);
                        });
                    console.log(this.productList);
                }
            },
            async jumpOrder() {
                let cartId = [];
                for (let index = 0; index < this.productList.length; index++) {
                    cartId.push(this.productList[index].cartId);
                }
                let cartIds = cartId.join(",");
                await axios
                    .post("industry/trade/getCartsKey", {
                        cartIds
                    })
                    .then(res => {
                        this.cartKey = res.cartKey;
                    });
                if (this.count > 0) {
                    this.$router.push(`/industryOrder/${this.cartKey}`);
                }
            },
            getData() {
                axios
                    .post("/", {
                        headers: {
                            token: "30580467dc91ac73f803158acdba57a5"
                        }
                    })
                    .then(res => {
                        const {nearbyStation} = res;
                        axios
                            .post("/industry/store/storeList", {
                                params: {
                                    sort: 1,
                                    latitude: nearbyStation.latitude,
                                    longitude: nearbyStation.longitude,
                                    categoryId: "storeId1",
                                    storeRecommended: 1
                                }
                            })
                            .then(res => {
                                axios
                                    .post("industry/store/storeInfo", {
                                        latitude: "28.985232435108",
                                        longitude: "35.830019946836",
                                        storeId: "storeId1"
                                    })
                                    .then(res => {
                                        const {storeInfo} = res;
                                        Object.assign(this.storeData, storeInfo);
                                    });
                            });
                    });
                axios
                    .post("industry/store/storeClassList", {
                        type: 1,
                        storeId: "storeId1"
                    })
                    .then(res => {
                        Object.assign(this.classList, res);
                    });
                axios
                    .post("industry/store/storeClassList", {
                        type: 2,
                        storeId: "storeId1"
                    })
                    .then(res => {
                        Object.assign(this.fuwuList, res);
                    });
                axios
                    .post("industry/store/storeProductList", {
                        class: "classId1",
                        storeId: "storeId1"
                    })
                    .then(res => {
                        const {data} = res;
                        Object.assign(this.productData, data);
                    });
            },
            conversion(data) {
                //换算距离
                if (data < 1000) {
                    this.distance = data + "m";
                } else if (data > 1000) {
                    this.distance = (Math.round(data / 100) / 10).toFixed(1) + "km";
                }
            }
        }
    };
</script>

<style scoped src="../../../assets/styles/commodity.css">
</style>