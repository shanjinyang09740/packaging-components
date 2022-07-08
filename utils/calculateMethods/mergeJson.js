// 遇到相同元素级属性，以后者（main）为准
// 不返还新Object，而是main改变
/**
 * @description 合并json对象（简单复杂对象均可）方法
 * @param {Object} minor 合并对象(合并前后不变) 
 * @param {Object} main 被合并对象（合并后的对象） 
*/
function mergeJSON(minor, main) {
  for (var key in minor) {
    if (main[key] === undefined) {
      // 不冲突的，直接赋值
      main[key] = minor[key];
      continue;
    }
    // 冲突了，如果是Object，看看有么有不冲突的属性
    // 不是Object 则以main为主，忽略即可。故不需要else
    if (isJSON(minor[key])) {
      // arguments.callee 递归调用，并且与函数名解耦
      arguments.callee(minor[key], main[key]);
    }
  }
}

/**
 * @description 判断是否为json对象
 * @param {Object} target
 * @returns {Boolean} true json对象
 */
function isJSON(target) {
  return typeof target == "object" && target.constructor == Object;
}

//用法示例
var json1 = {
  a: 1,
  b: {
    b1: "hello",
    b2: "world",
  },
};
var json2 = {
  b: { b2: "china" },
  c: 3,
};

mergeJSON(json1, json2);
console.log("合并之后json1", json1);
console.log("合并之后json2", json2);