

export function getCookie(k) {
    var arr,reg=new RegExp("(^| )"+k+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)) {
        return decodeURIComponent(arr[2]);
    }
    else return null;
}

export function getAllCookies() {

    var cookieStr = document.cookie;

    var cookieArr = cookieStr.split("; ");
    var cookieDicArr = [];

    for (var i=0; i<cookieArr.length; i++) {
        var arr = cookieArr[i].split("=");
        var dic = {key:arr[0], val:arr[1]};
        cookieDicArr.push(dic);
    }
    var userCookie={};
    for (var j=0; j<cookieDicArr.length;j++) {
    userCookie[cookieDicArr[j].key] = decodeURIComponent(cookieDicArr[j].val);

    }
    return userCookie;
}

export function setCookie(k, value ,exTime) {
    var exp = new Date();
    if (exTime.length > 0){
        var strSec = getSec(exTime);
        exp.setTime(exp.getTime() + strSec*1);
    }
    document.cookie = k + "=" + encodeURIComponent(value) + ";expires=" + exp.toUTCString() + ";path=/";
}

export function getSec(str) {
    var str1 = str.substring(1, str.length)*1;
    var str2 = str.substring(0, 1);
    if (str2 == 's') return str1*1000;
    if (str2 == 'h') return str1*60*60*1000;
    if (str2 == 'd') return str1*24*60*60*1000;
}

export function delCookie(k) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 10000);
    var cVal = getCookie(k);
    document.cookie = k + "=" + cVal + ";expires=" + exp.toUTCString() + ";path=/";
}

export function clearCookie(){
    var c = getAllCookies();
    for (var k in c ) {
        delCookie(k);
    }
}
