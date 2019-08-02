// import './styles/index.scss'
import Button from './components/button/index'
import Calendar from './components/calendar/index'
import Popup from './components/popup/index'
import Picker from './components/picker/index'
import Nation from './components/nation/index'
import CommonPicker from './components/common-picker/index'
import DailyPicker from './components/daily-picker/index'
import WeekDate from './components/week-date/index'

const components = {
  Button,
  Calendar,
  Popup,
  Picker,
  Nation,
  CommonPicker,
  DailyPicker,
  WeekDate
}

const install = function (Vue) {
  if (install.installed) return
  // components.map(component => Vue.component(component.name, component))
  Object.keys(components).forEach(key => {
    Vue.component(components[key].name, components[key])
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Button,
  Calendar,
  Popup,
  Picker,
  Nation,
  CommonPicker,
  DailyPicker,
  WeekDate
}
