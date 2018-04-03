define(['app'], function(app){
    return app.controller('shuomingCtl', function($scope){
        $scope.labelName = new Array();
        $scope.codeBlock = new Object();
        $scope.labelName = ["duidieBar", "pinghua-line", "solid-pie"];
        var index, length;
        length = $scope.labelName.length;
        for (index = 0; index < length; index ++){
            $scope.codeBlock["data"+index] = "<"+ $scope.labelName[index] + " " + "id='test1' width='500' height='500'></" + $scope.labelName[index] + ">"
        }
})});