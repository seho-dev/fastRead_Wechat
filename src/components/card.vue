<template>
  <a :href="inDetail">
    <div class="book-card">
      <div class="thumb" @click.stop="reviewImg()">
        <!--左边图片栏-->
        <img :src="book.image" class="img" mode="aspectFit">
      </div>
      <div class="detail">
        <!--介绍栏-->
        <div class="row text-primary">
          <div class="right">
            <!--介绍右边-->
            {{book.average}}分
            <!--<rate :value="book.average"></rate>图书评分 这句代码会造成编译错误，原因未知-->
          </div>
          <div class="left">{{book.title}}</div>
          <!--图书标题-->
        </div>
        <div class="row">
          <div class="right text-primary">浏览量:{{book.count}}</div>
          <div class="left">作者：{{book.author}}</div>
          <!--图书作者-->
        </div>
        <div class="row">
          <div class="right">上传者: {{book.nickName}}</div>
          <!--上传者昵称：{{book.user_info.nickName}}-->
          <div class="left">{{book.publisher}}</div>
          <!--出版商-->
        </div>
      </div>
    </div>
  </a>
</template>

<script>
import rate from '@/components/rate'
export default {
  components: {
    rate
  },
  props: {
    book: {
      type: Array,
      default: []
    }
  },
  computed: {
    inDetail () {
      return '/pages/detail/main?id=' + this.book._id
    }
  },
  methods: {
    reviewImg () {
      // 调用微信review
      wx.previewImage({
        current: this.book.image, // 当前显示图片的http链接
        urls: [this.book.image] // 需要预览的图片http链接列表
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.book-card {
  padding: 5px;
  overflow: hidden;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 14px;

  .thumb {
    width: 90px;
    height: 90px;
    float: left;
    margin: 0 auto;
    overflow: hidden;

    .img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  .detail {
    margin-left: 100px;

    .row {
      line-height: 20px;
      margin-bottom: 3px;
    }

    .right {
      float: right;
    }

    .left {
      margin-right: 80px;
    }
  }
}
</style>
