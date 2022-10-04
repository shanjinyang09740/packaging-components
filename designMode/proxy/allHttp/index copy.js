window.onload = function() {
    bindEvent();
};

let agendSychFunc = (function() {
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
        }, 3000);
    };
})();

function bindEvent() {
    let checkboxs = document.querySelectorAll("input");
    for (let i = 0, c;
        (c = checkboxs[i++]);) {
        c.onclick = function() {
            let id = c.id;
            if (c.checked) agendSychFunc(id);
        };
    }
}

function sychFunc(id) {
    console.log("正在同步文件", id);
}