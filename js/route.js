/*
 * 路由
 */
define(['app'],function(app){
	return app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
		console.log($urlRouterProvider);
		$urlRouterProvider
		    .when('','/home/chart1')
		     
		$stateProvider
		    .state('home',{
		    	url:'/home',
		    	templateUrl:'js/views/home.html',
		    	controller:'homeCtl'
		    })
			.state('home.chart', {
				url: '/chart:id',
				templateUrl: 'js/views/chart.html',
				controller: 'chartCtl'
			})
			.state('home.shuoming', {
				url: '/shuoming',
				templateUrl: 'js/views/shuoming.html',
				controller: 'shuomingCtl'
			})
	}])
})
