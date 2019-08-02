// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    "postcss-bem": {},
    "postcss-nested": {}, // 嵌套
    "postcss-preset-env": {}, // 变量 运算 
    "postcss-simple-vars": {}, // 变量
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    "postcss-cssnext": {
      "warnForDuplicates": false
    }
  }
}
