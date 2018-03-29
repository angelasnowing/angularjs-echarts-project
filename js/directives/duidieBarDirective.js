/**
 * duidieBarDirective created on 2018/3/20.
 * @ param [id] is the id of the echarts div
 * @ param [width] is width of the echarts div
 * @ param [height] is height of the echarts div
 * @ param [datas] is data of the echarts div, with array data of name, xData and yData
 * @ param [colors] is color of the echarts div, with array data
 * @ param [unit] is unit of the yAxis and tooltip, a data of string type
 * @ param [clickEventFlag]
 * @ param [clickSdata]
 * @ param [clickRdata]
 */
define(['app', 'echarts'], function(app, echarts){
    app.directive('duidieBar', function(ChartService){
        return {
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
            template: '<div></div>',
            replace: true,
            link: function($scope, element, attrs){
                var container, option = new Object();
                // 设置chart默认data
                var defaultDatas = {
                    name:['bar1','bar2','bar3', 'bar4'], //对应图表legend
                    xData:['Class 0','Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9'],
                    yData:[[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0], [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8], [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5], [6.4, 3.3, 6.0, 2.3, 12.0, 6.2, 8.9, 9.1, 1.6, 5.0]],
                };
                // 设置chart id
                element.attr("id", attrs.id ? attrs.id : "defultId");
                // 获取chart图层
                container = attrs.id ? document.getElementById(attrs.id): document.getElementById("defultId");
                // 设置宽度和高度
                ChartService.setEleWaH(container, attrs.width ? attrs.width : '500px', attrs.height ? attrs.height : '500px');
                // 初始化chart图层
                function initialChartCanvas(){
                    var myChart = echarts.init(container);
                    var tooltip_unit = attrs.unit ? attrs.unit : '';
                    option = {
                        color: attrs.colors ? eval(attrs.colors) : ChartService.setEleColors(),
                        tooltip:{
                            trigger: 'axis',
                            confine: true
                        },
                        legend: {
                            align: 'left',
                            left: 'right'
                        },
                        xAxis: {
                            type: 'category',
                            splitLine: {show: false},
                            splitArea: {show: false}
                        },
                        yAxis: {
                            splitArea: {show: false},
                            axisLabel: {
                                formatter: function(value){
                                    return !attrs.unit ? value + '' : value + tooltip_unit;
                                }
                            }
                        },
                        grid: {
                            left:　'3%',
                            top: '8%',
                            confine: true
                        },
                        series: [
                            {
                                type: 'bar',
                                stack: 'one',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'inside',
                                    }
                                }
                            },
                            {
                                type: 'bar',
                                stack: 'one',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'top',
                                    }
                                }
                            },
                            {
                                type: 'bar',
                                stack: 'two',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'inside',
                                    }
                                }
                            },
                            {
                                type: 'bar',
                                stack: 'two',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'top',
                                    }
                                }
                            }
                        ]
                    };
                    myChart.setOption(option);
                }
                initialChartCanvas();
                // 二次及以上配置chart option数据
                function setNewDataOption (opt, value){
                    opt.legend.data = value.name;
                    opt.xAxis.data = value.xData;
                    value.yData.map(function(item, index){
                        opt.series[index].data = item;
                        opt.series[index].name = value.name[index];
                    });
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
    });
});