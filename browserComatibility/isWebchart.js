/**
 * @description 判断是否用微信打开
 * @returns true 使用微信打开页面      false 使用微信以外平台（比如浏览器）打开页面
 * 
*/
function is_weixin() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}

//调用方法
var isWeixin = is_weixin();
