var App = angular.module('App', []);

App.controller('RecipeCtrl', ['$rootScope', '$scope', '$http',
    function($rootScope, $scope, $http) {
    $http.get('sample_recipe.json')
         .then(function(res) {
            $scope.r = res.data;
            $scope.r.ingredients = formatRecipe(res.data);
            $scope.steps = allSteps(res.data.steps);
         });
    $scope.slideDown = slideDown;
    $scope.slideUp = slideUp;
    $scope.stepIndex = 0;
    $scope.incrementStep = incrementStep;
    $scope.decrementStep = decrementStep;
    $scope.arrowKeyNav = arrowKeyNav;
    
    if (!('webkitSpeechRecognition' in window)) {
      alert("Upgrade yo shit browser");
    } else {
        recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = true;
        recognition.onstart = function(e) {
            console.log('starting capture');
        }
        console.log($scope.stepIndex);
        recognition.onresult = function(e) {
            results = e.results[0];
            var latestEvent = event.results[event.results.length-1][0].transcript;
            latestEvent = $.trim(latestEvent);
            if (latestEvent === "back") {
                $scope.$apply(function() {
                    decrementStep($scope.stepIndex, $scope.steps.length);
                });
            } else if (latestEvent === "next") {
                $scope.$apply(function() {
                    incrementStep($scope.stepIndex, $scope.steps.length);
                });
            }
        }
    }

    // $scope.stepIndex = recognition.onresult;

    function formatRecipe(r) {
        var formatted_r = {};
        for (section in r.ingredients) {
            formatted_r[section] = {};
            for (item in r.ingredients[section]) {
                var i = r.ingredients[section][item]
                if (i.constructor === Array) {
                    i.forEach(function(type) {
                        var new_name = type.name + ' ' + type.type;
                        formatted_r[section][new_name] = type;
                    });
                } else  {
                    formatted_r[section][item] = i;
                }
            }
        };
        return formatted_r;
    }

    function allSteps(steps) {
        var allSteps = [];
        steps.forEach(function(step) {
            allSteps = allSteps.concat(step.procedure);
        });
        return allSteps;
    }

    function incrementStep(i, steps) {
        $scope.stepIndex = Math.min(i+1, steps-1);
    }

    function decrementStep(i) {
        $scope.stepIndex = Math.max(i-1, 0);
    }

    function arrowKeyNav(e, stepIndex, steps) {
        console.log(e.keyCode);
        switch(e.keyCode) {
            case 37:
                return decrementStep(stepIndex);
            case 39:
                return incrementStep(stepIndex, steps);
            case 27:
                return slideUp();
            default:
                console.log('Key not recognized.');
        }
    }

    function slideDown() {
        $('.overlay').css('top', 0);
        $('html').css('overflow-y', 'hidden');
        $('.overlay').focus();

        recognition.start();
    }

    function slideUp() {
        $('.overlay').css('top', '-100%');
        $('html').css('overflow-y', 'auto');

        recognition.stop();
    }
}]);