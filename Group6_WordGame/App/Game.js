(function () {

    var game = angular.module("WordGame", []);

    var GameController = function ($scope, $http) {

        TextOutLoud = function (text) {
            if ('speechSynthesis' in window) {

                var msg = new SpeechSynthesisUtterance();
                msg.voice = window.speechSynthesis.getVoices()[2];
                msg.text = text;
                speechSynthesis.speak(msg);
            }
        }

        VoiceRecognition = function () {
            var recognition = new webkitSpeechRecognition();

            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onresult = function (e) {
                // cancel onend handler
                recognition.onend = null;
                //alert(e.results[0][0].transcript)

                var spokenword = e.results[0][0].transcript.toLowerCase();

                switch (spokenword) {
                    case "stop":
                        TextOutLoud("Stopping voice recognition");
                        recognition.onend = function () { };
                        break;
                    case "reload":
                        TextOutLoud("Reloading..");
                        location.reload();
                        break;
                    default:
                        FindWord(spokenword);
                        recognition.onend = function () { recognition.start() };
                        break;
                }


            }
            
            // start listening
            recognition.start();
        }

        FindWord = function(text)
        {
            //matches the spoken word with each word in the sentence, if match then break and move it
            var match = "";
            for (var w = 0; w < $scope.Answer.length; w++) {
                
                var tempword = $scope.ShuffledWords[w];

                if (tempword == text && document.getElementById(w).draggable == true) {
                    match = tempword;
                    break;
                }
            }

            //move the matched string to the first empty target
            if (match) {

                for (var t = 0; t < $scope.ShuffledWords.length; t++) {

                    var temptargetstring = document.getElementById("target" + t).innerText;

                    if (!temptargetstring) {
                        document.getElementById("target" + t).innerText = match;
                        $scope.Answer[t] = match;
                        document.getElementById(w).classList.add("dropped");
                        TextOutLoud(text); //Say back the spoken word
                        break;
                    }
                }
            }


        }

        $scope.Init = function ()
        {

            $scope.xp = 0;
            $scope.level = 1;
            document.getElementById("xpid").style.width = 0 + "px";

            $scope.completed = new Array();

            VoiceRecognition();

            $scope.dropped = false;
            $scope.GetWords();
            $scope.Answer = new Array($scope.ShuffledWords.length);
            $scope.Score = 0;
            $scope.visibletest = false;

            $scope.stage = 1;

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

            $scope.wordcounter = 0;
        }

        $scope.on_drop = function(ev)
        {
            ev.preventDefault();

            var data = ev.dataTransfer.getData("text/html");

            var idstring = ev.target.id.replace('target', '');

            $scope.Answer[idstring] = document.getElementById(data).innerText;
            var elem = document.getElementById(data);
            elem.classList.add("dropped");
            elem.draggable = false;
            ev.target.innerText = $scope.Answer[idstring];

            TextOutLoud(document.getElementById(data).innerText);
            $scope.wordcounter = $scope.wordcounter + 1;

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

            $scope.xp = $scope.xp + ($scope.Score * 32);
            
            //IF level up
            if ($scope.xp > 300) {
                var mult = Math.floor($scope.xp / 300);
                $scope.xp = $scope.xp - (300 * mult);

                $scope.level = $scope.level + (mult * 1);

                if (!Ding) {
                    var Ding = new Audio('jingle.ogg');
                    Ding.volume = 0.5;
                }
                
                
                Ding.play();
            }

            document.getElementById("xpid").style.width = $scope.xp + "px";

            $scope.completed.push($scope.sentence);
        }

        $scope.GetWords = function()
        {
            var sentences = [
                "i am a cat",
                "that tree is very dark",
                "bill played with his toy car",
                "i can not help it",
                "my car was always that blue",
                "you and I were born to love",
                "the princess had several horses",
                "i let you ride my pony",
                "will you be my friend",
                "you are taller than me",
                "this is a random sentence",
                "very short sentences",
                "i want candy",
                "this is amazing",
                "the seasons change quickly",
                "lets watch a movie"
            ];

            var nextid = Math.round((Math.random() * 16));

            $scope.sentence = sentences[nextid];
            var words = $scope.sentence.split(" ");
            var inwords = $scope.sentence.split(" ");

            $scope.Correct = words;

            $scope.ShuffledWords = ShuffleWords(inwords);
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