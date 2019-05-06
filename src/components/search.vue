<template>
  <!-- 搜索 -->
  <div class="search">
    <div class="input-box">
      <input type="text" placeholder="请输入商品" >
    </div>
    <!-- 搜索结果 -->
    <div class="result"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style scope lang="less">
.search {
  .input-box {
    background-color: #ea4451;
    padding: 20rpx 30rpx;
    input {
      height: 60rpx;
      background-color: #fff;
      padding-left: 15rpx;
      border-radius: 8rpx;
      font-size: 27rpx;
      color: #666;
    }
  }
}
</style>
