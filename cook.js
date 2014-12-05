var App = angular.module('App', []);

App.controller('RecipeCtrl', ['$scope', '$http', function($scope, $http) {
    console.log('asdf');
    $http.get('sample_recipe.json')
         .then(function(res) {
            $scope.r = res.data;
            $scope.r.ingredients = formatRecipe(res.data);
            console.log($scope.r);
            // console.log(res.data);
            // console.log(r);
         });
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