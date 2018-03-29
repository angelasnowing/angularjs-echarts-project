/**
* shuipingBarDirective created on 2018/3/20, with the size adapative in the container.
* @ param [id] is the id of the echarts div
* @ param [width] is width of the echarts div
* @ param [height] is height of the echarts div
* @ param [datas] is data of the echarts div
* @ param [colors] is color of the echarts div, a data of array
* @ param [unit] is unit of the yAxis and tooltip, a data of string type
* @ param [clickEventFlag]
* @ param [clickSdata]
* @ param [clickRdata]*/
define(['app', 'echarts'], function(app, echarts){
    app.directive('shuipingBar', function(ChartService){
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
            link: function ($scope, element, attrs) {
                var container, option = new Object();
                // 设置chart默认data
                var defaultDatas = {
                    name: 'demo',
                    xData:[1,2,3,5,6],
                    yData:['一月', '二月', '三月', '四月', '五月']
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
                    //var tooltip_unit = attrs.unit ? attrs.unit : '';
                    option = {
                        color: attrs.colors ? eval(attrs.colors) : ChartService.setEleColors(),
                        tooltip: {
                            trigger: 'axis',
                            confine: true,
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '10%',
                            top: '2%',
                            containLabel: true
                        },
                        yAxis: [{
                            type: "category",
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false,
                                alignWithLabel: true
                            },
                            axisLabel: {
                                textStyle: {
                                    color: "#000"
                                }
                            }
                        }],
                        xAxis: [{
                            type: 'value',
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            }
                        }],
                        series: [{
                            type: 'bar',
                            barCategoryGap: '60%',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'right',
                                }
                            },
                        }]
                    };
                    myChart.setOption(option);
                }
                initialChartCanvas();
                // 二次及以上配置chart option数据
                function setNewDataOption (opt, value){
                    opt.yAxis[0].data = value.yData;
                    opt.series[0].data = value.xData;
                    opt.series[0].name = value.name ? value.name　: '项目数';
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