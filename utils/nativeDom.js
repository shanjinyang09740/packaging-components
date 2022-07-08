/**
 *@description 原生js操作类名
 *
 */
function operateClassName() {
  let markDiv = document.createElement("div");
  //添加类名
  markDiv.classList.add("mark");
  //删除类名
  markDiv.classList.remove("mark");
};

/**
 * @description 原生js添加删除元素----insertAdjacentHTML
 * beforebegin: 元素自身的前面。
 * afterbegin: 插入元素内部的第一个子节点之前。
 * beforeend: 插入元素内部的最后一个子节点之后。
 * afterend: 元素自身的后面。
 *
 */

//   <!-- beforebegin -->
// <p>
// <!-- afterbegin -->
// foo
// <!-- beforeend -->
// </p>
// <!-- afterend -->

function operateElements() {
  let containtDom = document.createElement("div");
  containtDom.insertAdjacentHTML(
    "beforebegin",
    `<div class="before">最前添加元素</div>`
  );
  containtDom.insertAdjacentHTML(
    "afterbegin",
    `<div class="after">最后添加元素</div>`
  );
  containtDom.insertAdjacentHTML(
    "beforeend",
    `<div class="before">最前添加元素</div>`
  );
  containtDom.insertAdjacentHTML(
    "afterend",
    `<div class="after">最后添加元素</div>`
  );
};

//endsWith兼容ie8
String.prototype.endsWith = function (str) {
  if (str == null || str == "" || this.length == 0 || str.length > this.length){
     return false; 
  }
  if (this.substring(this.length - str.length) == str){
      return true
  }else{
      return false
  }
  return true;
};

//使用
var str1 = "1244/";
str1.endsWith("/");

/**
 * @description 将原数组去掉第一个元素并返回新数组
 * @param {Array} arr
 *
 * */
function deleteArrFirstElement(arr) {
  if (arr.length > 0) {
    let newArr = arr.slice(0);
    newArr.shift();
    return newArr;
  }
};

/**
 * @description 拆分数组
 * @param {Array} arr 传入的原始数组
 * @param {Number} size 拆分数组中的每个数组的元素个数
 *
 */
function chunk(arr, size) {
  const result = Array.apply(null, {
    length: Math.ceil(arr.length / size),
  }).map((item, index) => {
    return arr.slice(index * size, (index + 1) * size);
  });
  return result;
};

/**
 * @description 判断是否为一个对象
 * @param {Object} obj 传入的对象
 *
 */
function isObject(obj) {
  return obj !== null && typeof obj === "object";
};

/**
 * @description 判断是否为一个数组
 * @param {Array} arr 传入的数组
 *
 */
function isArray(arr) {
  return Array.isArray(arr);
}

/**
 * @description 比较两个对象数组是否完全相同
 * @param {Array} arr1 传入的数组
 * @param {Array} arr2 传入的数组
 *
 */
function isEqualArray(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

/**
 * @description 简单数组去重
 * @param {Array} arr 传入的数组
 */
function filterArray(arr) {
    let newArr = new Set(arr);
  return [...newArr];
}

/**
 * @description 复杂对象数组去重---根据数组中对象的某个属性进行过滤
 * @param {Array} arr 传入的数组
 * @param {String} arr 传入的属性
 */
 function arrDistinctByProp(arr,prop){
    return arr.filter(function(item,index,self){
        return self.findIndex(el=>el[prop]==item[prop])===index
    })
}
