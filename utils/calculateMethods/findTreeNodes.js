/**
 * @description 遍历树节点匹配id节点(使用闭包)
 * @param {Array} menus 
 * @param {String} id 
 * @returns {Object} newObj 
*/
function getMarryTreeMenu(menus, id) {
    var newObj = {};
    for (var i = 0; i < menus.length; i++) {
        if (menus[i].id == id) {
            newObj = menus[i];
            break;
        } else {
            (function() {
                var m = arguments[0];
                var menuid = arguments[1];
                for (var j = 0; j < m.length; j++) {
                    if (m[j].id == menuid) {
                        newObj = m[j];
                        break;
                    } else if (m[j].children != null && m[j].children.length > 0) {
                        //递归匿名方法
                        arguments.callee(m[j].children, id);
                    }
                }
            }
            )(menus[i].children, id);
        }
    }
    return newObj;
}

//用法示例
var treeData = [{
    "id": 28,
    "text": "公司信息",
    "children": [{
        "id": 1,
        "text": "公司文化"
    }, {
        "id": 2,
        "text": "招聘计划",
        "children": [{
            "id": 24,
            "text": "行政信息"
        }, {
            "id": 27,
            "text": "高层指示"
        }]
    }]
}];

console.log("菜单", getMarryTreeMenu(treeData, "24"));
