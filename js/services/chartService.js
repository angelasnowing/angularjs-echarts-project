/**
 * Created by Administrator on 2018/3/21.
 */
define(['app', 'echarts'], function(app, echarts){
    return app.factory('ChartService', [function(){
            var chartService = {
                // 设置chart默认颜色
                setEleColors: function(){
                    var defultColors = ['#00acee', '#52cdd5', '#79d9f1', '#a7e7ff', '#c8efff'];
                    return defultColors;
                },
                // 二次及以上配置chart option颜色
                setNewColorOption: function(opt, value){
                    opt.color = value;
                },
                // 设置宽度和高度
                setEleWaH: function(ele, widthValue, heightValue){
                    ele.style.width = widthValue.indexOf('px') ? widthValue : widthValue + 'px';
                    ele.style.height = widthValue.indexOf('px') ? heightValue : heightValue + 'px';
                },
                // 二次及以上配置option到chart
                setConfigToChart: function(container, opt){
                    var myChart = echarts.getInstanceByDom(container);
                    myChart.setOption(opt);
                },
                // 自适应宽度、高度
                resizeContainer: function(ele){
                    var parentContainer, contWidth, contHeight;
                    parentContainer = ele.parentNode;
                    contWidth = parentContainer.clientWidth;
                    contHeight = parentContainer.clientHeight;
                    ele.style.width = contWidth;
                    ele.style.height = contHeight;
                },
                // 监听父容器宽度、高度的变化，chart自适应新宽度、高度
                setCurrEleSize: function(con){
                    window.addEventListener("resize", function(){
                        myChart = echarts.getInstanceByDom(con);
                        //resizeContainer(con);
                        myChart.resize();
                    });
                }
            };
            return chartService;
    }])
})