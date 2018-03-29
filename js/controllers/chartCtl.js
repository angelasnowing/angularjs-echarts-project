define(['app'], function(app){
    return app.controller('chartCtl', function($scope, $stateParams){

        var headTitle = ['温度计条形图', '水平向条形图', '瀑布条形图', '标注条形图', '多组条形图',
            '堆叠条形图', '平滑曲线图', '多条折线图', '标注折线图', '玫瑰饼图', '指环饼图', '实心饼图',
            '单仪表盘图', '折线条形组合图', '折线面积图'];
        $scope.type = $stateParams.id;
        $scope.headTitle = headTitle[$scope.type - 1];
        if ( $scope.type == 14){
            $scope.attrsList = [
                {param: 'id', description: '图层ID', type: 'string', isMustHave: 'N', defltValue: 'defaultId'},
                {param: 'width', description: '图层宽度', type: 'string/number', isMustHave: 'N', defltValue: '500px'},
                {param: 'height', description: '图层高度', type: 'string/number', isMustHave: 'N', defltValue: '500px'},
                {param: 'datas', description: '图层传入数据', type: 'array/json', isMustHave: 'N', defltValue: '见上面代码'},
                {param: 'colors', description: '图层传入颜色', type: 'array', isMustHave: 'N', defltValue: "#00acee, #52cdd5, #79d9f1, #a7e7ff, #c8efff"},
                {param: 'unit', description: '图层传入单位', type: 'string', isMustHave: 'N', defltValue: ''},
                {param: 'clickEventFlag', description: '图层点击事件开启开关', type: 'string/number', isMustHave: 'N', defltValue: ''},
                {param: 'clickSdata', description: '图层点击事件发出数据', type: 'string', isMustHave: 'N', defltValue: ''},
                {param: 'clickRdata', description: '图层点击事件接收数据', type: 'string', isMustHave: 'N', defltValue: ''},
                {param: 'yAxisNameLeft', description: '图层左侧y轴标注文字', type: 'string', isMustHave: 'N', defltValue: ''},
                {param: 'yAxisNameRight', description: '图层右侧y轴标注文字', type: 'string', isMustHave: 'N', defltValue: ''},
            ];
        }else{
            $scope.attrsList = [
                {param: 'id', description: '图层ID', type: 'string', isMustHave: 'N', defltValue: 'defaultId'},
                {param: 'width', description: '图层宽度', type: 'string/number', isMustHave: 'N', defltValue: '500px'},
                {param: 'height', description: '图层高度', type: 'string/number', isMustHave: 'N', defltValue: '500px'},
                {param: 'datas', description: '图层传入数据', type: 'array/json', isMustHave: 'N', defltValue: '见上面代码'},
                {param: 'colors', description: '图层传入颜色', type: 'array', isMustHave: 'N', defltValue: "#00acee, #52cdd5, #79d9f1, #a7e7ff, #c8efff"},
                {param: 'unit', description: '图层传入单位', type: 'string', isMustHave: 'N', defltValue: ''},
                {param: 'clickEventFlag', description: '图层点击事件开启开关', type: 'string/number', isMustHave: 'N', defltValue: ''},
                {param: 'clickSdata', description: '图层点击事件发出数据', type: 'string', isMustHave: 'N', defltValue: ''},
                {param: 'clickRdata', description: '图层点击事件接收数据', type: 'string', isMustHave: 'N', defltValue: ''}
            ];
        }
        if ($scope.type == 1){
            $scope.labelData = "<wenduji-bar id='test1' width='500' height='500' datas='{{data1}}'></wenduji-bar>";
            $scope.codeData = "data1 = { name: ['Acutal', 'Forecast'], xData: ['Cosco','CMA','APL','OOCL','Wanhai','Zim'], " +
                "yData: [[260, 200, 220, 120, 100, 80], [40, 80, 50, 80,80, 70]]}"
        }else if($scope.type == 2){
            $scope.labelData = "<shuiping-bar id='test1' width='500' height='500' datas='{{data1}}'></shuiping-bar>";
            $scope.codeData = "data1 = { name: 'demo', xData:[1,2,3,5,6], yData:['一月', '二月', '三月', '四月', '五月']}"
        }else if($scope.type == 3){
            $scope.labelData = "<pubu-bar id='test1' width='500' height='500' datas='{{data1}}'></pubu-bar>";
            $scope.codeData = "data1 = { name: ['辅助', '生活费'], xData: ['总费用', '房租', '水电费', '交通费', '伙食费', '日用品数'], yData: [[0, 1700, 1400, 1200, 300, 0], [2900, 1200, 300, 200, 900, 300]]}"
        }else if($scope.type == 4){
            $scope.labelData = "<marker-bar id='test1' width='500' height='500' datas='{{data1}}'></marker-bar>";
            $scope.codeData = "data1 = { name: '学生数', xData: ['Amanda', 'Candy', 'Chris', 'Cindy', 'Emma', 'Grace', 'Kent', 'Lily', 'Lisa', 'Michlle', 'Sandy', 'Shirly', 'Stancey'], yData: [23, 26, 34, 39, 5, 25, 26, 39, 32, 66, 43, 27, 33]}"
        }else if($scope.type == 5){
            $scope.labelData = "<duo-bar id='test1' width='500' height='500' datas='{{data1}}'></duo-bar>";
            $scope.codeData = "data1 = { name: ['C1', 'C2', 'C3'], xData: ['1aa', '2bb', '3cc'], yData: [[2, 2, 2], [3, 3, 3], [4, 4, 4]]}"
        }else if($scope.type == 6){
            $scope.labelData = "<duidie-bar id='test1' width='500' height='500' datas='{{data1}}'></duidie-bar>";
            $scope.codeData = "data1 = { name:['bar1','bar2','bar3', 'bar4'], xData:['Class 0','Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9'],yData:[[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0], [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8], [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5], [6.4, 3.3, 6.0, 2.3, 12.0, 6.2, 8.9, 9.1, 1.6, 5.0]]}"
        }else if($scope.type == 7){
            $scope.labelData = "<pinghua-line id='test1' width='500' height='500' datas='{{data1}}'></pinghua-line>";
            $scope.codeData = "data1 = { name: '论文产出走势', xData: ['周一','周二','周三','周四','周五','周六','周日'], yData: [120, 132, 101, 134, 90, 230, 210]"
        }else if($scope.type == 8){
            $scope.labelData = "<duozhe-line id='test1' width='500' height='500' datas='{{data1}}'></duozhe-line>";
            $scope.codeData = "name: ['邮件营销','联盟广告','视频广告','直接访问','搜索引擎'],xData: ['周一','周二','周三','周四','周五','周六','周日'], yData: [[120, 132, 101, 134, 90, 230, 210], [220, 182, 191, 234, 290, 330, 310], [150, 232, 201, 154, 190, 330, 410],[320, 332, 301, 334, 390, 330, 320], [820, 932, 901, 934, 1290, 1330, 1320]]"
        }else if($scope.type == 9){
            $scope.labelData = "<marker-line id='test1' width='500' height='500' datas='{{data1}}'></marker-line>";
            $scope.codeData = "data1 = { name: '最高气温', xData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], yData: [11, 11, 15, 13, 12, 13, 10]}"
        }else if($scope.type == 10){
            $scope.labelData = "<meigui-pie id='test1' width='500' height='500'></meigui-pie>";
            $scope.codeData = "data1 = null"
        }else if($scope.type == 11){
            $scope.labelData = "<zhihuan-pie id='test1' width='500' height='500' datas='{{data1}}'></zhihuan-pie>";
            $scope.codeData = "data1 = [{value: 300, name: '年度计划投资'}, {value: 50, name: ''}], [{value: 60, name: '年累计完成投资'}, {value: 150, name: ''}],[{value: 20, name: '本月投资'}, {value: 80, name: ''}] ]"
        }else if($scope.type == 12){
            $scope.labelData = "<solid-pie id='test1' width='500' height='500' datas='{{data1}}'></solid-pie>";
            $scope.codeData = "data1 = { name: '全县项目进展情况', data: [{value: 335, name: '直接访问'},{value: 310, name: '邮件营销'},{value: 234, name: '联盟广告'},{value: 135, name: '视频广告'},{value: 1548, name: '搜索引擎'}]}"
        }else if($scope.type == 13){
            $scope.labelData = "<single-gauge id='test1' width='500' height='500' datas='{{data1}}'></single-gauge>";
            $scope.codeData = "data1 = { name: '攻坚2017项目完成情况', value: 80}"
        }else if($scope.type == 14){
            $scope.labelData = "<line-bar id='test1' width='500' height='500' datas='{{data1}}'></line-bar>";
            $scope.codeData = "data1 = { name:['蒸发量','降水量','平均温度'], xData:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],yData:[[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3], [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3], [2.0+100, 2.2+100, 3.3+100, 4.5+100, 6.3+100, 10.2+100, 20.3+100, 23.4+100, 23.0+100, 16.5+100, 12.0+100, 6.2+100]],unit: 'ml'}"
        }else if($scope.type == 15){
            $scope.labelData = "<line-area id='test1' width='500' height='500' datas='{{data1}}'></line-area>";
            $scope.codeData = "data1 = { name: ['邮件营销','联盟广告'], xData: ['周一','周二','周三','周四','周五','周六','周日'],\yData: [[120, 132, 101, 134, 90, 230, 210],[220, 182, 191, 234, 290, 330, 310]]}"
        }

    })
})