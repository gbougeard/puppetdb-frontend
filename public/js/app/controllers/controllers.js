/*jshint globalstrict:true */
/*global angular:true */
'use strict';

angular.module('my_app.controllers', [])
    .controller('MyController', function ($scope, $http) {

        $scope.data = [];

        $scope.loadReport = function () {
            $http({
                method: 'GET',
                url: 'http://10.2.51.100:8080/experimental/reports',
                params: {query: '["=", "certname", "puppetdb.dev.it.int"]'},
                headers: {
                    "Accept": "application/json"
                }
            }).
                success(function (data, status, headers, config) {
// this callback will be called asynchronously
// when the response is available
                    console.log("Success!", data, status);
                    $scope.data = data;
                }).
                error(function (data, status, headers, config) {
// called asynchronously if an error occurs
// or server returns response with an error status.
                    console.error("Failed!", data, status, headers, config);
                });
        };

        $scope.filterNotSchedule = function(event) {
            return event['resource-type'] !== "Schedule";
        }

    });