<template>
  <div>
    <top :tops="tops"></top>
    <Card v-for="item in book" :book="item" :key="item.id"></Card>
    <p class="footer-text" v-show="!more">没有更多了</p>
  </div>
</template>
<script>
import { searchBook } from '@/api/searchBook'
import { getTopList } from '@/api/top'
import Card from '@/components/card'
import Top from '@/components/top'

export default {
  components: {
    Card,
    Top
  },
  data () {
    return {
      book: [],
      page: 0,
      more: true,
      // image列表
      tops: []
    }
  },
  created () {
    // 读取图书列表
    this.getBookList(true)
    // 加载照片列表
    this.getImgList()
  },
  // 监听用户下拉刷新
  onPullDownRefresh () {
    // 加载页面
    this.getBookList(true)
    this.getImgList()
  },
  methods: {
    async getBookList (init) {
      if (init) {
        // 初次加载
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading()
      const books = await searchBook(this.page, 6) // 这里是页数和步长
      // 获取之后判断长度
      if (books.length < 6 && this.page > 0) {
        this.more = false // 没有结果了
      }
      if (init) {
        // 如果是初次加载,可以直接返回结果并且展示
        this.book = books
      } else {
        // 如果是下拉加载，是要拼接
        this.book = this.book.concat(books)
      }

      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
    },
    async getImgList () {
      const imgli = (await getTopList()).data
      this.tops = imgli
      console.log(this.tops)
    }
  },
  // 监听用户上拉触底事件。
  onReachBottom () {
    // 如果没有可以加载的数据
    if (!this.more) {
      return
    }
    // 每滑动一下，增加page变量
    this.page = this.page + 1
    // 获取列表
    this.getBookList(false) // 传递false：证明是向下滚动而不是初次滚动
  }
}
</script>
<style>
</style>
