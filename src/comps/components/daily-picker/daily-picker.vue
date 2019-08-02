<template>
  <div class="ym-daily-picker">
    <!-- 年份 月份 -->
    <div class="month">
      <ul>
        <li class="arrow" @click="pickPre()">❮❮</li>
        <li class="arrow" @click="weekPre()">❮</li>
        <li class="year-month">
          <span>{{ days[0].getFullYear() }}/{{ days[0].getMonth() + 1 }}/{{ days[0].getDate() }} - {{ days[6].getFullYear() }}/{{ days[6].getMonth() + 1 }}/{{ days[6].getDate() }}</span>
        </li>
        <li class="arrow" @click="weekNext()">❯</li>
        <li class="arrow" @click="pickNext()">❯❯</li>
      </ul>
    </div>
    <!-- 星期 -->
    <ul class="weekdays">
      <li>{{week['0']}}</li>
      <li>{{week['1']}}</li>
      <li>{{week['2']}}</li>
      <li>{{week['3']}}</li>
      <li>{{week['4']}}</li>
      <li>{{week['5']}}</li>
      <li>{{week['6']}}</li>
    </ul>
    <!-- 日期 -->
    <ul class="days">
      <li @click="pick(day, index)" v-for="(day, index) in days" :key="index">
        <!--本月-->
        <span v-if="day.getMonth() + 1 != currentMonth" class="other-month" v-bind:class="{ active: state[index] }">{{ day.getDate() }}</span>
        <span v-else>
          <!--今天-->
          <span class="otherDate" v-bind:class="{ active: state[index] }">{{ day.getDate() }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'ym-daily-picker',
  props: {
    week: {
      type: Array,
      default: function () {
        return ['日', '一', '二', '三', '四', '五', '六']
      }
    }
  },
  data () {
    return {
      currentYear: 1970, // 年份
      currentMonth: 1, // 月份
      currentDay: 1, // 日期
      currentWeek: 1, // 星期
      days: [],
      state: [],
      pitchDay: undefined
    }
  },
  mounted () {},
  created () {
    let date = new Date()
    this.pitchDay = new Date(this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate()))
    this.initData(null)
  },
  methods: {
    formatDate (year, month, day) {
      const y = year
      let m = month
      if (m < 10) m = `0${m}`
      let d = day
      if (d < 10) d = `0${d}`
      return `${y}-${m}-${d}`
    },
    initData (cur) {
      let date = ''
      if (cur) {
        date = new Date(cur)
      } else {
        date = new Date()
      }
      this.currentDay = date.getDate() // 今日日期 几号
      this.currentYear = date.getFullYear() // 当前年份
      this.currentMonth = date.getMonth() + 1 // 当前月份
      this.currentWeek = date.getDay() // 1...6,0星期几
      /*  if (this.currentWeek === 0) {
         this.currentWeek = 7
       } */
      const str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay) // 今日日期 年-月-日
      this.days.length = 0
      // 选中天记录
      this.state = []
      // 这里默认显示一周 i<= 6-this.currentWeek，如果需要显示一个月日期，则第二个循环为 i<= 34- this.currentWeek
      for (let i = this.currentWeek; i >= 0; i -= 1) {
        const d = new Date(str)
        d.setDate(d.getDate() - i)
        this.days.push(d)
        this.state.push(false)
        if (this.pitchDay.toString() == d.toString()) {
          this.$set(this.state, this.state.length - 1, true)
        }
      }
      for (let i = 1; i <= 6 - this.currentWeek; i += 1) {
        const d = new Date(str)
        d.setDate(d.getDate() + i)
        this.days.push(d)
        this.state.push(false)
        if (this.pitchDay.toString() == d.toString()) {
          this.$set(this.state, this.state.length - 1, true)
        }
      }
    },
    // 上个星期
    weekPre () {
      const d = this.days[0] // 如果当期日期是7号或者小于7号
      d.setDate(d.getDate() - 7)
      this.initData(d)
    },

    // 下个星期
    weekNext () {
      const d = this.days[6] // 如果当期日期是7号或者小于7号
      d.setDate(d.getDate() + 7)
      this.initData(d)
    },
    // 上一個月传入当前年份和月份
    pickPre () {
      const d = this.days[0]
      d.setDate(d.getDate() - 30 + this.currentWeek)
      this.initData(d)
    },
    // 下一個月传入当前年份和月份
    pickNext () {
      const d = this.days[0]
      d.setDate(d.getDate() + 30 + this.currentWeek)
      this.initData(d)
    },
    // 当前选择日期
    pick (date, index) {
      this.pitchDay = date
      this.state = Array.from(this.state, (x) => x && false)
      this.$set(this.state, index, true)
      let pickDate = this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
      this.$emit('pickDate', pickDate) // 向父组件传值
    }
  }
}
</script>
<style>
.ym-daily-picker {
  box-sizing: border-box;
  font-family: Verdana, sans-serif;
  background: #E8F0F3;

  & ul {
    list-style-type: none;
  }

  #calendar {
    width: 80%;
    margin: 0 auto;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  }

  .month {
    width: 100%;
    /* background: #00B8EC; */
    background-color: white;

    & ul {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: space-between;
    }
  }

  .year-month {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    & span {
      font-size: 16px;
    }

    & ul li {
      color: #666;
      /* font-size: 20px; */
      text-transform: uppercase;
    }
  }

  .choose-year {
    padding-left: 20px;
    padding-right: 20px;
  }

  .choose-month {
    text-align: center;
    font-size: 1.5rem;
  }

  .arrow {
    padding: 5px;

    &:hover {
      background: rgba(100, 2, 12, 0.1);
    }
  }

  .weekdays {
    margin: 0;
    padding: 10px 0;
    /* background-color: #00B8EC; */
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    color: #666;
    justify-content: space-around;

    & li {
      display: inline-block;
      width: 13.6%;
      text-align: center;
    }
  }

  .days {
    padding: 0;
    background: #FFFFFF;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    & li {
      list-style-type: none;
      display: inline-block;
      width: 14.2%;
      text-align: center;
      padding-bottom: 15px;
      padding-top: 15px;
      font-size: 1rem;
      color: #000;

      .active {
        padding: 6px 10px;
        border-radius: 10%;
        background: #028BE0;
        color: #fff;
      }

      .other-month {
        padding: 5px;
        color: gainsboro;
      }
    }
  }
}
</style>
