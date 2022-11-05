let functionA = function() {
    console.log(123);
};
let newFunctionA = functionA;
functionA = function() {
    newFunctionA();
    console.log(789);
};

functionA();