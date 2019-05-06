<template>
  <div>
    <search></search>
    <!-- 分类 -->
    <div class="category">
      <!-- 顶级分类 -->
      <ul class="sup">
        <scroll-view scroll-y>
          <li :class="{active: topKey === currentKey}" v-for="(list, topKey) in categoryList" :key="list.cat_id" @click="getSub(topKey)">{{list.cat_name}}</li>
        </scroll-view>
      </ul>
      <!-- 子分类 -->
      <div class="sub">
        <scroll-view scroll-y>
          <image class="thumb" src="/static/uploads/banner1.png"></image>
          <div class="childre" v-for="child in sub" :key="child.cat_id">
            <div class="title">{{child.cat_name}}</div>
            <div class="brands">
              <a href="" v-for="(brand, brandKey) in child.children" :key="brandKey">
                <image :src="brand.cat_icon"></image>
                <span>{{brand.cat_name}}</span>
              </a>
            </div>
          </div>
        </scroll-view>
      </div>
    </div>
  </div>
</template>

<script>
// 引入搜索组件
import search from '@/components/search'
import request from '@/utils/request'
export default {
  data () {
    return {
      categoryList: [],
      currentKey: 0
    }
  },
  computed: {
    sub () {
      return this.categoryList.length && this.categoryList[this.currentKey].children
    }
  },
  components: {
    search
  },
  methods: {
    async getCategory () {
      let {message} = await request({
        url: '/api/public/v1/categories'
      })
      this.categoryList = message
    },
    getSub (key) {
      this.currentKey = key
    }
  },
  created () {
    this.getCategory()
  }
}
</script>

<style scope lang="less">
  .category {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 100rpx;
    display: flex;

    .sup {
      width: 196rpx;
      background-color: #f4f4f4;

      scroll-view {
        height: 100%;
      }

      li {
        height: 100rpx;
        text-align: center;
        font-size: 24rpx;
        line-height: 100rpx;
        color: #333;
        border-bottom: 1rpx solid #eee;
        font-weight: 700;
        position: relative;

        &.active {
          background-color: #fff;
          color: #ea4451;

          &::before {
            content: '';
            display: block;
            width: 8rpx;
            height: 60rpx;
            position: absolute;
            left: 0;
            top: 20rpx;
            background-color: #ea4451;
          }
        }
      }
    }
    .sub {
      flex: 1;
      padding: 20rpx;
      text-align: center;

      scroll-view {
        height: 100%;
      }

      .title {
        font-size: 27rpx;
        color: #333;
        padding: 30rpx 0;

        &::before {
          content: "/";
          margin-right: 30rpx;
          color: #ccc;
        }

        &::after {
          content: "/";
          margin-left: 30rpx;
          color: #ccc;
        }
      }

      .thumb {
        width: 100%;
        height: 180rpx;
      }

      .brands {
        display: flex;
        flex-wrap: wrap;

        image {
          width: 120rpx;
          height: 120rpx;
        }
        span {
          display: block;
          font-size: 22rpx;
        }
        a {
          width: 33.333%;
          display: block;
          margin-bottom: 20rpx;
        }
      }
    }
  }
</style>
