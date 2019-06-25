/**
 * 防抖函数：
 *     在连续的事件周期结束时执行一次
 */
function debounce(fn,wait){
    let timeout = null;
    return function() {
        if(timeout != null) clearTimeout(timeout)
        timeout = setTimeout(fn,wait);
    }
}

function handle(){
    console.log("--debounce--");
}

/**
 * 节流函数：
 *      在连续的事件周期里间歇性的执行函数
 */
function throttle(fn,delay){
    var prev = Date.now();
    return function(){
        var now = Date.now();
        if(now - prev > delay){
            fn();
            prev = Date.now();
        }
    }
}


window.addEventListener('scroll',debounce(handle,1000));
window.addEventListener('scroll',throttle(handle,1000));
 