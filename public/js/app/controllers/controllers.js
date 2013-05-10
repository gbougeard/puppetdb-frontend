/*jshint globalstrict:true */
/*global angular:true */
'use strict';

angular.module('my_app.controllers', [])
    .controller('MyController', function ($scope, $filter) {

        $scope.data = [];
        $scope.results = [];

        $scope.current = {};
        $scope.loaded= false;

        $scope.displayDetails = function (event) {
            $scope.current = event;
            $('#myModal').modal({
                keyboard: false
            })
        };

        $scope.loadResults = function (hash) {
//            console.log("loadResult", hash);
            jsRoutes.controllers.MyController.asyncRes(hash).ajax({

                success: function (data, status, headers, config) {
// this callback will be called asynchronously
// when the response is available
//                    console.log("Success!", data, status);
//                    console.log("success", data.success.length);
//                    console.log("failure", data.failure.length);
//                    console.log("skipped", data.skipped.length);
                    $scope.results[hash] =
                    {
                        success: data.success.length,
                        failure: data.failure.length,
                        skipped: data.skipped.length,
                        total: data.success.length + data.failure.length + data.skipped.length
                    };
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

        $scope.load = function () {
            if (!$scope.loaded){
//            console.log("load!", $scope.data, $scope.loaded);
            $scope.loaded = true;
            angular.forEach($scope.data, function (item) {
                item.results = $scope.loadResults(item.hash);
//                $scope.$digest();
            });
            }


        };

        $scope.filterNotSchedule = function (event) {
            return event['resource-type'] !== "Schedule";
        }

//        $scope.load();

    });