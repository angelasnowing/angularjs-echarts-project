define(['app','echarts'], function(app,echarts){
    app.directive('ciyunWord', function(ChartService){
        return{
            scope: {
                id: '=',
                width: '=',
                height: '=',
                datas: '@',
                colors: '@',
                unit: '=',
                clickEventFlag: '=',
                clickSdata: '=',
                clickRdata: '='
            },
            restrict: 'E',
            template: '<div"></div>',
            replace: true,
            link: function($scope, element, attrs) {
                var container, option = new Object();
                // 设置chart默认data
                var defaultDatas = {
                    data: [{name: "研发", value: "650"}, {name: "中国", value: "520"}, {name: "系统", value: "550"},
                    {name: "征集", value: "600"}, {name: "福州市", value: "700"},{name: "大数据", value: "650"}, {name: "物联网", value: "520"}, {name: "峰会", value: "550"},
                        {name: "理想", value: "600"}, {name: "在线", value: "700"},{name: "软件", value: "650"}, {name: "其他", value: "520"}, {name: "环节", value: "550"},
                        {name: "新常态", value: "600"}, {name: "进程", value: "700"}],
                    name: "热点分析"};
                // 设置chart id
                element.attr("id", attrs.id ? attrs.id : "defultId");
                // 获取chart图层
                container = attrs.id ? document.getElementById(attrs.id): document.getElementById("defultId");
                // 设置宽度和高度
                ChartService.setEleWaH(container, attrs.width ? attrs.width : '500px', attrs.height ? attrs.height : '500px');
                // 初始化chart图层
                function initialChartCanvas(){
                    var myChart = echarts.init(container);
                    option = {
                        color: attrs.colors ? eval(attrs.colors) : ChartService.setEleColors(),
                        tooltip: {
                            show: true
                        },
                        series: [{
                            type: 'wordCloud',
                            sizeRange: [20, 50],
                            rotationRange: [0, 0],
                            textPadding: 0,
                            autoSize: {
                             enable: true,
                             minSize: 6}
                            // 任意颜色
                            /*textStyle: {
                                normal: {
                                    color:  function() {
                                        return 'rgb(' + [
                                                Math.round(Math.random() * 245),
                                                Math.round(Math.random() * 245),
                                                Math.round(Math.random() * 245)
                                            ].join(',') + ')';
                                    }
                                }
                            }*/
                        }]
                    };
                    myChart.setOption(option);
                }
                initialChartCanvas();
                // 二次及以上配置chart option数据
                function setNewDataOption (opt, value){
                    opt.series[0].data = value.data;
                    opt.series[0].name = value.name;
                }
                // 静态数据
                if ($scope.datas){
                    $scope.datasJSON = JSON.parse($scope.datas);
                    if ($scope.datasJSON){
                        setNewDataOption(option, $scope.datasJSON);
                        ChartService.setConfigToChart(container, option);
                    }
                }else{
                    setNewDataOption(option, defaultDatas);
                    ChartService.setConfigToChart(container, option);
                }
                // 从接口获取动态数据
                attrs.$observe("datas", function(newValue){
                    if (newValue){
                        var newValueJSON = JSON.parse(newValue);
                        if (newValueJSON){
                            setNewDataOption(option, newValueJSON);
                            ChartService.setConfigToChart(container, option);
                        }
                    }
                });
                // 配置动态颜色
                attrs.$observe("colors", function(newValue){
                    if (newValue){
                        ChartService.setNewColorOption(option, eval(newValue));
                        ChartService.setConfigToChart(container, option);
                    }
                });
                // 适配父容器的宽度、高度
                ChartService.resizeContainer(container);
                ChartService.setCurrEleSize(container);
                // chart的click事件
                if (attrs.clickEventFlag){
                    var clickSname = attrs.clickSdata ? attrs.clickSdata : "clickSdata";
                    var clickRname = attrs.clickRdata ? attrs.clickRdata : "clickRdata";
                    var myChartEle = echarts.getInstanceByDom(container);
                    myChartEle.on("click", function(params){
                        console.log(params, "params");
                        $scope.$emit(clickSname, params);
                    });
                    $scope.$on(clickRname, function(event, value){
                        if(value){
                            console.log(value,"value");
                        }
                    });
                }
            }
        }
    })
});
