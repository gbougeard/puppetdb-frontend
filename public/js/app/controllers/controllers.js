/*jshint globalstrict:true */
/*global angular:true */
'use strict';

angular.module('my_app.controllers', [])
    .controller('MyController', function ($scope, $filter) {

        $scope.filtering = true;

        $scope.inError = [];

        $scope.data = [];
        $scope.results = [];
        $scope.reports = [];

        $scope.current = {};
        $scope.loaded = false;

        $scope.displayDetails = function (event) {
            $scope.current = event;
            $('#myModal').modal({
                keyboard: false
            })
        };

        $scope.loadResults = function (hash, node) {
//            console.log("loadResult", hash, node);
            jsRoutes.controllers.MyController.asyncRes(hash).ajax({

                success: function (data, status, headers, config) {
// this callback will be called asynchronously
// when the response is available
//                    console.log("Success!", data, status);
//                    console.log("success", data.success.length);
//                    console.log("failure", data.failure.length);
//                    console.log("skipped", data.skipped.length);
                    var result = {
                        hash : hash,
                        success: data.success.length,
                        failure: data.failure.length,
                        skipped: data.skipped.length,
                        total: data.success.length + data.failure.length + data.skipped.length
                    };

                    if (node && angular.isDefined(node)) {
//                        console.log("node", node, result);
                        $scope.results[node] = result;
                    } else {
//                        console.log("hash", hash, result);
                        $scope.results[hash] = result;
                    }

//                    console.log("RESULTS", $scope.results);
                    $scope.$digest();
                },
                error: function (data, status, headers, config) {
// called asynchronously if an error occurs
// or server returns response with an error status.
                    console.error("Failed!", data, status, headers, config);
                }
            })
        };

        $scope.loadLastReport = function (node) {
//            console.log("loadLastReport", node);
            jsRoutes.controllers.MyController.asyncReports(node).ajax({

                success: function (data, status, headers, config) {
// this callback will be called asynchronously
// when the response is available
//                    console.log("Success!", data[0], status);
//                    console.log("success", data.success.length);
//                    console.log("failure", data.failure.length);
//                    console.log("skipped", data.skipped.length);
                    $scope.reports[node] = data[0];
//                    console.log("RESULTS", $scope.results);
//                    $scope.$digest();
                    if (data && angular.isDefined(data) && angular.isArray(data) && data.length > 0) {
                        var hash = data[0].hash;
                        if (hash && angular.isDefined(hash)) {
                            $scope.loadResults(hash, node);
                        }
                    }
                },
                error: function (data, status, headers, config) {
// called asynchronously if an error occurs
// or server returns response with an error status.
                    console.error("Failed!", data, status, headers, config);
                }
            })
        };

        $scope.load = function () {
            if (!$scope.loaded) {
//            console.log("load!", $scope.data, $scope.loaded);
                $scope.loaded = true;
                angular.forEach($scope.data, function (item) {
                    $scope.loadResults(item.hash);
//                $scope.$digest();
                });
            }
        };

        $scope.loadReports = function () {
            if (!$scope.loaded) {
//            console.log("loadReports!", $scope.data, $scope.loaded);
                $scope.loaded = true;
                angular.forEach($scope.data, function (item) {
                    $scope.loadLastReport(item.name);
//                $scope.$digest();
                });
            }
        };

        $scope.filterNotSchedule = function (event) {
            return event['resource-type'] !== "Schedule";
        }


    });