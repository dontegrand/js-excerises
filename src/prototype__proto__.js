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
function Foo(name) {
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
function change(obj) {
    obj.name = 'xiaoming'
    obj = { name: 'daming' }
    console.log(obj.name)
}

// change(obju);
// console.log(obju.name);



function grandFather() {
    const a = 1
    return function father() {
        const b = 2
        return function () {
            const c = 3
            // 下面这个语句打断点就能知道闭包是啥了
            console.log(a, b, c)
        }
    }
}
const fn = grandFather()()
fn()

function createCounter() {
    let counter = 1
    const myFunction = function () {
        counter = counter + 1
        return counter
    }
    return myFunction
}
const increment = createCounter()
const c1 = increment()
const c2 = increment()
const c3 = increment()
console.log('example increment', c1, c2, c3)

/**
 * Person1.call(this)是让Person2拥有Person1的属性与方法。
 */
var Person1 = function(){
	this.name = "DONTE"
}
var Person2 = function(){
	this.getName = function(){
		console.log(this.name);
	}
	Person1.call(this);
}
var person = new Person2();
person.getName()

var a = 1;
var objection = function(){
  var a = 2;
	console.log(this.a);
}
objection();


const assign = key => value => obj => ({ ...obj, [key]: value}) //对象赋值

// var assign = function(key){
//     console.log("--key--",key)
//     return function(value){
//         console.log("--value--",value)
//         return function(obj){
//             console.log("--",{...obj,[key]:value});
//             return {...obj,[key]:value};
//         }
//     }
// }

// assign(1)("b")({2:"a"});
let object1 = assign(3)(4)([7,8]);
let object2 = assign(5)(6)({9:'test'});
console.log(object1,object2);

//在for循环的头部声明带有var关键字的变量会为改变量创建单个绑定（存储空间）。
var arrayfor = [];
for(var i = 0; i < 3; i++){
    arrayfor.push(() => i); //三个箭头函数体重的每个‘i’都指向相同的绑定
}
console.log('00',arrayfor[2]())
var newarrayfor = arrayfor.map(el =>el());
console.log(newarrayfor) //[3,3,3]

//使用闭包解决问题,或者用let声明i
// let arrayfor = [];
// for (var i = 0; i < 3; i++) {
//     arrayfor[i] = (function(x) {
//     return function() {
//         console.log("_____",x)
//       return x;
//     };
//   })(i);
// }
// const newarrayfor = arrayfor.map(el => el());
// console.log(newarrayfor); // [0, 1, 2]


function tableOfX(x){
    for(let i = 1; i <= x; i++){
        for(let j = 1; j <= i; j++){
            document.write(i+'*'+j+'='+i*j);
            document.write("&nbsp")
        }
        document.write("<br/>");
    }
}
tableOfX(7);



// let objt = {};
// function changeValue(objt){
//   objt.name = 'ConardLi';
//   objt = {name:'code秘密花园'};
//   console.log('---',objt)
// }
// changeValue(objt);
// console.log(objt.name); 

var fna;
function fooa() {
	var a = 20;
	function baz() {
		console.log(a);
	}
	fna = baz;
}
function bar() {
	fna();
}
fooa();
bar();