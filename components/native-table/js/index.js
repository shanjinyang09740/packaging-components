let tableList = {
    thead: [{
            name: "chnName",
            text: "中文名"
        },
        {
            name: "enName",
            text: "英文名"
        },
        {
            name: "value",
            text: "值"
        }
    ],
    tbody: [{
            "id": "1",
            "name": "bgq",
            "text": "报告期",
            "value": "2016"
        },
        {
            "id": "2",
            "name": "bgq",
            "text": "报告期",
            "value": "2017"
        },
        {
            "id": "3",
            "name": "bgq",
            "text": "报告期",
            "value": "2018"
        },
        {
            "id": "4",
            "name": "bgq",
            "text": "报告期",
            "value": "2019"
        },
        {
            "id": "5",
            "name": "bgq",
            "text": "报告期",
            "value": "2020"
        },
        {
            "id": "6",
            "name": "bgq",
            "text": "报告期",
            "value": "2021"
        },
        {
            "id": "7",
            "name": "bgq",
            "text": "报告期",
            "value": "2022"
        },
    ]
};

let submitTableList = {};

let tableMainDom = null;

window.onload = function() {
    tableMainDom = document.querySelector("#tableMain");
    //创建表格
    creatTable();
}

function creatTable() {
    //表格填充数据
    fillTableData(tableList);
}

function fillTableData(tableList) {
    submitTableList = JSON.parse(JSON.stringify(tableList));
    var tableHtml = [];
    tableHtml.push(`<table id="tableEle" border="1" width="100%" style="border-collapse: collapse;">`);
    for (let key in tableList) {
        if (key === "thead") {
            tableHtml.push(`<tr>`)
            tableList[key].forEach(item => {
                tableHtml.push(`<th>${item["text"]}</th>`);
            });
            tableHtml.push(`</tr>`);
        } else if (key === "tbody") {
            tableList[key].forEach(ele => {
                tableHtml.push(`<tr>`);
                for (let key2 in ele) {
                    if (key2 != "id") {
                        if (key2 === "value") {
                            tableHtml.push(`<td><input oninput="entertrigger(${ele.id}, this.value)" class="enterInput" type="text" name="${ele.id}" value="${ele[key2]}" /></td>`);
                        } else {
                            tableHtml.push(`<td>${ele[key2]}</td>`);
                        }
                    }
                }
                tableHtml.push(`</tr>`);
            });
        }
    }
    tableHtml.push(`</table>`);
    tableMainDom.insertAdjacentHTML("afterbegin", tableHtml.join(""));

    //输入框绑定节流阀函数
    // bindOnInputEvent();


}

//方法1 渲染dom完成后，遍历列表中所有输入框绑定节流阀函数
// function bindOnInputEvent() {
//     let inputDoms = document.querySelectorAll(".enterInput");
//     inputDoms.forEach(ele => {
//         ele.oninput = debounce(function() {
//             let currentId = this.getAttribute("name");
//             let currentValue = this.value;
//             submitTableList["tbody"].some(item => {
//                 if (currentId === item["id"]) {
//                     item["value"] = currentValue;
//                     return true;
//                 }
//             });
//             console.log(submitTableList);
//         }, 500);
//     });
// }


//方法2 在初始化dom时注册节流阀函数
let timerOut;

function entertrigger(id, value) {
    let currentId = String(id);
    let currentValue = value;
    clearTimeout(timerOut);
    timerOut = setTimeout(() => {
        submitTableList["tbody"].some(item => {
            if (currentId === item["id"]) {
                item["value"] = currentValue;
                return true;
            }
        });
        console.log(submitTableList);
    }, 500);
}

//提交数据
function submitData(params) {
    console.log("提交表单数据", submitTableList);
}

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