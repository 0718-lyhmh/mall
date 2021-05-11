<template>
  <div id="cart-bottom-bar">
    <div class="cart-bottom-check">
      <check-box
        class="check-box"
        :is-checked="isSelectAll"
        @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="cart-bottom-price">
      合计： ¥ {{ totalPrice }}元
    </div>
    <div class="cart-bottom-btn">
      <button>提交订单({{ checkedLength }})</button>
    </div>
  </div>
</template>

<script>
  import CheckBox from "./CheckBox";
  import {mapGetters} from 'vuex'
  export default {
    name: "CartBottomBar",
    components:{
      CheckBox
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        return this.cartList
          .filter(item => item.checked)
          .reduce((prev,item) => prev + item.price * item.count,0)
          .toFixed(2)
      },
      checkedLength() {
        return this.cartList.filter(item => item.checked).length;
      },
      isSelectAll(){
        if(this.cartList.length === 0)return false;
        return this.cartList.every(item => item.checked)
      }
    },
    methods:{
      checkClick(){
        if(this.isSelectAll){
          this.cartList.forEach(item => item.checked = false)
        }
        else{
          this.cartList.forEach(item => item.checked = true)
        }
      }
    }
  }
</script>

<style scoped>
#cart-bottom-bar {
  font-size: 15px;
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 45px;
  padding: 0 10px;
  border-top: 1px solid #cccccc;
}
.cart-bottom-check{
  display: flex;
  align-items: center;
}
.check-box{
  margin-right: 10px;
  width: 20px;
  height: 20px;
  /*line-height: 45px;*/
}

.cart-bottom-price {
  margin-left: 30px;
}

.cart-bottom-price span {
  color: red;
}

.cart-bottom-btn button {
  line-height: 45px;
  position: absolute;
  right: 0;
  bottom: 0;
  display: block;
  height: 45px;
  padding: 0 15px;
  color: white;
  border: 0;
  outline: none;
  background: linear-gradient(to right, #ff6034, #ee0a24);
}

.cart-bottom-btn button:active {
  opacity: 0.8;
}
</style>
