
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
class ObjectUtils{
    /**
     * 判断两个对象是否相同
     */
    getDataType(data) {
      const temp = Object.prototype.toString.call(data);
      const type = temp.match(/\b\w+\b/g);
      return (type.length < 2) ? 'Undefined' : type[1];
    }
    /**
     * 判断对象是不是引用数据类型
     * @param {*} data 
     */
    iterable(data){
      return ['Object', 'Array'].includes(this.getDataType(data));
    }
    /**
     * 比较两个简单对象是否发生了变化(相等)
     * @param {} source 
     * @param {*} comparison 
     */
    isObjectChangedSimple(source, comparison){
      const _source = JSON.stringify(source)
      // {...source, ...comparison} 得到的对象包括source中所有k-value与comparison的所有k-value，
      // 如果二者key相同时，得到的对象会以comparison的value为结果，这样确保得到的对象包含source，省去判异的过程。
      const _comparison = JSON.stringify({...source,...comparison})
      return _source !== _comparison
    }
    /**
     * 比较两个复杂对象是否发生了变化(相等)
     * @param {*} source 
     * @param {*} comparison 
     */
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
    /**
     * 浅克隆，把目标对象的k-value，依次克隆到结果对象上，每一次克隆可能克隆基本类型或者引用类型
     * 当value是引用数据类型时，克隆传递的引用，导致改变目标对象的value，结果对象的value也会变。
     * @param {*} target 
     */
    shallowCopy(target) {
      let result = {}
      for (let i in target) {
        result[i] = target[i]
      }
      return result
    }
    /**
     * 深克隆,把目标对象的k-value，依次克隆到结果对象上，每一次克隆都是克隆基本类型，值传递，
     * 所以结果对象的value都是新的内存空间，不会随着目标对象的value改变而改变。
     * @param {*} target 
     * @param {*} res 
     * @return 克隆得到的对象
     */
    deepCopy(target, res) {
      let result = res || {}
      for (let i in target) {
        if (this.iterable(target[i])) {
          result[i] = this.getDataType(target[i]) === 'Array' ? [] : {}
          this.deepCopy(target[i], result[i])
        } else {
          result[i] = target[i]
        }
      }
      return result
    }
    /**
     * 数组的深克隆
     * @param {*} target 
     */
    deepArrayCopy(target) {
      // 1.for循坏，略
      // 2.concat方法
      // return target.concat()
      // 3.slice方法
      // return target.slice(0)
      // 4. ...扩展运算符合
      let [...arr] = target
      return arr
    }
    /**
     * 引用类型深克隆
     */
    mutilDeepCopy(target) {
      if (this.getDataType(target) === 'Array') return this.deepArrayCopy(target)
      else if (this.getDataType(target) === 'Object') return this.deepCopy(target)
    }
  }
const utils  = new ObjectUtils()
const str1 = [{a: [1,3,4]}, {b: {b1: '0000'}}, {c: 3}]
const str2 = [{a: 1}, {b: 4}, {c: 3}]
const str3 = {a: [1,3,4], b: {b1: '0000'}, c: '888'}
// console.log(utils.isObjectChanged(str1, str2))
const str4 = utils.shallowCopy(str3)
const str5 = utils.mutilDeepCopy(str2)
// console.log(str4)
console.log(str5)
// str3.a.push(5)
// console.log(str4)
// console.log(str5)
class MyPromise {
  callbacks = []
  state = 'pending'
  value = null
  constructor(fn) {
    // 构造函数里直接执行业务函数, 形参为自己的resolve函数
    const resolve = this._resolve.bind(this)
    fn(resolve)
  }
  then(cb) {
    // 返回后邻promise形成promise链
    return new MyPromise(resolve => {
      const link = {cb, resolve}
      this._handle(link)
    })
  }
  // 根据状态决定是注册还是执行callback
  _handle({cb = null, resolve}) {
    // 如果当前promise还是pending，就注册cb完结束了，等着resolve
    if (this.state === 'pengding') return this.callbacks.push({cb, resolve}) 
    // 如果当前promise非pending状态，并且cb为空即没有then接着了，就执行后邻promise的cb
    if (!cb) return resolve(this.value)
    // 如果当前promise非pending状态，并且cb不为空，就执行当前promise链的cb，
    const cbPromise = cb(this.value)
    // 继续后邻promise
    resolve(cbPromise)
  }
  // 改变状态，保存值并执行cb
  _resolve(val) {

    // 如果promise链的resolve的也是promise，就递归then，也就是说当前的promise实力的状态要依赖
    // resolve的值的promise实例的状态。
    if (val && (typeof val === 'object' || typeof val === 'function')) {
      let then = val.then
      if (typeof then === 'function') return then.call(val, this._resolve.bind(this))
    }

    this.state = 'resolved'
    this.value = val
    this.callbacks.forEach(link => this._handle(link))
  }
}
