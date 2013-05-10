'use strict';

my_app.filter('fromNow', function () {
    return function (dateString) {
        return moment(new Date(dateString)).fromNow();
    };
});


my_app.filter('fromNowTimestamp', function () {
    return function (timestamp) {
        var day = moment(timestamp);
//            console.log(day);
        return moment(day).fromNow()
    };
});