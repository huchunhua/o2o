<template>
    <div class="main-container member-address">
        <van-nav-bar :title="isEditMode ? '编辑' : '添加' + '地址'" left-arrow fixed  @click-left="$router.back()"/>
        <van-address-edit
                :area-list="areaList"
                show-postal
                show-delete
                show-set-default
                :address-info="dataInfo"
                @save="onSave"
                @delete="onDel"
        />
    </div>
</template>

<script>
    import areaList from '@/assets/json/area'
    export default {
        name: "member-address-edit",
        data() {
            return {
                areaList,
                isEditMode: false,
                dataInfo: {}
            }
        },
        created() {
            let self = this,params = self.$route.params;
            if(params.id && params.id != undefined && params.id > 0) {
                self.isEditMode = true;
                self.$http.post('http://api.sichuan.95504.net/index.php?act=member_address&op=address_info',{address_id:params.id}).then(function (res) {
                    self.dataInfo = {
                        id:res.address_info.address_id,
                        name:res.address_info.true_name,
                        tel:res.address_info.mob_phone,
                        addressDetail:res.address_info.address,
                        isDefault:res.address_info.is_default,
                    };
                })
            }

        },
        methods: {
            onSave(e) {
                console.log(e)
                this.$toast('save');
            },
            onDel() {
                this.$toast('delete');
            },
        }
    }
</script>

<style scoped>

    .member-address >>> .van-address-list {
        margin-top: 10px;
    }
</style>