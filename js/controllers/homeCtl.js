define(['app'],function(app){
	return app.controller('homeCtl',['$scope','$rootScope','$http',function($scope,$rootScope,$http){
		// 导航列表初始化
		$scope.liItemList = [
			{name: "wenduji-bar"+ " " + "温度计条形图", id: 1},
            {name: "shuiping-bar"+ " " + "水平向条形图", id: 2},
            {name: "pubu-bar"+ " " + "瀑布条形图", id: 3},
            {name: "marker-bar"+ " " + "标注条形图", id: 4},
            {name: "duo-bar "+ " " + "多组条形图", id: 5},
            {name: "duidie-bar"+ " " + "堆叠条形图", id: 6},
            {name: "pinghua-line"+ " " + "平滑曲线图", id: 7},
            {name: "duozhe-line"+ " " + "多条折线图", id: 8},
            {name: "marker-line"+ " " + "标注折线图", id: 9},
            {name: "meigui-pie"+ " " + "玫瑰饼图", id: 10},
            {name: "zhihuan-pie"+ " " + "指环饼图", id: 11},
            {name: "solid-pie"+ " " + "实心饼图", id: 12},
            {name: "huan-pie" + " " + "环形饼图", id: 17},
            {name: "single-gauge"+ " " + "单仪表盘图", id: 13},
            {name: "line-bar"+ " " + "折线条形组合图", id: 14},
            {name: "line-area"+ " " + "折线面积图", id: 15},
            {name: "ciyun-word" + " " + "词云图", id: 16},
            {name: "float-scatter" + " " + "浮动散点图", id: 18},
            {name: "china-map" + " " + "中国地图", id: 19}
			];
		// 选择导航列表时点亮文字
		$scope.liItemSelect = function(index){
			$scope.selectNum = index;
		}
		/*var top1, top2, height1;
		window.addEventListener("mousewheel", function(){
            top1 = $("#develop-guide").offset().top;
            top2 = $("#basic-directives").offset().top;
            height1 = $(document).scrollTop();
            if (height1 <= top2){
                $("#guide a").css("color","#7EFF8C");
                $("#directives a").css("color","#fff");
            }else{
                $("#guide a").css("color","#fff");
                $("#directives a").css("color","#7EFF8C");
            }
        })*/

	}])
})
