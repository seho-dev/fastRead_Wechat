<template>
  <div class="info">
    <div class="thumb">
      <img :src="info.image" class="back" mode="aspectFill">
      <img :src="info.image" class="img" mode="aspectFit">
      <div class="info">
        <div class="title">{{info.title}}</div>
        <div class="author">{{info.author}}</div>
      </div>
    </div>
    <div class="detail">
      <img :src="info.headImg" class="avatar" mode="aspectFit">
      {{info.name}}
      <div class="right text-primary">
        {{info.average}}分
        <Rate :value="info.average"></Rate>
      </div>
    </div>
    <div class="detail">
      {{info.publisher}}
      <div class="right">{{info.price}}</div>
    </div>
    <div class="tags">
      <div class="badge" :key="tag" v-for="tag in info.tag">{{tag}}</div>
    </div>
    <div class="summary">
      <p :key="i" v-for="(sum,i) in info.summary">{{sum}}</p>
    </div>
  </div>
</template>

<script>
import Rate from '@/components/rate'
export default {
  components: {
    Rate
  },
  props: ['info']
}
</script>

<style lang="stylus" scoped>

.info {
  font-size: 14px;
 .badge{
    display: inline-block;
    margin:5px;
    padding:5px;
    border-radius: 10px;
    border:1px #EA5A49 solid;
    color:#EA5A49;
  }
  .thumb {
    width: 750rpx;
    height: 500rpx;
    overflow: hidden;
    position: relative;

    .back {
      filter: blur(15px);
      width: 100%;
    }

    .img {
      position: absolute;
      width: 100%;
      height: 300rpx;
      left: 0;
      top: 30rpx;
    }

    .info {
      color: white;
      position: absolute;
      width: 100%;
      left: 0;
      top: 350rpx;
      text-align: center;

      .title {
        font-size: 20px;
      }

      .author {
        font-size: 14px;
      }
    }
  }

  .right {
    float: right;
  }

  .detail {
    padding: 5px 10px;

    .avatar {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .summary{
    padding:0 15px;
    margin-top:10px;
    padding-bottom 20px
    p{
      text-indent: 2em;
      font-size:14px;
    }
  }
}
</style>
