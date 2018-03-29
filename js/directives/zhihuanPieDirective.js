/**
 * zhihuanPieDirective created on 2018/3/20, with the size adapative in the container.
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
define(['app', 'echarts'],function(app, echarts){
    app.directive('zhihuanPie', function(ChartService){
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
                    name: 'test', // 对应图表title
                    data:[ [{value: 300, name: '年度计划投资'}, {value: 50, name: ''}],
                        [{value: 60, name: '年累计完成投资'}, {value: 150, name: ''}],
                        [{value: 20, name: '本月投资'}, {value: 80, name: ''}] ]
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
                            confine: true,
                            formatter: "{a}<br />{b} : {c}"+ tooltip_unit +"({d}%)"
                        },
                        legend: {
                            itemGap: 5,
                            orient: 'vertical',
                            left: '5%',
                            top: '5%',
                        },
                        series : [
                            {
                                type:'pie',
                                radius : [75,90],
                            },
                            {
                                type:'pie',
                                radius : [60, 75],
                            },
                            {
                                type:'pie',
                                radius : [45, 60],
                            }
                        ]
                    };
                    myChart.setOption(option);
                }
                initialChartCanvas();
                // 二次及以上配置chart option数据
                function setNewDataOption (opt, value){
                    var legendata = [], i, len = opt.series.length ;
                    var placeHolderStyle = {
                        normal : {
                            color: 'rgba(0,0,0,0)',
                            label: {show:false},
                            labelLine: {show:false}
                        },
                        emphasis : {
                            color: 'rgba(0,0,0,0)'
                        }
                    };
                    for (i = 0; i < len; i ++){
                        value.data.map(function(item, index){
                            if (index == i){
                                opt.series[i].data = item;
                                if (opt.series[i].data[1] != null){
                                    opt.series[i].data[1].itemStyle = placeHolderStyle;
                                    legendata.push(item[0].name);
                                }
                            }
                        });
                        opt.series[i].name = value.name;
                    }
                    opt.legend.data = legendata;
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