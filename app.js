<--angular file inits first-->
angular.module('demo',[]);
zpmanage.config(['routeProvider','$locationProvider','httpProvider',function($routeProvider,$locationProvider,$httpProvider){
$routeProvider.when();
$locationProvider.html5Mode(true);
}
]);
