<template>
  <div id="shop-cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list/>

    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./childComs/CartList";
  import CartBottomBar from "./childComs/CartBottomBar";
  import {mapGetters} from 'vuex'
  export default {
    name: "ShopCart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  #shop-cart{
    height: 100vh;
  }
  .nav-bar {
    /*font-weight: 600;*/
    color: white;
    background-color: #ff8198;
  }
</style>
