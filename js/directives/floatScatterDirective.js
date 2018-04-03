/**
 * 气泡图
 */
define(['app', 'echarts'], function(app, echarts){
    app.directive('floatScatter', function(ChartService){
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
                var defaultDatas =
                    [[1,2,"aa"], [2,90, "bb"], [3, 12,"cc"], [4,7, "dd"], [5,30,"ee"]];
                var schema = [
                    {name: 'popularity', index: 0, text: '热度'},
                    {name: 'topicTitle', index: 1, text: '事件标题'}
                ];
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
                        grid: {
                            x: '10%',
                            x2: 150,
                            y: '18%',
                            y2: '10%'
                        },
                        tooltip: {
                            padding: 10,
                            backgroundColor: '#222',
                            borderColor: '#777',
                            borderWidth: 1,
                            /*formatter: function (obj) {
                             var value = obj.value;
                             return value[2] + '<br>'
                             + schema[0].text + '：' + value[1] + '<br>';
                             }*/
                        },
                        xAxis: {
                            type: 'value',
                            splitLine: {
                                show: false
                            },
                            show: false
                        },
                        yAxis: {
                            type: 'value',
                            //name: '热度',
                            show: false,
                            splitLine: {
                                show: false
                            }
                        },
                        visualMap: [
                            {
                                left: 'right',
                                top: '-60%',
                                dimension: 1,
                                min: 0,
                                max: 140,
                                itemWidth: 30,
                                itemHeight: 120,
                                calculable: true,
                                precision: 0.1,
                                textGap: 30,
                                textStyle: {
                                    color: '#fff'
                                },
                                inRange: {
                                    symbolSize: [20, 100]
                                },
                                outOfRange: {
                                    symbolSize: [20, 100],
                                    color: ['rgba(255,255,255,.2)']
                                },
                                controller: {
                                    inRange: {
                                        color: ['#c23531']
                                    },
                                    outOfRange: {
                                        color: ['#444']
                                    }
                                }
                            },
                            {
                                left: 'right',
                                bottom: '-60%',
                                dimension: 1,
                                min: 0,
                                max: 130,
                                itemHeight: 120,
                                calculable: true,
                                precision: 0.1,
                                textGap: 30,
                                textStyle: {
                                    color: '#fff'
                                },
                                inRange: {
                                    color: ['#dd4444', '#fec42c', '#80F1BE', $scope.colors],
                                    colorLightness: [0.5, 0.5]
                                },
                                outOfRange: {
                                    color: ['rgba(255,255,255,.2)']
                                },
                                controller: {
                                    inRange: {
                                        color: ['#c23531']
                                    },
                                    outOfRange: {
                                        color: ['#444']
                                    }
                                }
                            }
                        ],
                        series: [
                            {
                                type: 'scatter',
                                // 传入数据
                                /*data: function(){
                                    if ($scope.datasArray){
                                        $scope.datasArray.map(function(item, index){
                                            item = item.slice();
                                            return item;
                                        })
                                    }
                                },*/
                                /*itemStyle: {
                                    normal: {
                                        color: $scope.colors
                                    }
                                }*/
                            }
                        ]
                    };
                    myChart.setOption(option);
                }
                initialChartCanvas();
                // 二次及以上配置chart option数据
                function sortNumber(a, b){
                    return b[1] - a[1];
                }
                function setNewDataOption(opt, value){
                    var tooltipValue;
                    value.sort(sortNumber).map(function(item){
                        tooltipValue.push(item[1]);
                    });
                    opt.tooltip.formatter = function (obj,index) {
                        console.log(obj, "obj", value, "value");
                        var value_temp = obj.value;
                        var valueIndex = parseInt(index.substring(8));
                        return value_temp[2] + '<br>'
                            + schema[0].text + '：' + tooltipValue[valueIndex] + '<br>';
                    }
                    // 将数据映射到气泡图里
                    value.map(function(item, index){
                        item[1] = opt.visualMap[0].inRange.symbolSize[1] - 10*index;
                        item[0] = Math.random()* 15 - Math.random()* 3;
                    });
                    opt.series[0].data = value;
                }
                // 静态数据
                if ($scope.datas){
                    $scope.datasArray = eval($scope.datas);
                    if ($scope.datasArray){
                        setNewDataOption(option, $scope.datasArray);
                        ChartService.setConfigToChart(container, option);
                    }
                }else{
                    setNewDataOption(option, defaultDatas);
                    ChartService.setConfigToChart(container, option);
                }
                // 从接口获取动态数据
                /*attrs.$observe("datas", function(newValue){
                    if (newValue){
                        var newValueArray = eval(newValue);
                        if (newValueArray){
                            setNewDataOption(option, newValueArray);
                            ChartService.setConfigToChart(container, option);
                        }
                    }
                });*/
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