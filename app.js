<--angular file inits first-->
var demo = angular.module('demo',[]);

demo.run (function(permissions){
  permissions.setPermissions(permissionList)
});

angular.element(document).ready(function  () {
 // body...
 $.get('/api/UserPermission',function(data){
     permissionList = data ;
     angular.bootstrap(document,['App']);
 });
});




demo.config(['routeProvider','$locationProvider','httpProvider',function($routeProvider,$locationProvider,$httpProvider){
$routeProvider.when("/index",{templateUrl:'',controller:'',pageTitle:''})
.when('/demo',{templateUrl:'',controller:'',pageTitle:''})
.other({'/noPrivilege'});
$locationProvider.html5Mode(true);
}
]);
demo.run(['$rootScope','$location','$window','$http','$filter',function($rootScope,$location,$window,$http,$filter){
  // route changes successfully.
  $rootScope.$on('$routeChangeSuccess',function(next,current){
    if(current && current.$$route && current.$$route.pageTitle){
      // your own code...
    }
  });
  //route starts privilege limit
  $rootScope.$on('$routeChangeStart',function(event,next,current){
    //privilege control
  });
  
  $rootScope.$on('$routeChangeError',function(){
    // route changes error!
  })
  
}]);

