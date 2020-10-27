//实现一个睡眠函数
function sleep(time) {
    let now = new Date();
    while (true) {
        if (new Date().getTime() - now == time) {
            break;
        }
    }
}
// console.log("开始。。");
// sleep(1000);
// console.log("结束");

let obj = {// 对象数据封装举例
    '0': '',
    '1': '秒杀',
    '2': '满减',
    '3': '直降',
    '11': '买赠',
    '12': '预售',
    '13': '满返',
    '14': '团购'
}
// let arr = [{a:1,i:{b:2,c:3,d:4}}]
// 不用到i，取出a,b,c,d的值
const arr = [{a:1,i:{b:2,c:3,d:4}}];
//i对应的ascii码为105
const {b,c,d} = arr[0][String.fromCharCode(105)];
// console.log(b,c,d)

/**
 * 浅拷贝，基本数据类型的值拷贝时，拷贝值(内存空间)，
 *        引用数据类型的值拷贝时，拷贝的是引用地址。
 *        所以操作一个地址时，共同的内存空间变化了，影响其他的引用地址的值。
 */
let a = {key1:'111'}
function shallowCopy(p){
    let c = {}
    for(let i in p){
        c[i] = p[i];
    }
    return c;
}
a.key2 = ['curry','stephen'] //a = {key1:'111',key2:['curry','stephen']}
let bl = shallowCopy(a); //bl = {key1:'111',key2:['curry','stephen']}
bl.key3 = '333'
bl.key2.push('allen')
bl.key1 += '2';
console.log(bl) // { key1: '1112', key2: [ 'curry', 'stephen', 'allen' ], key3: '333' }
console.log(a) // { key1: '111', key2: [ 'curry', 'stephen', 'allen' ] }


/**
 * 深拷贝
 * 把父对象中所有属于对象的属性类型都遍历赋给子对象。
 * 遍历的过程就是为了进行把引用传递改为值传递，重新开辟新的内存空间。
 * 所以后续对bval的操作不会影响al，因为他们不是指向同一内存空间。
 */
let al = {key1:'111'};
function deepCopy(p,c){
    var c = c || {};
    for(let i in p){
        if(typeof p[i] === 'object'){
            c[i] = (p[i].constructor === Array)?[]:{};
            deepCopy(p[i],c[i]);
        }else{
            c[i] = p[i];
        }
    }
    return c;
}
al.key2 = ['curry','stephen']; //al = {key1:'111',key2:['curry','stephen']}
let bval = {};
bval = deepCopy(al,bval);
console.log(al,bval)
bval.key2.push('allen');
console.log(bval.key2,al.key2)

/**
 * 判断数据类型
 */
function getDataType(data) {
    const temp = Object.prototype.toString.call(data)
    const arr = temp.match(/\b\w+\b/g)
    console.log(arr)
    return (arr.length < 2) ? 'Undefined' : arr[1]
}
console.log(getDataType(Symbol()))
/**
 * 判断两个对象是否相同
 */
class ObjectUtils{
    getDataType(data) {
      const temp = Object.prototype.toString.call(data);
      const type = temp.match(/\b\w+\b/g);
      return (type.length < 2) ? 'Undefined' : type[1];
    }
    iterable(data){
      return ['Object', 'Array'].includes(this.getDataType(data));
    }
    isObjectChangedSimple(source, comparison){
      const _source = JSON.stringify(source)
      const _comparison = JSON.stringify({...source,...comparison})
      return _source !== _comparison
    }
    isObjectChanged(source, comparison) {
      if (!this.iterable(source)) {
        throw new Error(`source should be a Object or Array , but got ${this.getDataType(source)}`);
      }
      if (this.getDataType(source) !== this.getDataType(comparison)) {
        return true;
      }
      const sourceKeys = Object.keys(source);
      const comparisonKeys = Object.keys({...source, ...comparison});
      if (sourceKeys.length !== comparisonKeys.length) {
        return true;
      }
      return comparisonKeys.some(key => {
        if (this.iterable(source[key])) {
          return this.isObjectChanged(source[key], comparison[key]);
        } else {
          return source[key] !== comparison[key];
        }
      });
    }
  }
  ObjectUtils.isObjectChanged(tar1, tar2)
  ObjectUtils.isObjectChangedSimple(tar1, tar2)
  
  
