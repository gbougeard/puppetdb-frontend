'use strict';

my_app.filter('stepStatusRow', function () {
    var STATUS = {
        "OK" : "success",
        "KO" : "error",
        "PENDING" : "warning"
    };

    return function (status) {
        return STATUS[status];
    };
});
