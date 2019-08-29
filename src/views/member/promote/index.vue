<template>
    <div class="promote-index">
        <van-nav-bar title="员工推广" left-arrow @click-left="$utoo.navigate.close()" fixed right-text="编辑" @click-right="goEdit"/>
        <div class="page-content">
            <van-cell title="推荐人数" class="promote-mine" is-link @click="onInvite">
                <span>{{userInfo.extensionCount}}</span>当前排名{{userInfo.rank}}
            </van-cell>
            <van-cell-group>
                <van-cell title="员工姓名" :value="userInfo.name"/>
                <van-cell title="ERP编码" :value="userInfo.erpCode"/>
                <van-cell title="所属公司" :value="userInfo.companyName"/>
                <van-cell title="变更到（公司）" :value="userInfo.changeCompanyName" v-if="userInfo.audit !== 1" :label="statue" />
                <van-cell title="所属油站" :value="userInfo.stationName"/>
                <van-cell title="变更到（加油站）" :value="userInfo.changeStationName" v-if="userInfo.audit !== 1" :label="statue" />
                <van-cell title="职位" :value="identityText"/>
                <van-cell title="变更职位" :value="changeidentityText" :label="statue" />
            </van-cell-group>
            <van-cell title="我的推广码" class="promote-code" is-link @click="onQrcode">
                <img src="../../../assets/images/icon-code.png">
            </van-cell>
            <van-tabs>
                <van-tab title="推广员排行" class="personRank">
                    <ul class="table-thead">
                        <li>员工姓名</li>
                        <li>所属油站</li>
                        <li>推广人数</li>
                    </ul>
                        <ul class="table-tbody" v-for="(item,index) in person" :key="index">
                            <li>{{item.member_realname}}</li>
                            <li>{{item.erp_stationCode}}</li>
                            <li>{{item.erp_extensionNumber}}</li>
                        </ul>
                </van-tab>
                <van-tab title="加油站排行" class="stationRank">
                    <ul class="table-thead">
                        <li>油站姓名</li>
                        <li>油站名称</li>
                        <li>推广人数</li>
                    </ul>
                        <ul class="table-tbody" v-for="(item,index) in station" :key="index">
                            <li></li>
                            <li>{{item.stationName}}</li>
                            <li>{{item.stationExtensionNum}}</li>
                        </ul>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                userInfo: '',
                person: [],
                station: [],
                identityText:'',
                statue:'',
                changeidentityText:''
            }
        },
        created() {
            let _this = this;
            _this.$http.post('member/staffer/staffInfo').then(response => {
                _this.userInfo = response.userInfo;
                _this.person = response.promoterRank;
                _this.station = response.stationRank;
               switch(_this.userInfo.identity) {
                     case 1:
                        _this.identityText = '站长';
                        break;
                     case 2:
                        _this.identityText = '加油员';
                        break;                     
                    case 3:
                        _this.identityText = '综管员';
                        break;
                     default:
                        _this.identityText = '';
                };               
                switch(_this.userInfo.changeIdentity) {
                     case 1:
                        _this.changeidentityText = '站长';
                        break;
                     case 2:
                        _this.changeidentityText = '加油员';
                        break;                     
                    case 3:
                        _this.changeidentityText = '综管员';
                        break;
                     default:
                        _this.changeidentityText = '';
                };
                switch(_this.userInfo.audit) {
                     case 0:
                        _this.statue = '审核中';
                        break;
                     case 1:
                        _this.statue = '审核通过';
                        break;                     
                    case 2:
                        _this.statue = '未通过';
                        break;
                     default:
                        _this.statue = '';
                };                
            });
        },
        methods: {
            onInvite() {
                this.$router.push({name: 'PromoteInvite'});
            },
            onQrcode() {
                this.$router.push({name: 'PromoteQrcode'});
            },
            goEdit(){
                this.$router.push({name:'Editstuff'})
            }
        }
    }
</script>

<style scoped>
    .promote-index {
        padding-top: 46px;
    }

    .page-content {
        padding: 5px;
    }

    .promote-mine {
        margin-bottom: 10px;
        padding: 20px 15px;
    }
    .promote-mine>>>.van-cell__title {
        font-size: 18px;
    }
    .promote-mine>>>.van-cell__value span {
        font-size: 16px;
        font-weight: bold;
        color: #E84327;
        margin-right: 10px;
    }
    .promote-code>>>.van-cell__value img{
        width: 1rem;
        height: 1rem;
        margin: 4px;
        display: block;
        float: right;
    }
    .page-content .van-tabs {
        margin-top: 10px;
        background: #fff;
    }
    .table-thead, .table-tbody {
        display: flex;
        margin: 0;
        padding: 10px 20px;
    }
    .table-thead {
        background: #e6f4ff;
    }
    .table-thead li, .table-tbody li {
        flex: 1;
        font-size: 14px;
        color: #666;
    }
    .table-tbody li{
        padding: 5px;
    }
    .table-tbody li:first-child {
        padding-left: 30px;
    }
    .table-thead li:last-child, .table-tbody li:last-child {
        text-align: right;
    }
    .table-thead li:nth-child(2), .table-tbody li:nth-child(2) {
        text-align: center;
    }
    .table-tbody:nth-child(2) li:nth-child(1) {
        background:url(../../../assets/images/1st.png) no-repeat left center;
        background-size: 24px;
    }
    .table-tbody:nth-child(3) li:nth-child(1) {
        background:url(../../../assets/images/2nd.png) no-repeat left center;
        background-size: 24px;
    }
    .table-tbody:nth-child(4) li:nth-child(1) {
        background:url(../../../assets/images/3rd.png) no-repeat left center;
        background-size: 24px;
    }
    .table-tbody:nth-child(5) li:nth-child(1) {
        background:url(../../../assets/images/4th.png) no-repeat left center;
        background-size: 24px;
    }
    .table-tbody:nth-child(6) li:nth-child(1) {
        background:url(../../../assets/images/5th.png) no-repeat left center;
        background-size: 24px;
    }
</style>