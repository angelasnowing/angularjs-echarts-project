/**
 * singleGaugeDirective created on 2018/3/20, with the size adapative in the container.
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
define(['app', 'echarts'], function(app, echarts){
    app.directive('singleGauge', function(ChartService){
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
                var defaultDatas = {name: "攻坚2017项目完成情况", value: 80};
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
                        tooltip : {
                            formatter: "{a}： <br/>{c}%",
                            confine: true,
                        },
                        series : [
                            {
                                type: 'gauge',
                                z: 3,
                                min: 0,
                                max: 100,
                                startAngle: 225,
                                endAngle: -45,
                                splitNumber: 10,
                                radius: '80%',
                                axisLine: {            // 坐标轴线
                                    lineStyle: {       // 属性lineStyle控制线条样式
                                        width: 10,
                                    }
                                },
                                axisTick: {            // 坐标轴小标记
                                    length: 15,        // 属性length控制线长
                                    lineStyle: {       // 属性lineStyle控制线条样式
                                        color: 'auto'
                                    }
                                },
                                splitLine: {           // 分隔线
                                    length: 20,         // 属性length控制线长
                                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                        color: 'auto'
                                    }
                                },
                                axisLabel: {
                                    backgroundColor: 'auto',
                                    borderRadius: 2,
                                    color: '#eee',
                                    padding: 3,
                                    textShadowBlur: 2,
                                    textShadowOffsetX: 1,
                                    textShadowOffsetY: 1,
                                    textShadowColor: '#222'
                                },
                                detail: {
                                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                    formatter: function (value) {
                                        return Number(value).toFixed(2) + '%';
                                    },
                                    fontWeight: 'bolder',
                                    borderRadius: 3,
                                    borderColor: '#aaa',
                                    textBorderWidth: 1,
                                    textShadowBlur: 2,
                                    textShadowColor: '#fff',
                                    textShadowOffsetX: 0,
                                    textShadowOffsetY: 0,
                                    fontFamily: 'Arial',
                                    width: 100,
                                    color: 'auto',
                                },
                                data:[{value: 0}] //初始化
                            }
                        ]
                    };
                    myChart.setOption(option);
                }
                initialChartCanvas();
                // 二次及以上配置chart option数据
                function setNewDataOption (opt, value){
                    var startPot, centPot;
                    opt.series[0].data[0].value = value.value;
                    opt.series[0].name = value.name;
                    opt.series[0].min = value.value >= 0 ? 0 : -100;
                    opt.series[0].max = value.value >= 0 ? 100 : 0;
                    startPot = value.value >= 0 ? 0.2: 0.4;
                    centPot = value.value >= 0 ? 0.7: 0.6;
                    opt.series[0].axisLine.lineStyle.color = [ [startPot, '#c33430'],
                        [centPot, '#62879f'],
                        [1, '#91c7af'] ];
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
})