//实例1
console.log('0');
setTimeout(() => {
    console.log('1');
    new Promise(function(resolve) {
        console.log('2');
        resolve();
    }).then(()=>{
        console.log('3');
    })
    new Promise(resolve => {
        console.log('4');
        for(let i=0;i<9;i++){
            i == 7 && resolve();
        }
        console.log('5');
    }).then(() => {
        console.log('6');
    })
})

// 编译解释：
// 进入主线程，检测到log为普通函数，压入执行栈，输出0;
// 检测到setTimeOut是特殊的异步方法，交给其他模块处理，其回调函数加入 宏任务(macrotask)队列;
// 此时主线程中已经没有任务，开始从任务队列中取;
// 发现为任务队列为空，则取出宏任务队列首项，也就是刚才的定时器的回调函数;
// 执行其中的同步任务，输出1;
// 检测到promise及其resolve方法是一般的方法，压入执行栈,输出2，状态改变为resolve;
// 检测到这个promise的then方法是异步方法，将其回调函数加入 微任务队列;
// 紧接着又检测到一个promise，执行其中的同步任务，输出4，5，状态改变为resolve;
// 然后将它的then异步方法加入微任务队列;
// 执行微任务队列首项，也就是第一个promise的then，输出3;
// 再取出为任务队列首项，也就是第二个promise的then，输出6;
// 此时主线程和任务队列都为空，执行完毕;


//实例2
console.log('1'); // 1.压入主线程执行栈，输出1

setTimeout(function () { //2.它的回调函数被加入 宏任务队列中
	//7.目前微任务队列为空，所以取出 宏任务队列首项，执行此任务
    console.log('2'); // 输出2
    process.nextTick(function () { // 16.上一次循环结束，在下一次宏任务开始之前调用，输出3
        console.log('3'); 
    })
    new Promise(function (resolve) {
    	//8.执行 此promise的同步任务，输出4，状态变为resolve
        console.log('4');
        resolve();
    }).then(function () {//9.检测到异步方法then，将其回调函数加入 微任务队列中
        console.log('5'); // 10. 取出微任务队列首项，也就是这个then的回调，执行，输出5
    })
})

process.nextTick(function () { // 11.一次事件循环结束，执行nextTick()的回调，输出6
    console.log('6');
})
new Promise(function (resolve) { 
	//3.执行promise中的同步任务 输出7，状态变为resolve
    console.log('7');
    resolve();
}).then(function () { //4.检测到异步方法then，将其回调函数加入 微任务队列中
    console.log('8'); //6. 主线程执行完毕，取出微任务队列中首项，将其回调函数压入执行栈，输出8
})

setTimeout(function () { //5.它的回调函数 加入 宏任务队列中
	//12.此刻，微任务队列为空，开始执行此宏任务
    console.log('9'); // 输出9
    process.nextTick(function () { // 17.此刻 微任务和宏任务队列都为空了，此次循环自动结束，执行此回调，输出10
        console.log('10');
    })
    new Promise(function (resolve) {
    	//13. 执行此promise的同步任务，输出11，状态改变
        console.log('11');
        resolve();
    }).then(function () {//14.检测到then异步方法，加入微任务队列
        console.log('12');//15.取出微任务队列首项，执行此then微任务，输出12
    })

})