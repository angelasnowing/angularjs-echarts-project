
require.config({
	paths:{
		'jquery':'./lib/jquery',
		'angular':'./lib/angular',
		'angular-route':'./lib/angular-route',
		'angularUiRouter':'./lib/angular-ui-router',
		'angular-animate':'./lib/angular-animate',
		
		'app':'app',
		'route':'route',
		'mainController':'./controllers/mainController',
		'indexCtl':'./controllers/indexCtl',
		'homeCtl':'./controllers/homeCtl',
        'chartCtl': './controllers/chartCtl',
		'mainDirective':'./directives/mainDirective',
		'geoFactory':'./services/geoFactory',
		
		'filter':'./filter/filter',

		//service
		'chartService': './services/chartService',

		//echarts
		'echarts': './lib/echarts.min',
        'echarts-wordcloud' : './lib/echarts-wordcloud.min',
		//directive
		'barDirective': './directives/barDirective',
		'pubuBarDirective': './directives/pubuBarDirective',
        'wendujiBarDirective': './directives/wendujiBarDirective',
        'zhihuanPieDirective': './directives/zhihuanPieDirective',
        'markerLineDirective': './directives/markerLineDirective',
        'lineAreaDirective': './directives/lineAreaDirective',
        'markerBarDirective': './directives/markerBarDirective',
        'solidPieDirective': './directives/solidPieDirective',
        'singleGaugeDirective': './directives/singleGaugeDirective',
        'lineBarDirective': './directives/lineBarDirective',
        'shuipingBarDirective': './directives/shuipingBarDirective',
    	'duidieBarDirective': './directives/duidieBarDirective',
        'duoBarDirective': './directives/duoBarDirective',
		'ciyunWordDirective': './directives/ciyunWordDirective',
        'duozheLineDirective': './directives/duozheLineDirective',
        'meiguiPieDirective': './directives/meiguiPieDirective',
        'pinghuaLineDirective' : './directives/pinghuaLineDirective',
        'floatScatterDirective': './directives/floatScatterDirective',
        'chartElementDirective': './directives/chartElementDirective',
	},shim:{
        angular:{
            exports:'angular'
        },
        'angular-route':{
            deps:['angular'],
            exports:'angular-route'
        },
        'angularUiRouter':{
            deps:['angular'],
            exports:'ui-router'
        },
        'angular-animate':{
        	deps:['angular'],
        	exports:'angular-animate'
        }
    }
})
require(['jquery','angular','angularUiRouter','angular-animate','app','route','mainController','mainDirective',
	'geoFactory','filter', 'echarts', 'chartService', 'echarts-wordcloud'],function($,angular){
	$(function(){
		angular.bootstrap(document,['hmcApp']);
	});
})
