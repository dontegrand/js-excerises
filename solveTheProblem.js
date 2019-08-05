// let arr = [{a:1,i:{b:2,c:3,d:4}}]
// 不用到i，取出a,b,c,d的值
const arr = [{a:1,i:{b:2,c:3,d:4}}];
//i对应的ascii码为105
const {b,c,d} = arr[0][String.fromCharCode(105)];
// console.log(b,c,d)


let shitString = '傻逼';
let regstr = shitString.split('').join('([^\u4e00-\u9fa5]*?)');
let reg = new RegExp(regstr,'g');
// console.log(

// "这是一篇傻逼文章,需要傻逼过大滤掉大xx这三个词,大xx中间出汉字以外的字符大_/_傻a1v逼和大傻a1v逼".replace(reg,'2222')

//  )

let regex = /\d{2,5}/g; //贪婪匹配，尽可能多的满足条件。
let regexless = /\d{2,5}?/g; //惰性匹配，满足第一个条件就返回了，不会尝试更多条件。
let string = "123123412345123456"
console.log(string.match(regex)) //['12312','34123','45123','456']
console.log(string.match(regexless)) // [ '12', '31', '23', '41', '23', '45', '12', '34', '56' ]

//匹配 16 进制颜色值
let regex_color = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g
let string_color = '#fffbbad #000 #Fc01DF';
console.log(string_color.match(regex_color)) //ture
//匹配24小时
//^表示开头字符$表示结束字符
let regex_time = /^([01][0-9]|[2][0-3]):[0-5][0-9]$/;
console.log(regex_time.test("23:59")) //true
console.log(regex_time.test("02:24")) //true
//匹配yyyy-mm-dd时间格式
let regex_year = /^[0-9]{4}-(0[0-9]|1[0-2])-([012][0-9]|3[01])$/g;
console.log(regex_year.test("2014-02-14")) //true
console.log(regex_year.test("1234-10-33")) //false
// [^\\:*<>|?\r\n/]排除字符组表示合法字符。
//匹配路径
let regex_path = /^[a-zA-Z]:\\{1}([^\\:*<>|?\r\n/]+\\{1})*([^\\:*<>|?\r\n/]+)?$/;
console.log(regex_path.test("F:\\study\\javascript\\regex\\regular expression.pdf")); //true
console.log(regex_path.test("F:\study\javascript\\regex\\")) //ture
//匹配id
let regex_id = /id='[^']*'/g;
let string_id = "<div id='container' class='main'></div>"
console.log(string_id.match(regex_id))
//千分位数字表示法
//(?=p)表示p前面的位置，(?=(\d{3})) 三个数字前的位置
let regex_k_number = /(?=(\d{3})+$)/g
console.log("123456789".replace(regex_k_number,',')) //,123,456,789
let regex_k_number2 = /(?!^)(?=(\d{3})+$)/g //(?!^)非开头的位置 并且 三个数字前的位置
console.log("123456789".replace(regex_k_number2,',')) //123,456,789
let regex_k_number3 = /(?!\b)(?=(\d{3})+\b)/g //=> /\B(?=(\d{3})+\b)/g
console.log("123456789 123456".replace(regex_k_number3,',')) //123,456,789 123,456

//格式化货币
function currencyFotmat(num){
    return num.toFixed(2).replace(/\B(?=(\d{3})+\b)/g,',').replace(/^/,'￥')
}
console.log(currencyFotmat(1888)); //￥1,888.00

//校验密码，密码长度6-12位，由数字、小写字符和大写字符组成，但必须包含2中字符。
/**
 * 1.长度6-12位字符 /^[0-9a-zA-Z]{6,12}$/;
 * 2.必须包含数字 /(?=.*[0-9])^[0-9a-zA-Z]{6,12}$/;
 * 3.同时包含数字和小写字母 /(?=.*[0-9])(?=.*[a-z])^[0-9a-zA-Z]{6,12}$/;  //(?=.*[0-9])表示任一字符前面的位置后跟数字，即必须有数字。
 * 4.密码规则等同于 a.同时包含数字和小写。b.同时包含数字和大写。c.同时包含小写和大写。
 */
let regex_password = /((?=.*[0-9])(?=.*[a-z])|(?=.*[0-9])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z]))^[0-9a-zA-Z]{6,12}$/;
console.log(regex_password.test("1234567")) //false 全是数字
console.log(regex_password.test("acvdjkg")) //false 全是小写
console.log(regex_password.test("AVSFGDSG")) //false 全是大写
console.log(regex_password.test("add12")) //false 不足6位
console.log(regex_password.test("ACB2145")) //true 大写字母和数字
console.log(regex_password.test("AKLaf124")) //true 三者都有

//括号实现分组,使用构造函数的全局属性$1~$9来获取
//提取数据，提取年、月、日。
let regex_pick = /(\d{4})-(\d{2})-(\d{2})/;
let timeArray = '2019-08-05'.match(regex_pick);
console.log(...timeArray) // 2019-08-05 2019 08 05
console.log(RegExp.$1) //2019
console.log(RegExp.$2) //08
//替换
console.log('2019-08-05'.replace(regex_pick,"$2/$3/$1")); //  2019-08-05替换为了08/05/2019

