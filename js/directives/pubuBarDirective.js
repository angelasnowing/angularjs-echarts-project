/**
 * pubuBarDirective created on 2018/3/20.
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
    app.directive("pubuBar", function(ChartService){
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
            template: "<div></div>",
            replace: true,
            restrict: 'ECAM',
            link: function($scope, element, attrs){
                var container, option = new Object();
                // 设置chart默认data
                var defaultDatas = {
                    name: ['辅助', '生活费'], // 对应图表legend和seriesName
                    xData: ['总费用', '房租', '水电费', '交通费', '伙食费', '日用品数'],
                    yData: [[0, 1700, 1400, 1200, 300, 0], [2900, 1200, 300, 200, 900, 300]]
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
                    var tooltip_unit = !attrs.unit ? '万元' : attrs.unit;
                    option = {
                        color: attrs.colors ? eval(attrs.colors) : ChartService.setEleColors(),
                        tooltip : {
                            trigger: 'axis',
                            confine: true,
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            },
                            formatter: function (params) {
                                var tar = params[1];
                                return  tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value + tooltip_unit;
                            }
                        },
                        grid: {
                            left: '3%',
                            top: '8%',
                            containLabel: true
                        },
                        xAxis: {
                            type : 'category',
                        },
                        yAxis: {
                            type : 'value',
                            axisLabel: {
                                formatter: function(value){
                                    return value  + tooltip_unit;
                                }
                            }
                        },
                        series: [
                            {
                                type: 'bar',
                                stack:  '总量',
                                // 白色透明设置
                                itemStyle: {
                                    normal: {
                                        barBorderColor: 'rgba(0,0,0,0)',
                                        color: 'rgba(0,0,0,0)'
                                    },
                                    emphasis: {
                                        barBorderColor: 'rgba(0,0,0,0)',
                                        color: 'rgba(0,0,0,0)'
                                    }
                                },
                            },
                            {
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'inside'
                                    }
                                },
                            }
                        ]
                    };
                    myChart.setOption(option);
                }
                initialChartCanvas();
                // 二次及以上配置chart option数据
                function setNewDataOption (opt, value){
                    opt.xAxis.data = value.xData;
                    value.yData.map(function(item, index){
                        opt.series[index].data = item;
                    });
                    value.name.map(function(item, index){
                        opt.series[index].name = item;
                    })
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