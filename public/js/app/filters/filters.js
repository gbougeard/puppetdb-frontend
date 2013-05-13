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
        return function (date, results) {
//            console.log(date, results);
            if (results && results.failure > 0) return "error";

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
    }])
    .filter('with', function() {
        return function(items, isFiltering, results) {
//            console.log(isFiltering);
            if (!isFiltering) return items;

            var result = {};
            var today = moment();
            angular.forEach(items, function(value, key) {
                var date = moment(value.report_timestamp);
//                console.log(value, date) ;
                if (date && angular.isDefined(date)) {
                    if (moment(date).isBefore(today, 'day')) {
                        result[key] = value;
                    } else  if (results && results[value.name] && results[value.name].failure > 0) {
                        result[key] = value;
                    }
                } else result[key] = value;
//                if (!value.hasOwnProperty(field)) {
//                    result[key] = value;
//                }
            });

            return result;
        };
    })
    .filter('moreThanOneDayIcon', [function () {
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
    }]).
    filter('errorRow', [function (failures) {
        return function (item) {
//            console.log("moreThanOneDayRow", date);
            if (item && angular.isDefined(item) && item > 0) {
                    return "error";
            } else return "";
        }
    }]);