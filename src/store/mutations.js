import {
  ADD_COUNT,
  ADD_GOOD
} from "./types";

export default {
  [ADD_COUNT](state,payload){
    payload.count++
 },
  [ADD_GOOD](state,payload){
    payload.count = 1
    payload.checked = true
    state.cartList.push(payload)
  }
}
