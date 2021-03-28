function Parent () {
  this.name = '马云'
  this.age = 55
  this.arr = [1,2,4]
}

function Child () {
  this.school = 'javascript'
  Parent.call(this)
}

Parent.prototype.say = () => {console.log('say somethings')}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.contructor = Child

let parent = new Parent()

let curry = new Child()

console.log(curry)
curry.say()

console.log(curry.contructor)

let curry2 = new Child()

curry.arr.push(19)

console.log(curry, curry2)

function Fn () {
  console.log('---', [].shift.call(arguments))
  return Array.prototype.slice.call(arguments)
}
Fn('this', 1,2,3)

const prev = [1,2,3]
const next = [1,4,5,6]

delete Function.prototype.bind

if (!Function.prototype.bind){
  Function.prototype.bind = function () {
      let that = this
      let context = [].shift.call(arguments)
      let args = [].slice.call(arguments)
      console.log('---', that, context, args)
      return function () {
          that.apply(context,args.concat([].slice.apply(arguments)))
      }
  }
}

let fn = [].concat.bind(prev, next)
console.log(fn())


const user = {name: 'kobe'}
function Child (name) {
	this.name = name
}
Child.prototype = {
  construtor: Child,
  showName: function() {
    console.log(this.name)
	}
}
let cy = new Child('curry')

Function.prototype.bind2 = function bind() {
  let that = this
  let context = [].shift.call(arguments)
  let args = [].slice.call(arguments)
  return function () {
      that.apply(context,arguments)
  }
}


let bindFn = cy.showName.bind2(user, 1,2,3,4,5,6)
bindFn()

window.onload=function(){
  let lis = document.getElementsByTagName("li");
  let show = document.getElementById("show");
  for(var i = 0; i < lis.length; i ++){
    lis[i].onclick = (function (index) {
      console.log('---', index)
      return () => show.innerHTML = index
    })(i)
    lis[i] = null // 引用计数清除
  }
}