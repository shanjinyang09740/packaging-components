/**
 * @description 异步迭代器---主要用来遍历异步对象
*/
function Gen(time) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve(time);
        }, time);
    });
}

async function test() {
    let arr = [Gen(2000), Gen(4000), Gen(6000)];
    for await (let item of arr){
        console.log(Date.now(), item);
    }
}

test();