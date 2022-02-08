/**
 * WenKing-公共类
 * User: hewenjian/543623347@qq.com
 * Date: 2022/02/08 10:00
 *
 */
import moment from "moment";
let instance: wenKingTools;
class wenKingTools {
    //单例模型
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    static getInstance = () => {
        let obj: wenKingTools = new wenKingTools();
        return obj;
    }

    /**
     * 控制是否打印-用于设置是否打印输出
     * @param message
     * @param optionalParams
     */
    log = (message?: any, ...optionalParams: any[]) => {
        if (true)
            console.log(message, optionalParams);
    }
    /**
     * 深度拷贝
     * @param target
     */
    deepClone = (target: any) => {
        //判断是否为object类型的辅助函数，减少重复代码
        const isObject = (target: any) => {
            return (typeof target === 'object' && target) || typeof target === 'function';
        }
        const map = new WeakMap();
        const clone = (data: any) => {
            //基础类型直接返回值
            if (!isObject(data)) {
                return data;
            }
            //日期或者正则对象直接构建一个新的对象返回
            if ([Date, RegExp].includes(data.constructor)) {
                return new data.constructor(data);
            }
            //处理函数对象
            if (typeof data === 'function') {
                return new Function('return' + data.toString())();
            }
            //如果对象已存在，直接返回对象
            const exist = map.get(data);
            if (exist) {
                return exist;
            }
            //处理map对象
            if (data instanceof Map) {
                const result = new Map();
                map.set(data, result);
                data.forEach(((value, key) => {
                    //map中的值为对象的话也需要深度拷贝
                    if (isObject(value)) {
                        result.set(key, clone(value));
                    } else {
                        result.set(key, value);
                    }
                }))
                return result;
            }
            //处理set对象
            if (data instanceof Set) {
                const result = new Set();
                map.set(data, result);
                data.forEach(value => {
                    //设置set对象的值为object的话也得深拷贝
                    if (isObject(value)) {
                        result.add(clone(value));
                    } else {
                        result.add(value);
                    }
                })
                return result;
            }
            //收集键名（考虑了以Symbol作为key以及不可枚举的属性）
            const keys = Reflect.ownKeys(data);
            // 利用 Object 的 getOwnPropertyDescriptors 方法可以获得对象的所有属性以及对应的属性描述
            const allDesc = Object.getOwnPropertyDescriptors(data);
            // 结合 Object 的 create 方法创建一个新对象，并继承传入原对象的原型链， 这里得到的result是对data的浅拷贝
            const result = Object.create(Object.getPrototypeOf(data), allDesc);
            // 新对象加入到map中，进行记录
            map.set(data, result);
            // Object.create()是浅拷贝，所以要判断并递归执行深拷贝
            keys.forEach(key => {
                const value = data[key];
                if (isObject(value)) {
                    result[key] = clone(value);
                } else {
                    result[key] = value;
                }
            })
            return result;
        }
        return clone(target)
    }


    /**
     * 多次点击事件
     * @param callback      回调函数
     * @param count         点击次数，默认4次
     * @param duration      有效时间,默认2s 单位秒
     */
    timeStamps: any[] = [];
    multiClick = (callback: () => void, count?: number, duration?: number) => {
        if (!count) count = 4;
        if (!duration)
            duration = 2000;
        else
            duration=duration*1000
        let timeStamp = Date.now();
        this.timeStamps.push(timeStamp);
        if (this.timeStamps.length === count) {
            if (this.timeStamps[count - 1] - this.timeStamps[0] < duration) {
                callback();
            }
            this.timeStamps = [];
        }
    }
    /**
     * 防止重复调用
     * @param callBack
     * @param duration 运行重复调用时间间隔,默认2s，单位秒
     */
    repetitionTimeStamps: number = Date.now();
    repetitionCall = (callBack: () => void, duration?: number) => {
        if (!duration)
            duration = 2000;
        else
            duration=duration*1000;
        let timeStamp = Date.now();
        if (timeStamp - this.repetitionTimeStamps > duration) {
            this.repetitionTimeStamps = timeStamp;
            callBack();
        }
    }

    /**
     * 价格转换为x.xx
     * @param price
     */
    priceToString = (price: number | string | undefined, normal?: string) => {
        if (!price)
            return normal ? normal : '0.00';
        try {
            let f_x1 = parseFloat(price.toString());
            return f_x1.toFixed(2);
        } catch (e) {
            return normal ? normal : '0.00';
        }
    }
    /**
     * 时间转换
     * @param value
     * @param format 默认为YYYY-MM-DD HH:mm:ss moment插件支持
     */
    dateToString = (date: string | undefined, format?: string) => {
        if (date) {
            return moment(date).format(format ? format : 'YYYY-MM-DD HH:mm:ss');
        } else
            return '';
    }

    /**
     * 手机号码格式转化为 344 格式 （188 3886 9199）
     * @param phoneNumber
     */
    phoneSeparated(phoneno: string) {
        var valueStr = phoneno.replace(/\D/g, "").substr(0, 11);
        var len = valueStr.length;
        if (len > 3 && len < 8) {
            return valueStr.substr(0, 3) + " " + valueStr.substr(3);
        } else if (len >= 8) {
            return valueStr.substr(0, 3) + " " + valueStr.substr(3, 4) + " " + valueStr.substr(7);
        }
        return valueStr;
    }

    /**
     * 手机号码加密
     * @param phoneno
     */
    encryptPhoneno = (phoneno: string | undefined | number) => {
        if (phoneno) {
            let phonenoStr: string = phoneno.toString();
            return phonenoStr.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2');
        } else return "";
    }
    /**
     * 身份证号加密
     * @param idNo
     */
    encryptIdNo = (idNo: string | undefined) => {
        if (idNo) {
            return idNo.replace(/^(\d{4})\d{10}(\d{4})/, '$1****$2');
        } else return '';
    }
    /**
     * 身份证号验证
     * @param idNo
     */
    validatorIdNo = (idNo: string | undefined) => {
        if (!idNo) return false;
        if (typeof idNo !== 'string') {
            return false;
        }
        const idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
        // 判断格式是否正确
        const format = idcard_patter.test(idNo);
        if (!format) {
            return false;
        }
        // 加权因子
        const weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        // 校验码
        const check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
        const last = idNo[17];//最后一位
        const seventeen = idNo.substring(0, 17);
        // ISO 7064:1983.MOD 11-2
        // 判断最后一位校验码是否正确
        const arr: any[] = seventeen.split("");
        const len = arr.length;
        let num = 0;
        for (let i = 0; i < len; i++) {
            num += arr[i] * weight_factor[i];
        }
        // 获取余数
        const resisue = num % 11;
        const last_no = check_code[resisue];
        // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
        const result = last === last_no ? true : false;
        return result;
    }

    /**
     * 转换为string-避免null|undefined字段显示报错
     * @param value
     * @param normal undefined时返回默认值,否则返回空字符""
     */
    changeToString = (value: string | number | undefined | null, normal?: string) => {
        if (value) {
            return value.toString();
        } else {
            return normal ? normal : '';
        }
    }

    /**
     * string去除空格
     * @param text
     */
    removeAllSpace(text: string | undefined) {
        if (!text) return "";
        return text.replace(/\s+/g, '');
    }

    /**
     * min-max的随机数
     * @param min
     * @param max
     */
    randomAround(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * string补充长度
     * @param text
     * @param labelNumber 总长度
     * @param type left|right
     * @param scale scale根据不同的值设置" ",4倍为一个中文字体大小，"-" 2倍为一个中文字体大小，"a" 2倍为一个中文字体大小，默认为1
     * @param str
     */
    stringPadding(text: string, labelNumber: number, type: "left" | "right", scale?: number, str?: string) {
        if (!text) {
            return text;
        }
        if (!str) str = " ";
        if (!scale) scale = 1;
        let length = labelNumber - text.length;
        if (length > 0) {
            switch (type) {
                case "left":
                    text = text.padStart(text.length + length * scale, str);
                    break;
                case "right":
                    text = text.padEnd(text.length + length * scale, str);
                    break;
            }
        }
        return text;
    }

    /**
     * 数字转string前缀补0
     * @param value
     * @param minLength
     */
    numberPadding(value: number | string, minLength?: number) {
        if (!minLength) minLength = 2;
        let numStr: string = value.toString();
        if (numStr.length < minLength) {
            return numStr.padStart(minLength, '0');
        }
        return numStr;
    }

    /**
     * object按ascii字母排序，返回string
     * @param obj
     */
    sortAscii(obj: any) {
        let arr = new Array();
        let num = 0;
        for (let i in obj) {
            arr[num] = i;
            num++;
        }
        let sortArr = arr.sort();
        let str = '';             //自定义排序字符串
        for (let i in sortArr) {
            if (sortArr[i] === "signature" || sortArr[i] === null || sortArr[i] === "") continue;
            str += sortArr[i] + '=' + obj[sortArr[i]] + '&';
        }
        //去除两侧字符串
        let char = '&';
        str = str.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
        return str;
    }

    /**
     * 睡眠-等待 单位秒
     * @param time
     */
    sleep = (time: number) => {
        return new Promise(((resolve, reject) => {
            let sleepTime: number = time * 1000;
            setTimeout(() => {
                return resolve("")
            }, sleepTime);
        }));
    }
    /**
     * 比较两个日期大小
     * @param d1 {dateString|date} 第一个日期
     * @param d2 {dateString|date} 第二个日期
     *
     * @return Boolean
     * */
    compareDate = (d1: string | Date, d2: string | Date) => {
        let date1 = typeof d1 == "string" ? new Date(Date.parse(d1)) : d1;
        let date2 = typeof d2 == "string" ? new Date(Date.parse(d2)) : d2;
        return date1 > date2
    }
}

let WenKingTools = wenKingTools.getInstance();
export default WenKingTools;
