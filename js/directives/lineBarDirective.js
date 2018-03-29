/**
 * lineBarDirective created on 2018/3/20.
 * @ param [id] is the id of the echarts div
 * @ param [width] is width of the echarts div
 * @ param [height] is height of the echarts div
 * @ param [datas] is data of the echarts div, with array data of name, xData and yData
 * @ param [colors] is color of the echarts div, with array data
 * @ param [unit] is unit of the yAxis and tooltip, a data of string type
 * @ param [clickEventFlag]
 * @ param [clickSdata]
 * @ param [clickRdata]
 * @ param [yAxisNameLeft]
 * @ param [yAxisNameRight]
 */
define(['app', 'echarts'], function(app, echarts){
   app.directive('lineBar', function(ChartService){
       return {
           scope: {
               id: '=',
               width: '=',
               height: '=',
               datas: '@',
               colors: '@',
               yAxisNameLeft: '=',
               yAxisNameRight: '=',
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
                   name:['蒸发量','降水量','平均温度'], //对应图表legend
                   xData:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                   yData:[[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3], [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3], [2.0+100, 2.2+100, 3.3+100, 4.5+100, 6.3+100, 10.2+100, 20.3+100, 23.4+100, 23.0+100, 16.5+100, 12.0+100, 6.2+100]],
                   unit: 'ml'
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
                       tooltip: {
                           trigger: 'axis',
                           confine: true,
                           formatter: function(value){
                               var tempString = '';
                               value.map(function(item, index){
                                   tempString += index == 0 ? item.name : '';
                                   tempString += '<br />'+ item.seriesName + ":" + item.value + tooltip_unit;
                               });
                               return tempString;
                           }
                       },
                       legend: {
                           left: 'center'
                       },
                       xAxis: [
                           {
                               type: 'category',
                               axisPointer: {
                                   type: 'shadow'
                               }
                           }
                       ],
                       yAxis: [
                           {
                               name: attrs.yAxisNameLeft,
                               type: 'value',
                               axisLabel: {
                                   formatter: function(value){
                                       return !attrs.unit ? value + '万元': value + attrs.unit;
                                   }
                               }
                           },
                           {
                               name: attrs.yAxisNameRight,
                               axisLabel: {
                                   formatter: '{value}'+ '%'
                               }
                           }
                       ],
                       series: []
                   };
                   myChart.setOption(option);
               }
               initialChartCanvas();
               // 二次及以上配置chart option数据
               function setNewDataOption (opt, value){
                   var length = value.yData.length;
                   opt.legend.data = value.name;
                   opt.xAxis[0].data = value.xData;
                   value.yData.map(function(item, index){
                       if (index != length -1){
                           option.series[index] = {
                               type:'bar',
                               data: item,
                               name: value.name[index]
                           };
                       }else{
                           option.series[index] = {
                               type:'line',
                               data: item,
                               name: value.name[index],
                               yAxisIndex: 1,
                           };
                       }
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
    });
});
