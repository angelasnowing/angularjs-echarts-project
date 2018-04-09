define(['app'], function(app){
    return app.controller('chartCtl', function($scope, $stateParams){

        var headTitle = ['温度计条形图', '水平向条形图', '瀑布条形图', '标注条形图', '多组条形图',
            '堆叠条形图', '平滑曲线图', '多条折线图', '标注折线图', '玫瑰饼图', '指环饼图', '实心饼图',
            '单仪表盘图', '折线条形组合图', '折线面积图', '词云图', '环形饼图', '浮动散点图', '中国地图'];
        var labelNameList = ["wenduji-bar", "shuiping-bar", "pubu-bar", "marker-bar", "duo-bar",
            "duidie-bar", "pinghua-line", "duozhe-line", "marker-line", "meigui-pie",
            "zhihuan-pie", "solid-pie", "single-gauge", "line-bar", "line-area", "ciyun-word", "huan-pie", "float-scatter", "china-map"];
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
        ];
        var labelName ;
        $scope.type = $stateParams.id;
        $scope.headTitle = headTitle[$scope.type - 1];
        if ( $scope.type == 14){
            $scope.attrsList.push({param: 'yAxisNameLeft', description: '图层左侧y轴标注文字', type: 'string', isMustHave: 'N', defltValue: ''},
                {param: 'yAxisNameRight', description: '图层右侧y轴标注文字', type: 'string', isMustHave: 'N', defltValue: ''});
        }
        if ($scope.type == 16 || $scope.type == 18 || $scope.type == 19){
            $scope.attrsList.map(function(item, index){
                item.param == 'unit' ? $scope.attrsList.splice(index, 1) : null;
            })
        }
        labelName = labelNameList[$scope.type - 1];
        var codeDataName, codeDataXdata, codeDataYdata;
        if ($scope.type >= 1 && $scope.type <= 9 || $scope.type == 14 || $scope.type == 15){
            if ($scope.type == 1){
                codeDataName = "['Acutal', 'Forecast']";
                codeDataXdata = "['Cosco','CMA','APL','OOCL','Wanhai','Zim']";
                codeDataYdata = "[[260, 200, 220, 120, 100, 80], [40, 80, 50, 80,80, 70]]";
            }else if($scope.type == 2){
                codeDataName = "demo";
                codeDataXdata = "[1,2,3,5,6]";
                codeDataYdata = "['一月', '二月', '三月', '四月', '五月']";
            }else if($scope.type == 3){
                codeDataName = "['辅助', '生活费']";
                codeDataXdata = "['总费用', '房租', '水电费', '交通费', '伙食费', '日用品数']";
                codeDataYdata = "[[0, 1700, 1400, 1200, 300, 0], [2900, 1200, 300, 200, 900, 300]]";
            }else if($scope.type == 4){
                codeDataName = "学生数";
                codeDataXdata = "['Amanda', 'Candy', 'Chris', 'Cindy', 'Emma', 'Grace', 'Kent', 'Lily', 'Lisa', 'Michlle', 'Sandy', 'Shirly', 'Stancey']";
                codeDataYdata = "[23, 26, 34, 39, 5, 25, 26, 39, 32, 66, 43, 27, 33]";
            }else if($scope.type == 5){
                codeDataName = "['C1', 'C2', 'C3']";
                codeDataXdata = "['1aa', '2bb', '3cc']";
                codeDataYdata = "[[2, 2, 2], [3, 3, 3], [4, 4, 4]]";
            }else if($scope.type == 6){
                codeDataName = "['bar1','bar2','bar3', 'bar4']";
                codeDataXdata = "['Class 0','Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9']";
                codeDataYdata = "[[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0], [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8], [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5], [6.4, 3.3, 6.0, 2.3, 12.0, 6.2, 8.9, 9.1, 1.6, 5.0]]";
            }else if($scope.type == 7){
                codeDataName = "论文产出走势";
                codeDataXdata = "['周一','周二','周三','周四','周五','周六','周日']";
                codeDataYdata = "[120, 132, 101, 134, 90, 230, 210]";
            }else if($scope.type == 8){
                codeDataName = "['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']";
                codeDataXdata = "['周一','周二','周三','周四','周五','周六','周日']";
                codeDataYdata = "[[120, 132, 101, 134, 90, 230, 210], [220, 182, 191, 234, 290, 330, 310], [150, 232, 201, 154, 190, 330, 410],[320, 332, 301, 334, 390, 330, 320], [820, 932, 901, 934, 1290, 1330, 1320]]";
            }else if($scope.type == 9){
                codeDataName = "最高气温";
                codeDataXdata = "['周一','周二','周三','周四','周五','周六','周日']";
                codeDataYdata = "[11, 11, 15, 13, 12, 13, 10]";
            }else if($scope.type == 14){
                codeDataName = "['蒸发量','降水量','平均温度']";
                codeDataXdata = "['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']";
                codeDataYdata = "[[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3], [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3], [2.0+100, 2.2+100, 3.3+100, 4.5+100, 6.3+100, 10.2+100, 20.3+100, 23.4+100, 23.0+100, 16.5+100, 12.0+100, 6.2+100]]";
            }else if($scope.type == 15){
                codeDataName = "['邮件营销','联盟广告']";
                codeDataXdata = "['周一','周二','周三','周四','周五','周六','周日']";
                codeDataYdata = "[[120, 132, 101, 134, 90, 230, 210],[220, 182, 191, 234, 290, 330, 310]]";
            }
            $scope.codeData = "data1= { name:"+ " " + codeDataName + ", xData: " + codeDataXdata + ",yData:" + " "+ codeDataYdata + "}";
        }
        if($scope.type == 10){
            $scope.codeData = "data1 = {data: [{value: 32,name: '新材料'},{value: 27,name: '新能源'},{value: 17,name: '生物医药'}," +
                "{value: 17,name: '节能环保'},{value: 13,name: '电子信息'},{value: 12,name: '新一代信息技术'},{value: 30,name: '生命健康'}," +
                "{value: 15,name: '文化创意'}, {value: 12,name: '现代农业'}, {value: 6,name: '高端装备制造'},{value: 14,name: '现代装备制造'}," +
                "{value: 25,name: '现代服务业'}, {value: 15,name: '高端装备'}, {value: 15,name: '新装备'},{value: 12,name: '装备制造'}," +
                "{value: 24,name: '电子商务'}, {value: 34,name: '海洋高技术'}, {value: 13,name: '新能源新材料'},{value: 10,name: '现代物流'}," +
                "{value: 10,name: '现代制造技术'} ], labelData: [{value: 100, name: '浙江省'},{value: 100, name: '陕西省'}," +
                "{value: 100, name: '山东省'},{value: 100, name: '天津市'}]}";
        }else if($scope.type == 11){
            $scope.codeData = "data1 = [ [{value: 300, name: '年度计划投资'}, {value: 50, name: ''}], [{value: 60, name: '年累计完成投资'}, {value: 150, name: ''}],[{value: 20, name: '本月投资'}, {value: 80, name: ''}] ]"
        }else if($scope.type == 12){
            $scope.codeData = "data1 = { name: '全县项目进展情况', data: [{value: 335, name: '直接访问'},{value: 310, name: '邮件营销'},{value: 234, name: '联盟广告'},{value: 135, name: '视频广告'},{value: 1548, name: '搜索引擎'}]}"
        }else if($scope.type == 13){
            $scope.codeData = "data1 = { name: '攻坚2017项目完成情况', value: 80}"
        }else if($scope.type == 16){
            $scope.codeData = "data1 = { name: '热点分析', data: [{name: '研发', value: '650'}, {name: '中国', value: '520'}, {name: '系统', value: '550'},{name: '征集', value: '600'}, {name: '福州市', value: '700'},{name: '大数据', value: '650'}, {name: '物联网', value: '520'}, {name: '峰会', value: '550'},{name: '理想', value: '600'}, {name: '在线', value: '700'},{name: '软件', value: '650'}, {name: '其他', value: '520'}, {name: '环节', value: '550'},{name: '新常态', value: '600'}, {name: '进程', value: '700'}]}";
        }else if($scope.type == 17){
            $scope.codeData = "data1 = [{name: '中立评价', value: 50}, {name: '正面评价', value: 70}, {name: '负面评价', value: 90}]";
        }else if($scope.type == 18){
            $scope.codeData = "data1 = [[1,2,'aa'], [2,90, 'bb'], [3, 12,'cc'], [4,7, 'dd'], [5,30,'ee']]";
        }else if ($scope.type == 19){
            $scope.codeData = "data1 = {name: '总人口',data: [{name: '福州市', value: 39623.85},{name: '洛阳市', value: 39623.85},{name: '厦门市', value: 39623.85}]}";
        }
        $scope.labelData = "<" + labelName + " " + "id='test1' width='500' height='500' datas='{{data1}}'></" + labelName + ">";
    })
})