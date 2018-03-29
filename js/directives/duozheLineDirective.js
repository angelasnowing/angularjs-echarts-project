/**
 * duozheLineDirective created on 2018/3/20.
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
    app.directive('duozheLine', function(ChartService){
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
                var defaultDatas = {
                    name: ['邮件营销','联盟广告','视频广告','直接访问','搜索引擎'],
                    xData: ['周一','周二','周三','周四','周五','周六','周日'],
                    yData: [[120, 132, 101, 134, 90, 230, 210], [220, 182, 191, 234, 290, 330, 310], [150, 232, 201, 154, 190, 330, 410]
                        ,[320, 332, 301, 334, 390, 330, 320], [820, 932, 901, 934, 1290, 1330, 1320]]
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
                        legend: {
                            bottom: '3%',
                            left: 'center'
                        },
                        grid: {
                            left: '15%',
                            right: '5%',
                            top: '8%',
                            bottom: '15%',
                            containLabel: false
                        },
                        xAxis: {
                            show: false,
                            type: 'category',
                            boundaryGap: true
                        },
                        yAxis: {
                            type: 'value',
                            axisLine:{
                                show: false
                            },
                            axisLabel: {
                                formatter: function(value){
                                    return attrs.unit ? value + tooltip_unit : value; }}
                        }
                    };
                    myChart.setOption(option);
                }
                initialChartCanvas();
                // 二次及以上配置chart option数据
                function setNewDataOption (opt, value){
                    opt.legend.data = value.name;
                    opt.xAxis.data = value.xData;
                    opt.series = [];
                    if (value.yData.length >= 13 && value.yData.length < 22){
                        opt.grid.bottom = '22%';
                    }
                    if (value.yData.length >= 23){
                        opt.grid.bottom = '27%';
                    }
                    if (attrs.units == '万篇'){
                        opt.xAxis.show = 'true';
                    }
                    value.yData.map(function(item, index){
                        opt.series.push({
                            name: value.name[index],
                            type: 'line',
                            data: item
                        });
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
    })
});