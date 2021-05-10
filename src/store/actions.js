export default {
  addCart({state,commit},payload){
    let oldProduct = state.cartList.find(item => item.iid === payload.iid)
    if(oldProduct){
      //购物车已存在该商品，数量+1
      commit("addCount",oldProduct)
    }
    else{
      commit('addGood',payload)
    }
  }
}
