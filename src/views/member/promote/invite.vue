<template>
    <div class="promote-index">
        <van-nav-bar title="推广人数" left-arrow @click-left="$router.back()" @click-right="isDatePickerShow = true" fixed>
            <van-icon slot="right" name="calender-o"/>
        </van-nav-bar>
        <div class="page-content">
            <van-cell class="promote-mine" is-link>
                <div class="custom-title" slot="title">
                    {{dateValue}}邀请<span>{{invitations}}</span>人
                </div>
                合计{{total}}人
            </van-cell>
            <ul class="table-thead">
                <li>被邀请人</li>
                <li>注册时间</li>
            </ul>
            <ul class="table-tbody" v-for="(item,index) in list" :key="index">
                <li>{{item.member_mobile}}</li>
                <li>{{item.member_addTime}}</li>
            </ul>
        </div>
        <van-popup v-model="isDatePickerShow" position="bottom">
            <van-datetime-picker
                    v-model="currentDate"
                    type="year-month"
                    :formatter="formatter"
                    :max-date="currentDate"
                    @cancel="isDatePickerShow = false"
                    @confirm="onDateConfirm"
            />
        </van-popup>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                currentDate: new Date(),
                isDatePickerShow: false,
                dateValue: '2019-07',
                total:'',
                invitations:'',
                list:[]
            }
        },
        created() {
            let _this = this;
            _this.$http.post('member/staffer/extensionLists').then(response => {
                _this.total = response.total;
                _this.invitations = response.invitations;
                _this.list = response.data;
            });
        },
        methods: {
            onDateConfirm(e) {
                this.dateValue = e.getFullYear() + '-' + e.getMonth();
                this.isDatePickerShow = false;
            },
            formatter(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                } else if (type === 'month') {
                    return `${value}月`
                }
                return value;
            }
        }
    }
</script>

<style scoped>
    .promote-index {
        padding-top: 46px;
    }
    .promote-index>>>.van-nav-bar .van-nav-bar__right .van-icon{
        font-size: 22px;
        color: #666
    }


    .page-content {
        padding: 5px;
    }

    .promote-mine {
        margin-bottom: 10px;
        padding: 20px 15px;
    }
    .promote-mine .custom-title {
        font-size: 14px;
    }
    .promote-mine .custom-title span {
        color: #E84327;
        font-weight: bold;
        margin: 0 5px;
        font-size: 24px;
    }
    .table-thead, .table-tbody {
        display: flex;
        margin: 0;
        padding: 10px 15px;
        background: #fff;
    }
    .table-thead {
        background: #e6f4ff;
    }
    .table-thead li, .table-tbody li {
        flex: 1;
        font-size: 14px;
        color: #666;
    }
    .table-thead li:last-child, .table-tbody li:last-child {
        text-align: right;
    }
</style>