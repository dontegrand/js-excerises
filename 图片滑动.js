window.onload=function(){
    var box = document.getElementById('container');
    var imgs = document.getElementsByTagName('img');
    var imgWidth = imgs[0].offsetWidth;
    var exposeWidth = 160;
    var boxWidth = imgWidth + (imgs.length-1)*exposeWidth;
    box.style.width = boxWidth + 'px';

    function setImgsPos(){
        for(let i = 1; i < imgs.length; i ++){
            imgs[i].style.left = imgWidth + exposeWidth*(i-1) + 'px';
        }
    }

    setImgsPos();

    var translate = imgWidth - exposeWidth;

    for(let i = 0; i < imgs.length; i++){
        //立即执行函数
        (function(i){
            imgs[i].onmouseover = function(){
                setImgsPos();
                for(let j = 1; j <= i; j++){
                    //parseInt(string,radix) radix可选，作为解析值得基数。
                    imgs[j].style.left = parseInt(imgs[j].style.left,10) - translate + 'px';
                }
            }
        })(i)
    }
}