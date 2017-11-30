(function () {

    var game = angular.module("WordGame", []);

    var GameController = function ($scope, $http) {

        $scope.Init = function ()
        {

            $scope.xp = 0;
            $scope.level = 1;
            document.getElementById("xpid").style.width = 0 + "px";

            $scope.dropped = false;
            $scope.GetWords();
            $scope.Answer = new Array($scope.ShuffledWords.length);
            $scope.Score = 0;
            $scope.visibletest = false;

            $scope.Reset();
        }

        $scope.Reset = function()
        {

            if (ShuffleWords) {
                for (var i = 0; i < $scope.ShuffledWords.length; i++) {
                    var cTarget = document.getElementById("target" + i);
                    cTarget.innerText = "";

                    var cDragged = document.getElementById(i);
                    cDragged.classList.remove("dropped");
                    cDragged.draggable = true;

                }

                document.getElementById("gameview").classList.remove("fadeout");
                document.getElementById("gameover").classList.remove("fadein");
            }

            $scope.dropped = false;
            $scope.GetWords();
            $scope.Answer = new Array($scope.ShuffledWords.length);
            $scope.Score = 0;
            $scope.visibletest = false;

        }

        $scope.on_drop = function(ev)
        {
            ev.preventDefault();

            var data = ev.dataTransfer.getData("text/html");
            //$scope.AddToAnswer(document.getElementById(data).innerText, document.getElementById(data));
            
            //var nodeCopy = document.getElementById(data).cloneNode(true);
            //nodeCopy.id = "newId"; /* We cannot use the same ID */
            //ev.target.appendChild(nodeCopy);

            var idstring = ev.target.id.replace('target', '');

            $scope.Answer[idstring] = document.getElementById(data).innerText;
            var elem = document.getElementById(data);
            elem.classList.add("dropped");
            elem.draggable = false;
            ev.target.innerText = $scope.Answer[idstring];

            

        }

        $scope.spellCheck = function()
        {
            for (var i = 0; i < $scope.ShuffledWords.length; i++) {

                if ($scope.Correct[i] == $scope.Answer[i] ) {
                    $scope.Score = $scope.Score + 1;
                }

            }

            document.getElementById("gameview").classList.add("fadeout");
            document.getElementById("gameover").classList.add("fadein");

            $scope.xp = $scope.xp + ($scope.Score * 100);
            
            //IF level up
            if ($scope.xp > 300) {
                var bajs = Math.floor($scope.xp / 300);
                $scope.xp = $scope.xp - (300 * bajs);

                $scope.level = $scope.level + (bajs * 1);
                var Ding = new Audio('applause3.wav');
                Ding.play();
            }

            document.getElementById("xpid").style.width = $scope.xp + "px";
        }

        $scope.GetWords = function()
        {
            var sentences = [
                "i am a cat",
                "that tree is very dark",
                "bill played with his toy car",
                "i can not help it",
                "my car was always that blue",
                "you and I were born to die"
            ];
            var nextid = Math.round((Math.random() * 6));

            var sentence = sentences[nextid];
            var words = sentence.split(" ");
            var inwords = sentence.split(" ");

            $scope.Correct = words;

            $scope.ShuffledWords = ShuffleWords(inwords);
            
            debugger;
        }
        
        ShuffleWords = function(a)
        {
            var j, x, i;

            for (var i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1))
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
            var ret = a;
            return ret;
        }

    };


    game.controller("GameController", ['$scope', '$http', GameController]);









}());