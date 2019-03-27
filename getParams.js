/**
* 要小写来接收
*/
function getParams() {
    const queryString = window.location.search;
    //取得当前URL的参数
    let params = [];
    let index = 0;
    if (queryString.indexOf("?") !== -1) {
        let str = queryString.substr(1),
            strs = str.split("&");
        for (let i = 0; i < strs.length; i++) {
            const key = strs[i].split("=")[0];
            const value = strs[i].split("=")[1];
            params[index++] = _.unescape(value);
        }
    }
    return params;
}