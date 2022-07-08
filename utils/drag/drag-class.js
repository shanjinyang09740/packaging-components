/**
 * @description 定义拖拽函数类
 */
class Drag {
    constructor() {
        //初始化拖拽目标dom
        this.dragDom = null;
        this.dragParentDom = null;
        //拖拽目标对象相对于拖拽父容器对象的位置坐标
        this.disX = 0;
        this.disY = 0;
        //设置默认配置参数
        this.setting = {
            //拖拽目标id
            id: '',
            //拖拽目标的父容器id
            parentId: '',
            //是否限制只在父容器区域拖拽
            flag: false
        }
    }
    init(paramsObj) {
        const That = this;
        //初始化拖拽目标对象dom
        this.dragDom = paramsObj.id ? document.querySelector('#' + paramsObj.id) : null;
        //初始化拖拽目标的父容器对象dom
        this.dragParentDom = paramsObj.parentId ? document.querySelector('#' + paramsObj.parentId) : null;
        //拷贝实例传入的配置参数，覆盖默认配置参数
        extendFunc(this.setting, paramsObj);
        //鼠标按下事件处理
        this.dragDom.onmousedown = function(ev) {
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
    fnDown(ev) {
        this.disX = ev.clientX - this.dragDom.offsetLeft;
        this.disY = ev.clientY - this.dragDom.offsetTop;
    }
    fnMove(ev) {
        let L = ev.clientX - this.disX;
        let T = ev.clientY - this.disY;
        if (this.setting.flag) {
            if (L < 0) {
                L = 0;
            } else if (L > viewWidth(this.dragParentDom) - this.dragDom.offsetWidth) {
                L = viewWidth(this.dragParentDom) - this.dragDom.offsetWidth;
            }
            if (T < 0) {
                T = 0;
            } else if (T > viewHeight(this.dragParentDom) - this.dragDom.offsetHeight) {
                T = viewHeight(this.dragParentDom) - this.dragDom.offsetHeight;
            }
        }
        //设置拖拽对象左上角位置
        this.dragDom.style.left = L + 'px';
        this.dragDom.style.top = T + 'px';
    }
    fnUp() {
        document.onmousemove = null;
        document.onmouseup = null;
    }

}

function viewWidth(parentDom) {
    return parentDom && parentDom.offsetWidth ? parentDom.offsetWidth : document.documentElement.clientWidth;
}

function viewHeight(parentDom) {
    return parentDom && parentDom.offsetHeight ? parentDom.offsetHeight : document.documentElement.clientHeight;
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