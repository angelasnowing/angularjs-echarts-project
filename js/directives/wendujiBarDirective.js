/**
 * wendujiBarDirective created on 2018/3/20, with the size adapative in the container.
 * @ param [id] is the id of the echarts div
 * @ param [width] is width of the echarts div
 * @ param [height] is height of the echarts div
 * @ param [datas] is data of the echarts div
 * @ param [colors] is color of the echarts div, a data of array
 * @ param [unit] is unit of the yAxis and tooltip, a data of string type
 * @ param [clickEventFlag]
 * @ param [clickSdata]
 * @ param [clickRdata]
 */
define(['app', 'echarts'], function(app,echarts){
    app.directive('wendujiBar', function(ChartService){
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
            template: '<div></div>',
            replace: true,
            link: function($scope, element, attrs){
                var container, option = new Object();
                // 设置chart默认data
                var defaultDatas = {
                    name: ['Acutal', 'Forecast'], // 对应图表legend
                    xData: ['Cosco','CMA','APL','OOCL','Wanhai','Zim'],
                    yData: [[260, 200, 220, 120, 100, 80], [40, 80, 50, 80,80, 70]]
                };
                // 设置chart id
                element.attr("id", attrs.id ? attrs.id : "defultId");
                // 获取chart图层
                container = attrs.id ? document.getElementById(attrs.id): document.getElementById("defultId");
                // 设置宽度和高度
                ChartService.setEleWaH(container, attrs.width ? attrs.width : '500px', attrs.height ? attrs.height : '500px');
                // 设置chart默认颜色
                function setNewColorOption(opt, value){
                    opt.color = value;
                    opt.series.map(function(item, index){
                        opt.series[index].itemStyle.normal.barBorderColor = value[0];
                    });
                }
                // 初始化chart图层
                function initialChartCanvas(){
                    var myChart = echarts.init(container);
                    var tooltip_unit = !attrs.unit ? '个' : attrs.unit;
                    option = {
                        color: attrs.colors ?  attrs.colors : ChartService.setEleColors(),
                        tooltip : {
                            trigger: 'axis',
                            confine: true,
                            axisPointer : {
                                type : 'shadow'
                            },
                            formatter: function(value){
                                var tempString = '';
                                value.map(function(item, index){
                                    tempString += index == 0 ? item.name : '';
                                    tempString += '<br />'+ item.seriesName + '：' + item.value + tooltip_unit;
                                });
                                return tempString;
                            }
                        },
                        legend: {
                            selectedMode:false,
                        },
                        calculable : true,
                        xAxis : [{
                                type : 'category',
                            }],
                        yAxis : [{
                                name: '单位：' + tooltip_unit,
                                type : 'value',
                        }],
                        series : [{
                                type:'bar',
                                stack: 'sum',
                                barCategoryGap: '50%',
                                itemStyle: {
                                    normal: {
                                        barBorderColor: '#00acee',
                                        barBorderWidth: 6,
                                        barBorderRadius:0,
                                        label : {
                                            show: true, position: 'insideTop'
                                        }
                                    }
                                },
                            },
                            {
                                type:'bar',
                                stack: 'sum',
                                itemStyle: {
                                    normal: {
                                        barBorderColor: '#00acee',
                                        barBorderWidth: 6,
                                        barBorderRadius:0,
                                        label : {
                                            show: true,
                                            position: 'top',
                                            formatter: function (params) {
                                                for (var i = 0, l = option.xAxis[0].data.length; i < l; i++) {
                                                    if (option.xAxis[0].data[i] == params.name) {
                                                        return option.series[0].data[i] + params.value;
                                                    }
                                                }
                                            },
                                            textStyle: {
                                                color: '#00acee'
                                            }
                                        }
                                    }
                                },
                            }]
                    };
                    myChart.setOption(option);
                }
                initialChartCanvas();
                // 二次及以上配置chart option数据
                function setNewDataOption (opt, value){
                    opt.legend.data = value.name;
                    opt.xAxis[0].data = value.xData;
                    value.name.map(function(item ,index){
                        opt.series[index].data = value.yData[index];
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
                        setNewColorOption(option, eval(newValue));
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