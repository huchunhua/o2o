<template>
    <div class="staffer-ident">
        <div class="page-title" v-if="!isBinded">中国石油员工认证</div>
        <van-cell-group v-if="!isBinded">
            <van-field ref="mobile" :error="false" v-model="dataInfo.member_mobile" type="number" label="手机号码" placeholder="请输入您的优途账户关联的手机号码" clearable/>
            <van-field v-model="seccode" label="验证码" placeholder="请输入短信验证码" clearable>
                <p slot="button" style="color: #eb4c29" @click="getSeccode">获取验证码</p>
            </van-field>
            <van-field v-model="dataInfo.member_passwd" label="登陆密码" type="password" placeholder="请设置优途登陆密码" clearable/>
            <van-field v-model="dataInfo.member_truename" label="真实姓名" placeholder="请输入真实姓名" clearable/>
            <van-field v-model="dataInfo.member_erpcode" label="ERP编码" placeholder="请输入员工ERP编码" clearable/>
            <div data-v-4f16a0d3="" class="van-cell van-field">
                <div class="van-cell__title van-field__label"><span>公司/油站</span></div>
                <van-cell style="padding: 10px 0;" :value="company" is-link @click="showPicker = true"/>
            </div>
            <van-cell title="职位" :value="identityText" is-link @click="showIdentity = true"/>
        </van-cell-group>
        <van-popup v-model="showPicker" position="bottom">
            <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @change="onPickerChange" @confirm="onPickerConfirm"/>
        </van-popup>
        <van-popup v-model="showIdentity" position="bottom">
            <van-picker show-toolbar :columns="OilCodeColumns" @cancel="showIdentity = false"
                        @confirm="onIdentityConfirm" :default-index="1"/>
        </van-popup>
        <div class="ident-submit" v-if="!isBinded">
            <van-button type="primary" size="large" @click="onSubmit">确认</van-button>
        </div>
        <div class="staffer-idented" v-if="isBinded">
            <img src="../../../assets/images/logo.png">
            <p class="title">恭喜您，绑定成功</p>
            <p class="tips">你的优途账号为</p>
            <p class="tips account">{{dataInfo.member_mobile}}</p>
            <p class="tips">请使用当前注册密码登录</p>
            <van-button type="primary" size="large" @click="onDownload">点击下载</van-button>
            <p class="more">请下载 【中油优途】</p>
            <p class="more">登录后在个人中心“推广员中”查看推广码</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ident",
        data() {
            return {
                isBinded: false,
                showPicker: false,
                seccode: '',
                company: '请选择所属公司/油站',
                dataPicker: [],
                dataInfo: {
                    member_mobile: '',
                    member_passwd: '',
                    member_truename: '',
                    member_erpcode: '',
                    member_station: ''
                },
                columns: [],
                showIdentity:false,
                identityText:'',
                identity:'',
                OilCodeColumns: ['站长','加油员','综管员'],
            }
        },
        created() {
            let self = this, dataPicker = [];
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
            getSeccode() {
                let self = this, phone = self.dataInfo.member_mobile;
                self.$model.common.getSeccode({phone: phone, type: 4}).then(response => {
                    if (response.data.code == 200) {
                        self.$toast('验证码发送成功，请注意查收')
                    } else {
                        self.$toast('发送失败')
                    }
                });
            },
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
                if(!self.dataInfo.member_mobile || self.dataInfo.member_mobile.length != 11) {self.$toast('请正确填写手机号');return;}
                if(!self.seccode) {self.$toast('请输入验证码');return;}
                if(!self.dataInfo.member_passwd) {self.$toast('请正确设置密码');return;}
                let regExp =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,pwdReg = new RegExp(regExp);
                if(!pwdReg.test(self.dataInfo.member_passwd)) {
                    self.$toast('密码必须是6-16位字母与数字的组合');return;
                }
                if(!self.dataInfo.member_truename) {self.$toast('请填写真实姓名');return;}
                if(!self.dataInfo.member_erpcode) {self.$toast('请填写ERP编码');return;}
                if(!self.dataInfo.member_station) {self.$toast('请选择所属油站');return;}
                if(!self.identity) {self.$toast('请选择职位');return;}
                let params = {
                    phone: self.dataInfo.member_mobile,
                    password: self.dataInfo.member_passwd,
                    code: self.seccode,
                    name: self.dataInfo.member_truename,
                    erpCode: self.dataInfo.member_erpcode,
                    oilCode: self.dataInfo.member_station,
                    identity:self.identity
                };
                self.$model.member.stafferRegister(params).then(response => {
                    self.isBinded = true;
                });
            },
            onDownload() {
                this.$router.push({name:'Download'});
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
    .staffer-ident {
        padding: 10px;
    }

    .staffer-ident .page-title {
        font-size: 23px;
        padding: 20px 15px;
    }

    .staffer-ident >>> .van-cell.van-field {
        display: block;
    }

    .staffer-ident >>> .van-cell .van-cell__title {
        font-weight: bold;
        font-size: 12px;
    }

    .staffer-ident .ident-submit {
        padding: 10px;
    }

    .staffer-ident .ident-submit >>> .van-button {
        background: linear-gradient(to right, #E73E28, #FA7B2D);
        border: none;
        border-radius: 40px;
        line-height: 40px;
        height: 40px;
    }
    .staffer-idented {
        padding: 30px;
        text-align: center;
    }
    .staffer-idented img {
        width: 6rem;
    }
    .staffer-idented p {
        margin: 0;
    }
    .staffer-idented .title{
        font-size: 24px;
        padding: 20px 0;
    }
    .staffer-idented .tips{
        color: #EA4629;
        padding: 5px 0;
        font-size: 16px;
    }
    .staffer-idented .tips.account{
        font-weight: bold;
    }
    .staffer-idented .more{
        padding: 5px 0;
        color: #999;
        font-size: 14px;
    }
    .staffer-idented>>>.van-button {
        background: linear-gradient(to right, #E73E28, #FA7B2D);
        margin: 20px 0;
        border: 0;
        border-radius: 30px;
        height: 46px;
        box-shadow: 0px 0px 10px #FA7B2D;
    }
</style>