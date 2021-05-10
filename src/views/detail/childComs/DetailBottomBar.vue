<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";

export default {
  name: "DetailBottomBar",
  data() {
    return {
      isShouCang: false
    };
  },
  computed: {
    // 对象写法可以自己命名
    // ...mapGetters({
    //   cartLength: "cartListLength"
    // })
  },
  created() {
    // 每次刷新页面获取本地存储购物车数据
    // let list = JSON.parse(localStorage.getItem("cartList")) || [];
    // if (list) {
    //   this.$store.commit("setCartList", list);
    // }
  },
  methods: {
    addToCart() {
      this.$emit("addToCart");
    },
    starClick() {
    //   if (!this.isShouCang) {
    //     this.$toast("收藏成功");
    //     this.isShouCang = true;
    //   } else {
    //     this.$toast("已取消收藏");
    //     this.isShouCang = false;
    //   }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  position: fixed;
  z-index: 999;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 49px;
  background-color: #fff;

  display: flex;
  text-align: center;
}
  .bar-item{
    flex: 1;
    display: flex;
  }
  .bar-item>div{
    flex: 1;
  }
  .bar-left .text{
    font-size: 13px;
  }
  .bar-left .icon{
    display: block;
    width: 22px;
    height: 22px;
    margin: 5px auto 3px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }
  .bar-left .service{
    background-position: 0 -54px;
  }
  .bar-left .shop{
    background-position: 0 -98px;
  }
  .bar-right{
    font-size: 15px;
    color: #fff;
    line-height: 58px;
  }
  .bar-right .cart{
    background-color: #ffe817;
    color: #333;
  }
  .bar-right .buy{
    background-color: #f69;
  }
</style>
