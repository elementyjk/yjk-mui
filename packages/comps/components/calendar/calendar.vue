<template>
  <div class="ym-calendar">
    <div class="ym-calendar-header">
      <li @click="PreMonth(myDate,false)">
        <div class="ym-arrow left"></div>
      </li>
      <li class="ym-li">{{dateTop}}</li>
      <li @click="NextMonth(myDate,false)">
        <div class="ym-arrow right"></div>
      </li>
    </div>
    <div class="ym-content week">
      <div class="ym-content-item" v-for="(tag, index) in textTop" :key="index">
        <div class="ym-top-tag">
          {{tag}}
        </div>
      </div>
    </div>
    <div class="ym-content code">
      <div class="ym-content-item" v-for="(item,index) in list" :key="index" @click="clickDay(item,index)">
        <div class="ym-item-date" v-bind:class="[{ 'ym-mark': item.isMark},{'ym-other-dayhide':item.otherMonth!=='nowMonth'},{'ym-want-dayhide':item.dayHide},{'ym-today':item.isToday},{'ym-chose-day':item.chooseDay},setClass(item)]">
          {{item.id}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import timeUtil from './calendar'
export default {
  name: 'ym-calender',
  data () {
    return {
      textTop: ['一', '二', '三', '四', '五', '六', '日'],
      myDate: [],
      list: [],
      historyChose: [],
      dateTop: ''
    }
  },
  props: {
    markDate: {
      type: Array,
      default: () => []
    },
    markDateMore: {
      type: Array,
      default: () => []
    },
    sundayStart: {
      type: Boolean,
      default: () => false
    },
    agoDayHide: { type: Number, default: 0 },
    futureDayHide: { type: Number, default: 2554387200 },
    calendarLang: {
      type: Array,
      default: () => ['日', '一', '二', '三', '四', '五', '六']
    }
  },
  created () {
    this.intStart()
    this.myDate = new Date()
  },
  methods: {
    intStart () {
      let calendar = this.calendarLang
      if (this.sundayStart) {
        this.textTop = [calendar[0], calendar[1], calendar[2], calendar[3], calendar[4], calendar[5], calendar[6]]
      } else {
        this.textTop = [calendar[1], calendar[2], calendar[3], calendar[4], calendar[5], calendar[6], calendar[0]]
      }
      timeUtil.sundayStart = this.sundayStart
    },
    setClass (data) {
      let obj = {}
      obj[data.markClassName] = data.markClassName
      return obj
    },
    clickDay: function (item, index) {
      if (item.otherMonth === 'nowMonth' && !item.dayHide) {
        this.getList(this.myDate, item.date)
      }
      if (item.otherMonth !== 'nowMonth') {
        item.otherMonth === 'preMonth'
          ? this.PreMonth(item.date)
          : this.NextMonth(item.date)
      }
    },
    ChoseMonth: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date)
      this.myDate = new Date(date)
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate))
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    PreMonth: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date)
      this.myDate = timeUtil.getOtherMonth(this.myDate, 'preMonth')
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate))
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    NextMonth: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date)
      this.myDate = timeUtil.getOtherMonth(this.myDate, 'nextMonth')
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate))
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    forMatArgs: function () {
      let markDate = this.markDate
      let markDateMore = this.markDateMore
      markDate = markDate.map((k) => {
        return timeUtil.dateFormat(k)
      })
      markDateMore = markDateMore.map((k) => {
        k.date = timeUtil.dateFormat(k.date)
        return k
      })
      return [markDate, markDateMore]
    },
    getList: function (date, chooseDay, isChosedDay = true) {
      const [markDate, markDateMore] = this.forMatArgs()
      let time = date.getFullYear() + '-' + (date.getMonth() + 1)
      this.dateTop = time
      let arr = timeUtil.getMonthList(this.myDate)
      for (let i = 0; i < arr.length; i++) {
        let markClassName = ''
        let k = arr[i]
        k.chooseDay = false
        const nowTime = k.date
        const t = new Date(nowTime).getTime() / 1000
        // 看每一天的class
        for (const c of markDateMore) {
          if (c.date === nowTime) {
            markClassName = c.className || ''
          }
        }
        // 标记选中某些天 设置class
        k.markClassName = markClassName
        k.isMark = markDate.indexOf(nowTime) > -1
        // 无法选中某天
        k.dayHide = t < this.agoDayHide || t > this.futureDayHide
        if (k.isToday) {
          this.$emit('isToday', nowTime)
        }
        let flag = !k.dayHide && k.otherMonth === 'nowMonth'
        if (chooseDay && chooseDay === nowTime && flag) {
          this.$emit('choseDay', nowTime)
          this.historyChose.push(nowTime)
          k.chooseDay = true
        } else if (
          this.historyChose[this.historyChose.length - 1] === nowTime && !chooseDay && flag
        ) {
          k.chooseDay = true
        }
      }
      this.list = arr
    }
  },
  mounted () {
    this.getList(this.myDate)
  },
  watch: {
    markDate (val, oldVal) {
      this.getList(this.myDate)
    },
    markDateMore (val, oldVal) {
      this.getList(this.myDate)
    },
    agoDayHide (val, oldVal) {
      this.agoDayHide = parseInt(val)
      this.getList(this.myDate)
    },
    futureDayHide (val, oldVal) {
      this.futureDayHide = parseInt(val)
      this.getList(this.myDate)
    },
    sundayStart (val, oldVal) {
      this.intStart()
      this.getList(this.myDate)
    }
  }
}
</script>
<style lang="css">
.ym-calendar {
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
      "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
  background-color: #0fc37c;
  width: 100%;
  overflow: hidden;
  margin: auto;

  & * {
    margin: 0;
    padding: 0;
  }

  & li {
    list-style-type: none;
  }

  .ym-calendar-header {
    display: flex;
    color: #fff;
    background-color: #09F;

    & li {
      cursor: pointer;
      display: flex;
      color: #fff;
      font-size: 18px;
      flex: 1;
      justify-content: center;
      align-items: center;
      height: 47px;
    }

    .ym-li {
      cursor: auto;
      flex: 2.5;
    }
  }

  .ym-content {
    display: flex;
    flex-wrap: wrap;
    padding: 0 3% 0 3%;
    width: 100%;
  }

  .ym-content-item {
    font-size: 15px;
    width: 13.4%;
    text-align: center;
    color: #fff;
    position: relative;
    height: 40px;

    .ym-mark {
      margin: auto;
      border-radius: 100px;
      background: blue;
      z-index: 2;
    }

    .ym-other-dayhide {
      color: #bfbfbf;
    }

    .ym-want-dayhide {
      color: #bfbfbf;
    }

    .ym-today {
      background: #09F;
      border-radius: 100px;
    }

    .ym-chose-day {
      background: green;
      border-radius: 100px;
    }
  }

  .ym-top-tag {
    width: 40px;
    height: 40px;
    line-height: 40px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #313131;
  }

  .week {
    background-color: #d7edff;
  }

  .code {
    background-color: #f2f5f9;
  }

  .ym-item-date {
    width: 40px;
    height: 40px;
    line-height: 40px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
  }

  .ym-arrow {
    width: 12px;
    height: 12px;
    border-top: 2px solid #ffffff;
    border-left: 2px solid #ffffff;

    &:active {
      border-color: #ddd;
    }

    &.left {
      transform: rotate(-45deg);
    }

    &.right {
      transform: rotate(135deg);
    }
  }
}
</style>
