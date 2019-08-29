<template>
    <div class="main-container member-address">
        <van-nav-bar title="地址管理" left-arrow fixed @click-left="$utoo.navigate.close()"/>
        <van-address-list :list="dataList" :switchable="false" @add="onAdd" @edit="onEdit"/>
    </div>
</template>

<script>
    import areaList from '@/assets/json/area'
    export default {
        name: "member-address-index",
        data() {
            return {
                areaList,
                dataList: []
            }
        },
        created() {
            let self = this;
            self.$http.post('http://api.sichuan.95504.net/index.php?act=member_address&op=address_list').then(function (res) {
                if(res.address_list && res.address_list.length > 0) {
                    res.address_list.map(function (item) {
                        self.dataList.push({
                            id:item.address_id,
                            name:item.true_name,
                            tel:item.mob_phone,
                            address:item.area_info + ' ' + item.address,
                        })
                    })
                }
            })
        },
        methods: {
            onAdd() {
                this.$router.push({name:'AddressCreate'});
            },
            onEdit(item, index) {
                this.$router.push({name:'AddressUpdate',params:{id:item.id}});
            }
        }
    }
</script>

<style scoped>

    .member-address >>> .van-address-list {
        margin-top: 10px;
    }
</style>