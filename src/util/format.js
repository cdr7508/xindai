export function format (timestamp, onlyDate, noSecond) {
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

        if (onlyDate) return year + "-" + month + "-" + day;
        if (noSecond) return year + "-" + month + "-" + day + "-" + hour + ":" + minute;
        return year + "-" + month + "-" + day + "-" + hour + ":" + minute + ":" + second;
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
