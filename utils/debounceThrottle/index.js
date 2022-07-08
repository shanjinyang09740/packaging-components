/***
 * @decription 防抖函数--- 用户触发事件过于频繁，控制事件函数只执行最后一次----可作用于输入框
 * @param {Function} fn 传入的主体函数
 * @param {String} delay 延迟时间
 * 
 */
function debounce(fn, delay) {
    let t = null;
    return function() {
        if (t !== null) {
            clearTimeout(t);
        }
        t = setTimeout(() => {
            fn.call(this);
        }, delay);
    }
}

/***
 * @decription 节流函数---控制高频事件执行次数---可用于滚动条
 * @param {Function} fn
 * @param {String} delay
 * 
 */
function throttle(fn, delay) {
    let flag = true;
    return function() {
        if (flag) {
            setTimeout(() => {
                fn.call(this);
                flag = true;
            }, delay);
        }
        flag = false;
    }
}