<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="right" :to="userInfo._id ? '/userinfo': '/login'">
        <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-person"></i>
        </span>
      </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <!-- <div class="swiper-slide">
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/1.jpg" />
              </div>
              <span>甜品饮品</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/2.jpg" />
              </div>
              <span>商超便利</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/3.jpg" />
              </div>
              <span>美食</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/4.jpg" />
              </div>
              <span>简餐</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/5.jpg" />
              </div>
              <span>新店特惠</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/6.jpg" />
              </div>
              <span>准时达</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/7.jpg" />
              </div>
              <span>预订早餐</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/8.jpg" />
              </div>
              <span>土豪推荐</span>
            </a>
          </div>-->
          <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
            <a
              href="javascript:"
              class="link_to_food"
              v-for="(category, index) in categorys"
              :key="index"
            >
              <div class="food_container">
                <img :src="baseImageAUrl+category.image_url" />
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else />
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import ShopList from '../../components/ShopList/ShopList.vue'
import Swiper, { Navigation, Pagination } from 'swiper'
import 'swiper/swiper-bundle.css'
Swiper.use([Navigation, Pagination])

export default {
  data() {
    return {
      baseImageAUrl: 'https://fuss10.elemecdn.com'
    }
  },
  mounted() {
    this.$store.dispatch('getCategorys')
    this.$store.dispatch('getShops')
  },
  computed: {
    ...mapState(['address', 'categorys', 'userInfo']),
    categorysArr() {
      const { categorys } = this
      const arr = []
      let minArr = []
      categorys.forEach(c => {
        if (minArr.length === 8) {
          minArr = []
        }
        if (minArr.length === 0) {
          arr.push(minArr)
        }
        minArr.push(c)
      })
      return arr
    }
  },
  watch: {
    categorys() {
      // setTimeout(() => {
      //   const swiper = new Swiper('.swiper-container', {
      //     loop: true,
      //     Pagination: {
      //       el: '.swiper-pagination'
      //     }
      //   })
      // }, 100)
      this.$nextTick(() => {
        new Swiper('.swiper-container', {
          loop: true,
          Pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }
  },
  components: {
    HeaderTop,
    ShopList
  }
}
</script>

<style lang="stylus">
@import '../../assets/stylus/mixins.styl';

.msite // 首页
  width: 100%;

  .msite_nav
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;

    .swiper-container
      width: 100%;
      height: 100%;

      .swiper-wrapper
        width: 100%;
        height: 100%;

        .swiper-slide
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;

          .link_to_food
            width: 25%;

            .food_container
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img
                display: inline-block;
                width: 50px;
                height: 50px;

            span
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;

      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background: #02a774;

  .msite_shop_list
    top-border-1px(#e4e4e4);
    margin-top: 10px;
    background: #fff;

    .shop_header
      padding: 10px 10px 0;

      .shop_icon
        margin-left: 5px;
        color: #999;

      .shop_header_title
        color: #999;
        font-size: 14px;
        line-height: 20px;
</style>
