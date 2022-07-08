export default {
  /**
   * @description 加载iframe，并判断iframe加载成功时机
   * @param {String} domId iframe的id
   */
  loadIframe(domId) {
    let _THIS = this;
    let iframe = parent.document.getElementById(domId);
    let minHeight = 500;
    if (!(/*@cc_on!@*/ 0)) {
      //if not IE
      iframe.onload = function() {
        console.log("Local iframe is now loaded.");
        setInterval(function() {
          _THIS.initIframeHeight(iframe, minHeight);
        }, 500);
      };
    } else {
      iframe.onreadystatechange = function() {
        if (iframe.readyState == "complete") {
          console.log("Local iframe is now loaded.");
          setInterval(function() {
            _THIS.initIframeHeight(iframe, minHeight);
          }, 500);
        }
      };
    }
  },
  /**
   * @description iframe自适应高度
   * @param {Object} iframe的dom对象
   * @param {String} minHeight 为手动设置的最小高度
   */
  initIframeHeight(iframe, minHeight) {
    let userAgent = navigator.userAgent;
    let subdoc = null;
    if(iframe){
      subdoc = iframe.contentDocument || (iframe.contentWindow ? iframe.contentWindow.document : null);
    }else{
      return;
    }
    let subbody = subdoc ? subdoc.body : null;
    if(!subbody){return;}
    let realHeight;
    //谷歌浏览器特殊处理
    if (userAgent.indexOf("Chrome") > -1) {
      realHeight = subdoc.documentElement.scrollHeight;
    } else {
      realHeight = subbody.scrollHeight;
    }
    if (realHeight < minHeight) {
      iframe.style.height = minHeight + "px";
    } else {
      iframe.style.height = realHeight + "px";
    }
  },
};
