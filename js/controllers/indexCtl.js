/*
 * Created by hmc on 2017/7/18
 */

define(['app'],function(app){
	return app.controller('indexCtl',['$rootScope','$scope','$http',function($rootScope, $scope, $http){
        $scope.chartType = "pubu-bar";
        $http({
            method: "POST",
            url:'./js/user2.json'
        }).then(function(response){
            console.log(response, "response");
           $scope.chartData = response.data.data;
           $scope.color1 = ['#00acee', '#52cdd5', '#79d9f1', '#a7e7ff', '#c8efff'];
        }, function(res){
            console.log(res,"失败")
        })
	}])
})
