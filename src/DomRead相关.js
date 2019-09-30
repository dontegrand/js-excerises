//domtype与nodeName、nodeValue
let divNode = document.getElementById("container");
console.log(divNode.nodeName + "/" + divNode.nodeValue);
console.log(divNode.attributes[0])//属性节点

//domReady 实现

// window.onload()
// $(document).ready(function(){
// })

// jQuery实现思想
function IEContentLoaded(fn){
    var init = function(){
        if(!done){
            done = true;
            fn();
        }
    }
    
    (function(){
        try{
            //Dom树未创建完之前调用doScroll会抛出错误
            d.documentElement.doScroll('left');
        }catch(e){
            // arcuments.callee函数自身
            setTimeout(arguments.callee,50);
        }
        init();
    })();
}