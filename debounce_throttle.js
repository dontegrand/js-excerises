/**
 * 防抖函数：
 *     在连续的事件周期结束时执行一次
 */
function debounce(fn, wait) {
    let timeout = null;
    return function () {
        if (timeout != null) clearTimeout(timeout)
        timeout = setTimeout(fn, wait);
    }
}

function handle() {
    console.log("--debounce--");
}

/**
 * 节流函数：
 *      在连续的事件周期里间歇性的执行函数
 */
function throttle(fn, delay) {
    var prev = Date.now();
    console.log("-0-", prev);
    return function () {
        var now = Date.now();
        console.log("-1-", prev);
        if (now - prev > delay) {
            fn();
            prev = Date.now();
            console.log("-2-", prev);
        }
    }
}

//因为debounce(handle,1000)所以执行了一次timeout = null，返回了setTimeOut函数，
// 这是一个宏任务，得等到同步执行栈执行完之后再执行，所以得等到scroll事件停止后再执行，
// setTimeOut(fn,1000)停止滚动后的一秒才执行fn，实现fn的防抖。
// window.addEventListener('scroll',debounce(handle,1000));

//原理：一直记录当前时间，如果下一次触发的时间跟当前时间差距大于了设置的延迟时间delay(500)时
//就执行一次fn(),然后把当前时间再次记下。
window.addEventListener('scroll', throttle(handle, 500));
