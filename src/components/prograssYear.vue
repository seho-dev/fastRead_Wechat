<template>
  <div>
    <progress :percent="percent" color="#EA5A49"/>
    <p>今年是{{year}}年，已经过去了{{day}}天：{{percent}}%</p>
  </div>
</template>

<script>
export default {
  methods: {
    // 判断是否闰年
    isLeapYear () {
      const year = new Date().getFullYear() // 获取年份
      if (year % 400 === 0) {
        return true
      } else if (year % 4 === 0 || year % 100 != 0) {
        return true
      } else {
        return false
      }
    },
    getDayOfYear () {
      return this.isLeapYear() ? '366' : '365'
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    },
    day () {
      let start = new Date()
      start.setMonth(0) // 第一个月份是0开头
      start.setDate(1) // 第一天是1开头
      // 今天的时间戳 - 第一天的时间戳 = 距离天数
      let offset = new Date().getTime() - start.getTime()
      return parseInt(offset / 1000 / 60 / 60 / 24) + 1
    },
    percent () {
      if (this.getDayOfYear() === '366') {
        // 闰年
        return (this.day * 1000 / this.year).toFixed(1) // 保留一位小数
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
progress {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
