<template>
    <div class="staff-edit">
        <van-nav-bar title="修改信息" left-arrow @click-left="$router.back()" fixed/>
        <van-cell-group>
            <van-cell title="员工姓名" :value="userInfo.name"/>
            <van-cell title="ERP编码" :value="userInfo.erpCode"/>
            <div data-v-4f16a0d3="" class="van-cell van-field">
                <div class="van-cell__title van-field__label"><span>公司/油站</span></div>
                <van-cell style="padding: 10px 0;" :value="company" is-link @click="showPicker = true"/>
            </div>
        </van-cell-group>
        <van-cell title="职位" :value="identityText" is-link @click="showIdentity = true"/>
        <van-popup v-model="showPicker" position="bottom">
            <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @change="onPickerChange" @confirm="onPickerConfirm"/>
        </van-popup>
        <van-popup v-model="showIdentity" position="bottom">
            <van-picker show-toolbar :columns="OilCodeColumns" @cancel="showIdentity = false"
                        @confirm="onIdentityConfirm" :default-index="1"/>
        </van-popup>
        <div class="ident-submit">
            <van-button type="primary" size="large" @click="onSubmit">确认</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ident",
        data() {
            return {
                showPicker: false,
                company: '请选择所属公司/油站',
                dataPicker: [],
                dataInfo: {
                    member_mobile: '',
                    member_passwd: '',
                    member_truename: '',
                    member_erpcode: '',
                    member_station: ''
                },
                userInfo:{
                    name:'',
                    erpCode:''
                },
                columns: [],
                identityText:'',
                OilCodeColumns: ['站长','加油员','综管员'],
                showIdentity:false,
                identity:'',
                oilCode:''
            }
        },
        created() {
            let self = this, dataPicker = [];
            self.$http.post('member/staffer/detail',{}).then(response => {
                self.userInfo.name = response.realName;
                self.userInfo.erpCode = response.stationCode;
                self.erpCode = response.erpCode;
                self.identity = response.identity;
                self.oilCode = response.stationCode;
                self.company = response.stationName;
                switch(self.identity) {
                     case 1:
                        self.identityText = '站长';
                        break;
                     case 2:
                        self.identityText = '加油员';
                        break;                     
                    case 3:
                        self.identityText = '综管员';
                        break;
                     default:
                        self.identityText = '';
                } 
            });
            self.$model.common.stafferCompany().then(response => {
                response.map((item) => {
                    let children = [];
                    item.children.map((station) => {
                        children[station.label] = {
                            code: station.value
                        }
                    });
                    dataPicker[item.label] = {
                        code: item.value,
                        children: children
                    }
                    self.dataPicker = dataPicker;
                });
                self.columns = [
                    {
                        values: Object.keys(dataPicker),
                        className: 'column1'
                    },
                    {
                        values: Object.keys(dataPicker[Object.keys(dataPicker)[0]].children),
                        className: 'column2',
                        defaultIndex: 2
                    }
                ];
            });
        },
        methods: {
            onPickerChange(picker, values) {
                let self = this;
                picker.setColumnValues(1, Object.keys(self.dataPicker[values[0]].children));
            },
            onPickerConfirm(e) {
                let self = this,
                    company = self.dataPicker[e[0]],
                    station = company.children[e[1]],
                    companyCode = company.code,
                    stationCode = station.code;
                self.dataInfo.member_station = stationCode;
                self.company = e[0]+'/'+e[1];
                self.showPicker = false;
            },
            onSubmit() {
                let self = this;
                let oilCode = self.dataInfo.member_station ? self.dataInfo.member_station : self.oilCode;
                let identity = self.identity;
                self.$http.post('member/staffer/edit',{oilCode:oilCode,identity:identity}).then(response => {
                    self.$toast('信息已修改，等待管理员审核');
                });
            },
            onIdentityConfirm(e){
                let self = this;
                self.identityText = e;
                self.showIdentity = false;
                switch(self.identityText) {
                     case '站长':
                        self.identity = 1;
                        break;
                     case '加油员':
                        self.identity = 2;
                        break;                     
                    case '综管员':
                        self.identity = 3;
                        break;
                     default:
                        self.identity= '';
                } 
            }
        }
    }
</script>

<style scoped>
    .staff-edit {
        padding-top: 46px;
    }


    .staff-edit >>> .van-cell.van-field {
        display: block;
    }

    .staff-edit >>> .van-cell .van-cell__title {
        font-weight: bold;
        font-size: 12px;
    }

    .staff-edit .ident-submit {
        padding: 10px;
    }

    .staff-edit .ident-submit >>> .van-button {
        background: linear-gradient(to right, #E73E28, #FA7B2D);
        border: none;
        border-radius: 40px;
        line-height: 40px;
        height: 40px;
    }
</style>