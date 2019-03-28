//日期格式化
Date.prototype.Format = function(fmt){
    var o = {
        "M+" : this.getMonth() + 1,
        "d+" : this.getDate(),
        "h+" : this.getHours(),
        "m+" : this.getMinutes(),
        "s+" : this.getSeconds(),
        "q+" : Math.floor((this.getMonth()+3)/3),//季度
        "S" : this.getMilliseconds()
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));  
    for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))   
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
    return fmt;  
}

//日期函数
var dataFunc = function(){
    let data = new Date();
    let formatTime = data.Format("yyyy-MM-dd hh:mm:ss.S q");
    let currentDate = data.toLocaleDateString();//当前日期
    let currentTime = data.toLocaleTimeString();//当前时间
    let theDay = data.getDay();//当前星期的索引
    let daylist = ["Sunday","Monday","TuesDay","WednesDay","ThursDay","Friday","SaturDay"];
    console.log(formatTime);
    console.log(currentDate,currentTime);
    console.log("Today is : " + daylist[theDay]);
}
// dataFunc();

//打印窗口
var printWin = function(){
    window.print();
}

//求三角形面积
var triangleArea = function(a,b,c){
    let s = (a + b + c)/2;
    let area = Math.sqrt(s*((s-a)*(s-b)*(s-c)));
    console.log("the triangle area :" +  area);
}
// triangleArea(5,6,7);

//字符串头尾相连,滚动
function animate_string(id){
    let element = document.getElementById(id);
    let textNode = element.childNodes;
    let text = textNode[0].data;
    setInterval(function (){
        text = text[text.length - 1] + text.substring(0,text.length -1);
        textNode[0].data = text; 
    },100);
}


//判断是否是闰年
function leapyear(year){
    return (year % 100 === 0)? (year % 400 === 0 ) : (year % 4 === 0);
}
// console.log(leapyear(2016));

//输出2014年到2050年间1月1号是星期日的年份
var sundayYear = function(){
    for(let year=2014; year <= 2050; year++){
        let data = new Date(year,0,1);
        if(data.getDay() == 0){
            console.log(year + "年的1月1号是星期日");
        }
    }
}
// sundayYear();

//猜任意数
var guessNum = function(){
    let num = Math.ceil(Math.random() * 10) //Math.ceil向上取整。
    let input = prompt('Guess the number between 1 and 10 inclusive');
    if(input == num){
        console.log('matched')
    }else{
        console.log('not matched');
    }
}

//计算两个日期的相隔天数
// parseInt(Math.abs((day1.getTime() - day2.getTime()))/1000/60/60/24)

//get the website URL
console.log(document.URL);

// split("")分割每个字符为数组，.reverse()倒转，.join("")还原字符串。
//pop()方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度
console.log(document.URL.split('.').pop());

// break结束整个循环，continue结束当次循环，开始下一次循环，return只能出现在函数体里，结束整个函数体。
function fiveteen(){
    do{
        var num = prompt('please input');
      }while(num < 13); // 满足这个条件就一直循环
    alert('差值的2倍：' + (num-13)*2);
}

function stringPrac(check_string){
    // slice()并不会修改数组，而是返回一个子数组
    //substr()截取字符串，返回新的字符串
    if(check_string == null || check_string == undefined || check_string.slice(0,2) == 'Py'){
        return check_string;
    }
    return `Py${check_string}`; //ES6语法 `${}`
}

//每个单词首字母转大写
function toBigString(check_str){
    splitStr = check_str.split(" ");
    for(let i = 0; i < splitStr.length; i++){
        splitStr[i] = splitStr[i][0].toUpperCase() + splitStr[i].substr(1);
    }
    return splitStr.join(" ");
}
// console.log(toBigString('Write a JavaScript program to capitalize the first letter of each word of a given string.'));

//正则表达式对象RegExpObject.test(string)
function isContain(str){
    return (/a...b/).test(str) || (/b...a/).test(str);
}
function equalWord(str){    
    //查找str中p字母的个数,正则表示式\g用在replace()方法时返回所有repalace掉的对象。
    let str_p = str.replace(/[^p]/g,""); 
    return str_p.length
}
// console.log(equalWord('apbcdbege'))