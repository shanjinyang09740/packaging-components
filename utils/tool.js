/**
 * @description 转换为字符串
 * @param {String} val
 */
export function toString(val) {
    return val == null ?
        "" :
        typeof val === "object" ?
        JSON.stringify(val) :
        String(val);
}

/**
 * @description  去除字符串首位的空格
 * @param {String} str
 */
function trimTxt(str) {
    if (str === null) {
        return str;
    }
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 判断是否为空
 */
export function isEmpty(val) {
    if (typeof val === "boolean") {
        return false;
    }
    if (typeof val === "number") {
        return false;
    }
    if (val instanceof Array) {
        if (val.length === 0) return true;
    } else if (val instanceof Object) {
        if (JSON.stringify(val) === "{}") return true;
    } else {
        if (
            val === "null" ||
            val == null ||
            val === "undefined" ||
            val === undefined ||
            val === ""
        )
            return true;
        return false;
    }
    return false;
}

/***
 * @description 使用filter过滤数组中的假值(注意：这种操作会把 0 过滤掉)---替代链式取值避免报错
 * @param {Array} arr
 *
 */
export const arrayFilterFalseValue = (arr) => {
    return arr.filter(Boolean);
};

/***
 * @description 通过函数解析字符串（lodash的_.get方法）
 * @param {Object} obj 目标对象
 * @param {String} prop 属性键值
 * @param {String} def 默认值
 *
 */
export const getObjProp = (obj, props, def) => {
    if (obj == null || obj == null || typeof props !== "string") return def;
    const temp = props.split(".");
    const fieldArr = [].concat(temp);
    temp.forEach((e, i) => {
        if (/^(\w+)\[(\w+)\]$/.test(e)) {
            const matchs = e.match(/^(\w+)\[(\w+)\]$/);
            const field1 = matchs[1];
            const field2 = matchs[2];
            const index = fieldArr.indexOf(e);
            fieldArr.splice(index, 1, field1, field2);
        }
    });
    return fieldArr.reduce((pre, cur) => {
        const target = pre[cur] || def;
        if (target instanceof Array) {
            return [].concat(target);
        }
        if (target instanceof Object) {
            return Object.assign({}, target);
        }
        return target;
    }, obj);
};

// getObjProp(c ,'a.b')     // [1,2,3]
// getObjProp(c, 'a.b[1]')  // 2
// getObjProp(c, 'a.d', 12)  // 12

/***
 * @description 获取字典项---转义（应用范围有限，适用于电子公文系统）
 * @param {arr} 数组
 * @param {String} keyVal 匹配的键值key
 *
 */
export const getDicName = (arr, keyVal) => {
    let newName = "";
    if (Array.isArray(arr)) {
        arr.some((item) => {
            if (item["key"] == keyVal) {
                newName = item["name"];
                return true;
            }
        });
    }
    return newName;
};

/**
 * @description 对象深拷贝
 * @param {Object} source
 */
export const deepClone = (source) => {
    if (!source && typeof source !== "object") {
        throw new Error("error arguments", "deepClone");
    }
    const targetObj = source.constructor === Array ? [] : {};
    Object.keys(source).forEach((keys) => {
        if (source[keys] && typeof source[keys] === "object") {
            targetObj[keys] = deepClone(source[keys]);
        } else {
            targetObj[keys] = source[keys];
        }
    });
    return targetObj;
};

/**
 * @description 将时间转换成 2012-01-01 23:59:59
 * @value [String] value 2011-12-02 11:23:10
 */
export const timeSetMax = (value) => {
    if (value) {
        let date = new Date(value); //new Date(value*1000);根据时间戳格式进行选择乘1000或否
        let timeDate, Y, M, D, h, m, s;
        Y = date.getFullYear() + "-";
        M =
            (date.getMonth() + 1 < 10 ?
                "0" + (date.getMonth() + 1) :
                date.getMonth() + 1) + "-";
        D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
        h = 23 + ":";
        m = 59 + ":";
        s = 59;
        timeDate = Y + M + D + h + m + s;
        return timeDate;
    } else {
        return "";
    }
};

/**
 * @description 将时间转换成一天最大时间 如：2012-01-01 23:59:59
 * @value [String] fmt YYYY-mm-dd HH:MM:SS
 * @value [String] value 2011-12-02 11:23:10
 *
 * */
export const transFormDate = (fmt, date) => {
    if (date) {
        let ret;
        const opt = {
            "Y+": date.getFullYear().toString(), // 年
            "m+": (date.getMonth() + 1).toString(), // 月
            "d+": date.getDate().toString(), // 日
            "H+": date.getHours().toString(), // 时
            "M+": date.getMinutes().toString(), // 分
            "S+": date.getSeconds().toString(), // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (let k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(
                    ret[1],
                    ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
                );
            }
        }
        return fmt;
    } else {
        return "";
    }
};

/**
 * @description 生成唯一的组件实例码（组件id）
 * 规则：13位随机数与时间戳的和
 * @returns {String} 组件id
 */
export const setComponentId = () => {
    let random = Number(Math.random().toString().substring(3, 16));
    let timestaper = Number(Date.now());
    return `component${(random + timestaper).toString()}`;
};

/**
 *@description 阻止事件冒泡
 *@params {Object} event 事件
 *
 */
export const stopEventOut = (event) => {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    } else {
        window.event.returnValue = false;
        window.event.cancelBubble = true;
    }
};

/**
 *@description 模拟触发事件
 *params: dom 目标元素 如：#tab, .tab
 *params: event 事件 如：click, resize
 */
export const mockTrigEvent = (dom, event) => {
    let myEvent = new Event(event);
    document.querySelector("dom").dispatchEvent(myEvent);

    // let myEvent = new Event("click");
    // document.querySelector("#tab").dispatchEvent(myEvent);
};

/**
 * @description 转换成树形数据
 * parames: [Array] sNodes 传入的对象
 *
 */
export const transformTozTreeFormat = (sNodes) => {
    //将普通的数组转换为父子结构
    let i, l;
    let r = [];
    let tmpMap = {};
    const nodeChildren = (node, newChildren) => {
        if (typeof newChildren !== "undefined") {
            node.children = newChildren;
        }
        return node.children;
    };
    for (i = 0, l = sNodes.length; i < l; i++) {
        tmpMap[sNodes[i].id] = sNodes[i];
    }
    for (i = 0, l = sNodes.length; i < l; i++) {
        let p = tmpMap[sNodes[i].pId];
        if (p && sNodes[i].id != sNodes[i].pId) {
            let children = nodeChildren(p);
            if (!children) {
                children = nodeChildren(p, []);
            }
            children.push(sNodes[i]);
        } else {
            r.push(sNodes[i]);
        }
    }
    return r;
};

/**
 * @description 按路径下载图片
 * @param {String} imgsrc 图片路径
 * @param {String} name 下载图片名称
 * */
export const downloadIamge = (imgsrc, name) => {
    //下载图片地址和图片名
    let image = new Image();
    // 解决跨域 Canvas 污染问题
    image.setAttribute("crossOrigin", "anonymous");
    image.onload = function() {
        let canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        let context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
        let a = document.createElement("a"); // 生成一个a元素
        let event = new MouseEvent("click"); // 创建一个单击事件
        a.download = name || "photo"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
    };
    image.src = imgsrc;
};

/**
 * @description 导出数据base64图片
 * @param {String} base64Data
 * */
export const exportBase64 = (base64Data) => {
    var imgUrl = "data:image/png;base64," + base64Data;
    // 如果浏览器支持msSaveOrOpenBlob方法(也就是使用IE浏览器的时候)，那么调用该方法去下载图片
    if (window.navigator.msSaveOrOpenBlob) {
        var bstr = atob(imgUrl.split(",")[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        var blob = new Blob([u8arr]);
        window.navigator.msSaveOrOpenBlob(blob, "chart-download" + "." + "png");
    } else {
        // 这里就按照chrome等新版浏览器来处理
        const a = document.createElement("a");
        a.href = imgUrl;
        a.setAttribute("download", "chart-download");
        a.click();
    }
};

/**
 * @description 获取url地址栏参数---方法一
 * @param {String} variable
 */
export const getQueryVariable = (variable) => {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
};

/**
 * @description 获取url地址栏参数---方法二
 * @param {String} variable
 */
export const GetQueryString = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};

/**
 * @description  判断地址栏参数并判断参数中是否有非法字符
 * @param {String} temp_str
 */
export function judgeUrlParamIsRule(temp_str) {
    temp_str = trimTxt(temp_str);
    temp_str = temp_str.replace("*", "@");
    temp_str = temp_str.replace("--", "@");
    temp_str = temp_str.replace("/", "@");
    temp_str = temp_str.replace("+", "@");
    temp_str = temp_str.replace("'", "@");
    temp_str = temp_str.replace("\\", "@");
    temp_str = temp_str.replace("$", "@");
    temp_str = temp_str.replace("^", "@");
    temp_str = temp_str.replace(".", "@");
    temp_str = temp_str.replace(";", "@");
    temp_str = temp_str.replace("<", "@");
    temp_str = temp_str.replace(">", "@");
    temp_str = temp_str.replace('"', "@");
    temp_str = temp_str.replace("=", "@");
    temp_str = temp_str.replace("{", "@");
    temp_str = temp_str.replace("}", "@");

    let forbid_str = new String("@,%,~,&");
    let forbid_array = new Array();
    forbid_array = forbid_str.split(",");

    for (let i = 0; i < forbid_array.length; i++) {
        if (temp_str.search(new RegExp(forbid_array[i])) != -1) return false;
    }

    return true;
}