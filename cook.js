var App = angular.module('App', []);

App.controller('RecipeCtrl', ['$scope', '$http', function($scope, $http) {
    console.log('asdf');
    $http.get('sample_recipe.json')
         .then(function(res) {
            $scope.r = res.data;
            $scope.r.ingredients = formatRecipe(res.data);
            $scope.steps = allSteps(res.data.steps);
            console.log($scope.steps);
         });
    $scope.slideDown = slideDown;
    $scope.stepIndex = 0;
    $scope.incrementStep = incrementStep;
    $scope.decrementStep = decrementStep;
    console.log($scope.stepIndex);
}]);

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
    console.log(i);
    return Math.min(i+1, steps-1);
}

function decrementStep(i) {
    return Math.max(i-1, 0);
}

function slideDown() {
    console.log($('.overlay'));
    $('.overlay').css('top', 0);
}