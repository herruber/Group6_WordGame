(function () {

    var game = angular.module("WordGame", []);

    var GameController = function ($scope, $http) {

        $scope.Init = function ()
        {
            $scope.GetWords();
        }

        $scope.GetWords = function()
        {
            $http.get('/Game/GetWords')
            .then(function (response) {

                $scope.data = response.data;

                debugger;
            });
        }

    };


    game.controller("GameController", ['$scope', '$http', GameController]);









}());