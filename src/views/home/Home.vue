<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend :recommends="recommends"></home-recommend>
    <feature-view></feature-view>
    <tab-control class="tab-control" :title="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
    <goods-list :goodsList="showGoods"></goods-list>

    <ul>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
    </ul>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import GoodsListItem from "components/content/goods/GoodsListItem";

  import HomeSwiper from "./childComs/HomeSwiper";
  import HomeRecommend from "./childComs/HomeRecommend";
  import FeatureView from "./childComs/FeatureView";

  import {getHomeMultidata} from "network/home";
  import {getHomeGoods} from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      HomeSwiper,
      HomeRecommend,
      FeatureView,
      GoodsList,
      GoodsListItem
    },
    data(){
      return{
        banners: [],
        recommends: [],
        goods: {
          'pop': {page:0, list:[]},
          'new': {page:0, list:[]},
          'sell': {page:0, list:[]},
        },
        currentType : 'pop'
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created(){
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')


    },
    methods: {
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },

      //网络请求相关函数
      getHomeMultidata(){
        getHomeMultidata().then(res =>{
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const currentpage = this.goods[type].page + 1
        getHomeGoods(type,currentpage).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    /*position: relative;*/
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #ffffff;

    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    z-index: 99;
  }
  .tab-control{
    position: sticky;
    top: 44px;
    z-index: 9;
  }
</style>
