/**
 * Created by Administrator on 2018/3/21.
 */
define(['app', 'echarts'], function(app, echarts){
    return app.directive('chartElement', function(){
        return {
            scope: {
                classes: '@'
            },
            restrict: 'E',
            replace: false,
            template: '<div></div>',
            link: function($scope, element, attrs){
                attrs.$observe("classes", function(value){
                    if (value){
                        var elem = document.getElementById("defaultId");
                        elem.setAttribute("class", value);
                        //console.log(element, element.className, value, "class VALUE")
                    }
                })
            }
        }
    })
})
