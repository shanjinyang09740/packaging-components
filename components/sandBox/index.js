// SandBox(['module1,module2'],function(box){});
/*
*
*
* @function
* @constructor
* @param []  array   模块名数组
* @param callback function 回调函数
* 功能：新建一块可用于模块运行的环境(沙箱)，自己的代码放在回调函数里，且不会对其他的个人沙箱造成影响
和js模块模式配合的天衣无缝
*
* */
function SandBox() {
    //私有的变量
    var args = Array.prototype.slice.call(arguments),
        callback = args.pop(),
        //模块可以作为一个数组传递，或作为单独的参数传递
        modules = (args && typeof args[0] == "string") ? args : args[0];
    //确保该函数作为构造函数调用
    if (!(this instanceof SandBox)) {
      return new SandBox(modules,callback);
    }
    //不指定模块名和“*”都表示“使用所有模块”
    if (!modules || modules[0] === "*") {
      for(value in SandBox.modules){
        modules.push(value);
      }
    }
    //初始化所需要的模块（将想要的模块方法添加到box对象上）
      for (var i = 0; i < modules.length; i++) {
        SandBox.modules[modules[i]](this);
      }
    //自己的代码写在回调函数里，this就是拥有指定模块功能的box对象
    callback(this);
  }
   SandBox.prototype={
     name:"My Application",
     version:"1.0",
     getName:function() {
       return this.name;
     }
   };
  /*
  * 预定义的模块
  *
  * */
  SandBox.modules={};
  SandBox.modules.event=function(box){
    //私有属性
    var xx="xxx";
    //公共方法
    box.attachEvent=function(){
      console.log("modules:event------API:attachEvent")
    };
    box.dettachEvent=function(){
    };
  }
  SandBox.modules.ajax=function(box) {
    var xx = "xxx";
    box.makeRequest = function () {
    };
    box.getResponse = function () {
    };
  }
  SandBox(['event','ajax'],function(box){
    box.attachEvent();
  })
  
  