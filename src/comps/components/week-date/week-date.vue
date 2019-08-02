<template>
  <div class="ym-week-date">
    <div class="titleDiv">
      {{title}}&nbsp;&nbsp;
      <button type="button"></button>
      <span class="redTag">{{stop}}</span>
    </div>
    <div class="dateShow">
      <table class="dates">
        <!-- 星期 -->
        <tr class="weekdays">
          <td colspan="2"></td>
          <td>{{week['1']}}</td>
          <td>{{week['2']}}</td>
          <td>{{week['3']}}</td>
          <td>{{week['4']}}</td>
          <td>{{week['5']}}</td>
          <td>{{week['6']}}</td>
          <td>{{week['0']}}</td>
        </tr>
        <!-- 日期 -->
        <tr class="days">
          <td colspan="2"><span>{{itemShift['0']}}</span></td>
          <td v-for="(day, index) in days" :key="index">
            <!--非本月 该处不区分本月与其他月日期的明亮程度，则other-month属性暂时隐藏-->
            <button v-if="day.getMonth()+1 != currentMonth" class="other-month">{{ day.getDate() }}</button>
            <span v-else>
              <!--今天-->
              <button v-if="day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()" class="active">{{ day.getDate() }}</button>
              <button v-else :dataDate="format(day, 'yyyy-MM-dd')">{{ day.getDate() }}</button>
            </span>
          </td>
        </tr>
        <!-- 上午班 -->
        <tr class="am">
          <td colspan="2"><span>{{itemShift['1']}}</span></td>
          <td v-for="(day, index) in days" :key="index">
            <label v-for="(item,indexs) in docMsgList" :key="indexs" v-if="item.duty_arrange == '上午班' && item.duty_date==format(day, 'yyyy-MM-dd')">
              <!--停诊红色 -->
              <label :class="{ 'docLabel': item.is_valid ==2 }">
                {{item.doctor_name}}
                <!--锦江特殊要求-->
                <label v-if="hosCode == '510114000003'">
                  <br>
                  {{item.start_time}}
                </label>
              </label>
              <br>
            </label>
          </td>
        </tr>
        <!-- 下午班  -->
        <tr class="pm">
          <td colspan="2"><span>{{itemShift['2']}}</span></td>
          <td v-for="(day, index) in days" :key="index">
            <label v-for="(item,indexs) in docMsgList" :key="indexs" v-if="item.duty_arrange == '下午班' && item.duty_date==format(day, 'yyyy-MM-dd')">
              <label :class="{ 'docLabel': item.is_valid ==2 }">
                {{item.doctor_name}}
                <!--锦江特殊要求-->
                <label v-if="hosCode == '510114000003'">
                  <br>
                  {{item.start_time}}
                </label>
              </label>
              <br>
            </label>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ym-week-date',
  props: {
    title: {
      type: String,
      default: ''
    },
    stop: {
      type: String,
      default: '表示停诊'
    },
    week: {
      type: Array,
      default: function () {
        return ['日', '一', '二', '三', '四', '五', '六']
      }
    },
    itemShift: {
      type: Array,
      default: function () {
        return ['班次', '上午', '下午']
      }
    },
    hosCode: {
      type: String,
      default: ''
    },
    docMsgList: {
      type: Array,
      default: () => {
        return []
      }
    },
    propsDate: {
      type: String,
      default: () => {}
    }
  },
  data () {
    return {
      currentYear: 1970, // 年份
      currentMonth: 1, // 月份
      currentDay: 1, // 日期
      currentWeek: 1, // 星期
      days: []
    }
  },
  mounted () {},
  created () {
    let docDate = this.propsDate
    this.initData(docDate)
    let startDate = this.format(this.days[0], 'yyyy-MM-dd')
    let endDate = this.format(this.days[6], 'yyyy-MM-dd')
    // 用于返回相应的数据接口时间用于查询医生排班
    this.$emit('getDate', {
      startDate: startDate,
      endDate: endDate
    })
  },
  methods: {
    format (date, fmt) {
      let o = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "H+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        "S": date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
      for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
      }
      return fmt
    },
    formatDate (year, month, day) {
      const y = year
      let m = month
      if (m < 10) { m = `0${m}` }
      let d = day
      if (d < 10) { d = `0${d}` }
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
      this.currentWeek = date.getDay() // 星期几 1...6,0
      // this.currentWeek = 0
      const str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay) // 今日日期 年-月-日
      this.days.length = 0
      // 周日，放在第一行第1个位置，后面6个 这里显示下一周，以currentWeek 为界限，分别组装今日前后的日期
      // 先减一天 中式日历
      for (let i = this.currentWeek - 1; i >= 0; i -= 1) {
        const d = new Date(str)
        d.setDate(d.getDate() - i)
        this.days.push(d)
      }
      // 后加一天 中式日历
      for (let i = 1; i <= 6 - this.currentWeek + 1; i += 1) {
        const d = new Date(str)
        d.setDate(d.getDate() + i)
        this.days.push(d)
      }
    }
  }
}
</script>
<style>
.ym-week-date {
  margin-top: 10px;

  & button {
    margin: 0;
    font: inherit;
    color: inherit;
    overflow: visible;
    text-transform: none;
    border: none;
    text-align: center;
  }

  & ul,
  & li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .dates {
    border-collapse: collapse;
    border: none;
    width: 100%;
    margin-top: 8px;

    & tr td {
      text-align: center;
      padding: 6px 0;
      cursor: pointer;
      border: dashed lightgrey 1px;
    }

    & tr td button {
      padding: 6px;
      cursor: pointer;
      height: 24px;
    }

    & tr td button {
      height: 24px;
      line-height: 1px;
      text-align: center;
      background: #fff;
      cursor: pointer;
      padding: 7px 9px;
    }
  }

  .days {
    & td {
      .active {
        background: #028BE0 !important;
        color: #fff;
        border-radius: 2px;
      }
    }
  }

  .dateShow {
    border-bottom: 1px #dbdbdb solid;
    height: auto;
    background: white;
  }

  .am label,
  .pm label,
  .amNext label,
  .pmNext label {
    font-size: 9px;
  }

  .redTag,
  .docLabel {
    color: red;
  }

  .titleDiv {
    display: flex;
    justify-content: center;
    align-content: center;
    font-size: 17px;
    text-align: center;
    line-height: 20px;

    & button {
      height: 0px;
      width: 0px;
      padding: 6px 12px;
      margin-top: 2px;
      border: 1px solid #dd524d;
      border-radius: 3px;
      background-color: #dd524d;
    }
  }
}

</style>
