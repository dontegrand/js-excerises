function sleep(time){
    let now = new Date();
    while(true){
        if(new Date().getTime() - now  == time){
            break;
        }
    }
}

console.log("开始。。");
// sleep(1000);
console.log("结束");


let obj = {
    '0' : '',
    '1' : '秒杀',
    '2' : '满减',
    '3' : '直降',
    '11' : '买赠',
    '12' : '预售',
    '13' : '满返',
    '14' : '团购'
}

//原型链 与 继承
/**
 * 1.通常构造函数首字母大写。
 * 2._proto_是所有对象(包括函数都有的)，所有才是对象的原型。
 * 3.对于JavaScript的内置对象，Object、Array、Date等等这些都是构造函数。
 * 4.所有构造器/函数(函数也是对象)的_proto_都指向Function.prototype，它是一个空函数（Empty function）
 * 5.所以可以理解为：构造函数是由“Function构造函数“实例化出来的函数对象。   
 * 6.所以所有构造器都继承了Function.prototype的属性及方法，如length、call、apply、bind。
 * 7.JS中函数也是一等公民：Function.prototype._proto_ === Object.prototype //true,
 *   这说明所有的构造器也都是一个普通的JS对象，可以给构造器添加/删除属性等。同时它他也继承了Object.prototype上的所有方法：toString、valueOf、hasOwnProperty等。
 * 8.最后Object.prototype._proto_ === null //ture 说明Object.prototype的_proto_为null。
 *    由于实例是没有prototype属性的，prototype只有函数(准确来说是构造函数)才有的，它跟原型链没半毛钱关系。
 *    它的作用：构造函数new对象的时候，告诉构造函数新创建的对象的原型是谁。是的，只在new一个对象的时候才起作用。当你new完得到这个对象后，随便你怎么改构造函数的prototype属性，都不会影响已创建的对象的原型链。  
 */
function Foo(name){
    this.name = name;
}

//JS内置对象中，Math，JSON是以对象形式存在，无需new;

Number.__proto__ === Function.prototype // true
Boolean.__proto__ === Function.prototype // true
String.__proto__ === Function.prototype // true
Object.__proto__ === Function.prototype // true
Function.__proto__ === Function.prototype // true
Array.__proto__ === Function.prototype // true
RegExp.__proto__ === Function.prototype // true
Error.__proto__ === Function.prototype // true
Date.__proto__ === Function.prototype // true

//js中创建实例对象，new后面跟的是构造器。
let foo = new Foo('dontegrand');
// console.log("--",foo);

// Foo.prototype.name = 'xioaming' 

// console.log("-2-",foo);



let obju = {}
function change(obj){
    obj.name = 'xiaoming'
    obj = {name : 'daming'}
    console.log(obj.name)
}

change(obju);
console.log(obju.name);