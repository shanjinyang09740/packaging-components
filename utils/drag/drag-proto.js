/**
 * @description 定义拖拽函数
 */
function Drag() {
    //初始化拖拽对象
    this.obj = null;
    this.disX = 0;
    this.disY = 0;
    //设置默认配置参数
    this.setting = {
        id: '',
        flag: false
    }
}

/**
 * @description 定义原型方法
 */
Drag.prototype.init = function(opt) {
    const That = this;
    this.obj = document.querySelector('#' + opt.id);
    //拷贝实例传入的配置参数，覆盖默认配置参数
    extendFunc(this.setting, opt);
    //鼠标按下事件处理
    this.obj.onmousedown = function(ev) {
        var evt = ev || window.ev;
        That.fnDown(evt);

        document.onmousemove = function(ev) {
            var evt = ev || window.event;
            That.fnMove(evt);
        }

        document.onmouseup = function() {
            That.fnUp();
        }
        return false;
    }
}

Drag.prototype.fnDown = function(ev) {
    this.disX = ev.clientX - this.obj.offsetLeft;
    this.disY = ev.clientY - this.obj.offsetTop;
}

Drag.prototype.fnMove = function(ev) {
    let L = ev.clientX - this.disX;
    let T = ev.clientY - this.disY;
    if (this.setting.flag) {
        if (L < 0) {
            L = 0;
        } else if (L > viewWidth() - this.obj.offsetWidth) {
            L = viewWidth() - this.obj.offsetWidth;
        }
        if (T < 0) {
            T = 0;
        } else if (T > viewHeight() - this.obj.offsetHeight) {
            T = viewHeight() - this.obj.offsetHeight;
        }
    }
    //设置拖拽对象左上角位置
    this.obj.style.left = L + 'px';
    this.obj.style.top = T + 'px';
}

Drag.prototype.fnUp = function() {
    document.onmousemove = null;
    document.onmouseup = null;
}

function viewWidth() {
    return document.documentElement.clientWidth;
}

function viewHeight() {
    return document.documentElement.clientHeight;
}

/**
 * @description 对象拷贝覆盖方法
 * @param {Object} originObj
 * @param {Object} passObj
 */
function extendFunc(originObj, passObj) {
    for (let key in passObj) {
        originObj[key] = passObj[key];
    }
}