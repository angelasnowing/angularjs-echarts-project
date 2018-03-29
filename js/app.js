
define(['angular'],function(angular){
	//引入插件或者模块
	var app = angular.module('hmcApp',['ngAnimate','ui.router']);
	
	app.run(['$rootScope',function($rootScope){
		 //挂载一些全局的变量和方法
	}]);
	return app;
})
