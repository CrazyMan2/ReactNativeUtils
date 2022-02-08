
# react-native-wenkingtools

# 描述
该库主要收集通用项目中常用的方法
## 安装
```
npm install react-native-wenkingtools --save
```
or
```
yarn add react-native-wenkingtools
```

### 需要安装第三方库
```
npm install moment --save
```
or
```
yarn add moment
```

## 引入
```javascript
import {WenKingTools} from 'react-native-wenkingtools';

// TODO: What to do with the module?
WenKingTools;
```
## 方法
| 方法 |默认值| 描述 |
| -----| ---- | ---- |
| log | |控制是否打印-用于设置是否打印输出 |
| deepClone | | 深度拷贝 |
| multiClick | callback:回调函数 <br>count:点击次数 默认4次 </br>duration:有效时间,默认2s 单位秒 | 多次点击事件  |
| repetitionCall | callBack：回调函数 <br>duration:运行重复调用时间间隔,默认2s，单位秒</br>| 防止重复调用 |
| priceToString | price:价格<br>normal:null/undefined/无法转换价格返回的缺省值</br>| 价格转换为x.xx |
| dateToString |date：时间<br>format:默认为YYYY-MM-DD HH:mm:ss</br> | 时间格式转换 |
| phoneSeparated |phoneno:手机号 | 手机号码格式转化为 344 格式 （188 3886 9199） |
| encryptPhoneno |phoneno:手机号 | 手机号码加密（188****9199） |
| encryptIdNo | idNo:身份证号| 身份证号加密 |
| validatorIdNo | idNo:身份证号| 验证身份证号是否正确 |
| changeToString |value:价格<br>normal:缺省值默认为''</br> | 转换为string-避免null|undefined字段显示报错 |
| removeAllSpace |text:字符串 | string去除空格 |
| randomAround |min:最小值<br>max:最大值</br> | 生成随机数 |
| stringPadding |labelNumber:总长度 <br>type:不缺位置left/right</br> scale:scale根据不同的值设置” “,4倍为一个中文字体大小，“-” 2倍为一个中文字体大小，“a” 2倍为一个中文字体大小，默认为1| string补充长度 |
| numberPadding |value:值<br>minLength:最小程度</br> | 数字转string前缀补0 |
| sortAscii | | object按ascii字母排序，返回string |
| sleep |time:等待时间（单位秒） | 睡眠-等待  |
| compareDate |d1:第一个时间<br>d2:第二个时间</br> | 比较两个日期大小 |
