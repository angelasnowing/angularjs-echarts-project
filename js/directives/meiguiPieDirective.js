/**
 * meiguiPieDirective created on 2018/3/20.
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
    app.directive('meiguiPie', function(ChartService){
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
                    data: [
                        {value: 32,name: '新材料'},
                        {value: 27,name: '新能源'},
                        {value: 17,name: '生物医药'},
                        {value: 17,name: '节能环保'},
                        {value: 13,name: '电子信息'},
                        {value: 12,name: '新一代信息技术'},
                        {value: 30,name: '生命健康'},
                        {value: 15,name: '文化创意'},
                        {value: 12,name: '现代农业'},
                        {value: 6,name: '高端装备制造'},
                        {value: 14,name: '现代装备制造'},
                        {value: 25,name: '现代服务业'},
                        {value: 15,name: '高端装备'},
                        {value: 15,name: '新装备'},
                        {value: 12,name: '装备制造'},
                        {value: 24,name: '电子商务'},
                        {value: 34,name: '海洋高技术'},
                        {value: 13,name: '新能源新材料'},
                        {value: 10,name: '现代物流'},
                        {value: 10,name: '现代制造技术'} ],
                    labelData: [
                        {value: 100, name: '浙江省'},
                        {value: 100, name: '陕西省'},
                        {value: 100, name: '山东省'},
                        {value: 100, name: '天津市'}
                    ]
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
                    attrs.colors = ['#9966cc', '#9966cc', '#9966cc', '#9966cc', '#9966cc',
                        '#CD7054', '#CD7054', '#CD7054', '#CD7054', '#CD7054',
                        '#8FBC8F', '#8FBC8F', '#8FBC8F', '#8FBC8F', '#8FBC8F',
                        '#cc3366', '#cc3366', '#cc3366', '#cc3366', '#cc3366'];
                    option = {
                        color: attrs.colors ? eval(attrs.colors) : ChartService.setEleColors(),
                        tooltip: {
                            trigger: 'item',
                        },
                        series: [{
                            type: 'pie',
                            roseType: 'area',
                            label: {
                                normal: {
                                    show: false
                                }
                            }
                        }, {
                            type: 'pie',
                            radius: ['70%', '80%'],
                            zlevel: -2,
                            itemStyle: {
                                normal: {
                                    color: '#0F5FA0',
                                    borderColor: '#0F5FA0'
                                }
                            },
                            label: {
                                normal: {
                                    position: 'top'
                                }
                            }
                        }]
                    };
                    myChart.setOption(option);
                }
                initialChartCanvas();
                // 二次及以上配置chart option数据
                function setNewDataOption (opt, value){
                    opt.series[0].data = value.data;
                    opt.series[1].data = value.labelData;
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