<template>
  <div class="wrap">
    <h2>基础组件</h2>
    <h4>按钮</h4>
    <ym-button>普通</ym-button>
    <br/><br/>
    <h2>高阶组件</h2>
    <h4>日历</h4>
    <ym-calender :sundayStart="true" :agoDayHide='Math.ceil(new Date().getTime() / 1000 - 86000)' :markDate="[ '2019-08-03' ]" :markDateMore="[ { date: '2019-08-06' } ]" :choseDay="choseDay"></ym-calender>
    <br/><br/>
    <h4>popup</h4>
    <ym-button @click="popupVisible1 = true" ref="button">中部弹出</ym-button>
    <br/><br/>
    <ym-popup v-model="popupVisible1" popup-transition="popup-fade" class="ym-popup-1">
      <h1>popup</h1>
      <p>/ ˈpɑpˌʌp /</p>
      <p>n. 弹出式; [棒]内野飞球; 自动起跳式装置</p>
      <p>adj. 弹起的; 有自动起跳装置的</p>
    </ym-popup>
    <br><br>
    <h4>picker</h4>
    <div style="background: #fbfbfb;">
      <ym-picker :slots="yearSlot" @change="onYearChange" :visible-item-count="3"></ym-picker>
    </div>
    <br>
    <p class="page-picker-desc">出生年份: {{ year }}</p>
    <br><br>
    <h4>名族选择器</h4>
    <ym-button @click="visibleOn = true" ref="button">选择名族</ym-button>
    <ym-nation :visible.sync="visibleOn" @confirm="confirm"></ym-nation>
    <br><br>
    <h4>通用选择器</h4>
    <ym-button @click="visibleTw = true" ref="button">选择人员</ym-button>
    <ym-button @click="visibleTh = true" ref="button" @confirm="confirm">选择证件</ym-button>
    <ym-common-picker :visible.sync="visibleTw" :pickerList="pickerListO" name="人员" @confirm="confirm"></ym-common-picker>
    <ym-common-picker :visible.sync="visibleTh" :pickerList="pickerListT" name="证件" @confirm="confirm"></ym-common-picker>
    <br/><br/>
    <h4>每日选择</h4>
    <ym-daily-picker @pickDate="confirm"></ym-daily-picker>
    <br/><br/>
    <br/><br/>
    <h4>医生班次</h4>
    <ym-week-date :title="'今天(' + title + ')'" :docMsgList="[ { duty_date: title, doctor_name: '李强', duty_arrange: '上午班' } ]"></ym-week-date>
    <ym-week-date title="下周" :propsDate="propsDate" @getDate="getWeek" :docMsgList="docMsgList"></ym-week-date>
    <br/><br/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      popupVisible1: false,
      buttonBottom: 0,
      yearSlot: [{
        flex: 1,
        values: ['1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995'],
        className: 'slot1'
      }],
      year: '1992',
      visibleOn: false,
      visibleTw: false,
      visibleTh: false,
      pickerListO: ['张三', '李四', '王二'],
      pickerListT: ['身份证', '军官证', '户口本'],
      docMsgList: [],
      title: this.format(undefined, 'yyyy-MM-dd'),
      propsDate: this.format(new Date(new Date().getTime() + 86000 * 7 * 1000), 'yyyy-MM-dd')
    }
  },
  mounted () {
    this.buttonBottom = this.$refs.button.$el.getBoundingClientRect().bottom
  },
  methods: {
    format (date, fmt) {
      if (!date) {
        date = new Date()
      }
      console.log(date)
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
    choseDay (val) {
      console.log(val)
    },
    btnClick () {
      console.log('111')
    },
    onYearChange (picker, values) {
      console.log(values)
      this.year = values[0]
    },
    getWeek (val) {
      console.log(val)
      let time = new Date(new Date().getTime() + 86000 * 7 * 1000)
      // 用于请求接口获取医生数据
      this.docMsgList = [
        {
          duty_date: this.format(time, 'yyyy-MM-dd'),
          doctor_name: '李明明',
          duty_arrange: '上午班'
        },
        {
          duty_date: this.format(time, 'yyyy-MM-dd'),
          doctor_name: '叶晨',
          duty_arrange: '下午班'
        }
      ]
    },
    confirm (values) {
      console.log(values)
    }
  }
}
</script>

<style>
.wrap{
  margin: 10px;
}
h1,h3{
  margin: 0;
}
.btn__block{
  margin: 0 auto!important;
}
.wrap > .xm__btn,.xm__tag{
  margin-bottom: 10px;
}
.ym-popup-1 {
  width: 200px;
  border-radius: 8px;
  padding: 10px;
  transform: translate(-50%, 0);

  h1 {
    font-size: 20px;
    color: #26a2ff;
  }

  p {
    margin-bottom: 10px;
  }
}

.ym-popup-1::before {
  border: solid transparent;
  border-width: 10px;
  border-bottom-color: #fff;
  content: '';
  position: absolute;
  top: -20px;
  right: 50px;
}
</style>
