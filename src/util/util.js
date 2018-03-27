export function formatDate (timestamp, onlyDate, noSecond) {
    if(timestamp) {
        var now = new Date(timestamp);

        var year = now.getFullYear();

        var month = now.getMonth() + 1;
        month = fixZero(month);

        var day = now.getDate();
        day = fixZero(day);

        var hour = now.getHours();
        hour = fixZero(hour);

        var minute = '' + now.getMinutes();
        minute = fixZero(minute);

        var second = now.getSeconds();
        second = fixZero(second);

        if (onlyDate) return year + "年" + month + "月" + day+'日';
        if (noSecond) return year + "年" + month + "月" + day + "日" + hour + ":" + minute;
        return year + "年" + month + "月" + day + "日" + hour + ":" + minute + ":" + second;
    }
    return "";
};

function fixZero(p) {
    var str = '' + p;
    if (str.length == 1) {
        str = '0' + str;
    }
    return str;
}