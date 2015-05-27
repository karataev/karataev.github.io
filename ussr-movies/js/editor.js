/**
 * Created by postepenno on 26.05.2015.
 */

var app = angular.module("app", []);

app.controller("MainCtrl", function ($scope, $http) {

    $scope.model = {
        pretty:true,
        json:undefined
    }

    $http.get("json/data.json")
        .success(function(data, status, headers, config) {
            //$scope.items = data.splice(0, 1);
            $scope.items = data;

        });

    $scope.addEmpty = function () {
        var id = $scope.items.length;
        var item = {
            id:id,
            sticker: {
                x:0,
                y:0,
                width:100,
                height:100,
                rotation:0
            },
            answers:[
                {value:"1", bingo:true},
                {value:"2"},
                {value:"3"},
                {value:"4"}
            ]
        }
        $scope.items.push(item);
    }

/*
    {img: "7724.jpg"},
    {img: "18607.jpg"},
    {img: "42664.jpg"},
    {img: "42736.jpg"},
    {img: "42782.jpg"},
    {img: "43700.jpg"},
    {img: "43772.jpg"},
    {img: "43869.jpg"},
    {img: "43970.jpg"},
    {img: "44027.jpg"},
    {img: "44168.jpg"},
    {img: "44299.jpg"},
    {img: "44457.jpg"},
    {img: "45028.jpg"},
    {img: "45146.jpg"},
    {img: "45389.jpg"},
    {img: "45465.jpg"},
    {img: "45660.jpg"},
    {img: "46019.jpg"},
    {img: "46068.jpg"},
    {img: "46225.jpg"},
    {img: "46789.jpg"},
    {img: "265114.jpg"}
*/


    $scope.save = function () {
        $scope.model.json = angular.toJson($scope.items, $scope.model.pretty);
    }

})
