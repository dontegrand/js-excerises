/**
 * 判断obj是否含有source相同的属性
 * Object.keys(source)返回source的属性数组。
 * Array.protoType.every(callback[,thisArg] 测试数组所有元素是否都通过了callback函数测试。
 */
const matchs = (obj,source) => 
    Object.keys(source).every(key => obj.hasOwnProperty(key) && obj[key] === source[key])
// console.log(matchs({ age: 25, hair: 'long', beard: true }, { hair: 'long', beard: true }));

