/*define(['app', 'echarts'], function(app, echarts){
    app.directive('pies', function(){
        return {
            // 隔离作用域: '='传变量
            scope: {
                // 获取数据
                datas: '@',
                // 获取id
                id:'=',
                width: '=',
                height: '='
            },
            restrict: 'E',
            template: '<div style="float: left"></div>',
            replace: true,
            link: function($scope, element, attrs){
                // 传入id
                element.attr("id", $scope.id);
                // 传入width和height
                if ($scope.width){
                    element.css({width:$scope.width});
                } else {
                    element.css({width:'400px'});
                }
                if ($scope.height){
                    element.css({height:$scope.height});
                } else {
                    element.css({height:'370px'});
                }
                // 获取绘图位置
                var myChart = echarts.init(document.getElementById(attrs.id));
                var rich = {
                    yellow: {
                        padding: [5, 4],
                        align: 'center'
                    },
                    total: {
                        align: 'center'
                    },
                    white: {
                        align: 'center',
                        padding: [21, 0]
                    },
                    blue: {
                        align: 'center'
                    },
                    hr: {
                        borderColor: '#0b5263',
                        width: '100%',
                        borderWidth: 1,
                        height: 0
                    }
                }
                // 初始绘图
                var option = {
                    // 传入颜色
                    color: ['#6aba23', '#eec23b','#f18556', '#f4485e', '#ef769f', '#d293ee', '#68a8f2',
                        '#408eff', '#9a9eaa', '#16cbdb', '#3e26f1', '#85e200', '#24d3b0', '#8dbc70',
                        '#b95663', '#ef98d0', '#00a7de', '#a8883a', '#976a56', '#716bbd'],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: {c} ({d}%)"
                    },
                    series: [
                        {
                            type:'pie',
                            radius: ['35%', '53%'],
                            avoidLabelOverlap: true,
                            label: {
                                normal: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '15'
                                    }/!*,
                                     rich: rich*!/
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: true
                                }
                            },
                            // 传入数据
                            data: $scope.datas
                        }
                    ]
                };
                myChart.setOption(option);
                // datas变化的绘图方式
                $scope.datasChart = function (plotChartData){
                    var myChart = echarts.getInstanceByDom(document.getElementById(attrs.id));
                    option.series[0].data = plotChartData;
                    $scope.length =  plotChartData.length;
                    /!*option.series[0].label.normal.rich = rich;*!/
                    option.series[0].label.normal.formatter = function(params, ticket, callback){
                        var total = 0;
                        var percent = 0;
                        plotChartData.forEach(function(value, index, array) {
                            total += parseInt(value.value);
                        });
                        percent = ((params.value / total) * 100).toFixed(1);
                        if (percent == "NaN"){
                            return params.name + '\n' + params.value;
                        }else{
                            return params.name + '\n' + '(' +params.value + ')\n'+ percent + '%';
                        }
                    }

                    myChart.setOption(option);
                };

                // 监听datas变化
                attrs.$observe('datas', function(newValue){
                    if (newValue){
                        var newValueJSON = JSON.parse(newValue);
                        $scope.datasChart(newValueJSON);
                    }
                }, true);
            }
        }
    })
});*/
define(['app', 'echarts'], function(app, echarts){
    app.directive('huanPie', function(ChartService){
        return {
            scope:{
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
                var defaultDatas = [{name: '中立评价', value: 50}, {name: '正面评价', value: 70}, {name: '负面评价', value: 90}];
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
                        color: attrs.colors ? attrs.colors : ChartService.setEleColors(),
                        tooltip: {
                            trigger: 'item',
                            formatter: "{b}: {c} ({d}" + tooltip_unit+")"
                        },
                        series: [
                            {
                                type:'pie',
                                radius: ['55%', '65%'],
                                avoidLabelOverlap: true,
                                labelLine: {
                                    normal: {
                                        show: true
                                    }
                                }
                                // 传入数据
                            }
                        ]
                    };
                    myChart.setOption(option);
                }
                initialChartCanvas();
                // 二次及以上配置chart option数据
                function setNewDataOption (opt, value){
                    opt.series[0].data = value;
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