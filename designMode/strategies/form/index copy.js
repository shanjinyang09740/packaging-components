let formDom = document.querySelector("#regiterForm");
let strategies = {
    isNonEmpty: function(value, errMsg) {
        if (value === "") {
            return errMsg;
        }
    },
    minLength: function(value, len, errMsg) {
        if (value.length < len) {
            return errMsg;
        }
    },
};
let ValidatorFunc = function() {
    let validObj = new Validator();
    validObj.add(formDom.querySelector("#userName"), [{
        strage: "isNonEmpty",
        errMsg: "用户名不能为空",
    }, ]);
    validObj.add(formDom.querySelector("#passWord"), [{
            strage: "isNonEmpty",
            errMsg: "密码不能为空",
        },
        {
            strage: "minLength:6",
            errMsg: "密码至少输入6位",
        },
    ]);
    let err = validObj.start();
    if (err) {
        return err;
    }
};
formDom.onsubmit = function() {
    debugger;
    let err = ValidatorFunc();
    if (err) {
        alert(err);
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
                    let strage = "",
                        ruleStrageArr = [];
                    ruleStrageArr = rule.strage.split(":");
                    strage = ruleStrageArr.shift();
                    ruleStrageArr.unshift(dom.value);
                    ruleStrageArr.push(rule.errMsg);

                    return strategies[strage].apply(dom, ruleStrageArr);
                });
            })(rule);
        }
    }
    start() {
        for (let i = 0, validatorFunc;
            (validatorFunc = this.catch[i++]);) {
            let err = validatorFunc();
            if (err) {
                return err;
            }
        }
    }
}