<template>
    <div class="member-bill-index">
        <div class="bill-filter">
            <van-button size="small" @click="actionTypeShow = true">{{actionTypeOptText}}
                <van-icon name="arrow-down"/>
            </van-button>
            <van-button size="small" @click="actionTimeShow = true">{{actionTime}}
                <van-icon name="arrow-down"/>
            </van-button>
        </div>
        <van-action-sheet v-model="actionTypeShow" :actions="actionTypeOptions" @select="onSelectType"/>
        <van-popup v-model="actionTimeShow" position="bottom">
            <van-datetime-picker v-model="actionTimeCurrentDate" type="year-month" :max-date="actionTimeMaxDate"
                                 :formatter="timeFormat" @cancel="actionTimeShow = false" @confirm="onSelectTime"/>
        </van-popup>
        <van-cell class="total-info" :value="listTotal.totalAmount" v-if="listData.length > 0">
            <div slot="title" class="total-title">
                <h3>当月总消费</h3>
                <span>(共{{listTotal.totalCount}}笔)</span>
            </div>
            <span slot="label" class="total-label">
                共为您节省{{listTotal.totalDiscount}}
            </span>
        </van-cell>
        <van-list :v-model="false" :finished="true" v-if="listData.length > 0">
            <van-cell v-for="item in listData" :key="item.id" :title="item.billName" :value="'-'+item.billAmount"
                      @click="onBillDetail(item.type,item.id)" is-link>
                <div slot="label" class="van-cell__extend">
                    <span class="billType">{{item.typeText}}</span>
                    <span class="billTime">{{item.billTime}}</span>
                </div>
                <img v-if="item.type == 1" slot="icon" class="van-cell__image"
                     src="@/assets/images/icon.fuel.png"/>
                <img v-if="item.type == 2" slot="icon" class="van-cell__image"
                     src="@/assets/images/icon.shop.png"/>
                <img v-if="item.type == 3" slot="icon" class="van-cell__image"
                     src="@/assets/images/icon.mobile.png"/>
                <img v-if="item.type == 4" slot="icon" class="van-cell__image"
                     src="@/assets/images/icon.card.png"/>
            </van-cell>
        </van-list>
        <norecord icon="empty" :label="actionTime+' 无消费'" v-if="listData.length == 0"/>
    </div>
</template>

<script>
    export default {
        name: "fuel",
        data() {
            return {
                /**
                 * type: 1-加油，2-商品，3-话费, 4-油卡
                 */
                listTotal: {},
                listData: [],
                actionType: 0,
                actionTime: 0,
                actionTypeShow: false,
                actionTypeOptText: '全部',
                actionTypeOptions: [
                    {name: '全部', type: 0},
                    {name: '加油', type: 1},
                    {name: '商品', type: 2},
                    {name: '话费', type: 3},
                    {name: '油卡', type: 4}
                ],
                actionTimeShow: false,
                actionTimeMaxDate: new Date(),
                actionTimeCurrentDate: new Date()
            };
        },
        created() {
            let that = this,query = that.$route.query;
            that.$store.dispatch("bill/showTab");
            that.$store.dispatch("bill/selectTab", 0);
            that.actionTime = that.dateToString(new Date());
            if(query.type != undefined && query.type == 1) {
                that.actionType = query.type;
                that.actionTypeOptText = '加油';
            }
            that._loadData(that.actionTime, that.actionType);
        },
        methods: {
            _loadData(time, type) {
                let that = this;
                that.$model.bill.getBillList({time: time, type: type}).then(function (res) {
                    that.listData = res.dataList;
                    that.listTotal = res.dataTotal;
                }).catch(function (err) {
                    that.$toast(err);
                    console.warn(err);
                });

            },
            onSelectType(item) {
                this.actionType = item.type;
                this.actionTypeShow = false;
                this.actionTypeOptText = item.name;
                this._loadData(this.actionTime, this.actionType);
            },
            onBillDetail(type, id) {
                this.$router.push({name: 'BillDetail', params: {type: type, id: id}});
            },
            onSelectTime(value) {
                let time = this.dateToString(value);
                this.actionTime = time;
                this.actionTimeShow = false;
                this._loadData(this.actionTime, this.actionType);
            },
            timeFormat(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                } else if (type === 'month') {
                    return `${value}月`
                }
                return value;
            },
            dateToString(date) {
                var year = date.getFullYear();
                var month = (date.getMonth() + 1).toString();
                var day = (date.getDate()).toString();
                if (month.length == 1) {
                    month = "0" + month;
                }
                if (day.length == 1) {
                    day = "0" + day;
                }
                var dateTime = year + "-" + month;
                return dateTime;
            }
        }
    }
</script>
<style scoped>

</style>

<style scoped>
    .bill-filter {
        padding: 10px;
        background: #f4f4f4;
    }

    .bill-filter .van-button {
        border: none;
        border-radius: 50px;
        padding: 0 15px;
    }

    .bill-filter .van-button:last-child {
        float: right;
    }

    .bill-filter .van-icon {
        margin-left: 5px;
    }

    .total-info {
        padding: 15px;
    }

    .total-title h3 {
        display: inline-block;
        margin: 0;
    }

    .total-title span {
        font-size: 12px;
        color: #999;
        margin-left: 10px;
    }

    .total-label {
        color: #F4BC2B;
    }

    .van-cell__title {
        margin-left: 10px;
        margin-right: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .van-cell__value {
        font-weight: bold;
        font-size: 16px;
        color: #333;
        flex: unset;
    }

    .van-cell__image {
        width: 1.75rem;
        height: 1.75rem;
        margin-top: .25rem;
    }

    .van-cell__extend span {
        display: block;
    }

    .van-cell__extend span.billType {
        color: #333333;
    }

    .total-info .van-cell__value {
        font-size: 22px;
    }

    .total-info .van-cell__title {
        margin-left: 0;
    }
</style>