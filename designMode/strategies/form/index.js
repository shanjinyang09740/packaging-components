let registerFormDom = document.querySelector("#regiterForm"),
    userNameDom = document.querySelector("#userName"),
    passWordDom = document.querySelector("#passWord");
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
let validateFunc = function() {
    let validClass = new Validator();
    validClass.add(userNameDom, [{
        strage: "nonEmpty",
        errMsg: "用户名不能为空",
    }, ]);
    validClass.add(passWordDom, [{
            strage: "nonEmpty",
            errMsg: "密码不能为空",
        },
        {
            strage: "minLength:9",
            errMsg: "密码至少输入9位以上",
        },
    ]);
    let err = validClass.start();
    if (err) return err;
};
registerFormDom.onsubmit = function() {
    let returnErrMsg = validateFunc();
    if (returnErrMsg) {
        console.log(returnErrMsg);
        return false;
    }
};
class Validator {
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
                        type = "";
                    arr = rule.strage.split(":");
                    type = arr.shift();
                    arr.unshift(dom.value);
                    arr.push(rule.errMsg);

                    return strategies[type].apply(dom, arr);
                });
            })(rule);
        }
    }
    start() {
        for (let i = 0, validfunc;
            (validfunc = this.catch[i++]);) {
            let err = validfunc();
            if (err) return err;
        }
    }
}