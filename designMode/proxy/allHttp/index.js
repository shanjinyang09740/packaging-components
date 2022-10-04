window.onload = function() {
    bindEvent();
};

let proxySychFile = (function() {
    let cache = [],
        timer = null;
    return function(id) {
        cache.push(id);
        if (timer) return;
        timer = setTimeout(function() {
            sychFunc(cache.join(","));
            clearTimeout(timer);
            timer = null;
            cache.length = 0;
        }, 3500);
    };
})();

let sychFunc = function(ids) {
    console.log("已经同步文件", ids);
};

function bindEvent() {
    let checkboxs = document.querySelectorAll("input");
    Array.from(checkboxs).forEach((ele) => {
        ele.onclick = function() {
            let isTrue = this.checked,
                id = this.id;
            if (isTrue) proxySychFile(id);
        };
    });
}