<template>
    <div class="member-bill-stat">
        <van-nav-bar title="我的账单" left-arrow fixed @click-left="$utoo.navigate.close()"/>
        <div class="bill-filter">
            <van-button size="small" @click="filterTypeShow = true">{{filterTypeOptText}}
                <van-icon name="arrow-down"/>
            </van-button>
            <van-button size="small" @click="onShowFilter">{{filterText}}
                <van-icon name="arrow-down"/>
            </van-button>
        </div>
        <van-action-sheet v-model="filterTypeShow" :actions="filterTypeOptions" @select="onSelectType" v-if="filterTypeShow"/>
        <van-popup v-model="filterMonthShow" position="bottom" v-if="filterMonthShow">
            <van-datetime-picker title="筛选" v-model="filterMonthCurrentDate" type="year-month"
                                 :max-date="filterMonthMaxDate"
                                 :formatter="timeFormat" @cancel="filterMonthShow = false" @confirm="onSelectMonth"/>
        </van-popup>
        <van-popup v-model="filterHalfShow" position="bottom" v-if="filterHalfShow">
            <van-picker show-toolbar title="筛选" :columns="filterHalfColumns" @cancel="filterHalfShow = false"
                        @confirm="onSelectHalf" @change="onChangeHalf"/>
        </van-popup>
        <van-action-sheet v-model="filterYearShow" :actions="filterYearOptions" @select="onSelectYear" v-if="filterYearShow"/>
        <van-cell class="total-info" :value="dataTotal.totalAmount" v-if="!isEmpty">
            <div slot="title" class="total-title">
                <h3>总消费</h3>
                <span>(共{{dataTotal.totalCount}}笔)</span>
            </div>
            <span slot="label" class="total-label">
                共为您节省{{dataTotal.totalDiscount}}
            </span>
        </van-cell>
        <norecord icon="empty" :label="filterText+' 无消费'" v-if="isEmpty"/>
        <canvas id="statisticsChart"/>
    </div>
</template>

<script>
    import F2 from "@antv/f2/lib/index-all";

    const filterHalfData = {
        '2018': ['上半年', '下半年'],
        '2019': ['上半年', '下半年']
    };
    export default {
        name: "statistics",
        data() {
            return {
                isEmpty: false,
                chartObj: null,
                dataTotal: {},
                filterType: 0,
                filterTypeShow: false,
                filterTypeOptText: '按月份',
                filterTypeOptions: [
                    {name: '按月份', type: 0},
                    {name: '按半年', type: 1},
                    {name: '按年份', type: 2}
                ],
                filterValue: '',
                filterText: '',
                filterMonth: 0,
                filterHalf: 0,
                filterMonthShow: false,
                filterHalfShow: false,
                filterYearShow: false,
                filterMonthMaxDate: new Date(),
                filterMonthCurrentDate: new Date(),
                filterHalfColumns: [
                    {
                        values: Object.keys(filterHalfData),
                        className: 'year',
                        defaultIndex: 1
                    },
                    {
                        values: filterHalfData['2019'],
                        className: 'half',
                        defaultIndex: 0
                    }
                ],
                filterYearOptions: [
                    {name: '2019', type: 2019},
                    {name: '2018', type: 2018}
                ]
                // dataChart: []
            }
        },
        created() {
            let that = this;
            that.$store.dispatch("bill/showTab");
            that.$store.dispatch("bill/selectTab", 1);
            that.filterText = that.dateToString(new Date());
            that.filterValue = that.dateToString(new Date());
            that._loadData(this.filterType, this.filterValue);
        },
        methods: {
            _loadData(filterType, filterValue) {
                let that = this;
                that.$model.bill.getBillStat({type: filterType, value: filterValue}).then(function (res) {
                    that.dataTotal = res.dataTotal;
                    let dataChart = res.dataChart;
                    if(that.chartObj !== null){
                        that.chartObj.clear();
                        that.chartObj.destroy();
                        that.chartObj = null;
                    }
                    if (dataChart.length > 0) {
                        that.isEmpty = false;
                        that.createChart(dataChart);
                    } else {
                        that.isEmpty = true;
                    }
                }).catch(function (err) {
                    that.$toast(err);
                    console.warn(err);
                })
            },
            createChart(dataChart) {
                let that = this;
                that.chartObj = new F2.Chart({
                    id: 'statisticsChart',
                    pixelRatio: window.devicePixelRatio // 指定分辨率
                });
                that.chartObj.source(dataChart);
                that.chartObj.coord('polar', {
                    transposed: true,
                    radius: 0.9,
                    innerRadius: 0.5
                });
                that.chartObj.axis(false);
                that.chartObj.legend(false);
                that.chartObj.tooltip(false);
                // that.chartObj.guide().html({
                //     position: ['50%', '92%'],
                //     html: '<div style="text-align: center;width:85px;height: 40px;">' +
                //     '<p style="font-size: 12px;color: #999;margin: 0" id="title"></p>' +
                //     '<p style="font-size: 18px;color: #343434;margin: 0;font-weight: bold;" id="money"></p>' +
                //     '</div>',
                // });
                that.chartObj.interval().position('const*money').adjust('stack').color('type', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14']);
                that.chartObj.pieLabel({
                    sidePadding: 30,
                    activeShape: true,
                    label1: function label1(data) {
                        return {
                            text: '￥' + data.money,
                            fill: '#343434',
                            fontWeight: 'bold'
                        };
                    },
                    label2: function label2(data) {
                        return {
                            text: data.type,
                            fill: '#999'
                        };
                    },
                    onClick: function onClick(ev) {
                        if (ev.data) {
                            // document.querySelector('#title').innerHTML = ev.data.type;
                            // document.querySelector('#money').innerHTML = ev.data.money;
                        }
                    }
                });
                that.chartObj.render();
                if (dataChart) {
                    that.chartObj.changeData(dataChart);
                }
            },
            onSelectType(item) {
                this.filterType = item.type;
                this.filterTypeShow = false;
                this.filterTypeOptText = item.name;
            },
            onSelectMonth(value) {
                let month = this.dateToString(value);
                this.filterText = month;
                this.filterMonth = month;
                this.filterMonthShow = false;
                if (this.filterValue != month) {
                    this.filterValue = month;
                    this._loadData(this.filterType, this.filterValue);
                }
            },
            onSelectHalf(value) {
                let tmp = {'上半年': 0, '下半年': 1};
                let fValue = value[0] + '/' + tmp[value[1]];
                this.filterText = value[0] + '/' + value[1];
                this.filterHalfShow = false;
                this._loadData(this.filterType, this.filterValue);
                if (this.filterValue != fValue) {
                    this.filterValue = fValue;
                    this._loadData(this.filterType, this.filterValue);
                }
            },
            onChangeHalf(picker, values) {
                picker.setColumnValues(1, filterHalfData[values[0]]);
            },
            onSelectYear(item) {
                this.filterText = item.type;
                this.filterYearShow = false;
                if (this.filterValue != item.type) {
                    this.filterValue = item.type;
                    this._loadData(this.filterType, this.filterValue);
                }
            },
            onShowFilter() {
                let that = this;
                switch (this.filterType) {
                    case 0:
                        that.filterMonthShow = true;
                        break;
                    case 1:
                        that.filterHalfShow = true;
                        break;
                    case 2:
                        that.filterYearShow = true;
                        break;
                }
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

    .total-info, .total-item {
        padding: 15px;
    }

    .total-title h3, .total-item h3 {
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

    .total-info .van-cell__value, .total-item .van-cell__value {
        font-size: 22px;
        font-weight: bold;
        color: #333;
        flex: unset;
    }

    .total-item .van-cell__value {
        font-size: 18px;
    }

    .total-info .van-cell__title, .total-item .van-cell__title {
        margin-left: 0;
    }

    .total-item .van-cell__title {
        margin-left: 0;
        font-size: 16px;
        font-weight: normal;
    }

    #statisticsChart {
        width: 100%;
        height: 230px;
    }

    .guideWapper {
        margin-top: 80px;
    }
</style>