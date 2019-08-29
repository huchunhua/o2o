<template>
    <div class="member-collect-index">
        <van-nav-bar title="我的收藏" left-arrow fixed @click-left="$utoo.navigate.close()"/>
        <van-tabs v-model="tabActiveName"  @click="onClick">
            <van-tab title="店铺" name="1">
                <div class="tab-content" v-if="lists.length > 0"> 
                    <van-swipe-cell  v-for="item in lists" :on-close="onClose" :name="item.id">
                        <van-card
                          :desc="item.storeAddress"  
                          :thumb="item.storeLogo"
                        >
                          <div slot="title">
                            <van-row type="flex" justify="space-between">
                              <van-col span="12">{{item.storeName}}</van-col>
                              <van-col span="12" class='text-right'>{{item.distance}}</van-col>
                            </van-row>
                          </div>                      
                        </van-card>

                        <template slot="right">
                            <van-button square type="danger" text="删除" />
                        </template>
                    </van-swipe-cell>
                </div>
                <div class='order-no' v-else>
                  <img src="../../assets/images/o2o/pic_null.png">
                  <p>暂无收藏店铺</p>
                  <div class="btn-tohome">随便逛逛</div>
                </div>
            </van-tab>
            <van-tab title="商品" name="2">
              <div v-for="item in lists" v-if="lists.length > 0">
                <van-cell :value="item.storeName" />
                <van-swipe-cell  v-for="item in item.product" :on-close="onClose" :name="item.id">
                  <van-card
                    :price="item.productPrice"
                    :title="item.productName"
                    :thumb="item.productImage"
                  />
                  <template slot="right">
                    <van-button square type="danger" text="删除" />
                  </template>
                </van-swipe-cell>
              </div>
              <div class='order-no' v-else>
                <img src="../../assets/images/o2o/pic_null.png">
                <p>暂无收藏商品</p>
                <div class="btn-tohome">随便逛逛</div>
              </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import orderItem from '@/components/order-item'
    export default {
        name: "index",
        components: {
            orderItem
        },
        data() {
            return {
                tabActiveName: 'all',
                type:1,
                lists:[]    
            }
        },
        created() {
          let _this = this;
          _this.onLoadData()        
        },
        methods: {
            onClick(name, title) {
              let _this = this;
              _this.type = name;
              _this.onLoadData()
            },
            onLoadData() {
              let _this = this;
              let type = _this.type;
              _this.lists = [];
              _this.$http.post('industry/collection/collectionList',{type:type}).then(function (res) {
                _this.lists = res
              });             
            },
            onClose(clickPosition, instance,detail) {
              let _this = this;
              switch (clickPosition) {
                case 'left':
                case 'cell':
                case 'outside':
                  instance.close();
                  break;
                case 'right':
                _this.$dialog.confirm({
                    message: '确认删除这个收藏吗?',
                    confirmButtonText: '删除',
                    confirmButtonColor: 'red'
                }).then(() => {
                  let id = detail.name;
                  _this.$http.post('industry/collection/delCollection',{id:id}).then(function (res) {
                    _this.$toast("已取消收藏");
                    _this.onLoadData()
                  });  
                  instance.close()
                })
                  break;
              }
            }
        }
    }
</script>

<style scoped>
    .member-collect-index {
        padding-top: 46px;
    }
    .van-card{
      background-color: #fff;
      padding: 10px 15px;
    }
    .van-card__thumb{
        width: 50px;
        height: 50px;
    }
    .van-card__content{
        min-height: 50px;
    }
    .order-no{
      text-align: center;
      padding-top: 100px;
      font-size:14px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(153,153,153,1);
    }
    .btn-tohome{
      margin:0 auto;
      width:140px;
      height:40px;
      line-height: 40px;
      background:rgba(253,194,30,1);
      border-radius:4px;
      color:#fff;
      text-align: center;
    }
    .text-right{
        text-align: right;
    }
    .van-tag{
        margin-right: 5px;
    }
    .van-button{
        height: 78px;
        line-height: 78px;
    }
</style>