/* 封装的原生post请求 */
export const postJSON = (url, data) => {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);

    xhr.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded; charset=utf-8"
    );
    xhr.setRequestHeader(
      "Accept",
      "application/json, text/javascript, */*; q=0.01"
    );
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    xhr.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status === 200) {
          try {
            resolve(JSON.parse(this.responseText), this);
          } catch (error) {
            resolve(this.responseText);
          }
        } else {
          var resJson = {
            code: this.status,
            response: this.response,
          };
          errorHandle(this.status);
          reject(resJson, this);
        }
      }
    };

    let postDataArr = [];

    for (var key in data) {
      postDataArr.push(_addParam(key, data[key]));
    }

    /**
     * @description 处理相应错误监听
     */
    xhr.addEventListener("load", (e) => {
      if (e.currentTarget.status !== 200) {
        let connectPerson = "";
        if (e.currentTarget.status === 500) {
          connectPerson = "请联系后端开发！";
        } else if (e.currentTarget.status === 401) {
          connectPerson = "当前状态未登录，请登录！";
        } else if (e.currentTarget.status === 403) {
          connectPerson = "您的账户没有权限，请联系项目组人员！";
        } else if (e.currentTarget.status === 404) {
          connectPerson = "当前接口无法访问，请联系运维组人员！";
        }
        console.error({
          title: `请求发生错误`,
          dangerouslyUseHTMLString: true,
          message: `<h5>错误的url：</h5>
                    <div>${e.currentTarget.responseURL}</div>
                    <h5>错误信息：</h5>
                    <div>${e.currentTarget.responseText}  ${connectPerson}</div>`,
        });
      } else {
        try {
          let responseText = e.currentTarget.responseText;
          responseText = JSON.parse(responseText);
          if (
            !(
              Array.isArray(responseText.data) &&
              !!responseText.data[0] &&
              Object.prototype.toString.call(responseText.data[0]) ===
                "[object Object]"
            )
          ) {
            console.error({
              title: `请求返回格式非通用格式`,
              dangerouslyUseHTMLString: true,
              message: `<h5>错误的url：</h5>
                        <div>${e.currentTarget.responseURL}</div>
                        <h5>返回格式：</h5>
                        <div>${e.currentTarget.responseText}</div>`,
            });
          }
        } catch (error) {}
      }
    });

    xhr.send(postDataArr.join("&").replace(/%20/g, "+"));
  });
};
import { MessageBox } from "element-ui";
/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = (msg, status) => {
  // window.open("/login?toUrl=/index.html", "loginPopupWindow", "top=200,left=400,width=370,height=335,directories=no,menubar=no,toolbar=no");
  if (status === 401 || status === 403)
    MessageBox.alert(msg, "警告", {
      confirmButtonText: "确定",
      type: "warning",
    }).then(() => {
      if (window != top) {
        top.open(
          "/login?toUrl=/index.html",
          "loginPopupWindow",
          "top=200,left=400,width=370,height=335,directories=no,menubar=no,toolbar=no"
        );
      } else {
        window.open(
          "/login?toUrl=/index.html",
          "loginPopupWindow",
          "top=200,left=400,width=370,height=335,directories=no,menubar=no,toolbar=no"
        );
      }
      // window.open("/login?toUrl=/index.html", "loginPopupWindow", "top=200,left=400,width=370,height=335,directories=no,menubar=no,toolbar=no");
    });
};

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      tip("当前未重新登录,请先登录", 401);
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      tip("登录过期，请重新登录", 403);
      break;
    // 404请求不存在
    case 404:
      tip("请求的资源不存在", 404);
      break;
    default:
      "";
  }
};

/**传入参数处理*/
function _addParam(key, value) {
  // If value is a function, invoke it and return its value
  value =
    Object.prototype.toString.call(value) === "Function"
      ? value()
      : value == null
      ? ""
      : value;
  return encodeURIComponent(key) + "=" + encodeURIComponent(value);
}