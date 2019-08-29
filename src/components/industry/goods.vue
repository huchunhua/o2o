<template>
  <div>
    <div v-for="item in productData" :key="item.productId" :id="item.productId" class="goods">
      <div style="display:flex;">
        <div style="width:70px;height:70px;border-radius:4px;border:1px solid rgba(236,236,236,1);">
          <img style="width:70px;height:70px;border-radius:5px;" :src="item.productImage" alt />
        </div>
        <div>
          <p style="margin-left:10px;font-weight: bold;">{{item.productName}}</p>
          <p style="margin-left:10px;margin-top:30px;font-weight: bold;">￥{{item.productPrice}}</p>
        </div>
      </div>
      <div style="display:flex;align-items:flex-end">
        <div @click="minus" :class="{minus:display,minus1:noDisplay}">
          <p
            :id="item.productId"
            :class="item.productName"
            style="margin-top:-20px;margin-left:1px;"
          >-</p>
        </div>
        <p :class="{number:display1,number1:noDisplay1}">{{count.number}}</p>
        <div class="plus" @click="plus">
          <p
            :id="item.productId"
            :class="item.productName"
            style="margin-top:-6px;margin-left:2px;"
          >+</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    productData: {
      type: Array,
      default: ["hello,word"]
    }
  },
  data() {
    return {
      count: {
        number: 0
      },
      display: false,
      noDisplay: true,
      display1: false,
      noDisplay1: true
    };
  },
  created() {},
  mounted() {
    // console.log(this.productData);
    // console.log(this.productData.length);
  },
  beforeUpdate(){
    const counts = this.productData.length;
    // console.log(this.productData.length);
  },
  methods: {
    plus(e) {
      this.$emit("func", this.count);
      if (this.count.number === 0) {
        axios
          .post("industry/cart/add", {
            productId: e.target.id,
            productNum: e.target.className
          })
          .then(res => {
            console.log(res);
          });
      } else {
        axios.post("industry/cart/incre", {
          productId: e.target.id
        });
      }
      this.display = true;
      this.noDisplay = false;
      this.display1 = true;
      this.noDisplay1 = false;
      this.count.number++;
    },
    minus(e) {
      if (this.count.number === 1) {
        this.display = false;
        this.noDisplay = true;
        this.display1 = false;
        this.noDisplay1 = true;
        axios.post("industry/cart/del", {
          productId: e.target.id
        });
      }
      axios.post("industry/cart/reduce", {
        productId: e.target.id
      });
      this.count.number--;
    }
  }
};
</script>

<style scoped>
p {
  margin: 0px;
}
.plus {
  width: 20px;
  height: 20px;
  border: 1px solid #fdc21e;
  background-color: #fdc21e;
  border-radius: 50%;
  font-size: 22px;
  color: white;
}
.minus {
  width: 20px;
  height: 20px;
  border: 1px solid #fdc21e;
  border-radius: 50%;
  font-size: 40px;
  color: #fdc21e;
  margin-right: 10px;
  display: block;
}
.minus1 {
  display: none;
}
.number {
  padding-bottom: 1px;
  margin-right: 10px;
  display: block;
}
.number1 {
  display: none;
}
.goods {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
</style>