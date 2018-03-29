/*
 * Created by hmc on 2017/7/18
 */

define(['app'],function(app){
	return app.controller('indexCtl',['$rootScope','$scope','$http',function($rootScope, $scope, $http){
        $scope.color1 = ['#EB4848', '#F39494', '#5DC45D', '#A8DFA8'];
        $scope.data1 = {
            name: ["已完成投资", "今年计划投资", '累计完成计划'],
            unit: "亿元",
            xData: ["青口镇", "青口小城镇指挥部"],
            yData: [[0.0359, 0.0559],[0.181, 0.581], [19.83, 24.83]]
        };
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
