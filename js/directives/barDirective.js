define(['app', 'echarts'], function(app, echarts){
    app.directive('chart', function(){
        return{
            scope: {
                id: '=',           // element's id
                width: '=',        // element's width
                height: '=',       // element's height
                resizeFlag: '=',   // element's flag of resize
                datas: '@',
                colors: '@'
            },
            restrict: 'E',
            replace: 'true',
            template: '<div></div>',
            link: function($scope, element, attrs){
                var container, option;
                // 设置chart颜色
                function setEleColors(){
                    var defultColors = ['#00acee', '#52cdd5', '#79d9f1', '#a7e7ff', '#c8efff'];
                    return defultColors;
                }
                // 设置chart宽度
                function setEleWidth(value){
                    element.css({width : value});
                }
                // 设置chart高度
                function setEleHeight(value){
                    element.css({height : value});
                }
                // resize chart尺寸
                function resizeContainer(con){
                    var parentContainer, contWidth, contHeight;
                    parentContainer = con.parentNode;
                    contWidth = parentContainer.clientWidth;
                    contHeight = parentContainer.clientHeight;
                    setEleWidth(contWidth);
                    setEleHeight(contHeight);
                }
                function setCurrEleSize(con){
                    window.addEventListener("resize", function(){
                        myChart = echarts.getInstanceByDom(con);
                        resizeContainer(con);
                        myChart.resize();
                    });
                }
                element.attr('id', attrs.id ? attrs.id : "defaultId");
                setEleWidth(attrs.width ? attrs.width : '550px');
                setEleHeight(attrs.height ? attrs.height : '550px');
                container = attrs.id? document.getElementById(attrs.id):document.getElementById("defaultId");
                // resize标志为true，则重新设置宽度和高度
                if (attrs.resizeFlag){
                    resizeContainer(container);
                }
                // 设置chart通用配置项
                function setCommonOption(){
                    var options = new Object();
                    options.grid = {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    };
                    options.color = attrs.colors ? eval(attrs.colors) : setEleColors();
                    return options;
                }
                // 将配置项绘制到chart
                function setConfigToChart(){
                    myChart = echarts.getInstanceByDom(container);
                    myChart.setOption(option);
                }
                // 配置曲线图表
                function configLineChart(value){
                    option = setCommonOption();
                    option.tooltip = {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    };
                    option.xAxis = [
                        {
                            type : 'category',
                            data : value.xAxisData,
                        }
                    ];
                    option.yAxis = [
                        {
                            type : 'value',
                        }
                    ];
                    option.series = [
                        {
                            name: '直接访问',
                            data: value.yAxisData,
                            type: 'line'
                        }
                    ];
                }
                // 配置柱状图图表
                function configBarChart(value){
                    option = setCommonOption();
                    option.tooltip = {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    };
                    option.xAxis = [
                        {
                            type: 'category',
                            data: value.xAxisData
                        }
                    ];
                    option.yAxis = [
                        {
                            type : 'value',
                        }
                    ];
                    option.series = [
                        {
                            name:'直接访问',
                            type:'bar',
                            barWidth: '60%',
                            data:value.yAxisData
                        }
                    ];
                }
                // 配置饼图图表
                function configPieChart(value){
                    option = setCommonOption();
                    option.tooltip = {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    };
                    option.series = [
                        {
                            name: '库存情况',
                            type: 'pie',
                            radius: '68%',
                            center: ['50%', '50%'],
                            clockwise: false,
                            data: value.seriesData,
                            label: {
                                normal: {
                                    textStyle: {
                                        color: '#999',
                                        fontSize: 14,
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            itemStyle: {
                                normal: {
                                    borderWidth: 4,
                                    borderColor: '#ffffff',
                                },
                                emphasis: {
                                    borderWidth: 0,
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ];
                }
                // 初始化chart图层
                function initialChartCanvas(){
                    var myChart = echarts.init(container);
                    option = setCommonOption();
                    myChart.setOption(option);
                }
                initialChartCanvas();
                // 监听datas变化，重新绘制chart
                attrs.$observe("datas", function(newValue){
                    if (newValue){
                        var newValueJSON = JSON.parse(newValue);
                        if (newValueJSON){
                            console.log(newValueJSON, "JSON");
                            switch(newValueJSON.graphType){
                                case 'bar':  configBarChart(newValueJSON); break;
                                case 'line': configLineChart(newValueJSON); break;
                                case 'pie': configPieChart(newValueJSON); break;
                                default: configBarChart(newValueJSON); break;
                            }
                            setConfigToChart();
                        }
                    }
                });
                // 监听colors变化，重新绘制chart
                attrs.$observe("colors", function(newValue){
                   if (newValue){
                       option.color = eval(newValue);
                       setConfigToChart();
                   }
                });
                /*if ($scope.datas){
                 $datasJSON = JSON.parse($scope.datas);
                 if ($datasJSON){
                 switch($datasJSON.graphType){
                 case 'bar':  configBarChart(); break;
                 case 'line': configLineChart(); break;
                 case 'pie': configPieChart(); break;
                 default: configBarChart(); break;
                 }
                 }
                 }*/
            }
        }
    });
});
