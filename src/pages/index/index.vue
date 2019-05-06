<template>
  <div>
    <!-- 搜索 -->
    <div class="search">
      <div class="input-box">
        <input type="text" placeholder="请输入商品" >
      </div>
      <!-- 搜索结果 -->
      <div class="result"></div>
    </div>
    <!-- 轮播图 -->
    <swiper class="banner" indicator-dots indicator-color="rgba(255,255,255,0.6)" indicator-active-color="#fff">
      <swiper-item :key="key" v-for="(list, key) in bannerList">
        <navigator :url="list.navigator_url">
          <image :src="list.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 导航 -->
    <div class="navs">
      <navigator :key="key" :url="list.navigator_url" v-for="(list, key) in navList">
        <image :src="list.image_src"></image>
      </navigator>
    </div>
    <!-- 楼层 -->
    <div class="floors">
      <div class="floor" v-for="(list, key) in floorsList" :key="key">
        <div class="title">
          <image :src="list.floor_title.image_src"></image>
        </div>
        <div class="pics">
          <navigator v-for="(item, index) in list.product_list" :key="index" :url="item.navigator_url">
            <image :src="item.image_src"></image>
          </navigator>
        </div>
      </div>
    </div>
    <!-- 回顶部 -->
    <span class="gotop" @click="goTop" v-show="!isTop"></span>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  data () {
    return {
      bannerList: [],
      navList: [],
      floorsList: [],
      isTop: true
    }
  },
  methods: {
    async getBanner () {
      let {message} = await request({
        url: '/api/public/v1/home/swiperdata'
      })
      this.bannerList = message
    },
    async getNavs () {
      let {message} = await request({
        url: '/api/public/v1/home/catitems'
      })
      this.navList = message
    },
    async getFloors () {
      let {message} = await request({
        url: '/api/public/v1/home/floordata'
      })
      this.floorsList = message
    },
    goTop () {
      mpvue.pageScrollTo({
        scrollTop: 100
      })
    }
  },
  created () {
    this.getBanner()
    this.getNavs()
    this.getFloors()
  },
  onPageScroll (e) {
    this.isTop = e.scrollTop < 200
  },
  onPullDownRefresh () {
    this.getBanner()
    this.getNavs()
    this.getFloors()
    mpvue.stopPullDownRefresh()
  }
}
</script>

<style scoped lang="less">
  .search {
    .input-box {
      background-color: #ea4451;
      padding: 20rpx 30rpx;

      input {
        height: 75rpx;
        background-color: #fff;
        padding-left: 15rpx;
        border-radius: 8rpx;
        font-size: 27rpx;
        color: #666;
      }
    }
  }

  // 轮播图
  .banner {
    width: 750rpx;
    height: 340rpx;

    navigator {
      width: 100%;
      height: 100%;
    }
  }

  // 导航
  .navs {
    display: flex;
    justify-content: space-between;
    padding: 30rpx 40rpx;

    navigator {
      width: 128rpx;
      height: 140rpx;
    }
  }

  // 楼层
  .floors {
    .title {
      width: 750rpx;
      height: 60rpx;
      padding-top: 27rpx;
      padding-left: 15rpx;
      background-color: #f4f4f4;
    }
    .pics {
      padding: 20rpx 18rpx;
      overflow: hidden;

      navigator {
        height: 188rpx;
        margin-left: 10rpx;
        margin-bottom: 10rpx;
        float: left;
      }
      navigator:first-child {
        width: 232rpx;
        height: 386rpx;
        margin-left: 0;
      }
      navigator:nth-child(2) {
        width: 273rpx;
      }
      navigator:nth-child(3) {
        width: 193rpx;
      }
      navigator:nth-child(4) {
        width: 193rpx;
      }
      navigator:last-child {
        width: 273rpx;
      }
    }
  }

  // 回顶部
  .gotop {
    position: fixed;
    bottom: 60rpx;
    right: 30rpx;
    width: 88rpx;
    height: 88rpx;
    border-radius: 50%;
    background-color: hotpink;
  }
</style>
