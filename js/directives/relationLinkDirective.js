define(['app', 'echarts'], function(app, echarts){
    return app.directive('relationLink', function(ChartService){
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
                var female = '生理女生', male = '生理男生';
                var defaultDatas = {
                    data: [
                    {name: '男生', category: male}, // 0
                    {name: '女生', category: female}, // 1
                    {name: 'Tom', category: female}, // 2
                    {name: 'Dee', category: female}, // 3
                    {name: 'Tom Gay', category: female}, // 4
                    {name: 'Tom Gay King', category: female}, // 5
                    {name: 'Tom Gay Queen', category: female}, // 6
                    {name: 'Tom Gay Two-Way', category: female}, // 7
                    {name: 'Gay King', category: male}, // 8
                    {name: 'Gay Queen', category: male}, // 9
                    {name: 'Boat', category: male}, // 10
                    {name: 'Bite', category: female}, // 11
                    {name: 'Lesbian', category: female}, // 12
                    {name: 'Kathoey', category: male}, // 13
                    {name: 'Adam', category: male}, // 14
                    {name: 'Angie', category: male}, // 15
                    {name: 'Cherry', category: female}, // 16
                    {name: '三样', category: female} // 17
                    ],
                    link: [
                        {source: 0, target: 1},
                        {source: 1, target: 0},
                        {source: 2, target: 1},
                        {source: 2, target: 3},
                        {source: 3, target: 1},
                        {source: 3, target: 2},
                        {source: 4, target: 1},
                        {source: 4, target: 2},
                        {source: 4, target: 3},
                        {source: 5, target: 2},
                        {source: 5, target: 4},
                        {source: 5, target: 6},
                        {source: 6, target: 2},
                        {source: 6, target: 4},
                        {source: 6, target: 5},
                        {source: 7, target: 2},
                        {source: 7, target: 4},
                        {source: 7, target: 5},
                        {source: 7, target: 6},
                        // {source: 7, target: 7},
                        {source: 8, target: 0},
                        {source: 9, target: 0},
                        {source: 10, target: 1},
                        {source: 10, target: 8},
                        {source: 10, target: 9},
                        {source: 11, target: 0},
                        {source: 11, target: 2},
                        {source: 12, target: 1},
                        {source: 14, target: 2},
                        {source: 15, target: 2},
                        {source: 16, target: 8},
                        {source: 16, target: 9},
                        {source: 16, target: 13},
                        {source: 17, target: 0},
                        {source: 17, target: 1},
                        {source: 17, target: 13}
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
                    option = {
                        color: attrs.colors ? attrs.colors : ChartService.setEleColors(),
                        legend: {
                            data: [female, male]
                        },
                        series : [
                            {
                                type: 'graph',
                                layout: 'circular',
                                symbolSize: 30,
                                label: {
                                    normal: {
                                        show: true
                                    }
                                },
                                edgeSymbol: ['circle', 'arrow'],
                                edgeSymbolSize: [2, 10],
                                edgeLabel: {
                                    normal: {
                                        textStyle: {
                                            fontSize: 20
                                        }
                                    }
                                },
                                focusNodeAdjacency: true,
                                force: {
                                    initLayout: 'circular',
                                    gravity: .05,
                                    repulsion: 100,
                                    edgeLength: [30, 400]
                                },
                                categories: [{
                                    name: female
                                }, {
                                    name: male
                                }],
                                lineStyle: {
                                    normal: {
                                        // color: 'source',
                                        curveness: 0.3
                                    }
                                },
                                data: defaultDatas.data,
                                links: defaultDatas.link
                            }
                        ]
                    };
                    myChart.setOption(option);
                }
                initialChartCanvas();
                // 二次及以上配置chart option数据
                function setNewDataOption (opt, value){
                    opt.series[0].data = value.data;
                    opt.series[0].link = value.link;
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