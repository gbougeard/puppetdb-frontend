/**
 * Created with IntelliJ IDEA.
 * User: gbougeard
 * Date: 01/03/13
 * Time: 16:36
 * To change this template use File | Settings | File Templates.
 */
/*jshint globalstrict:true */
/*global angular:true */
'use strict';

angular.module('my_app.filters', [])
    .filter('interpolate', ['version', function (version) {
        return function (text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    }])
    .filter('status', [function (status) {
        return function (text) {
            var STATUS = {
                "skipped": "warning",
                "failure": "important",
                "success": "success"
            };

            return STATUS[text];
        }
    }]).filter('moment', [function (status) {
        return function (timestamp) {
            if (timestamp && angular.isDefined(timestamp)) {

                var day = moment(timestamp);
//            console.log(day);
                return moment(day).fromNow()
            }
            else
                return "-";
        };
    }]).
    filter('moreThanOneDayRow', [function (status) {
        return function (date) {
//            console.log("moreThanOneDayRow", date);
            if (date && angular.isDefined(date)) {

                var today = moment();

                if (moment(date).isBefore(today, 'day')) {
                    return "error";
                } else {
                    return "";
                }
            } else return "error";
        }
    }]).filter('moreThanOneDayIcon', [function (status) {
        return function (date) {
//            console.log("moreThanOneDayIcon", date);
            if (date && angular.isDefined(date)) {

                var today = moment();
                if (moment(date).isBefore(today, 'day')) {
                    return "icon-time";
                } else {
                    return "";
                }
            } else  return "icon-question-sign";
        }
    }]);