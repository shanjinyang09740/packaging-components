// 什么是命名空间？
// 命名空间(namespace)表示标识符(identifier)的上下文(context) 。一个标识符可在多个命名空间中定义，它在不同命名空间中的含义是互不相干的。这样，在一个新的命名空间中可定义任何标识符，它们不会与任何已有的标识符发生冲突，因为已有的定义都处于其它命名空间中。
// 比如你分别调用：A.B.test(); 和D.E.test(); 则系统即可区分你要调用的是具体是那个test()方法。这里的A.B和D.E既是命名空间。

/**
 * @description JS没有真正意义上的命名空间，我们只是利用JS的一些特性来模拟命名空间的效果
 * @param {String} fullName
 * @link http://www.blogjava.net/hulizhong/archive/2009/03/16/259954.html
 * 
*/
var NameSpace = {};
NameSpace.register = function (fullName) {
    var nsArray = fullName.split(".");
    var sEval = "";
    var sNS = "";
    for (var i = 0, len = nsArray.length; i < len; i++) {
        if (i != 0) {
            sNS += ".";
        }
        sNS += nsArray[i];
        sEval += "if(typeof(" + sNS + ") == 'undefined'){" + sNS + " = new Object();}"
    }
    if (sEval != "") {
        eval(sEval);
    }
}

//注册
NameSpace.register("com");
NameSpace.register("cn.china");
com.test = function (data) {
    console.log(`
        com ${data}
    `);
};
cn.china.test = function (data) {
    console.log(`
        China ${data}
    `);
}

//调用
com.test("1111");
cn.china.test("2222");




/**
 * @description 小试牛刀
 * @description 这是一种比较简洁的实现，结构紧凑，通过function实例，且调用时无需实例化（new）
 * @link https://www.cnblogs.com/rdchen/p/10784388.html
*/
var NameSpace = {};
NameSpace.Hello = new function() {
    var self = this;
    var name = "world";
    self.sayHello = function (_name) {
        return `
            Hello ${_name || name}
        `;
    }
};
console.log(NameSpace.Hello.sayHello());