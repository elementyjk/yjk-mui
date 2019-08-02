# yjk-mui

[![Build Status](https://img.shields.io/badge/npm-v4.3.0-blue)]
[![npm](https://img.shields.io/badge/npm-v4.3.0-blue)](https://www.npmjs.com/package/yjk-mui)
[![vue](https://img.shields.io/badge/vue-v2.5.17-blue)](https://vuejs.org/index.html)

> Yi Jian Kang Mobile UI elements for vue.js v2.*

## Installation
```shell
npm i yjk-mui -S
```

## Usage

Import specified components.

```javascript
import Vue from 'vue';
import Ym from 'yjk-mui';
import 'yjk-mui/packages/yjkmui.css';

Vue.use(Ym);
```
Import all components.

```javascript
import { calender } from 'mint-ui';

Vue.component(calender.name, calender);
```
