let registerFormDom = document.querySelector("#regiterForm");
let strategies = {
    nonEmpty: function(value, errMsg) {
        if (value === "") {
            return errMsg;
        }
    },
    minLength: function(value, length, errMsg) {
        if (value.length < length) {
            return errMsg;
        }
    },
};
let validatorFunc = function() {
    let validObj = new Validate();
    validObj.add(registerFormDom.querySelector("#userName"), [{
        strage: "nonEmpty",
        errMsg: "用户名不能为空",
    }, ]);
    validObj.add(registerFormDom.querySelector("#passWord"), [{
            strage: "nonEmpty",
            errMsg: "密码不能为空",
        },
        {
            strage: "minLength:8",
            errMsg: "密码至少输入8位以上",
        },
    ]);
    let returnErrMsg = validObj.start();
    if (returnErrMsg) return returnErrMsg;
};
registerFormDom.onsubmit = function() {
    let err = validatorFunc();
    if (err) {
        console.log(err);
        return false;
    }
};
class Validate {
    constructor() {
        this.catch = [];
    }
    add(dom, rules) {
        let self = this;
        for (let i = 0, rule;
            (rule = rules[i++]);) {
            (function(rule) {
                self.catch.push(function() {
                    let arr = [],
                        stageType = "";
                    arr = rule.strage.split(":");
                    stageType = arr.shift();
                    arr.unshift(dom.value);
                    arr.push(rule.errMsg);
                    return strategies[stageType].apply(dom, arr);
                });
            })(rule);
        }
    }
    start() {
        for (let i = 0, validFunc;
            (validFunc = this.catch[i++]);) {
            let err = validFunc();
            if (err) return err;
        }
    }
}