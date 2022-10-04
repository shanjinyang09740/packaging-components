let mult = function() {
    let result = 1;
    Array.from(arguments).forEach((item) => {
        result *= item;
    });

    return result;
};

let proxyMult = (function() {
    let cache = {};
    return function() {
        let args = Array.prototype.join.call(arguments, ",");
        if (args in cache) {
            return cache[args];
        }
        console.log(123124);
        return (cache[args] = mult.apply(this, arguments));
    };
})();

console.log(proxyMult(2, 3, 4));
console.log(proxyMult(2, 3, 4));