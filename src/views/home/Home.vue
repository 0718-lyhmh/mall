<template>
  <div id="home">
    <!-- 导航 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-control1" :title="['流行','新款','精选']"
                 ref="tab1"
                 v-show="isTabFixed"
                 @tabClick="tabClick"></tab-control>
    <scroll class="scroll"
            ref="scroll"
            :probe-type="3"
            @scroll="scroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <!-- 轮播图 -->
      <home-swiper :banners="banners" class="swiper" @swiperLoaded="swiperImgLoad"></home-swiper>

      <home-recommend :recommends="recommends"></home-recommend>
      <feature-view></feature-view>
      <tab-control class="tab-control" :title="['流行','新款','精选']"
                   ref="tab2"
                   @tabClick="tabClick"></tab-control>
      <goods-list :goodsList="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBack"></back-top>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/common/backtop/BackTop";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import GoodsListItem from "components/content/goods/GoodsListItem";

  import HomeSwiper from "./childComs/HomeSwiper";
  import HomeRecommend from "./childComs/HomeRecommend";
  import FeatureView from "./childComs/FeatureView";

  import {getHomeMultidata} from "network/home";
  import {getHomeGoods} from "network/home";
  import {debounce} from "../../common/utils";
  import {imgListenerMixin,backTopMixin} from "../../common/minin";

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      HomeSwiper,
      HomeRecommend,
      FeatureView,
      GoodsList,
      GoodsListItem,
      Scroll,
      BackTop
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
        currentType : 'pop',
        topOffset : 0,
        isTabFixed : false
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    mixins:[imgListenerMixin,backTopMixin],
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
        this.$refs.tab1.currentIndex = index
        this.$refs.tab2.currentIndex = index
      },
      scroll(position){
        this.isShowBack = (-position.y) > 1000
        this.isTabFixed = (-position.y) > this.topOffset

      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImgLoad(){
        this.topOffset = this.$refs.tab2.$el.offsetTop
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
          this.$refs.scroll.finishPullingUp()
        })
      },
    },
    activated() {
      // 同时刷新better-scroll防止不能滚动
      this.$refs.scroll.refresh();
    },
    //使用keep-alive才有的生命周期，actived与deactived
    deactivated() {
      //取消GoodListItem中的全局事件总线的监听
      this.$bus.$off("itemImgLoad", this.imgListener);
    }
  }
</script>

<style scoped>
  #home{
     height: 100vh;
     position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #ffffff;

    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    z-index: 9;
  }

  .scroll{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .tab-control1{
    position: relative;
    top: 44px;
    z-index: 9;
  }
  /*.fixed{*/
  /*  position: fixed;*/
  /*  top: 44px;*/
  /*  right: 0;*/
  /*  left: 0;*/
  /*}*/
</style>
