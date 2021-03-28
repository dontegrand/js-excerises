
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

// 1. promise要求构造函数的参数(使用promise时对应的就是业务函数)立即执行。
// 2. promise要求有then属性，then的参数cb是promise的回调，返回一个新的promise，并把当前promise的cb和新promise的resolve关联放入
//    callbacks的回调队列中，这是形成promise链的关键。
// 3. 实例执行resolve方法，就是改变promise的状态，保存了promise的值value，并执行队列里的cbs回调。
// 4. 实例调用then方法除了在状态为pending时把关联的对象放入callbacks队列中之外，在状态为非pending时，就去执行当前promise的cb，返回值作为
//    后一个promise的值value。
// 5. 如果cb返回值也是一个promise，那就要把这个promise加入到promise链里面，去依赖当前的promise的状态去走。
class APromise {
  callbacks = []
  state = 'pending'
  value = null

  constructor(fn) {
    // 改变实例中this的指向为这个APormise类
    fn(this._resolve.bind(this), this._reject.bind(this))
  }

  then(cb, errorcb) {
    return new APromise((resolve, reject) => {
      const link = {
        cb: cb || null, // 前promise的回调cb
        resolve: resolve, // 后promise的业务函数的resolve参数
        errorcb: errorcb || null, // 前promise的错误回调errorcb
        reject: reject // 后promise的业务函数的reject参数
      }
      this._handle(link)
    })
  }
  // 1.1 新增catch方法，then方法的改版，对应catch到的error通过reject返回出来。
  catch(onError) {
    return this.then(null, onError)
  }
  // 1.2 新增finally方法，无关state的状态是fulfilled还是rejected，只需返回拿到最终的值即可。
  finally(onDone) {
    if (typeof onDone !== 'function') return this.then()
    // 如果参数是个
    let Promise = this.constructor
    return this.then(
      value => Promise.resolve(onDone()).then(() => value),
      reason => Promise.resolve(onDone()).then(() => {throw reason})
    )
  }

  _handle(link) {
    // 如果当前promise还是pending，就注册cb完结束了，等着resolve
    if (this.state === 'pending') {
      this.callbacks.push(link)
      return
    }
    // 如果当前promise非pending状态，并且cb为空即没有then接着了，就执行后邻promise的cb
    let cb = this.state === 'fulfilled' ? link.cb : link.errorcb

    if (!cb) {
      cb = this.state === 'fulfilled' ? link.resolve : link.reject
      cb(this.value)
      return
    }

    // 如果当前promise非pending状态，并且cb不为空，就执行当前promise链的cb，
    let ret = cb(this.value)
    // 继续后邻promise
    cb = this.state === 'fulfilled' ? link.resolve : link.reject
    cb(ret)

    // 1.1 新增catch方法对应改造handle
    let ret;
    try {
      ret = cb(this.value)
      cb = this.state === 'fulfilled' ? link.resolve : link.reject
    } catch (error) {
      ret = error
      cb = link.reject
    } finally {
      cb(ret)
    }

  }

  _resolve(value) {
    // 当前promise的cb回调返回值是一个promise时， promise有then、resolve等方法。
    if (value && (typeof value === 'object' || typeof value === 'function')) {
      let then = value.then
      if (typeof then === 'function') {
        // 因为返回的promise的状态要依赖当前的promise的状态，所以把当前promise的resolve值作为后promise的回调。
        // 执行then方法就是关联当前的promise和后一个promise，按状态来决定是注册还是执行
        then.call(value, this._resolve.bind(this), this._reject.bind(this))
        return
      }
    }

    this.state = 'fulfilled'
    this.value = value
    this.callbacks.forEach(link => this._handle(link))
  }

  _reject(error) {
    this.state = 'rejected'
    this.value = error
    this.callbacks.forEach(link => this._handle(link))
  }

  // 1.3 静态方法：Promise.resolve(value) 
  static resolve(value) {
    if (value && value instanceof Promise) {
      // value是一个promise，直接返回promise
      return value;
    } else if (value && typeof value === 'object' && typeof value.then === 'function') {
      // value是一个具有then属性的对象，就返回新的promise并执行他的then
      let then = value.then;
      return new Promise(resolve => {
        then(resolve);
      });
    } else if (value) {
      // value是一个基本类型， 直接resolve出value
      return new Promise(resolve => resolve(value));
    } else {
      // value没有，就返回新的promise
      return new Promise(resolve => resolve());
    }
  }
  // 1.4 静态方法：Promise.reject(value)
  static reject(value) {
    if (value && typeof value === 'object' && typeof value.then === 'function') {
      // value是一个promise，就返回新的promise并执行他的then，固定传reject状态
      let then = value.then;
      return new Promise((resolve, reject) => {
        then(reject);
      });
    } else {
      // 其他都返回新的reject状态的promise
      return new Promise((resolve, reject) => reject(value));
    }
  }
  // 1.5 静态方法：Promise.all(promises), 传入promises数组，等所有promise都fulfilled后，返回按promise实例顺序的result数组。
  static all(promises) {
    return new Promise((resolve, reject) => {
      let resolvesCount = 0
      const total = promises.length
      const resArr = Array.from({length: total})
      promises.forEach((promise, index) => {
        Promise.resolve(promise).then(res => {
          resolvesCount ++ 
          resArr[index] = res
          if (resolvesCount === total) {
            resolve(resArr)
          }
        })
      })
    }, reason => this.reject(reason))
  }
  // 1.6 静态方法：Promise.race(promises)，传入promises数组，返回数组中最新变为fulfilled状态的promise的result
  static race(promises) {
    return new Promise((resolve, reject) => {
      for(let i = 0; i <= promises.length; i ++) {
        Promise.resolve(promises[i]).then(res => {
          return resolve(res)
        }, reason => reject(reason))
      }
    })
  }
}

// new APromise((resolve, reject) => {

// }).then(rse => {

// }, error => {
  
// }).catch(error => {

// }).finally(onDone) {
//  console.log(onDone)
// }
