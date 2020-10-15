//反转函数
function reverseFunc(numer) {
    return numer.split("").reverse().join("");
}

//首字母转大写
function upperFunc(sing) {
    // sing.replace(/\b\w+\b/g, function(word){
    //     return word.substring(0,1).toUpperCase()+word.substring(1);}
    //     );
    let astr = sing.split(" ")
    for (let i = 0; i < astr.length; i++) {
        astr[i] = astr[i].charAt(0).toUpperCase() + astr[i].replace(1);
    }
    return astr.join(" ");
}
// console.log(upperFunc("adfsf sfaf"));

/**Array.prototype.sort([compareFunction])
 * compareFunction用来指定某种排序函数，如果省略，元素按unicode码排序。
 * 取第二大和第二小的值
 * @param {*} arr_num 数字数组
 */
function second_greaest_lowest(arr_num) {
    arr_num.sort(function (x, y) {
        return x - y;
    });
    console.log(arr_num);
    var uniqa = [arr_num[0]];
    var result = [];

    for (let i = 0; i < arr_num.length; i++) {
        if (uniqa[i] != arr_num[i + 1]) {
            uniqa.push(arr_num[i]);
        }
    }

    result.push(uniqa[1], uniqa[uniqa.length - 2]);
    return result.join(',');

}
// console.log(second_greaest_lowest([1,2,9,9,10,6,7]));

/**
 * 字符串去重
 * @param {} str 
 */
function unique_str(str) {
    let str1 = str;
    var newString = ''
    for (let i = 0; i < str1.length; i++) {
        if (newString.indexOf(str1.charAt(i)) == -1) {
            newString += str1[i];
        }
    }
    return newString;
}
// console.log(unique_str('aabbbttt'))

/**
 * 正则表达式， \s:空白; \S:非空白 +一个或多个; ^:开始，$:结束;
 * []这个符号，表示在它里面包含的单个字符不限顺序的出现
 * @param {} str1 
 * @retuen 每个字符出现的次数
 * isNaN()函数通常用于检测parseFloat()、parseInt()的结果，以判断是否是合法的数字;
 * isNaN(123)为false，isNaN("123")为true
 */
function char_counts(str1) {
    let uchars = {}
    str1.replace(/\S/g, function (l) {
        uchars[l] = (isNaN(uchars[l]) ? 1 : uchars[l] + 1)
    })
    return uchars;
}
// console.log(char_counts("aabefa1!!!4114"));

/**
 * evalue:数组遍历值，
 * index:索引，(可选)
 * array:数组本身,(可选)
 * @param {*} val 
 */
function biggerElements(val) {
    return function (evalue, index, array) {
        return (evalue >= val);
    };
}
// console.log([11,24,15,28].filter(biggerElements(15)));

/**
 * 生成长度随机字符串
 * @param {*} numer 
 */
function makeRandomStr(numer) {
    let text = "";
    let charList = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < numer; i++) {
        text += charList.charAt(Math.floor((Math.random() * charList.length)))
    }
    return text;
}
// console.log(makeRandomStr(8));

//找到第一个不重复的字母
function findFirstNotRepeatChar(str) {
    let arra = str.split("");
    let result = "";
    for (let i = 0; i < arra.length; i++) {
        let times = 0;
        for (let j = 0; j < arra.length; j++) {
            if (arra[i] === arra[j]) {
                times += 1;
            }
        }
        if (times < 2) {
            result = arra[i];
            break;
        }
    }
    return result;
}
// console.log(findFirstNotRepeatChar("aabbccdeev"))

/**
 * 冒泡排序
 * 第二层遍历次数等于总长度减去第一层遍历次数。
 * @param {*} a 
 */
function bubble_sort(a) {
    for (let i = 0; i < a.length - 1; i++) {
        for (let j = 0; j < a.length - 1 - i; j++) {
            if (a[j] > a[j + 1]) {
                let temp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = temp;
            }
        }
    }
    return a;
}
// console.log(bubble_sort([9,8,7,6.5,4]));

// 递归
function factorial(x) {
    if (x === 0) {
        return 1;
    }
    return x * factorial(x - 1);
}
// console.log(factorial(5));

function gcd(a,b){
    if(!b){ //!0为true
        return a;
    }
    return gcd(b,a%b);
}

var range = function(start,end){
    if(end - start == 1){
        console.log("No number between them");
    }else if(end - start == 2){
        return [end - 1];
    }else{
        let list = range(start,end - 1);
        list.push(end - 1);
        return list;
    }
}
// console.log(range(2,5));

var array_sum = function(array){
    if(array.length == 1){
        return array[0]
    }else{
        return array.pop() + array_sum(array);
    }
}


const counter = (function () {
    let privateValue = 0
    function changeBy (val) {
       privateValue += val
    }
    return { 
        increment: () => changeBy(1),
        decrement: () => changeBy(-1) ,
        value: () => privateValue
    }
})()
console.log(counter.value()) // 0
counter.increment(); counter.increment();
console.log(counter.value()) // 2
counter.decrement()
console.log(counter.value()) // 1


const makeCounter = () => {
    let counter = 0
    function changeBy (val) {
        counter += val
    }
    function COUNTER () {}
    COUNTER.prototype.increment = () => changeBy(1)
    COUNTER.prototype.decrement = () => changeBy(-1)
    COUNTER.prototype.value = () => counter
    return new COUNTER()
  }
  let fn1 = makeCounter()
  let fn2 = makeCounter()
  console.log(fn1.value(), fn2.value()) // 0 0
  fn1.increment()
  console.log(fn1.value(), fn2.value()) // 1 0
