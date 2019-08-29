<template>
  <div>
    <div class="nav">
      <img class="returnImg" src="../../assets/images/o2o/返回 (1)_wps图片.png" alt />
      <div class="navInput">
        <van-search @focus="sousuo" placeholder="搜索商品" v-model="navInput" />
      </div>
      <img class="shoucang" src="../../assets/images/o2o/收藏 (1)_wps图片.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navInput: ""
    };
  },
  created() {},
  methods: {
    sousuo() {
      // this.show = true;
    }
  }
};
</script>

<style scoped>
p {
  margin: 0px;
}
.nav {
  display: flex;
  padding-left: 20px;
  padding-right: 15px;
  background-color: white;
}
.returnImg {
  width: 19px;
  height: 19px;
  margin-top: 8px;
}
.navInput {
  width: 276px;
  height: 30px;
  margin-left: 15px;
}
.van-search {
  padding: 0px;
  border-radius: 50%;
}
.van-search__content {
  border-radius: 20px;
}
.shoucang {
  width: 22px;
  height: 22px;
  margin-top: 7px;
  margin-left: 15px;
}
</style>