/**
 * duidieBarDirective created on 2018/3/20.
 * @ param [id] is the id of the echarts div
 * @ param [width] is width of the echarts div
 * @ param [height] is height of the echarts div
 * @ param [datas] is data of the echarts div, with array data of name, xData and yData
 * @ param [colors] is color of the echarts div, with array data
 * @ param [clickEventFlag]
 * @ param [clickSdata]
 * @ param [clickRdata]
 */
define(['app', 'echarts'], function(app, echarts){
    app.directive('chinaMap', function(ChartService){
        return {
            scope: {
                id: '=',
                width: '=',
                height: '=',
                datas: '@',
                colors: '@',
                clickEventFlag: '=',
                clickSdata: '=',
                clickRdata: '='
            },
            restrict: 'E',
            template: '<div></div>',
            replace: true,
            link: function($scope, element, attrs){
                var container, option = new Object();
                // 设置chart id
                element.attr("id", attrs.id ? attrs.id : "defultId");
                // 获取chart图层
                container = attrs.id ? document.getElementById(attrs.id): document.getElementById("defultId");
                // 设置宽度和高度
                ChartService.setEleWaH(container, attrs.width ? attrs.width : '500px', attrs.height ? attrs.height : '500px');
                var myChart = echarts.init(container);
                var uploadedDataURL = "js/chinacity.json";
                $.get(uploadedDataURL, function(geoJson){
                    echarts.registerMap('chinacity', geoJson);
                    myChart.setOption(option = {
                        visualMap: {
                            show: true,
                            showLabel:true,
                            left: 'right',
                            top: 'bottom',
                            calculable: true,
                            inRange: {
                                color: attrs.colors ? attrs.colors : ChartService.setEleColors()
                            }
                        },
                        tooltip: {
                            trigger: 'item'
                        },
                        series: [{
                            type: 'map',
                            mapType: 'chinacity',
                            label: {
                                normal: {
                                    show: false
                                }
                            }
                        }]
                    });
                    var defaultDatas = {
                        name: '总人口',
                        data: [
                            {name: '福州市', value: 39623.85},
                            {name: '洛阳市', value: 39623.85},
                            {name: '厦门市', value: 39623.85}
                        ]
                    };
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
                    // 配置动态数据
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
                });
            }
        }
    });
});